declare module 'mjml-button-snyk' {
  import type { BodyComponent, BodyComponentConstructor, MjmlAttributes } from 'mjml-core-snyk'

  export const MjButtonAllowedAttributes: MjmlAttributes = {
    'align': 'enum(left,center,right)',
    'background-color': 'color',
    'border-bottom': 'string',
    'border-left': 'string',
    'border-radius': 'string',
    'border-right': 'string',
    'border-top': 'string',
    'border': 'string',
    'color': 'color',
    'container-background-color': 'color',
    'font-family': 'string',
    'font-size': 'unit(px)',
    'font-style': 'string',
    'font-weight': 'string',
    'height': 'unit(px,%)',
    'href': 'string',
    'name': 'string',
    'title': 'string',
    'inner-padding': 'unit(px,%){1,4}',
    'letter-spacing': 'unitWithNegative(px,em)',
    'line-height': 'unit(px,%,)',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'padding': 'unit(px,%){1,4}',
    'rel': 'string',
    'target': 'string',
    'text-decoration': 'string',
    'text-transform': 'string',
    'vertical-align': 'enum(top,bottom,middle)',
    'text-align': 'enum(left,right,center)',
    'width': 'unit(px,%)',
  }

  export declare interface MjButtonConstructor extends BodyComponentConstructor {
    new (initialData: object): MjButton
  }

  export declare class MjButton extends BodyComponent<typeof MjButtonAllowedAttributes> {
    static override componentName = 'mj-button'

    static override endingTag = true

    static override allowedAttributes = MjButtonAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof MjButtonAllowedAttributes]: string } = {
      'align': 'center',
      'background-color': '#414141',
      'border': 'none',
      'border-radius': '3px',
      'color': '#ffffff',
      'font-family': 'Ubuntu, Helvetica, Arial, sans-serif',
      'font-size': '13px',
      'font-weight': 'normal',
      'inner-padding': '10px 25px',
      'line-height': '120%',
      'padding': '10px 25px',
      'target': '_blank',
      'text-decoration': 'none',
      'text-transform': 'none',
      'vertical-align': 'middle',
    }
  }

  export default MjButton
}
