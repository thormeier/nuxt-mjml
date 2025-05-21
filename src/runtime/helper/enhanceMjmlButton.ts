// TODO: Find a way to move that to `MjButton.ts` - perhaps with a plugin-like system.
import type { Ref } from '@vue/runtime-core'
import type MjButton from 'mjml-button-snyk'
import { extractBorderColor } from './extractBorderColor'

function generateVShapeTagFill(borderRadius: number, height: number, fillColor: string, left: number) {
  return `
    <v:shape
      width="${borderRadius * 1.5625}"
      height="${height * 1.5625}"
      coordorigin="0 0"
      coordsize="${borderRadius} ${height}"
      fillcolor="${fillColor}"
      stroke="f"
      fill="true"
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      style="width:${borderRadius * 1.5625};height:${height * 1.5625};position:relative;top:0.5;left:${left};"
    >`
}

function generateVShapeTagBorder(borderRadius: number, height: number, borderColor: string) {
  return `
    <v:shape
      width="${borderRadius * 1.5625}"
      height="${height * 1.5625}"
      coordorigin="0 0"
      coordsize="${borderRadius} ${height}"
      strokecolor="${borderColor}"
      strokeweight="1px"
      stroke="true"
      fill="f"
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      style="width:${borderRadius * 1.5625};height:${height * 1.5625};position:relative;top:0.5;left:0;"
    >`
}

function generateVShapesLeft(borderRadius: number, height: number, borderColor: string, fillColor: string) {
  const r = Math.round(borderRadius)
  const h = Math.round(height)
  const r2 = Math.round(r / 2)
  const br = Math.round(height - (borderRadius / 2))
  const hr = Math.round(height - r)
  return `
    ${generateVShapeTagFill(r, h, fillColor, 1)}
      <v:path v="m ${r},0 c 8,0,0,8,0,${r} l 0,${hr} c 0,${br},${r2},${h},${r},${h} x"/>
    </v:shape>
    ${generateVShapeTagBorder(r, h, borderColor)}
      <v:path v="m ${r},0 c 8,0,0,8,0,${r} l 0,${hr} c 0,${br},${r2},${h},${r},${h}"/>
    </v:shape>
  `
}

function generateVShapesRight(borderRadius: number, height: number, borderColor: string, fillColor: string) {
  const r = Math.round(borderRadius)
  const h = Math.round(height)
  const r2 = Math.round(r / 2)
  const br = Math.round(height - (borderRadius / 2))
  const hr = Math.round(height - r)
  return `
    ${generateVShapeTagFill(r, h, fillColor, -1)}
      <v:path v="m 0,0 c ${r2},0,${r},${r2},${r},${r} l ${r},${hr} c ${r},${br},${r2},${h},0,${h} x"/>
    </v:shape>
    ${generateVShapeTagBorder(r, h, borderColor)}
      <v:path v="m 0,0 c ${r2},0,${r},${r2},${r},${r} l ${r},${hr} c ${r},${br},${r2},${h},0,${h}"/>
    </v:shape>
  `
}

function generateOutlookButton(height: number, fontSize: number, fontFamily: string, borderRadius: number, borderColor: string, fillColor: string, textColor: string, content: string, href: string) {
  return `
  <table style="margin: 0;padding: 0;border-spacing: 0;overflow: hidden;" cellspacing="0" cellpadding="0" border="0" width="auto" style="width: auto;height:${height}px" height="${height}">
    <tbody style="margin: 0;padding: 0;">
      <tr style="margin: 0;padding: 0;">
        <td style="margin:0;padding:0;font-size:0;width:${borderRadius}px;height:${height}px;line-height:0;">
          ${generateVShapesLeft(borderRadius, height, borderColor, fillColor)}
        </td>
        <td style="margin:0;padding:0;font-size:0;width:${borderRadius}px;height:${height}px;line-height:0;">
          <a href="${href}">
            <table cellspacing="0" cellpadding="0" border="0" width="auto" style="margin: 0;padding: 0;border-spacing: 0;overflow: hidden;width: auto;height:${height - 3}px;background-color:#0ff;" height="${height - 3}">
              <tr>
                <td style="color:${textColor};height:${height}px;line-height:${fontSize}px;font-family:${fontFamily};font-size:${fontSize}px;margin:0;padding:0;padding-left:2px;padding-right:2px;font-weight: normal;background-color:${fillColor};border-top:1px solid ${borderColor};border-bottom:1px solid ${borderColor};">
                  <span class="mj-button-inner">${content}</span>
                </td>
              </tr>
            </table>
          </a>
        </td>
        <td style="margin:0;padding:0;font-size:0;width:${borderRadius}px;height:${height}px;line-height:0;">
          ${generateVShapesRight(borderRadius, height, borderColor, fillColor)}
        </td>
      </tr>
    </tbody>
  </table>
  `
}

export function enhanceMjmlButton(dom: string, mjmlComponentInstance: Ref<MjButton>, borderRadius: number | string | null, href: number | string | null) {
  const innerPaddings = Number.parseInt(mjmlComponentInstance.value.getShorthandAttrValue('inner-padding', 'top') + mjmlComponentInstance.value.getShorthandAttrValue('inner-padding', 'bottom'))
  const lineHeightAttribute = mjmlComponentInstance.value.getAttribute('line-height')
  const usedBorderRadius = Number.parseInt(borderRadius ? borderRadius.toString() : '0')

  let lineHeight = Number.parseInt(lineHeightAttribute)
  const fontSize = Number.parseInt(mjmlComponentInstance.value.getAttribute('font-size'))
  const fontFamily = mjmlComponentInstance.value.getAttribute('font-family') || 'Helvetica, sans-serif'
  if (lineHeightAttribute.endsWith('%')) {
    const percentageLineHeight = Number.parseInt(lineHeightAttribute.slice(0, -1)) / 100

    lineHeight = percentageLineHeight * fontSize
  }

  const border = mjmlComponentInstance.value.getAttribute('border')
  let borderHeight = 0
  if (border !== 'none') {
    borderHeight = Number.parseInt(mjmlComponentInstance.value.getAttribute('border')?.split(' ')[0] || '0') * 2
  }

  const configuredHeight = mjmlComponentInstance.value.getAttribute('height')

  const buttonHeight = configuredHeight ? Number.parseInt(configuredHeight) : Math.round(innerPaddings + lineHeight + borderHeight)

  const backgroundColor = mjmlComponentInstance.value.getAttribute('background-color')
  let borderColor = extractBorderColor(mjmlComponentInstance.value.getAttribute('border'))
  if (borderColor === null) {
    borderColor = backgroundColor
  }

  const textColor = mjmlComponentInstance.value.getAttribute('color') || '#000'

  dom = dom.replace('<table', `
    <!--[if mso]>
      ${generateOutlookButton(buttonHeight, fontSize, fontFamily, usedBorderRadius, borderColor, backgroundColor, textColor, '<![endif]--><!--[SLOT CONTENT]--><!--[if mso]>', (href || '#').toString())}
    <![endif]-->
    <!--[if !mso]><!--><table
  `) + '<!--<![endif]-->'

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
