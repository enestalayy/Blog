import { defineStore } from "pinia";

const COOKIE_OPTIONS = { maxAge: 86400, path: "/" };

export const useLocaleStore = defineStore({
  id: "locale",
  state: () => ({
    currentLocale: "en",
    isDarkMode: true,
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      console.log(this.isDarkMode);
      this.saveDarkModeToCookie();
    },
    setLocale(locale) {
      this.currentLocale = locale;
      this.saveLocaleToCookie(locale);
    },
    saveLocaleToCookie(locale) {
      document.cookie = `user_locale=${locale}; max-age=${COOKIE_OPTIONS.maxAge}; path=${COOKIE_OPTIONS.path}`;
    },
    saveDarkModeToCookie() {
      document.cookie = `isDarkMode=${this.isDarkMode}; max-age=${COOKIE_OPTIONS.maxAge}; path=${COOKIE_OPTIONS.path}`;
    },
    getCookieValue(cookieName) {
      if (process.client) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + cookieName + "=");
        if (parts.length === 2) {
          return parts.pop().split(";").shift();
        }
      }
      return null;
    },
    getLocaleFromCookie() {
      return this.getCookieValue("user_locale") || "en";
    },
    initializeLocaleFromCookie() {
      this.currentLocale = this.getLocaleFromCookie();
    },
    initializeDarkModeFromCookie() {
      const savedDarkMode = this.getCookieValue("isDarkMode");
      this.isDarkMode = savedDarkMode === "true";
    },
  },
});
