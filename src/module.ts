import { defineNuxtModule, addServerPlugin, createResolver, addComponent } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxt/mjml',
    configKey: 'mjml',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    addServerPlugin(resolver.resolve('runtime/plugin/server/mjmlIeComments.ts'))

    addComponent({
      name: 'mjml',
      filePath: resolver.resolve('runtime/components/Mjml.ts')
    })
    addComponent({
      name: 'mj-accordion',
      filePath: resolver.resolve('runtime/components/MjAccordion.ts')
    })
    addComponent({
      name: 'mj-accordion-element',
      filePath: resolver.resolve('runtime/components/MjAccordionElement.ts')
    })
    addComponent({
      name: 'mj-accordion-text',
      filePath: resolver.resolve('runtime/components/MjAccordionText.ts')
    })
    addComponent({
      name: 'mj-accordion-title',
      filePath: resolver.resolve('runtime/components/MjAccordionTitle.ts')
    })
    addComponent({
      name: 'mj-body',
      filePath: resolver.resolve('runtime/components/MjBody.ts')
    })
    addComponent({
      name: 'mj-button',
      filePath: resolver.resolve('runtime/components/MjButton.ts')
    })
    addComponent({
      name: 'mj-carousel',
      filePath: resolver.resolve('runtime/components/MjCarousel.ts')
    })
    addComponent({
      name: 'mj-carousel-image',
      filePath: resolver.resolve('runtime/components/MjCarouselImage.ts')
    })
    addComponent({
      name: 'mj-column',
      filePath: resolver.resolve('runtime/components/MjColumn.ts')
    })
    addComponent({
      name: 'mj-divider',
      filePath: resolver.resolve('runtime/components/MjDivider.ts')
    })
    addComponent({
      name: 'mj-group',
      filePath: resolver.resolve('runtime/components/MjGroup.ts')
    })
    addComponent({
      name: 'mj-head-attributes',
      filePath: resolver.resolve('runtime/components/MjHeadAttributes.ts')
    })
    addComponent({
      name: 'mj-head-breakpoint',
      filePath: resolver.resolve('runtime/components/MjHeadBreakpoint.ts')
    })
    addComponent({
      name: 'mj-head-font',
      filePath: resolver.resolve('runtime/components/MjHeadFont.ts')
    })
    addComponent({
      name: 'mj-head-html-attributes',
      filePath: resolver.resolve('runtime/components/MjHeadHtmlAttributes.ts')
    })
    addComponent({
      name: 'mj-head',
      filePath: resolver.resolve('runtime/components/MjHead.ts')
    })
    addComponent({
      name: 'mj-head-style',
      filePath: resolver.resolve('runtime/components/MjHeadStyle.ts')
    })
    addComponent({
      name: 'mj-head-title',
      filePath: resolver.resolve('runtime/components/MjHeadTitle.ts')
    })
    addComponent({
      name: 'mj-hero',
      filePath: resolver.resolve('runtime/components/MjHero.ts')
    })
    addComponent({
      name: 'mj-image',
      filePath: resolver.resolve('runtime/components/MjImage.ts')
    })
    addComponent({
      name: 'mj-navbar',
      filePath: resolver.resolve('runtime/components/MjNavbar.ts')
    })
    addComponent({
      name: 'mj-raw',
      filePath: resolver.resolve('runtime/components/MjRaw.ts')
    })
    addComponent({
      name: 'mj-section',
      filePath: resolver.resolve('runtime/components/MjSection.ts')
    })
    addComponent({
      name: 'mj-social',
      filePath: resolver.resolve('runtime/components/MjSocial.ts')
    })
    addComponent({
      name: 'mj-social-element',
      filePath: resolver.resolve('runtime/components/MjSocialElement.ts')
    })
    addComponent({
      name: 'mj-spacer',
      filePath: resolver.resolve('runtime/components/MjSpacer.ts')
    })
    addComponent({
      name: 'mj-table',
      filePath: resolver.resolve('runtime/components/MjTable.ts')
    })
    addComponent({
      name: 'mj-text',
      filePath: resolver.resolve('runtime/components/MjText.ts')
    })
  },
})
