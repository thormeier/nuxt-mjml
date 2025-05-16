declare module 'mjml-section-snyk' {
  import type { BodyComponent, MjmlAttributes, BodyComponentConstructor } from 'mjml-core-snyk'

  export const MjSectionAllowedAttributes: MjmlAttributes = {
    'background-color': 'color',
    'background-url': 'string',
    'background-repeat': 'enum(repeat,no-repeat)',
    'background-size': 'string',
    'background-position': 'string',
    'background-position-x': 'string',
    'background-position-y': 'string',
    'border': 'string',
    'border-bottom': 'string',
    'border-left': 'string',
    'border-radius': 'string',
    'border-right': 'string',
    'border-top': 'string',
    'direction': 'enum(ltr,rtl)',
    'full-width': 'enum(full-width,false,)',
    'padding': 'unit(px,%){1,4}',
    'padding-top': 'unit(px,%)',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'text-align': 'enum(left,center,right)',
    'text-padding': 'unit(px,%){1,4}',
  }

  export declare interface MjSectionConstructor extends BodyComponentConstructor {
    new (initialData: object): MjSection
  }

  export declare class MjSection extends BodyComponent<typeof MjSectionAllowedAttributes> {
    static override componentName = 'mj-section'

    static override allowedAttributes = MjSectionAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof MjSectionAllowedAttributes]: string } = {
      'background-repeat': 'repeat',
      'background-size': 'auto',
      'background-position': 'top center',
      'direction': 'ltr',
      'padding': '20px 0',
      'text-align': 'center',
      'text-padding': '4px 4px 4px 0',
    }
  }

  export default MjSection
}
