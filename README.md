# nuxt-mjml

MJML implementation as a Nuxt module.

## Warning

This things is **highly experimental**! Use at your own risk!

## Interface adjustments

 * When not specifying the width of individual columns, you need to specify them on the section/group:

```
<mj-section :number-of-columns="2">
  <mj-column>...</mj-column>
  <mj-column>...</mj-column>
</mj-section>
```

## Missing functionality

The following components are not implemented because they have simpler solutions that can be offered via Vue:

 * mj-attributes - Can be achieved via using components
 * mj-breakpoints - Is achieved via setting the `breakpoint` attribute on `<mjml>`.
 * mj-html-attributes - Can be achieved via component props

## Use MJML context in custom component

In a child component of `<mjml>` use:

```
const mjmlContext = inject('mjmlContext')
```
