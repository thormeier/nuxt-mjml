export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  routeRules: {
    '/server-only/**': {
      experimentalNoScripts: true,
    },
  },
  compatibilityDate: '2024-10-23',
  mjml: {
    serverOnlyRouteMatcher: '^/server-only/.*',
  },
})
