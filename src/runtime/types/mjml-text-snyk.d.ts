declare module 'mjml-text-snyk' {
  import type { BodyComponent, MjmlAttributes, BodyComponentConstructor } from 'mjml-core-snyk'

  export const MjTextAllowedAttributes: MjmlAttributes = {
    'align': 'enum(left,right,center,justify)',
    'background-color': 'color',
    'color': 'color',
    'container-background-color': 'color',
    'font-family': 'string',
    'font-size': 'unit(px)',
    'font-style': 'string',
    'font-weight': 'string',
    'height': 'unit(px,%)',
    'letter-spacing': 'unitWithNegative(px,em)',
    'line-height': 'unit(px,%,)',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'padding': 'unit(px,%){1,4}',
    'text-decoration': 'string',
    'text-transform': 'string',
    'vertical-align': 'enum(top,bottom,middle)',
  }

  export declare interface MjTextConstructor extends BodyComponentConstructor {
    new (initialData: object): MjText
  }

  export declare class MjText extends BodyComponent<typeof MjTextAllowedAttributes> {
    static override componentName = 'mj-text'

    static override endingTag = true

    static override allowedAttributes = MjTextAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof MjTextAllowedAttributes]: string } = {
      'align': 'left',
      'color': '#000000',
      'font-family': 'Ubuntu, Helvetica, Arial, sans-serif',
      'font-size': '13px',
      'line-height': '1',
      'padding': '10px 25px',
    }
  }

  export default MjText
}
