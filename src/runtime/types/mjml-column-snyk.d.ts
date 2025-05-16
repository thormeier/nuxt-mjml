declare module 'mjml-column-snyk' {
  import type { BodyComponent, BodyComponentConstructor, MjmlAttributes } from 'mjml-core-snyk'

  export const MjColumnAllowedAttributes: MjmlAttributes = {
    'background-color': 'color',
    'border': 'string',
    'border-bottom': 'string',
    'border-left': 'string',
    'border-radius': 'unit(px,%){1,4}',
    'border-right': 'string',
    'border-top': 'string',
    'direction': 'enum(ltr,rtl)',
    'inner-background-color': 'color',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'inner-border': 'string',
    'inner-border-bottom': 'string',
    'inner-border-left': 'string',
    'inner-border-radius': 'unit(px,%){1,4}',
    'inner-border-right': 'string',
    'inner-border-top': 'string',
    'padding': 'unit(px,%){1,4}',
    'vertical-align': 'enum(top,bottom,middle)',
    'width': 'unit(px,%)',
  }

  export declare interface MjColumnConstructor extends BodyComponentConstructor {
    new (initialData: object): MjColumn
  }

  export declare class MjColumn extends BodyComponent<typeof MjColumnAllowedAttributes> {
    static override componentName = 'mj-column'

    static override allowedAttributes = MjColumnAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof MjColumnAllowedAttributes]: string } = {
      'direction': 'ltr',
      'vertical-align': 'top',
    }
  }

  export default MjColumn
}
