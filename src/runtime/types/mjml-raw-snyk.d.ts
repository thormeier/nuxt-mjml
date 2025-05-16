declare module 'mjml-raw-snyk' {
  import type { BodyComponent, MjmlAttributes, BodyComponentConstructor } from 'mjml-core-snyk'

  export const MjRawAllowedAttributes: MjmlAttributes = {
    position: 'enum(file-start)',
  }

  export declare interface MjRawConstructor extends BodyComponentConstructor {
    new (initialData: object): MjRaw
  }

  export declare class MjRaw extends BodyComponent<typeof MjRawAllowedAttributes> {
    static override componentName = 'mj-raw'

    static override endingTag = true

    static override rawElement = true

    static override allowedAttributes = MjRawAllowedAttributes
  }

  export default MjRaw
}
