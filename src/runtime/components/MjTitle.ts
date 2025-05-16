import type { VNode } from '@vue/runtime-core'
import { h, defineComponent } from '@vue/runtime-core'
import { useHead } from '@unhead/vue'

export default defineComponent({
  setup(_, { slots }) {
    let title: VNode[] = []
    if (slots && slots.default) {
      title = slots.default()
    }

    if (title.length > 0 && title[0].children) {
      useHead({
        title: title[0].children.toString(),
      })
    }

    return () => h('div', [])
  },
})
