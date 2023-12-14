<template>
    <div>
        <nav class="p-1 w-full flex items-center justify-between bg-[#41B883] text-[beige]">
                <nuxt-link :to="localePath({ name: 'index' })">
                    <img src=".././assets/images/2023-12-10-removebg-preview.png" class="h-8" alt="">
                </nuxt-link>
                <ul class="flex items-center gap-4">

                    <li>
                        <nuxt-link :to="localePath({ name: 'auth' })">{{ $t('auth') }}</nuxt-link>
                    </li>
                    <li>
                        <button @click="signOut" >Sign out</button>
                    </li>
                    <li>
                        <button :class="darkMode ? 'pi pi-moon' : 'pi pi-sun'" @click="localeStore.toggleDarkMode()" ></button>
                    </li>

                    <li>
                        <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
                            <span>{{ locale.code === $i18n.locale ? '' : locale.name }}</span>
                        </NuxtLink>
                    </li>
                    <li>
                        <nuxt-link v-if="getUser" :to="localePath({ name: 'profile' })">
                            <ProfileAvatar :userInfo="getUser.user_metadata" :avatarContainer="'avatar-container-md'" />
                        </nuxt-link>
                        <nuxt-link v-else :to="localePath({ name: 'auth' })"> Sign in</nuxt-link>
                    </li>
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
                user: useSupabaseUser(),
                supabase: useSupabaseClient()
            }
        },
        // mounted() {
        //     this.sessionStore.getSession()
        // },
        computed: {
            darkMode() {
                return this.localeStore.$state.isDarkMode;
            },
            availableLocales() {
                return (this.i18n.locales).filter(i => i.code !== this.i18n.locale.value)
            },
            getUser() {
                return this.user
            }
        },
        methods: {
            async signOut() {
            try {
                const { error } = await this.supabase.auth.signOut()
                if (error) throw error
            } catch (error) {
                alert(error.message)
            } finally {
            }
            }
        }
    }
</script>