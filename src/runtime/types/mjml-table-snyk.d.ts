declare module 'mjml-table-snyk' {
  import type { BodyComponent, MjmlAttributes, BodyComponentConstructor } from 'mjml-core-snyk'

  export const MjTableAllowedAttributes: MjmlAttributes = {
    'align': 'enum(left,right,center)',
    'border': 'string',
    'cellpadding': 'integer',
    'cellspacing': 'integer',
    'container-background-color': 'color',
    'color': 'color',
    'font-family': 'string',
    'font-size': 'unit(px)',
    'font-weight': 'string',
    'line-height': 'unit(px,%,)',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'padding': 'unit(px,%){1,4}',
    'role': 'enum(none,presentation)',
    'table-layout': 'enum(auto,fixed,initial,inherit)',
    'vertical-align': 'enum(top,bottom,middle)',
    'width': 'unit(px,%)',
  }

  export declare interface MjTableConstructor extends BodyComponentConstructor {
    new (initialData: object): MjTable
  }

  export declare class MjTable extends BodyComponent<typeof MjTableAllowedAttributes> {
    static override componentName = 'mj-table'

    static override endingTag = true

    static override allowedAttributes = MjTableAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof MjTableAllowedAttributes]: string } = {
      'align': 'left',
      'border': 'none',
      'cellpadding': '0',
      'cellspacing': '0',
      'color': '#000000',
      'font-family': 'Ubuntu, Helvetica, Arial, sans-serif',
      'font-size': '13px',
      'line-height': '22px',
      'padding': '10px 25px',
      'table-layout': 'auto',
      'width': '100%',
    }
  }

  export default MjTable
}
