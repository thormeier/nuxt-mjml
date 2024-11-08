export function toMediaQueryStyleTags(parsedWidth: string, unit: string, className: string, breakpoint: number, forceOWADesktop: boolean) {
  const baseMediaQuery = `.${className} {
      width: ${parsedWidth}${unit} !important;
      max-width: ${parsedWidth}${unit};
    }`

  const styleTags = [
    {
      type: 'text/css',
      innerHTML: `
  @media only screen and (min-width:480px) {
    ${baseMediaQuery}
  }
`,
    },
    {
      media: `screen and (min-width:480px)`,
      innerHTML: `
  .moz-text-html ${baseMediaQuery}
`,
    },
  ]

  if (forceOWADesktop) {
    styleTags.push({
      type: 'text/css',
      innerHTML: `[owa] ${baseMediaQuery}`,
    })
  }

  return styleTags
}
