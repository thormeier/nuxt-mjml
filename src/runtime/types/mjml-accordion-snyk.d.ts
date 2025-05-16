declare module 'mjml-accordion-snyk' {
  import type { BodyComponent, BodyComponentConstructor, MjmlAttributes } from 'mjml-core-snyk'

  export const AccordionAllowedAttributes: MjmlAttributes = {
    'container-background-color': 'color',
    'border': 'string',
    'font-family': 'string',
    'icon-align': 'enum(top,middle,bottom)',
    'icon-width': 'unit(px,%)',
    'icon-height': 'unit(px,%)',
    'icon-wrapped-url': 'string',
    'icon-wrapped-alt': 'string',
    'icon-unwrapped-url': 'string',
    'icon-unwrapped-alt': 'string',
    'icon-position': 'enum(left,right)',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'padding': 'unit(px,%){1,4}',
  }

  export declare interface AccordionConstructor extends BodyComponentConstructor {
    new (initialData: object): Accordion
  }

  export declare class Accordion extends BodyComponent<typeof AccordionAllowedAttributes> {
    static override componentName = 'mj-accordion'

    static override endingTag = true

    static override allowedAttributes = AccordionAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof AccordionAllowedAttributes]: string } = {
      'border': '2px solid black',
      'font-family': 'Ubuntu, Helvetica, Arial, sans-serif',
      'icon-align': 'middle',
      'icon-wrapped-url': 'https://i.imgur.com/bIXv1bk.png',
      'icon-wrapped-alt': '+',
      'icon-unwrapped-url': 'https://i.imgur.com/w4uTygT.png',
      'icon-unwrapped-alt': '-',
      'icon-position': 'right',
      'icon-height': '32px',
      'icon-width': '32px',
      'padding': '10px 25px',
    }
  }

  export const AccordionElementAllowedAttributes: MjmlAttributes = {
    'background-color': 'color',
    'border': 'string',
    'font-family': 'string',
    'icon-align': 'enum(top,middle,bottom)',
    'icon-width': 'unit(px,%)',
    'icon-height': 'unit(px,%)',
    'icon-wrapped-url': 'string',
    'icon-wrapped-alt': 'string',
    'icon-unwrapped-url': 'string',
    'icon-unwrapped-alt': 'string',
    'icon-position': 'enum(left,right)',
  }

  export declare interface AccordionElementConstructor extends BodyComponentConstructor {
    new (initialData: object): AccordionElement
  }

  export declare class AccordionElement extends BodyComponent<typeof AccordionElementAllowedAttributes> {
    static override componentName = 'mj-accordion-element'

    static override endingTag = true
    static override allowedAttributes = AccordionElementAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof AccordionElementAllowedAttributes]: string } = {
      title: {
        img: {
          width: '32px',
          height: '32px',
        },
      },
    }
  }

  export const AccordionTextAllowedAttributes: MjmlAttributes = {
    'background-color': 'color',
    'font-size': 'unit(px)',
    'font-family': 'string',
    'font-weight': 'string',
    'letter-spacing': 'unitWithNegative(px,em)',
    'line-height': 'unit(px,%,)',
    'color': 'color',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'padding': 'unit(px,%){1,4}',
  }

  export declare interface AccordionTextConstructor extends BodyComponentConstructor {
    new (initialData: object): AccordionText
  }

  export declare class AccordionText extends BodyComponent<typeof AccordionTextAllowedAttributes> {
    static override componentName = 'mj-accordion-text'

    static override endingTag = true

    static override allowedAttributes = AccordionTextAllowedAttributes

    static defaultAttributes: { [key in keyof typeof AccordionTextAllowedAttributes]: string } = {
      'font-size': '13px',
      'line-height': '1',
      'padding': '16px',
    }
  }

  export const AccordionTitleAllowedAttributes: MjmlAttributes = {
    'background-color': 'color',
    'color': 'color',
    'font-size': 'unit(px)',
    'font-family': 'string',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    'padding': 'unit(px,%){1,4}',
  }

  export declare interface AccordionTitleConstructor extends BodyComponentConstructor {
    new (initialData: object): AccordionTitle
  }

  export declare class AccordionTitle extends BodyComponent<typeof AccordionTitleAllowedAttributes> {
    static override componentName = 'mj-accordion-title'

    static override endingTag = true

    static override allowedAttributes = AccordionTitleAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof AccordionTitleAllowedAttributes]: string } = {
      'font-size': '13px',
      'padding': '16px',
    }
  }
}
