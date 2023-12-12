<template>
    <div>
        <nav class="p-4 w-full flex items-center justify-between bg-[#41B883] text-[beige]">
                <nuxt-link :to="localePath({ name: 'index' })">
                <img src="../assets/images/2023-12-10-removebg-preview.png" class="h-8" alt="image">
                </nuxt-link>
                <ul class="flex items-center gap-4">

                    <li>
                        <nuxt-link :to="localePath({ name: 'auth' })">{{ $t('auth') }}</nuxt-link>
                    </li>
                    <li>
                        <button :class="darkMode ? 'pi pi-moon' : 'pi pi-sun'" @click="localeStore.toggleDarkMode()" ></button>
                    </li>

                    <li>
                        <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
                            <span>{{ locale.code === $i18n.locale ? '' : locale.name }}</span>
                        </NuxtLink>
                    </li>
                    {{ session ? true : false }}
                </ul>
            </nav>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                i18n: useI18n(),
                localeStore: useLocaleStore(),
                sessionStore: useSessionStore(),
            }
        },
        mounted() {
            this.sessionStore.getSession()
        },
        computed: {
            darkMode() {
                return this.localeStore.$state.isDarkMode;
            },
            availableLocales() {
                return (this.i18n.locales).filter(i => i.code !== this.i18n.locale.value)
            },
            session() {
                return this.sessionStore.$state.session
            }
        },

    }
</script>