import type { ComponentObjectPropsOptions } from '@vue/runtime-core'
import type { MjmlComponentAttributes } from '../types'

export function mjmlComponentAttributesToVuePropsDefinitions(mjmlComponentAttributes: MjmlComponentAttributes, defaultAttributes: MjmlComponentAttributes): ComponentObjectPropsOptions {
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
