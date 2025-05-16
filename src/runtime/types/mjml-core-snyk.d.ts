declare module 'mjml-core-snyk' {
  import type { DefineComponent } from 'vue'

  export type Direction = 'up' | 'down' | 'left' | 'right' | 'top' | 'bottom'

  export type MjmlAttributeType = 'string' | 'color' | 'integer' | 'unit(px)' | 'unit(px,%)' | 'unit(px,%,)' | 'unit(px,%){1,4}' | 'unitWithNegative(px,em)' | 'enum(left,right,center)' | 'enum(left,center,right)' | 'enum(top,bottom,middle)'
  export type MjmlAttributeName = 'align' | 'alt' | 'background-color' | 'background-height' | 'background-position' | 'background-position-x' | 'background-position-y' | 'background-repeat' | 'background-size' | 'background-url' | 'background-url' | 'background-width' | 'base-url' | 'border' | 'border-bottom' | 'border-color' | 'border-left' | 'border-radius' | 'border-right' | 'border-style' | 'border-top' | 'border-width' | 'cellpadding' | 'cellspacing' | 'color' | 'container-background-color' | 'direction' | 'fluid-on-mobile' | 'font-family' | 'font-size' | 'font-style' | 'font-weight' | 'full-width' | 'hamburger' | 'height' | 'href' | 'ico-align' | 'ico-close' | 'ico-color' | 'ico-font-family' | 'ico-font-size' | 'ico-line-height' | 'ico-open' | 'ico-padding' | 'ico-padding-bottom' | 'ico-padding-left' | 'ico-padding-right' | 'ico-padding-top' | 'ico-text-decoration' | 'ico-text-transform' | 'icon-align' | 'icon-height' | 'icon-padding' | 'icon-position' | 'icon-size' | 'icon-unwrapped-alt' | 'icon-unwrapped-url' | 'icon-width' | 'icon-wrapped-alt' | 'icon-wrapped-url' | 'inner-background-color' | 'inner-border' | 'inner-border-bottom' | 'inner-border-left' | 'inner-border-radius' | 'inner-border-right' | 'inner-border-top' | 'inner-padding' | 'inner-padding-bottom' | 'inner-padding-left' | 'inner-padding-right' | 'inner-padding-top' | 'left-icon' | 'letter-spacing' | 'line-height' | 'max-height' | 'mode' | 'padding' | 'padding-bottom' | 'padding-left' | 'padding-right' | 'padding-top' | 'position' | 'rel' | 'right-icon' | 'role' | 'sizes' | 'src' | 'srcset' | 'table-layout' | 'target' | 'tb-border' | 'tb-border' | 'tb-border-radius' | 'tb-border-radius' | 'tb-hover-border-color' | 'tb-selected-border-color' | 'tb-width' | 'text-align' | 'text-decoration' | 'text-padding' | 'text-transform' | 'thumbnails' | 'thumbnails-src' | 'title' | 'usemap' | 'vertical-align' | 'width'
  export type MjmlAttributes = { [key in MjmlAttributeName]: MjmlAttributeType }

  export declare class Context {
    processing(mjml: object, context: Context): string
    globalData: {
      breakpoint?: number
    }
  }

  export declare interface ComponentConstructor<A extends Partial<MjmlAttributes> = Partial<MjmlAttributes>> {
    new (initialData: object): Component
    allowedAttributes: A
    defaultAttributes: { [key in keyof typeof A]: string }
  }

  export declare class Component {
    static allowedAttributes: MjmlAttributes
    static defaultAttributes: { [key in MjmlAttributeName]: string }
    getTagName(): string
    isRawElement(): boolean
    getChildContext(): Context
    getAttribute(name: keyof Component.allowedAttributes): string
    renderMJML(mjml: string | object, options: object): string
  }

  export declare interface BodyComponentConstructor extends ComponentConstructor {
    new (initialData: object): BodyComponent
    componentName: string
    endingTag: boolean
  }

  export declare class BodyComponent<T extends Partial<MjmlAttributes>> extends Component {
    static endingTag = false
    static componentName = ''
    getStyles(): object
    getAttribute(name: keyof T): string
    getShorthandAttrValue(name: keyof T, direction: Direction): string
    getShorthandBorderValue(direction: Direction): string
    getBoxWidths(): {
      totalWidth: number
      borders: {
        top: number
        left: number
        bottom: number
        right: number
      }
      paddings: {
        top: number
        left: number
        bottom: number
        right: number
      }
      box: number
    }

    htmlAttributes(attributes: object): string
    styles(styles: object): string
    renderChildren(children: BodyComponent[], options: {
      props: object
      renderer: ((component: BodyComponent) => string)
      attributes: object
      rawXML: boolean
    }): string

    render(): string
    calculateAWidth(arg: string): string | null
  }

  export declare interface HeadComponentConstructor extends ComponentConstructor {
    new (initialData: object): HeadComponent
  }

  export declare interface HeadComponent extends Component {
    handlerChildren(): (string | null)[]
  }

  export type MjmlChildRenderFunction = (child: BodyComponent<object>) => string

  export type VueMjmlDefineComponent<A extends Partial<MjmlAttributes> = Partial<MjmlAttributes>> = DefineComponent<{ [key in keyof A]?: string }>

  export default { Component, BodyComponent, HeadComponent, ComponentConstructor, BodyComponentConstructor, HeadComponentConstructor, VueMjmlDefineComponent }
}
