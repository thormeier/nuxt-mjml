export type MjmlAttributeType = 'string' | 'color' | 'unit(px)' | 'unit(px,%)' | 'unit(px,%,)' | 'unit(px,%){1,4}' | 'unitWithNegative(px,em)' | 'enum(left,right,center)' | 'enum(left,center,right)' | 'enum(top,bottom,middle)'

export type MjmlComponentAttributes = { [key: string]: MjmlAttributeType }

export type MjmlComponentArgs<T extends MjmlComponentAttributes> = {
  content?: string
  attributes: T
}

export type MjmlComponent = ((args: MjmlComponentArgs) => {
  render: () => string
}) & { allowedAttributes: MjmlComponentAttributes, componentName: string }

export type MjmlUnderstandableVueChild = {
  getAttribute: (name: string) => string
  htmlAttributes: (attrs: { [key: string]: string | object }) => string
  render: () => string
}

export type MjmlChildRenderFunction = (child: MjmlUnderstandableVueChild) => string
