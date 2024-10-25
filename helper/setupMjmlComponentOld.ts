import { ComponentObjectPropsOptions, h, createCommentVNode, VNode } from '@vue/runtime-core'
import parse, { DOMNode } from 'html-dom-parser'
import { provide, inject } from 'vue'
import useMjmlContext from '../src/runtime/composables/useMjmlContext'
import camelToKebab from './camelToKebabCase'
import type { MjmlComponentAttributes, MjmlUnderstandableVueChild, MjmlComponent } from '../types'

function mjmlComponentAttributesToVuePropsDefinitions(mjmlComponentAttributes: MjmlComponentAttributes, defaultAttributes: MjmlComponentAttributes): ComponentObjectPropsOptions {
  return Object.fromEntries(Object.entries(mjmlComponentAttributes).map(([k, attrType]) => [k, {
    type: String,
    required: false,
    default: defaultAttributes[k],
    validator: (value: string) => {
      if (attrType === 'string') {
        return true
      }

      if (attrType === 'color') {
        return value.startsWith('rgb(') || (value.startsWith('#') && (value.length === 7 || value.length === 4))
      }

      if (attrType.startsWith('unit')) {
        const unitRegexp = /^(?:unit|unitWithNegative)\(([^)]+)\)/
        const units = attrType.match(unitRegexp)[1].split(',')

        return units.some(unit => value.endsWith(unit))
      }

      if (attrType.startsWith('enum')) {
        const choiceRegexp = /^(?:enum)\(([^)]+)\)/
        const choices = attrType.match(choiceRegexp)[1].split(',')

        return choices.some(choice => value === choice)
      }

      return false
    }
  }]))
}

function getVueRendered(h: h, mjmlDom: DOMNode[], children: VNode[]): ReturnType<h>[] {
  let encounteredChildNodes = 0

  function mjmlDomTreeToVueRender(h: h, mjmlDom: DOMNode[]): ReturnType<h>[] {
    return mjmlDom.filter(el => el.type !== 'text').map(el => {
      if (el.type === 'tag') {
        return h(
          el.name,
          el.attribs,
          mjmlDomTreeToVueRender(h, el.children)
        )
      }

      if (el.type === 'comment') {
        if (el.data === '[SLOT CONTENT]') {
          const content = children[encounteredChildNodes]
          encounteredChildNodes++

          return content
        }

        return createCommentVNode(el.data || '')
      }

      throw new Error('Unknown element type: ' + el.type)
    })
  }

  return mjmlDomTreeToVueRender(h, mjmlDom)
}

export default function setupMjmlComponent(mjmlComponent: MjmlComponent) {
  return defineComponent({
    name: mjmlComponent.componentName,
    props: mjmlComponentAttributesToVuePropsDefinitions(
      mjmlComponent.allowedAttributes,
      mjmlComponent.defaultAttributes,
    ),
    getDummyInstance() {
      // Dummy instance to provide functionality to the parent component.
      return new mjmlComponent()
    },
    setup(props, { slots }) {
      const vueChildren = slots.default ? slots.default() : []

      // MJML uses extra rendering functions to render children (`renderWrappedChildren`, for example)
      // for which it expects a certain interface. Since we're dealing with VNodes, we need to make sure we're
      // providing the correct interface. We actually don't want to render out the slots directly and since
      // MJML doesn't know how to treat VNodes, we render out a comment node indicating that we want slot content
      // to go there. Once we transform everything to Vue's own render functions, we replace these comments with
      // the slot content again.
      // The only downside with this approach is that sometimes the immediate child isn't a MJML-based component,
      // which breaks the direct communication via the dummyInstance, unsetting a few styles.
      // TODO: Figure out how we can pass the
      const mjmlUnderstandableVueChildren = vueChildren.map((el: VNode) => {
        const dummyInstance = el.type.getDummyInstance ? el.type.getDummyInstance() : null

        return {
          getAttribute(name) {
            if (dummyInstance && dummyInstance.getAttribute) {
              return dummyInstance.getAttribute(name)
            }

            if (el.props) {
              return el.props[name]
            }

            if (el.type.props && el.type.props[name]) {
              return el.type.props[name].default
            }

            return ''
          },
          constructor: {
            // Since we don't have a constructor, we're mocking it here for MJML to ask whether we're an `mj-raw`.
            isRawElement: () => mjmlComponent.componentName === 'mj-raw',
          },
          htmlAttributes(args: any) {
            if (dummyInstance && dummyInstance.htmlAttributes) {
              return dummyInstance.htmlAttributes(args)
            }

            return ''
          },
          render() {
            return '<!--[SLOT CONTENT]-->'
          }
        }
      })

      const immediateParent = inject('immediateParent', null)
      const numberOfSiblings = immediateParent ? immediateParent.props.children.length : null

      const args = {
        context: useMjmlContext(),
        children: mjmlUnderstandableVueChildren,
        attributes: Object.fromEntries(
          Object.entries(props)
            .filter(([_, v]) => v !== undefined)
            .map(([k, v]) => [
              camelToKebab(k),
              v,
            ]),
        ),
        props: {
          // MJML itself sets this up with the same number in core already, so here we are.
          sibling: numberOfSiblings,
          nonRawSiblings: numberOfSiblings,
        }
      }

      if (mjmlComponent.endingTag) {
        // This comment node indicates the rendering part that a slotted element should go here.
        args.content = '<!--[SLOT CONTENT]-->'
      }

      const instance = new mjmlComponent(args)

      // MJML asks child components for certain styles via `htmlAttributes` or `getStyles`.
      // Generally speaking, MJML components are interconnected.
      // We, therefore, expose the entire instance here for the parent to access,
      // so MJML can do its thing during the rendering.
      provide('immediateParent', instance)

      // TODO: Find a better solution than monkey-patching the renderChildren method.
      if (!mjmlComponent.endingTag) {
        instance.renderChildren = (children: MjmlUnderstandableVueChild[], options: { renderer: (child: MjmlUnderstandableVueChild) => {} }) => {
          return children.map(options.renderer).join('')
        }
      }

      const mjmlDom = parse(instance.render(), 'text/html')

      return () => getVueRendered(h, mjmlDom, vueChildren)
    },
  })
}
