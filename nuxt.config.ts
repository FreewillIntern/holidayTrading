// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@progress/kendo-theme-default/dist/all.css"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@element-plus/nuxt", '@inkline/nuxt'],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL
    }
  }
});
