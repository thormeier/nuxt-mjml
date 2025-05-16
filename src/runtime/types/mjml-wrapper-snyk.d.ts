declare module 'mjml-wrapper-snyk' {
  import type { BodyComponent, BodyComponentConstructor } from 'mjml-core-snyk'

  export declare interface MjWrapperConstructor extends BodyComponentConstructor {
    new (initialData: object): MjWrapper
  }

  export declare class MjWrapper extends BodyComponent<unknown> {
    static override componentName = 'mj-wrapper'
  }

  export default MjWrapper
}
