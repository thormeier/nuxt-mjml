import type { ComponentObjectPropsOptions } from '@vue/runtime-core'
import { h, createCommentVNode } from '@vue/runtime-core'
import type { DOMNode } from 'html-dom-parser'
import parse from 'html-dom-parser'
import { provide, inject } from 'vue'
import type { MjmlComponentAttributes, MjmlUnderstandableVueChild, MjmlComponent, MjmlChildRenderFunction } from '../types'
import camelToKebab from './camelToKebabCase'

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

        return value.split(' ').map((v) => {
          return v === '0' || units.some(unit => v.endsWith(unit))
        })
      }

      if (attrType.startsWith('enum')) {
        const choiceRegexp = /^enum\(([^)]+)\)/
        const choices = attrType.match(choiceRegexp)[1].split(',')

        return choices.includes(value)
      }

      return false
    },
  }]))
}

function getVueRendered(h: h, mjmlDom: DOMNode[], defaultSlot: Slot, componentName: string): ReturnType<h>[] {
  function mjmlDomTreeToVueRender(h: h, mjmlDom: DOMNode[], isRoot: boolean): ReturnType<h>[] {
    return mjmlDom.filter(el => el.type !== 'text').map((el) => {
      if (el.type === 'tag') {
        if (isRoot) {
          el.attribs['data-mjml-tag'] = componentName
        }

        return h(
          el.name,
          el.attribs,
          mjmlDomTreeToVueRender(h, el.children, componentName, false),
        )
      }

      if (el.type === 'comment') {
        if (el.data === '[SLOT CONTENT]') {
          return defaultSlot()
        }

        return createCommentVNode(el.data || '')
      }

      throw new Error('Unknown element type: ' + el.type)
    })
  }

  return mjmlDomTreeToVueRender(h, mjmlDom, true)
}

export default function setupMjmlComponent(mjmlComponent: MjmlComponent, hasColumns?: boolean) {
  const vueComponentProps = mjmlComponentAttributesToVuePropsDefinitions(
    mjmlComponent.allowedAttributes ? mjmlComponent.allowedAttributes : {},
    mjmlComponent.defaultAttributes ? mjmlComponent.defaultAttributes : {},
  )

  if (hasColumns) {
    vueComponentProps.numberOfColumns = {
      type: Number,
      required: false,
      default: () => 1,
      validator: (value: number) => {
        return value > 0
      },
    }
  }

  return defineComponent({
    name: mjmlComponent.componentName,
    props: vueComponentProps,
    setup(props, { slots }) {
      // Injected because
      // a) we can't exactly use props
      // b) to allow for deeply nested mjml components in vanilla-Vue components
      const parentChildRenderer = inject('mjmlChildRenderFunction', null)
      const numberOfSiblings = inject('numberOfSiblings', 1)
      const mjmlContext = inject('mjmlContext', {})

      const childInstances = ref<MjmlUnderstandableVueChild[]>([])
      const childRenderFunction = ref<MjmlChildRenderFunction | null>(null)
      const currentChildIndex = ref<number | undefined>(undefined)

      const mjmlComponentArgs = computed(() => {
        const mjmlProps = {
          // MJML itself sets this up with the same number in core already, so here we are.
          index: currentChildIndex.value,
          first: currentChildIndex.value === 0,
          last: currentChildIndex.value - 1 < numberOfSiblings,
          sibling: numberOfSiblings,
          nonRawSiblings: numberOfSiblings,
        }

        const args = {
          context: mjmlContext,
          children: childInstances.value,
          attributes: Object.fromEntries(
            Object.entries(props)
              .filter(([_, v]) => v !== undefined)
              .map(([k, v]) => [
                camelToKebab(k),
                v,
              ]),
          ),
          props: mjmlProps,
        }

        if (mjmlComponent.endingTag) {
          // This comment node indicates the rendering part that a slotted element should go here.
          args.content = '<!--[SLOT CONTENT]-->'
        }

        return args
      })

      const mjmlComponentInstance = ref<MjmlComponent>(new mjmlComponent(mjmlComponentArgs.value))

      watch(mjmlComponentArgs, (newValue) => {
        mjmlComponentInstance.value = new mjmlComponent(newValue)
      })

      watch(mjmlComponentInstance, (newValue) => {
        if (!mjmlComponent.endingTag) {
          newValue.renderChildren = (_: MjmlUnderstandableVueChild[], options: { renderer: MjmlChildRenderFunction }) => {
            childRenderFunction.value = options.renderer

            return '<!--[SLOT CONTENT]-->'
          }
        }
      })

      if (!mjmlComponent.endingTag) {
        mjmlComponentInstance.value.renderChildren = (_: MjmlUnderstandableVueChild[], options: { renderer: MjmlChildRenderFunction }) => {
          childRenderFunction.value = options ? options.renderer : component => component.render()

          return '<!--[SLOT CONTENT]-->'
        }
      }

      const mjmlDom = computed(() => {
        const rendered = parentChildRenderer ? parentChildRenderer.value(mjmlComponentInstance.value) : mjmlComponentInstance.value.render()

        return parse(rendered, 'text/html')
      })

      const numberOfColumns = computed(() => {
        return hasColumns ? props.numberOfColumns : 1
      })

      provide('mjmlChildRenderFunction', childRenderFunction)
      provide('numberOfSiblings', numberOfColumns)

      return () => getVueRendered(h, mjmlDom.value, slots.default, mjmlComponent.componentName)
    },
  })
}
