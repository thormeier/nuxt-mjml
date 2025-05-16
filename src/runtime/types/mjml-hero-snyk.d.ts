declare module 'mjml-hero-snyk' {
  import type { BodyComponent, MjmlAttributes, BodyComponentConstructor } from 'mjml-core-snyk'

  export const MjHeroAllowedAttributes: MjmlAttributes = {
    'mode': 'string',
    'height': 'unit(px,%)',
    'background-url': 'string',
    'background-width': 'unit(px,%)',
    'background-height': 'unit(px,%)',
    'background-position': 'string',
    'border-radius': 'string',
    'container-background-color': 'color',
    'inner-background-color': 'color',
    'inner-padding': 'unit(px,%){1,4}',
    'inner-padding-top': 'unit(px,%)',
    'inner-padding-left': 'unit(px,%)',
    'inner-padding-right': 'unit(px,%)',
    'inner-padding-bottom': 'unit(px,%)',
    'padding': 'unit(px,%){1,4}',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'background-color': 'color',
    'vertical-align': 'enum(top,bottom,middle)',
  }

  export declare interface MjHeroConstructor extends BodyComponentConstructor {
    new (initialData: object): MjHero
  }

  export declare class MjHero extends BodyComponent<typeof MjHeroAllowedAttributes> {
    static componentName = 'mj-hero'

    static allowedAttributes = MjHeroAllowedAttributes

    static defaultAttributes: { [key in keyof typeof MjHeroAllowedAttributes]: string } = {
      'mode': 'fixed-height',
      'height': '0px',
      'background-url': null,
      'background-position': 'center center',
      'padding': '0px',
      'padding-bottom': null,
      'padding-left': null,
      'padding-right': null,
      'padding-top': null,
      'background-color': '#ffffff',
      'vertical-align': 'top',
    }
  }

  export default MjHero
}
