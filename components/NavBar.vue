<template>
    <div>
        <nav class="p-4 w-full flex items-center justify-between bg-[#41B883] text-[beige]">
                <nuxt-link to="/" class="font-bold">Logo</nuxt-link>
                <ul class="flex items-center gap-4">
                    <li>
                        <nuxt-link :to="localePath({ name: 'index' })">{{ $t('home') }}</nuxt-link>
                    </li>
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
                    {{ darkMode }}
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
            }
        },
        computed: {
            darkMode() {
                return this.localeStore.$state.isDarkMode;
            },
            availableLocales() {
                return (this.i18n.locales).filter(i => i.code !== this.i18n.locale.value)
            },
        },

    }
</script>
