import type { Ref } from '@vue/runtime-core'
import { h, defineComponent } from '@vue/runtime-core'
import parse from 'html-dom-parser'
import { provide, inject, ref, computed, watch } from 'vue'
import type {
  BodyComponent,
  BodyComponentConstructor,
  Context,
  MjmlAttributes,
  MjmlChildRenderFunction,
} from 'mjml-core-snyk'
import type { MjColumnConstructor } from 'mjml-column-snyk'
import MjColumn from 'mjml-column-snyk'
import type { MjButtonConstructor } from 'mjml-button-snyk'
import MjButton from 'mjml-button-snyk'
import type { MjGroupConstructor } from 'mjml-group-snyk'
import MjGroup from 'mjml-group-snyk'
import type { MjBodyConstructor } from 'mjml-body-snyk'
import MjBody from 'mjml-body-snyk'
import camelToKebab from './camelToKebabCase'
import { mjmlComponentAttributesToVuePropsDefinitions } from './mjmlComponentAttributesToVuePropsDefinitions'
import { getVueRendered } from './getVueRendered'
import { toMediaQueryStyleTags } from './toMediaQueryStyleTags'
import { enhanceMjmlButton } from './enhanceMjmlButton'
import { isComponent } from './isComponent'
import { useHead } from '#imports'

export default function setupMjmlComponent<
  C extends BodyComponentConstructor,
  A extends MjmlAttributes = MjmlAttributes,
>(mjmlComponent: C, hasColumns?: boolean): ReturnType<typeof defineComponent<A>> {
  const params = mjmlComponentAttributesToVuePropsDefinitions<A>(
    (mjmlComponent.allowedAttributes ? mjmlComponent.allowedAttributes : {}) as A,
    (mjmlComponent.defaultAttributes ? mjmlComponent.defaultAttributes : {}) as A,
  )

  const additionalParams = {
    'data-v-inspector': {
      type: String,
      required: false,
      default: () => undefined,
    },
  }

  const vueComponentProps = isComponent<MjColumnConstructor>(mjmlComponent, MjColumn)
    ? {
        ...params,
        ...additionalParams,
        numberOfColumns: {
          type: Number,
          required: false,
          default: () => 1,
          validator: (value: number) => {
            return value > 0
          },
        },
        mobileWidth: {
          type: String,
          required: false,
          default: () => undefined,
        },
      }
    : {
        ...params,
        ...additionalParams,
      }

  return defineComponent<A>({
    name: mjmlComponent.componentName,
    props: vueComponentProps,
    setup(props, { slots }) {
      // Injected because
      // a) we can't exactly use props
      // b) to allow for deeply nested mjml components in vanilla-Vue components
      const parentChildRenderer = inject<Ref<(component: BodyComponent<object>) => string> | null>('mjmlChildRenderFunction', null)
      const numberOfSiblings = inject<number>('numberOfSiblings', 1)
      const mjmlContext = inject<Context>('mjmlContext', {
        globalData: {},
        processing: () => '',
      })
      const forceOWADesktop = inject('forceOWADesktop', false)

      const childInstances = ref<BodyComponent<object>[]>([])
      const childRenderFunction = ref<MjmlChildRenderFunction | null>(null)
      const currentChildIndex = ref<number | undefined>(undefined)

      const mjmlComponentArgs = computed(() => {
        const mjmlProps = {
          // MJML itself sets this up with the same number in core already, so here we are.
          index: currentChildIndex.value,
          first: currentChildIndex.value === 0,
          last: (currentChildIndex.value || 0) - 1 < numberOfSiblings,
          sibling: numberOfSiblings,
          nonRawSiblings: numberOfSiblings,
        }

        const args: {
          context: Context
          children: BodyComponent<object>[]
          attributes: object
          props: typeof mjmlProps
          content: string | undefined
        } = {
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
          content: undefined,
        }

        if (mjmlComponent.endingTag) {
          // This comment node indicates the rendering part that a slotted element should go here.
          args.content = '{{[SLOT CONTENT]}}'
        }

        return args
      })

      const mjmlComponentInstance = ref(new mjmlComponent(mjmlComponentArgs.value))

      watch(mjmlComponentArgs, (newValue) => {
        mjmlComponentInstance.value = new mjmlComponent(newValue)
      })

      watch(mjmlComponentInstance, (newValue) => {
        if (!mjmlComponent.endingTag) {
          newValue.renderChildren = (_: BodyComponent<object>[], options: { renderer: MjmlChildRenderFunction }) => {
            childRenderFunction.value = options.renderer

            return '{{[SLOT CONTENT]}}'
          }
        }
      })

      if (!mjmlComponent.endingTag) {
        mjmlComponentInstance.value.renderChildren = (_: BodyComponent<object>[], options: { renderer: MjmlChildRenderFunction }) => {
          childRenderFunction.value = options && options.renderer ? options.renderer : (component: BodyComponent<object>) => component.render()

          return '{{[SLOT CONTENT]}}'
        }
      }

      const mjmlDom = computed(() => {
        let rendered = parentChildRenderer && parentChildRenderer.value ? parentChildRenderer.value(mjmlComponentInstance.value) : mjmlComponentInstance.value.render()

        if (isComponent<MjButtonConstructor>(mjmlComponent, MjButton) && 'borderRadius' in props && props.borderRadius !== '0') {
          rendered = enhanceMjmlButton(rendered, mjmlComponentInstance, props.borderRadius as string | null, 'href' in props ? (props.href as string) : '')
        }

        return parse(rendered)
      })

      const mjmlMediaQueryHeadStyles = computed(() => {
        if (
          !isComponent<MjGroupConstructor>(mjmlComponent, MjGroup) && !isComponent<MjColumnConstructor>(mjmlComponent, MjColumn)) {
          return []
        }

        const className = mjmlComponentInstance.value.getColumnClass()
        const columnClassParts = className.replace('mj-column-', '').split('-')
        const unit = columnClassParts[0] === 'per' ? '%' : 'px'
        const parsedWidth = columnClassParts[1]

        return toMediaQueryStyleTags(parsedWidth, unit, className, mjmlContext.globalData.breakpoint, forceOWADesktop)
      })

      const bodyBackgroundColor = computed(() => {
        if (isComponent<MjBodyConstructor>(mjmlComponent, MjBody)) {
          return null
        }

        return mjmlComponentInstance.value.getAttribute('background-color')
      })

      const headSettings = computed(() => {
        const headSettings: { style?: object[], bodyAttrs?: { style: string } } = {}

        if (isComponent<MjBodyConstructor>(mjmlComponent, MjBody) && bodyBackgroundColor.value) {
          headSettings.bodyAttrs = {
            style: `word-spacing:normal;background-color:${bodyBackgroundColor.value};`,
          }
        }

        if (isComponent<MjGroupConstructor>(mjmlComponent, MjGroup) || isComponent<MjColumnConstructor>(mjmlComponent, MjColumn)) {
          headSettings.style = mjmlMediaQueryHeadStyles.value
        }

        return headSettings
      })

      useHead(headSettings.value)

      const numberOfColumns = computed(() => {
        return hasColumns && 'numberOfColumns' in props ? props.numberOfColumns as number : 1
      })

      provide('mjmlChildRenderFunction', childRenderFunction)
      provide('numberOfSiblings', numberOfColumns)

      return () => getVueRendered(h, mjmlDom.value, slots.default, mjmlComponent.componentName, {
        'data-v-inspector': ('data-v-inspector' in props ? props['data-v-inspector'] : '') as string,
      })
    },
  })
}
