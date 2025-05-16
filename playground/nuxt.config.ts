export default defineNuxtConfig({
  modules: ['nuxt-mjml'],
  devtools: { enabled: true },
  routeRules: {
    '/server-only/**': {
      experimentalNoScripts: true,
    },
  },
  compatibilityDate: '2024-11-01',
  typescript: {
    strict: true,
    typeCheck: true,
  },
  mjml: {
    serverOnlyRouteMatcher: '^/server-only/.*',
  },
})
