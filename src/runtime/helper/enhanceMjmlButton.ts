// TODO: Find a way to move that to `MjButton.ts` - perhaps with a plugin-like system.
import type { Ref } from '@vue/runtime-core'
import { extractBorderColor } from './extractBorderColor'
import type { MjmlComponent } from '~/types'

export function enhanceMjmlButton(dom: string, mjmlComponentInstance: Ref<MjmlComponent>, borderRadius: string, href: string) {
  // Manually add some roundrect stuff for Outlook, because MJML doesn't do that.
  const innerPaddings = mjmlComponentInstance.value.getShorthandAttrValue('inner-padding', 'top') + mjmlComponentInstance.value.getShorthandAttrValue('inner-padding', 'bottom')
  const lineHeightAttribute = mjmlComponentInstance.value.getAttribute('line-height')

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

  let buttonWidth = Number.parseInt(mjmlComponentInstance.value.calculateAWidth(mjmlComponentInstance.value.getAttribute('width'))) + borderHeight

  if (!buttonWidth) {
    buttonWidth = '200'
  }
  buttonWidth += 'px'

  let arcSize = Math.round(Number.parseInt(borderRadius) / buttonHeight * 100)
  if (arcSize > 50) {
    arcSize = 50
  }

  const borderColor = extractBorderColor(mjmlComponentInstance.value.getAttribute('border'))

  dom = dom.replace('<table', `
    <!--[if mso | IE]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:${buttonHeight}px;v-text-anchor:middle;width:${buttonWidth};" arcsize="${arcSize}%" strokecolor="${borderColor}" fill="t">6
        <v:fill type="tile" color="${mjmlComponentInstance.value.getAttribute('background-color')}" />
        <w:anchorlock/>
        <center style="color:${mjmlComponentInstance.value.getAttribute('color')};font-family:${mjmlComponentInstance.value.getAttribute('font-family')};font-size:${mjmlComponentInstance.value.getAttribute('font-size')};font-weight:${mjmlComponentInstance.value.getAttribute('font-weight')};">
    <![endif]-->
    <!--[if !mso]><!--><table
  `)

  dom = dom.replace('</table>', `
    </table>
    <!--<![endif]-->
    <!--[if mso | IE]>
        </center>
      </v:roundrect>
    <![endif]-->
  `)

  dom = dom.replace('<!--[SLOT CONTENT]-->', '<!--<![endif]--><!--[SLOT CONTENT]--><!--[if !mso]><!-->')

  return dom
}
