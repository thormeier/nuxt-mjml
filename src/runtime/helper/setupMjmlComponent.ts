import type { ComponentObjectPropsOptions, Ref } from '@vue/runtime-core'
import { h, createCommentVNode, defineComponent } from '@vue/runtime-core'
import type { DOMNode } from 'html-dom-parser'
import parse from 'html-dom-parser'
import { provide, inject, ref, computed, watch } from 'vue'
import { useHead } from '@unhead/vue'
import type { MjmlComponentAttributes, MjmlUnderstandableVueChild, MjmlComponent, MjmlChildRenderFunction } from '../types'
import camelToKebab from './camelToKebabCase'

function mjmlComponentAttributesToVuePropsDefinitions(mjmlComponentAttributes: MjmlComponentAttributes, defaultAttributes: MjmlComponentAttributes): ComponentObjectPropsOptions {
  return Object.fromEntries(Object.entries(mjmlComponentAttributes).map(([k, attrType]) => [k, {
    type: String,
    required: false,
    default: k === 'text-align' ? 'left' : defaultAttributes[k],
    validator: (value: string | undefined) => {
      if (value === undefined) {
        return true
      }

      if (attrType === 'string') {
        return true
      }

      if (attrType === 'color') {
        return value === 'none' || value.startsWith('rgb(') || (value.startsWith('#') && (value.length === 7 || value.length === 4))
      }

      if (attrType === 'integer') {
        return !Number.isNaN(Number.parseInt(value, 10))
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

function getVueRendered(h: h, mjmlDom: DOMNode[], defaultSlot: Slot, componentName: string, rootAttribs?: { [key: string]: string }): ReturnType<h>[] {
  function mjmlDomTreeToVueRender(mjmlDom: DOMNode[], isRoot: boolean): ReturnType<h>[] {
    return mjmlDom.filter(el => el.type !== 'text').map((el) => {
      if (el.type === 'tag') {
        if (isRoot) {
          el.attribs['data-mjml-tag'] = componentName
        }

        return h(
          el.name,
          isRoot && rootAttribs
            ? el.attribs
            : {
                ...el.attribs,
                ...rootAttribs,
              }
          ,
          mjmlDomTreeToVueRender(el.children, false),
        )
      }

      if (el.type === 'comment') {
        if (el.data === '[SLOT CONTENT]' && defaultSlot) {
          return defaultSlot()
        }

        return createCommentVNode(el.data || '')
      }

      throw new Error('Unknown element type: ' + el.type)
    })
  }

  return mjmlDomTreeToVueRender(mjmlDom, true)
}

function toMediaQueryStyleTags(parsedWidth: string, unit: string, className: string, breakpoint: number, forceOWADesktop: boolean) {
  const baseMediaQuery = `.${className} {
      width: ${parsedWidth}${unit} !important;
      max-width: ${parsedWidth}${unit};
    }`

  const styleTags = [
    {
      type: 'text/css',
      innerHTML: `
  @media only screen and (min-width:480px) {
    ${baseMediaQuery}
  }
`,
    },
    {
      media: `screen and (min-width:480px)`,
      innerHTML: `
  .moz-text-html ${baseMediaQuery}
`,
    },
  ]

  if (forceOWADesktop) {
    styleTags.push({
      type: 'text/css',
      innerHTML: `[owa] ${baseMediaQuery}`,
    })
  }

  return styleTags
}

function extractBorderColor(border) {
  const colorRegex = /(#[0-9a-fA-F]{3,6}|rgba?\([\d\s,.%]+\))/
  const match = border.match(colorRegex)

  return match ? match[0] : null
}

function enhanceMjmlButton(dom: string, mjmlComponentInstance: Ref<MjmlComponent>, borderRadius: string, href: string) {
  // Manually add some roundrect stuff for Outlook, because MJML doesn't do that.
  const innerPaddings = mjmlComponentInstance.value.getShorthandAttrValue('inner-padding', 'top') + mjmlComponentInstance.value.getShorthandAttrValue('inner-padding', 'bottom')
  const lineHeightAttribute = mjmlComponentInstance.value.getAttribute('line-height')

  let lineHeight = Number.parseInt(lineHeightAttribute)
  if (lineHeightAttribute.endsWith('%')) {
    const percentageLineHeight = Number.parseInt(lineHeightAttribute.slice(0, -1)) / 100
    const fontSize = Number.parseInt(mjmlComponentInstance.value.getAttribute('font-size'))

    lineHeight = percentageLineHeight * fontSize
  }

  const border = mjmlComponentInstance.value.getAttribute('border')
  let borderHeight = 0
  if (border !== 'none') {
    borderHeight = Number.parseInt(mjmlComponentInstance.value.getAttribute('border')?.split(' ')[0] || '0') * 2
  }
  const buttonHeight = Math.round(innerPaddings + lineHeight + borderHeight)

  let buttonWidth = Number.parseInt(mjmlComponentInstance.value.calculateAWidth(mjmlComponentInstance.value.getAttribute('width'))) + borderHeight

  if (!buttonWidth) {
    buttonWidth = '200'
  }
  buttonWidth += 'px'

  let arcSize = Math.round(Number.parseInt(borderRadius) / buttonHeight * 100)
  if (arcSize > 50) {
    arcSize = 50
  }

  const borderColor = extractBorderColor(mjmlComponentInstance.value.getAttribute('border'))

  dom = dom.replace('<table', `
    <!--[if mso | IE]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:${buttonHeight}px;v-text-anchor:middle;width:${buttonWidth};" arcsize="${arcSize}%" strokecolor="${borderColor}" fill="t">6
        <v:fill type="tile" color="${mjmlComponentInstance.value.getAttribute('background-color')}" />
        <w:anchorlock/>
        <center style="color:${mjmlComponentInstance.value.getAttribute('color')};font-family:${mjmlComponentInstance.value.getAttribute('font-family')};font-size:${mjmlComponentInstance.value.getAttribute('font-size')};font-weight:${mjmlComponentInstance.value.getAttribute('font-weight')};">
    <![endif]-->
    <!--[if !mso]><!--><table
  `)

  dom = dom.replace('</table>', `
    </table>
    <!--<![endif]-->
    <!--[if mso | IE]>
        </center>
      </v:roundrect>
    <![endif]-->
  `)

  dom = dom.replace('<!--[SLOT CONTENT]-->', '<!--<![endif]--><!--[SLOT CONTENT]--><!--[if !mso]><!-->')

  return dom
}

export default function setupMjmlComponent(mjmlComponent: MjmlComponent, hasColumns?: boolean) {
  const vueComponentProps = mjmlComponentAttributesToVuePropsDefinitions(
    mjmlComponent.allowedAttributes ? mjmlComponent.allowedAttributes : {},
    mjmlComponent.defaultAttributes ? mjmlComponent.defaultAttributes : {},
  )

  vueComponentProps['data-v-inspector'] = {
    type: String,
    required: false,
    default: () => undefined,
  }

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

  if (mjmlComponent.componentName === 'mj-column') {
    vueComponentProps.mobileWidth = {
      type: String,
      required: false,
      default: () => undefined,
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
      const forceOWADesktop = inject('forceOWADesktop', false)

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
                k === 'mobileWidth' ? k : camelToKebab(k),
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
        let rendered = parentChildRenderer && parentChildRenderer.value ? parentChildRenderer.value(mjmlComponentInstance.value) : mjmlComponentInstance.value.render()

        if (mjmlComponent.componentName === 'mj-button' && props.borderRadius !== '0') {
          rendered = enhanceMjmlButton(rendered, mjmlComponentInstance, props.borderRadius, props.href)
        }

        return parse(rendered, 'text/html')
      })

      const mjmlMediaQueryHeadStyles = computed(() => {
        if (mjmlComponent.componentName !== 'mj-column' && mjmlComponent.componentName !== 'mj-group') {
          return []
        }

        const className = mjmlComponentInstance.value.getColumnClass()
        const columnClassParts = className.replace('mj-column-', '').split('-')
        const unit = columnClassParts[0] === 'per' ? '%' : 'px'
        const parsedWidth = columnClassParts[1]

        return toMediaQueryStyleTags(parsedWidth, unit, className, mjmlContext.globalData.breakpoint, forceOWADesktop)
      })

      const bodyBackgroundColor = computed(() => {
        if (mjmlComponent.componentName !== 'mj-body') {
          return null
        }

        return mjmlComponentInstance.value.getAttribute('background-color')
      })

      const headSettings = computed(() => {
        const headSettings: { style?: [], bodyAttrs?: { style: string } } = {}

        if (mjmlComponent.componentName === 'mj-body' && bodyBackgroundColor.value) {
          headSettings.bodyAttrs = {
            style: `word-spacing:normal;background-color:${bodyBackgroundColor.value};`,
          }
        }

        if (mjmlComponent.componentName === 'mj-column' || mjmlComponent.componentName === 'mj-group') {
          headSettings.style = mjmlMediaQueryHeadStyles.value
        }

        return headSettings
      })

      useHead(headSettings.value)

      const numberOfColumns = computed(() => {
        return hasColumns ? props.numberOfColumns : 1
      })

      provide('mjmlChildRenderFunction', childRenderFunction)
      provide('numberOfSiblings', numberOfColumns)

      return () => getVueRendered(h, mjmlDom.value, slots.default, mjmlComponent.componentName, {
        'data-v-inspector': props['data-v-inspector'],
      })
    },
  })
}
