import { defineNitroPlugin } from 'nitropack/runtime'
import { getRequestHost } from 'h3'
import { useRuntimeConfig } from '#imports'

function removeScriptTags(html: string) {
  return html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '')
}

function convertToAbsoluteUrls(html: string, baseUrl: string) {
  return html.replace(
    /(\b(?:src|href)\s*=\s*['"])(\/[^'"]*)/gi,
    (_, prefix, relativeUrl) => {
      return `${prefix}${new URL(relativeUrl, baseUrl).href}`
    },
  )
}

function wrapFontsForOutlook(html: string) {
  return html.replace(
    /(<link[^>]*href=["']?([^"'>]*fonts\.googleapis\.com[^"'>]*)["'][^>]*>)/gi,
    (_, linkTag) => `
        <!--[if mso]>
        <style>
            * {
                font-family: Helvetica, Arial, sans-serif !important;
            }
        </style>
        <![endif]-->
        <!--[if !mso]><!-->${linkTag}<!--<![endif]-->
      `,
  )
}

function removeVueHtmlComments(input: string): string {
  return input.replace(/<!--\]-->|<!--\[-->/g, '')
}

function cleanButtonVml(input: string): string {
  return input.replace(
    /<!\[endif\]--><span class="mj-button-inner"(.*)>(.*)<\/span><!--\[if mso\]>/g,
    '<span class="mj-button-inner"$1>$2</span>',
  )
    .replace('.mj-button-inner{display:none;}', '')
}

export default defineNitroPlugin((nitroApp) => {
  const config = useRuntimeConfig()
  const routeMatcher = config?.public?.mjml?.serverOnlyRouteMatcher

  // No need to register the hook if the route matcher isn't specified.
  if (!routeMatcher) {
    return
  }

  nitroApp.hooks.hook('render:response', (response, { event }) => {
    const routeMatcherRegexp = new RegExp(routeMatcher)

    if (!event || !event._path || !event._path.match(routeMatcherRegexp)) {
      return
    }

    response.body = response.body.replace('<head>', `<head>
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      #outlook a {
        padding: 0;
      }

      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      p {
        display: block;
        margin: 13px 0;
      }
    </style>
    <!-–[if mso]>
      <style type="text/css"> body, table, td, tr, p, a, h1, h2, h3, {font-family: Helvetica, Arial, sans-serif !important;} </style>
    <![endif]-–>
    <!--[if mso]>
          <noscript>
          <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>150</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          </noscript>
          <![endif]-->
    <!--[if lte mso 11]>
          <style type="text/css">
            .mj-outlook-group-fix { width:100% !important; }
          </style>
          <![endif]-->
      `)
    // We need to use 150 DPI for the entire thing, otherwise rounded corners don't work for buttons.

    // Make all URLs absolute. Split by commas in case stuff like Fastly sends whacky stuff.
    const host = 'https://' + getRequestHost(event, { xForwardedHost: true }).split(',')[0]

    response.body = cleanButtonVml(removeVueHtmlComments(removeScriptTags(wrapFontsForOutlook(convertToAbsoluteUrls(response.body, host)))))
  })
})
