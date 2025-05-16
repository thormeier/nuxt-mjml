import type { DOMNode, Comment, ProcessingInstruction, Text } from 'html-dom-parser'
import { createCommentVNode, createTextVNode, createStaticVNode } from '@vue/runtime-core'
import type { Slot } from '@vue/runtime-core'
import type { h } from 'vue'

type DataNode = Comment | ProcessingInstruction | Text

function isDataNode(node: DOMNode): node is DataNode {
  return 'data' in node
}

export function getVueRendered(vueRender: typeof h, mjmlDom: DOMNode[], defaultSlot: Slot | undefined, componentName: string, rootAttribs?: { [key: string]: string }): ReturnType<typeof h>[] | (ReturnType<typeof h>[])[] {
  function mjmlDomTreeToVueRender(el: DOMNode, isRoot: boolean): ReturnType<typeof h>[] {
    // This part looks for slot content mentions in all sorts of nodes and replaces it with 0|3 distinct nodes:
    // prefix of the content (as static vnode), slot content, postfix of the content (as static vnode).
    // We do that because we could very wewll encounter the slot content within a comment node, which we also want to replace.
    if (isDataNode(el) && el.data.includes('{{[SLOT CONTENT]}}') && defaultSlot) {
      const parts = el.data.split('{{[SLOT CONTENT]}}').filter(p => !!p).map((p, i) => {
        // This part ensures that what has been a comment so far will stay one in the finally rendered HTML.
        const content = el.type === 'comment' ? (i === 0 ? '<!--' + p : p + '-->') : p

        return createStaticVNode(content, 1)
      })

      if (parts.length === 0) {
        return defaultSlot()
      }

      return [parts[0], ...defaultSlot(), parts[1]]
    }

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
