import { defineNuxtModule, createResolver, addComponent, addServerPlugin, addTypeTemplate } from '@nuxt/kit'

export interface ModuleOptions {
  serverOnlyRouteMatcher: string
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

    addServerPlugin(resolver.resolve('runtime/plugin/server/emailHtmlCleanup'))

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

    addTypeTemplate({
      filename: 'mjml-accordion-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-accordion-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-body-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-body-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-button-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-button-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-carousel-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-carousel-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-column-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-column-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-core-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-core-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-divider-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-divider-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-group-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-group-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-hero-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-hero-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-image-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-image-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-navbar-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-navbar-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-raw-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-raw-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-section-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-section-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-social-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-social-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-spacer-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-spacer-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-table-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-table-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-text-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-text-snyk.d.ts'),
    })
    addTypeTemplate({
      filename: 'mjml-wrapper-snyk.d.ts',
      src: resolver.resolve('runtime/types/mjml-wrapper-snyk.d.ts'),
    })

    if (!_nuxt.options.vite) {
      _nuxt.options.vite = {}
    }

    if (!_nuxt.options.vite.optimizeDeps) {
      _nuxt.options.vite.optimizeDeps = {}
    }

    if (!_nuxt.options.vite.optimizeDeps.include) {
      _nuxt.options.vite.optimizeDeps.include = []
    }

    _nuxt.options.vite.optimizeDeps.include.push(
      'html-dom-parser',
      'mjml-accordion-snyk',
      'mjml-body-snyk',
      'mjml-button-snyk',
      'mjml-carousel-snyk',
      'mjml-column-snyk',
      'mjml-core-snyk',
      'mjml-divider-snyk',
      'mjml-group-snyk',
      'mjml-head-attributes-snyk',
      'mjml-head-breakpoint-snyk',
      'mjml-head-font-snyk',
      'mjml-head-html-attributes-snyk',
      'mjml-head-preview-snyk',
      'mjml-head-snyk',
      'mjml-head-style-snyk',
      'mjml-head-title-snyk',
      'mjml-hero-snyk',
      'mjml-image-snyk',
      'mjml-migrate-snyk',
      'mjml-navbar-snyk',
      'mjml-parser-xml-snyk',
      'mjml-preset-core-snyk',
      'mjml-raw-snyk',
      'mjml-section-snyk',
      'mjml-snyk',
      'mjml-social-snyk',
      'mjml-spacer-snyk',
      'mjml-table-snyk',
      'mjml-text-snyk',
      'mjml-validator-snyk',
      'mjml-wrapper-snyk',
    )
  },
})
