declare module 'mjml-carousel-snyk' {
  import type { BodyComponent, BodyComponentConstructor, MjmlAttributes } from 'mjml-core-snyk'

  export const CarouselAllowedAttributes: MjmlAttributes = {
    'align': 'enum(left,center,right)',
    'border-radius': 'unit(px,%)',
    'container-background-color': 'color',
    'icon-width': 'unit(px,%)',
    'left-icon': 'string',
    'padding': 'unit(px,%){1,4}',
    'padding-top': 'unit(px,%)',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'right-icon': 'string',
    'thumbnails': 'enum(visible,hidden)',
    'tb-border': 'string',
    'tb-border-radius': 'unit(px,%)',
    'tb-hover-border-color': 'color',
    'tb-selected-border-color': 'color',
    'tb-width': 'unit(px,%)',
  }

  export declare interface CarouselConstructor extends BodyComponentConstructor {
    new (initialData: object): Carousel
  }

  export declare class Carousel extends BodyComponent<typeof CarouselAllowedAttributes> {
    static override componentName = 'mj-carousel'

    static override endingTag = false

    static override allowedAttributes = CarouselAllowedAttributes

    static override defaultAttributes: { [key in CarouselAllowedAttributes]: string } = {
      'align': 'center',
      'border-radius': '6px',
      'icon-width': '44px',
      'left-icon': 'https://i.imgur.com/xTh3hln.png',
      'right-icon': 'https://i.imgur.com/os7o9kz.png',
      'thumbnails': 'visible',
      'tb-border': '2px solid transparent',
      'tb-border-radius': '6px',
      'tb-hover-border-color': '#fead0d',
      'tb-selected-border-color': '#ccc',
    }
  }

  export const CarouselImageAllowedAttributes: MjmlAttributes = {
    'alt': 'string',
    'href': 'string',
    'rel': 'string',
    'target': 'string',
    'title': 'string',
    'src': 'string',
    'thumbnails-src': 'string',
    'border-radius': 'unit(px,%){1,4}',
    'tb-border': 'string',
    'tb-border-radius': 'unit(px,%){1,4}',
  }

  export declare interface CarouselImageConstructor extends BodyComponentConstructor {
    new (initialData: object): CarouselImage
  }

  export declare class CarouselImage extends BodyComponent<typeof CarouselImageAllowedAttributes> {
    static override componentName = 'mj-carousel-image'

    static override endingTag = true

    static override allowedAttributes = CarouselImageAllowedAttributes

    static override defaultAttributes: { [key in keyof typeof CarouselImageAllowedAttributes]: string } = {
      target: '_blank',
    }
  }
}
