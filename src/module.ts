import { defineNuxtModule, createResolver, addComponent, addServerPlugin } from '@nuxt/kit'

export interface ModuleOptions {
  serverOnlyRouteMatcher: RegExp
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-mjml',
    configKey: 'mjml',
  },
  defaults: {},
  setup(_options, _nuxt) {
    _nuxt.options.runtimeConfig.public['mjml'] = _options

    const resolver = createResolver(import.meta.url)

    addServerPlugin(resolver.resolve('runtime/plugin/server/mjmlIeComments'))

    addComponent({
      name: 'mjml',
      filePath: resolver.resolve('runtime/components/Mjml'),
    })
    addComponent({
      name: 'mj-accordion',
      filePath: resolver.resolve('runtime/components/MjAccordion'),
    })
    addComponent({
      name: 'mj-accordion-element',
      filePath: resolver.resolve('runtime/components/MjAccordionElement'),
    })
    addComponent({
      name: 'mj-accordion-text',
      filePath: resolver.resolve('runtime/components/MjAccordionText'),
    })
    addComponent({
      name: 'mj-accordion-title',
      filePath: resolver.resolve('runtime/components/MjAccordionTitle'),
    })
    addComponent({
      name: 'mj-body',
      filePath: resolver.resolve('runtime/components/MjBody'),
    })
    addComponent({
      name: 'mj-button',
      filePath: resolver.resolve('runtime/components/MjButton'),
    })
    addComponent({
      name: 'mj-carousel',
      filePath: resolver.resolve('runtime/components/MjCarousel'),
    })
    addComponent({
      name: 'mj-carousel-image',
      filePath: resolver.resolve('runtime/components/MjCarouselImage'),
    })
    addComponent({
      name: 'mj-column',
      filePath: resolver.resolve('runtime/components/MjColumn'),
    })
    addComponent({
      name: 'mj-divider',
      filePath: resolver.resolve('runtime/components/MjDivider'),
    })
    addComponent({
      name: 'mj-group',
      filePath: resolver.resolve('runtime/components/MjGroup'),
    })
    addComponent({
      name: 'mj-head-breakpoint',
      filePath: resolver.resolve('runtime/components/MjHeadBreakpoint'),
    })
    addComponent({
      name: 'mj-font',
      filePath: resolver.resolve('runtime/components/MjFont'),
    })
    addComponent({
      name: 'mj-head',
      filePath: resolver.resolve('runtime/components/MjHead'),
    })
    addComponent({
      name: 'mj-style',
      filePath: resolver.resolve('runtime/components/MjStyle'),
    })
    addComponent({
      name: 'mj-title',
      filePath: resolver.resolve('runtime/components/MjTitle'),
    })
    addComponent({
      name: 'mj-hero',
      filePath: resolver.resolve('runtime/components/MjHero'),
    })
    addComponent({
      name: 'mj-image',
      filePath: resolver.resolve('runtime/components/MjImage'),
    })
    addComponent({
      name: 'mj-navbar',
      filePath: resolver.resolve('runtime/components/MjNavbar'),
    })
    addComponent({
      name: 'mj-raw',
      filePath: resolver.resolve('runtime/components/MjRaw'),
    })
    addComponent({
      name: 'mj-section',
      filePath: resolver.resolve('runtime/components/MjSection'),
    })
    addComponent({
      name: 'mj-social',
      filePath: resolver.resolve('runtime/components/MjSocial'),
    })
    addComponent({
      name: 'mj-social-element',
      filePath: resolver.resolve('runtime/components/MjSocialElement'),
    })
    addComponent({
      name: 'mj-spacer',
      filePath: resolver.resolve('runtime/components/MjSpacer'),
    })
    addComponent({
      name: 'mj-table',
      filePath: resolver.resolve('runtime/components/MjTable'),
    })
    addComponent({
      name: 'mj-text',
      filePath: resolver.resolve('runtime/components/MjText'),
    })
    addComponent({
      name: 'mj-wrapper',
      filePath: resolver.resolve('runtime/components/MjWrapper'),
    })
  },
})
