declare module 'mjml-image-snyk' {
  import type { BodyComponent, MjmlAttributes, BodyComponentConstructor } from 'mjml-core-snyk'

  export const MjImageAllowedAttributes: MjmlAttributes = {
    'alt': 'string',
    'href': 'string',
    'name': 'string',
    'src': 'string',
    'srcset': 'string',
    'sizes': 'string',
    'title': 'string',
    'rel': 'string',
    'align': 'enum(left,center,right)',
    'border': 'string',
    'border-bottom': 'string',
    'border-left': 'string',
    'border-right': 'string',
    'border-top': 'string',
    'border-radius': 'unit(px,%){1,4}',
    'container-background-color': 'color',
    'fluid-on-mobile': 'boolean',
    'padding': 'unit(px,%){1,4}',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'target': 'string',
    'width': 'unit(px)',
    'height': 'unit(px,auto)',
    'max-height': 'unit(px,%)',
    'font-size': 'unit(px)',
    'usemap': 'string',
  }

  export declare interface MjImageConstructor extends BodyComponentConstructor {
    new (initialData: object): MjImage
  }

  export declare class MjImage extends BodyComponent<typeof MjImageAllowedAttributes> {
    static override componentName = 'mj-image'

    static override allowedAttributes = MjImageAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof MjImageAllowedAttributes]: string } = {
      'align': 'center',
      'border': '0',
      'height': 'auto',
      'padding': '10px 25px',
      'target': '_blank',
      'font-size': '13px',
    }
  }

  export default MjImage
}
