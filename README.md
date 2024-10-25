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

The following components are either expected to be broken or need extra implementation:

 * mj-head
 * mj-head-attributes
 * mj-head-breakpoints
 * mj-head-font
 * mj-head-html-attributes
 * mj-head-style
 * mj-head-title

## Use MJML context in custom component

In a child component of `<mjml>` use:

```
const mjmlContext = inject('mjmlContext')
```

It offers the following methods:

 * `addMediaQuery`
 * `addHeadStyle`
 * `addComponentHeadStyle`
 * `setBackgroundColor`
 * `addHeadRaw`
 * `setTitle`

The entirety of the global data can be accessed via `globalData`
