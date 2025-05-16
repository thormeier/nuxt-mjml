declare module 'mjml-divider-snyk' {
  import type { BodyComponent, BodyComponentConstructor, MjmlAttributes } from 'mjml-core-snyk'

  export const MjDividerAllowedAttributes: MjmlAttributes = {
    'border-color': 'color',
    'border-style': 'string',
    'border-width': 'unit(px)',
    'container-background-color': 'color',
    'padding': 'unit(px,%){1,4}',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'width': 'unit(px,%)',
    'align': 'enum(left,center,right)',
  }

  export declare interface MjDividerConstructor extends BodyComponentConstructor {
    new (initialData: object): MjDivider
  }

  export declare class MjDivider extends BodyComponent<typeof MjDividerAllowedAttributes> {
    static override componentName = 'mj-divider'

    static override allowedAttributes = MjDividerAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof MjDividerAllowedAttributes]: string } = {
      'border-color': '#000000',
      'border-style': 'solid',
      'border-width': '4px',
      'padding': '10px 25px',
      'width': '100%',
      'align': 'center',
    }
  }

  export default MjDivider
}
