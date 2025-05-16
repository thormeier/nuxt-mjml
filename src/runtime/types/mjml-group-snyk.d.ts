declare module 'mjml-group-snyk' {
  import type { BodyComponent, BodyComponentConstructor, MjmlAttributes } from 'mjml-core-snyk'

  export const MjGroupAllowedAttributes: MjmlAttributes = {
    'background-color': 'color',
    'direction': 'enum(ltr,rtl)',
    'vertical-align': 'enum(top,bottom,middle)',
    'width': 'unit(px,%)',
  }

  export declare interface MjGroupConstructor extends BodyComponentConstructor {
    new (initialData: object): MjGroup
  }

  export declare class MjGroup extends BodyComponent<typeof MjGroupAllowedAttributes> {
    static override componentName = 'mj-group'

    static override allowedAttributes = MjGroupAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof MjGroupAllowedAttributes]: string } = {
      direction: 'ltr',
    }
  }

  export default MjGroup
}
