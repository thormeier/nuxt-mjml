import type { DOMNode } from 'html-dom-parser'
import { createCommentVNode } from '@vue/runtime-core'
import type { Slot } from '@vue/runtime-core'

export function getVueRendered(h: h, mjmlDom: DOMNode[], defaultSlot: Slot, componentName: string, rootAttribs?: { [key: string]: string }): ReturnType<h>[] {
  function mjmlDomTreeToVueRender(mjmlDom: DOMNode[], isRoot: boolean): ReturnType<h>[] {
    return mjmlDom.filter(el => el.type !== 'text').map((el) => {
      if (el.type === 'tag') {
        if (isRoot) {
          el.attribs['data-mjml-tag'] = componentName
        }

        return h(
          el.name,
          isRoot && rootAttribs
            ? el.attribs
            : {
                ...el.attribs,
                ...rootAttribs,
              }
          ,
          mjmlDomTreeToVueRender(el.children, false),
        )
      }

      if (el.type === 'comment') {
        if (el.data === '[SLOT CONTENT]' && defaultSlot) {
          return defaultSlot()
        }

        return createCommentVNode(el.data || '')
      }

      throw new Error('Unknown element type: ' + el.type)
    })
  }

  return mjmlDomTreeToVueRender(mjmlDom, true)
}
