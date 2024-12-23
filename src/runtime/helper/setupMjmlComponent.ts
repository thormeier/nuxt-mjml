import { h, defineComponent } from '@vue/runtime-core'
import parse from 'html-dom-parser'
import { provide, inject, ref, computed, watch } from 'vue'
import { useHead } from '@unhead/vue'
import type { MjmlUnderstandableVueChild, MjmlComponent, MjmlChildRenderFunction } from '../types'
import camelToKebab from './camelToKebabCase'
import { mjmlComponentAttributesToVuePropsDefinitions } from './mjmlComponentAttributesToVuePropsDefinitions'
import { getVueRendered } from './getVueRendered'
import { toMediaQueryStyleTags } from './toMediaQueryStyleTags'
import { enhanceMjmlButton } from './enhanceMjmlButton'

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
