declare module 'mjml-body-snyk' {
  import type { BodyComponent, BodyComponentConstructor, MjmlAttributes } from 'mjml-core-snyk'

  export const MjBodyAllowedAttributes: MjmlAttributes = {
    'width': 'unit(px)',
    'background-color': 'color',
  }

  export declare interface MjBodyConstructor extends BodyComponentConstructor {
    new (initialData: object): MjBody
  }

  export declare class MjBody extends BodyComponent<typeof MjBodyAllowedAttributes> {
    static override componentName = 'mj-body'

    static override allowedAttributes = MjBodyAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof MjBodyAllowedAttributes]: string } = {
      width: '600px',
    }
  }

  export default MjBody
}
