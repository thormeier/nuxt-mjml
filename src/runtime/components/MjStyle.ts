import type { VNode } from '@vue/runtime-core'
import { h, defineComponent } from '@vue/runtime-core'
import { useHead } from '@unhead/vue'

export default defineComponent({
  setup(_, { slots }) {
    let style: VNode[] = []
    if (slots && slots.default) {
      style = slots.default()
    }

    if (style.length > 0 && style[0].children) {
      useHead({
        style: [
          {
            innerHTML: style[0].children,
          },
        ],
      })
    }

    return () => h('div', [])
  },
})
