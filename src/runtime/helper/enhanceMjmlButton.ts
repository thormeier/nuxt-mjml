// TODO: Find a way to move that to `MjButton.ts` - perhaps with a plugin-like system.
import type { Ref } from '@vue/runtime-core'
import type MjButton from 'mjml-button-snyk'
import { extractBorderColor } from './extractBorderColor'

export function enhanceMjmlButton(dom: string, mjmlComponentInstance: Ref<MjButton>, borderRadius: number | string | null, href: number | string | null) {
  // Manually add some v:roundrect stuff for Outlook, because MJML doesn't do that.
  const innerPaddings = Number.parseInt(mjmlComponentInstance.value.getShorthandAttrValue('inner-padding', 'top') + mjmlComponentInstance.value.getShorthandAttrValue('inner-padding', 'bottom'))
  const lineHeightAttribute = mjmlComponentInstance.value.getAttribute('line-height')
  const usedBorderRadius = borderRadius ? borderRadius.toString() : '0'

  let lineHeight = Number.parseInt(lineHeightAttribute)
  if (lineHeightAttribute.endsWith('%')) {
    const percentageLineHeight = Number.parseInt(lineHeightAttribute.slice(0, -1)) / 100
    const fontSize = Number.parseInt(mjmlComponentInstance.value.getAttribute('font-size'))

    lineHeight = percentageLineHeight * fontSize
  }

  const border = mjmlComponentInstance.value.getAttribute('border')
  let borderHeight = 0
  if (border !== 'none') {
    borderHeight = Number.parseInt(mjmlComponentInstance.value.getAttribute('border')?.split(' ')[0] || '0') * 2
  }
  const buttonHeight = Math.round(innerPaddings + lineHeight + borderHeight)

  let arcSize = Math.round(Number.parseInt(usedBorderRadius) / buttonHeight * 100)
  if (arcSize > 50) {
    arcSize = 50
  }

  const borderColor = extractBorderColor(mjmlComponentInstance.value.getAttribute('border'))

  dom = dom.replace('<table', `
    <!--[if mso | IE]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href ? href : '#'}" style="height:${buttonHeight}px;v-text-anchor:middle;mso-wrap-style:none;mso-fit-shape-to-text:true;" arcsize="${arcSize}%" strokecolor="${borderColor}" fill="t">
        <v:fill type="tile" color="${mjmlComponentInstance.value.getAttribute('background-color')}" />
        <w:anchorlock/>
        <center style="color:${mjmlComponentInstance.value.getAttribute('color')};font-family:${mjmlComponentInstance.value.getAttribute('font-family')};font-size:${mjmlComponentInstance.value.getAttribute('font-size')};font-weight:${mjmlComponentInstance.value.getAttribute('font-weight')};">
            {{[SLOT CONTENT]}}
        </center>
        </v:roundrect>
    <![endif]-->
    <!--[if !mso]><!--><table
  `)

  // Visually center text in the button.
  dom = dom.replace(/(<a\s+href="[^"]*"\s+style=")([^"]*)"/gi, (_, prefix, style) => {
    // The additional background colour of the anchor tag makes the button appear visually larger, since we're shifting it down via position: relative later on.
    const cleanedStyle = style
      .replace(/background-color\s*:[^;"]*;?/gi, '')
      .replace(/background\s*:[^;"]*;?/gi, '')
      .trim()

    const newStyle = `${cleanedStyle}${cleanedStyle.endsWith(';') || cleanedStyle === '' ? '' : ';'}position:relative;top:2px;`

    return `${prefix}${newStyle}"`
  })

  return dom
}
