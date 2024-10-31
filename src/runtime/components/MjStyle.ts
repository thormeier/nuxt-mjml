import { h, defineComponent } from '@vue/runtime-core'
import { useHead } from '@unhead/vue'

export default defineComponent({
  setup (_, {slots}) {
    const style = slots.default()

    if (style.length > 0 && style[0].children) {
      useHead({
        style: [
          {
            type: 'text/css',
            innerHTML: title[0].children,
          }
        ]
      })
    }

    return () => h('div', [])
  },
})
