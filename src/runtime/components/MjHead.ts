import { h, defineComponent } from '@vue/runtime-core'

export default defineComponent({
  setup(_, { slots }) {
    const slotContent = slots.default ? slots.default() : ''
    return () => h('div', slotContent)
  },
})
