import { h, defineComponent } from '@vue/runtime-core'

export default defineComponent({
  setup(_, { slots }) {
    return () => h('div', slots.default())
  },
})
