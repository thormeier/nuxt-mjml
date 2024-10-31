import { h, defineComponent } from '@vue/runtime-core'
import { useHead } from '@unhead/vue'

export default defineComponent({
  props: {
    href: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
      default: () => '',
    },
  },
  setup (props) {
    useHead({
      style: [
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: props.href,
        }
      ]
    })

    return () => h('div', [])
  },
})
