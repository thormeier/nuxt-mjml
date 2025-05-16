import type { ComponentObjectPropsOptions } from '@vue/runtime-core'
import type { MjmlAttributes } from 'mjml-core-snyk'

export function mjmlComponentAttributesToVuePropsDefinitions<T extends Partial<MjmlAttributes>>(
  mjmlComponentAttributes: T,
  defaultAttributes: T,
): ComponentObjectPropsOptions<{ [K in keyof T]: string }> {
  const props = {} as {
    [K in keyof T]: {
      type: StringConstructor
      required: false
      default: string
      validator: (value: string | undefined) => boolean
    }
  }

  function validator(value: string | undefined, attrType: string) {
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
      const matches = attrType.match(unitRegexp)
      if (!matches) {
        throw new Error('Received unit without values.')
      }

      const units = matches[1]?.split(',')

      return value.split(' ').map((v) => {
        return v === '0' || units.some(unit => v.endsWith(unit))
      }).reduce((a, b) => a && b, true)
    }

    if (attrType.startsWith('enum')) {
      const choiceRegexp = /^enum\(([^)]+)\)/
      const matches = attrType.match(choiceRegexp)
      if (!matches) {
        throw new Error('Enum without values')
      }

      const choices = matches[1].split(',')

      return choices.includes(value)
    }

    return false
  }

  for (const key in mjmlComponentAttributes) {
    const attrType = mjmlComponentAttributes[key] as string
    props[key] = {
      type: String,
      required: false,
      default: key === 'text-align' ? 'left' : defaultAttributes[key] as string,
      validator: (value: string | undefined) => {
        return validator(value, attrType)
      },
    }
  }

  return props
}
