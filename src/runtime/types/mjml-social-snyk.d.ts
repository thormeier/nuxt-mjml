declare module 'mjml-social-snyk' {
  import type { BodyComponent, MjmlAttributes, BodyComponentConstructor } from 'mjml-core-snyk'

  export const SocialAllowedAttributes: MjmlAttributes = {
    'align': 'enum(left,right,center)',
    'border-radius': 'unit(px,%)',
    'container-background-color': 'color',
    'color': 'color',
    'font-family': 'string',
    'font-size': 'unit(px)',
    'font-style': 'string',
    'font-weight': 'string',
    'icon-size': 'unit(px,%)',
    'icon-height': 'unit(px,%)',
    'icon-padding': 'unit(px,%){1,4}',
    'inner-padding': 'unit(px,%){1,4}',
    'line-height': 'unit(px,%,)',
    'mode': 'enum(horizontal,vertical)',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'padding': 'unit(px,%){1,4}',
    'table-layout': 'enum(auto,fixed)',
    'text-padding': 'unit(px,%){1,4}',
    'text-decoration': 'string',
    'vertical-align': 'enum(top,bottom,middle)',
  }

  export declare interface SocialConstructor extends BodyComponentConstructor {
    new (initialData: object): Social
  }

  export declare class Social extends BodyComponent<typeof SocialAllowedAttributes> {
    static override componentName = 'mj-social'

    static override allowedAttributes = SocialAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof SocialAllowedAttributes]: string } = {
      'align': 'center',
      'border-radius': '3px',
      'color': '#333333',
      'font-family': 'Ubuntu, Helvetica, Arial, sans-serif',
      'font-size': '13px',
      'icon-size': '20px',
      'inner-padding': null,
      'line-height': '22px',
      'mode': 'horizontal',
      'padding': '10px 25px',
      'text-decoration': 'none',
    }
  }

  export const SocialElementAllowedAttributes: MjmlAttributes = {
    'align': 'enum(left,center,right)',
    'background-color': 'color',
    'color': 'color',
    'border-radius': 'unit(px)',
    'font-family': 'string',
    'font-size': 'unit(px)',
    'font-style': 'string',
    'font-weight': 'string',
    'href': 'string',
    'icon-size': 'unit(px,%)',
    'icon-height': 'unit(px,%)',
    'icon-padding': 'unit(px,%){1,4}',
    'line-height': 'unit(px,%,)',
    'name': 'string',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'padding': 'unit(px,%){1,4}',
    'text-padding': 'unit(px,%){1,4}',
    'rel': 'string',
    'src': 'string',
    'srcset': 'string',
    'sizes': 'string',
    'alt': 'string',
    'title': 'string',
    'target': 'string',
    'text-decoration': 'string',
    'vertical-align': 'enum(top,middle,bottom)',
  }

  export declare interface SocialElementConstructor extends BodyComponentConstructor {
    new (initialData: object): SocialElement
  }

  export declare class SocialElement extends BodyComponent<typeof SocialElementAllowedAttributes> {
    static override componentName = 'mj-social-element'

    static override endingTag = true

    static override allowedAttributes = SocialElementAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof SocialElementAllowedAttributes]: string } = {
      'align': 'left',
      'color': '#000',
      'border-radius': '3px',
      'font-family': 'Ubuntu, Helvetica, Arial, sans-serif',
      'font-size': '13px',
      'line-height': '1',
      'padding': '4px',
      'text-padding': '4px 4px 4px 0',
      'target': '_blank',
      'text-decoration': 'none',
      'vertical-align': 'middle',
    }
  }
}
