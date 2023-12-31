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
    "@nuxt/content",
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
    // baseUrl: "https://xblog-blog.vercel.app/",
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
      "auth/index": {
        tr: "/giris",
      },
      "post/[postId]": {
        tr: "/gonderi/[postId]",
      },
      "profile/index": {
        tr: "/profil",
      },
      "profile/[userId]": {
        tr: "/profil/[userId]",
      },
      "tags/[tag]": {
        tr: "/etiketler/[tag]",
      },
    },
  },

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
