export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    api: process.env.API_URL,
    apiKey: process.env.API_KEY,
  },
  modules: [
    "@nuxtjs/supabase",
    "nuxt-primevue",
    ["@pinia/nuxt", { autoImports: ["defineStore", "acceptHMRUpdate"] }],
    // "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
    redirectOptions: {
      login: "/auth",
      callback: "/confirm",
      // exclude: ['/', '/protected yazsaydık burayı korumazdı],
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  imports: {
    dirs: ["stores"],
  },
  i18n: {
    // baseUrl: process.env.NUXT_PUBLIC_I18N_BASE_URL,
    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    locales: [
      {
        code: "tr",
        iso: "tr_TR",
        name: "TR",
        file: "tr.json",
      },
      {
        code: "en",
        iso: "en-US",
        name: "EN",
        file: "en.json",
      },
    ],
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: true,
    },
    customRoutes: "config",
    pages: {
      'auth/index': {
        tr: "/giris",
      },
    },
  },
  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   },
  // },
  primevue: {
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    options: {
      ripple: true,
    },
    components: {
      prefix: "Prime",
      include: "*",
    },
  },
  css: [
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    "assets/styles/global.css",
    "assets/styles/form.css",
  ],
});
