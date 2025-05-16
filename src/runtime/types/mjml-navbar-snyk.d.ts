declare module 'mjml-navbar-snyk' {
  import type { BodyComponent, MjmlAttributes, BodyComponentConstructor } from 'mjml-core-snyk'

  export const NavbarAllowedAttributes: MjmlAttributes = {
    'align': 'enum(left,center,right)',
    'base-url': 'string',
    'hamburger': 'string',
    'ico-align': 'enum(left,center,right)',
    'ico-open': 'string',
    'ico-close': 'string',
    'ico-color': 'color',
    'ico-font-size': 'unit(px,%)',
    'ico-font-family': 'string',
    'ico-text-transform': 'string',
    'ico-padding': 'unit(px,%){1,4}',
    'ico-padding-left': 'unit(px,%)',
    'ico-padding-top': 'unit(px,%)',
    'ico-padding-right': 'unit(px,%)',
    'ico-padding-bottom': 'unit(px,%)',
    'padding': 'unit(px,%){1,4}',
    'padding-left': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-bottom': 'unit(px,%)',
    'ico-text-decoration': 'string',
    'ico-line-height': 'unit(px,%,)',
  }

  export declare interface NavbarConstructor extends BodyComponentConstructor {
    new (initialData: object): Navbar
  }

  export declare class Navbar extends BodyComponent<typeof NavbarAllowedAttributes> {
    static override componentName = 'mj-navbar'

    static override allowedAttributes = NavbarAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof NavbarAllowedAttributes]: string | null } = {
      'align': 'center',
      'base-url': null,
      'hamburger': null,
      'ico-align': 'center',
      'ico-open': '&#9776;',
      'ico-close': '&#8855;',
      'ico-color': '#000000',
      'ico-font-size': '30px',
      'ico-font-family': 'Ubuntu, Helvetica, Arial, sans-serif',
      'ico-text-transform': 'uppercase',
      'ico-padding': '10px',
      'ico-text-decoration': 'none',
      'ico-line-height': '30px',
    }
  }

  export const NavbarLinkAllowedAttributes: MjmlAttributes = {
    'color': 'color',
    'font-family': 'string',
    'font-size': 'unit(px)',
    'font-style': 'string',
    'font-weight': 'string',
    'href': 'string',
    'name': 'string',
    'target': 'string',
    'rel': 'string',
    'letter-spacing': 'unitWithNegative(px,em)',
    'line-height': 'unit(px,%,)',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'padding': 'unit(px,%){1,4}',
    'text-decoration': 'string',
    'text-transform': 'string',
  }

  export declare interface NavbarLinkConstructor extends BodyComponentConstructor {
    new (initialData: object): NavbarLink
  }

  export declare class NavbarLink extends BodyComponent<typeof NavbarLinkAllowedAttributes> {
    static override componentName = 'mj-navbar-link'

    static override endingTag = true

    static override allowedAttributes = NavbarLinkAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof NavbarLinkAllowedAttributes]: string } = {
      'color': '#000000',
      'font-family': 'Ubuntu, Helvetica, Arial, sans-serif',
      'font-size': '13px',
      'font-weight': 'normal',
      'line-height': '22px',
      'padding': '15px 10px',
      'target': '_blank',
      'text-decoration': 'none',
      'text-transform': 'uppercase',
    }
  }
}
