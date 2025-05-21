import type { DOMNode } from 'html-dom-parser'
import { createCommentVNode, createTextVNode, createStaticVNode } from '@vue/runtime-core'
import type { Slot } from '@vue/runtime-core'
import type { h } from 'vue'

export function getVueRendered(vueRender: typeof h, mjmlDom: DOMNode[], defaultSlot: Slot | undefined, componentName: string, rootAttribs?: { [key: string]: string }): ReturnType<typeof h>[] | (ReturnType<typeof h>[])[] {
  function mjmlDomTreeToVueRender(el: DOMNode, isRoot: boolean): ReturnType<typeof h>[] {
    if (el.type === 'tag') {
      if (isRoot) {
        el.attribs['data-mjml-tag'] = componentName
      }

      return [vueRender(
        el.name,
        isRoot && rootAttribs
          ? el.attribs
          : {
              ...el.attribs,
              ...rootAttribs,
            },
        (el.children as DOMNode[]).map(c => mjmlDomTreeToVueRender(c, false)),
      )] as ReturnType<typeof h>[]
    }

    if (el.type === 'comment') {
      if (defaultSlot) {
        // Singular comment bewteen a starting and an ending tag.
        if (el.data === '[SLOT CONTENT]' && defaultSlot) {
          return defaultSlot()
        }
      }

      return [createCommentVNode(el.data || '')] as ReturnType<typeof h>[]
    }

    if (el.type === 'text') {
      return [createTextVNode(el.data || '')] as ReturnType<typeof h>[]
    }

    if (el.type === 'directive') {
      return [createStaticVNode(el.data ? `<${el.data}>` : '', 1)] as ReturnType<typeof h>[]
    }

    throw new Error('Unknown element type: ' + el.type)
  }

  return mjmlDom.map(el => mjmlDomTreeToVueRender(el, true))
}
