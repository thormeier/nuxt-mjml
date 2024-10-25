export default function () {
  const fonts = {
    'Open Sans': 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700',
    'Droid Sans': 'https://fonts.googleapis.com/css?family=Droid+Sans:300,400,500,700',
    Lato: 'https://fonts.googleapis.com/css?family=Lato:300,400,500,700',
    Roboto: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
    Ubuntu: 'https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700',
    Inter: 'https://fonts.googleapis.com/css?family=Inter:300,400,500,700'
  }

  const globalData = useState('mjmlGlobalData', () => ({
    backgroundColor: '',
    beforeDoctype: '',
    breakpoint: '480px',
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
  }))

  return {
    globalData: globalData.value,

    containerWidth: '600px',

    addMediaQuery(className, {
      parsedWidth,
      unit
    }) {
      globalData.value.mediaQueries[className] = `{ width:${parsedWidth}${unit} !important; max-width: ${parsedWidth}${unit}; }`;
    },

    addHeadStyle(identifier, headStyle) {
      globalData.value.headStyle[identifier] = headStyle;
    },

    addComponentHeadStyle(headStyle) {
      globalData.value.componentsHeadStyle.push(headStyle);
    },

    setBackgroundColor: color => {
      globalData.value.backgroundColor = color;
    },

    addHeadRaw: (identifier, value) => {
      globalData.value.push([identifier, value])
    },

    setTitle: (title) => {
      globalData.value.title = title
    },

    setLang: (lang) => {
      globalData.value.lang = lang
    },
  }
}
