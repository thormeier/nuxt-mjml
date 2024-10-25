export default defineNuxtConfig({
  modules: ['../src/module'],
  myModule: {},
  devtools: { enabled: true },
  compatibilityDate: '2024-10-23',
  routeRules: {
    '/server-only/**': {
      experimentalNoScripts: true,
    }
  },
})
