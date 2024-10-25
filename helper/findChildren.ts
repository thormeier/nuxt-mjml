export default function (parent, matcher) {
  const found = []
  const root = parent.$.subTree
  walk(root, (child) => {
    if (!matcher || matcher.test(child.$options.name)) {
      found.push(child)
    }
  })
  return found
}

function walk(vnode, cb) {
  if (!vnode) return

  if (vnode.component) {
    const proxy = vnode.component.proxy
    if (proxy) cb(vnode.component.proxy)
    walk(vnode.component.subTree, cb)
  }
  else if (vnode.shapeFlag & 16) {
    const vnodes = vnode.children
    for (let i = 0; i < vnodes.length; i++) {
      walk(vnodes[i], cb)
    }
  }
}
