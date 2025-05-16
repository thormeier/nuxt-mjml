declare module 'mjml-spacer-snyk' {
  import type { BodyComponent, MjmlAttributes, BodyComponentConstructor } from 'mjml-core-snyk'

  export const MjSpacerAllowedAttributes: MjmlAttributes = {
    'border': 'string',
    'border-bottom': 'string',
    'border-left': 'string',
    'border-right': 'string',
    'border-top': 'string',
    'container-background-color': 'color',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'padding': 'unit(px,%){1,4}',
    'height': 'unit(px,%)',
  }

  export declare interface MjSpacerConstructor extends BodyComponentConstructor {
    new (initialData: object): MjSpacer
  }

  export declare class MjSpacer extends BodyComponent<typeof MjSpacerAllowedAttributes> {
    static override componentName = 'mj-spacer'

    static override allowedAttributes = MjSpacerAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof MjSpacerAllowedAttributes]: string } = {
      height: '20px',
    }
  }

  export default MjSpacer
}
