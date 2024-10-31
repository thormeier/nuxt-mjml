import { provide } from 'vue'
import { h, defineComponent } from '@vue/runtime-core'
import { useHead } from '@unhead/vue'

const fonts = {
  'Open Sans': 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700',
  'Droid Sans': 'https://fonts.googleapis.com/css?family=Droid+Sans:300,400,500,700',
  'Lato': 'https://fonts.googleapis.com/css?family=Lato:300,400,500,700',
  'Roboto': 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
  'Ubuntu': 'https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700',
  'Inter': 'https://fonts.googleapis.com/css?family=Inter:300,400,500,700',
}

export default defineComponent({
  props: {
    forceOWADesktop: {
      type: Boolean,
      default: () => false,
      required: false,
    },
    containerWidth: {
      type: Number,
      default: () => 600,
      required: false,
    },
    usedFonts: {
      type: Array,
      default: () => [],
      required: false,
    },
    breakpoint: {
      type: Number,
      default: () => 480,
      required: false,
    },
  },
  setup(props, { slots }) {
    const validFonts = props.usedFonts.filter(name => !!fonts[name])

    const fontLinks = validFonts.map(name => ({
      rel: 'stylesheet',
      type: 'text/css',
      href: fonts[name],
    }))

    const fontStyleTags = validFonts.map(name => ({
      type: 'text/css',
      innerHTML: `
    @import url(${fonts[name]});
      `,
    }))

    useHead({
      link: fontLinks,
      bodyAttrs: {
        style: `word-spacing:normal;font-size:12px;`,
      },
      htmlAttrs: {
        'xmlns': 'http://www.w3.org/1999/xhtml',
        'xmlns:v': 'urn:schemas-microsoft-com:vml',
        'xmlns:o': 'urn:schemas-microsoft-com:office:office',
      },
      style: [
        ...fontStyleTags,
        {
          innerHTML: `
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
          `,
        },
      ],
    })

    provide('mjmlContext', {
      globalData: {
        backgroundColor: '',
        beforeDoctype: '',
        breakpoint: props.breakpoint,
        classes: {},
        classesDefault: {},
        defaultAttributes: {},
        htmlAttributes: {},
        fonts,
        inlineStyle: [],
        headStyle: {},
        componentsHeadStyle: [],
        headRaw: [],
        mediaQueries: {},
        preview: '',
        style: [],
        title: '',
        forceOWADesktop: false,
        lang: 'de',
        dir: 'ltr',
      },
      containerWidth: `${props.containerWidth}px`,
      setBackgroundColor() {
        // noop, we're handling this in the component itself.
        return
      },
      addMediaQuery() {
        // noop, we're handling this in the component itself.
        return
      },
      addHeadStyle() {
        // No component actually uses this.
        console.warn('Not implemented: addHeadStyle')
      },
    })

    provide('forceOWADesktop', props.forceOWADesktop)

    return () => h('div', [slots.default()])
  },
})
