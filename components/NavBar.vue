<template>
    <div>
        <nav class="p-1 w-full flex items-center justify-between bg-[#41B883] text-[beige]">
                <nuxt-link :to="localePath({ name: 'index' })">
                    <img src=".././assets/images/2023-12-10-removebg-preview.png" class="h-8" alt="image">
                </nuxt-link>
                <PostEditPost class=" border-2 border-[beige] rounded" :post="''" />
                <div class="flex flex-row items-center">
                    <div v-if="!getUser" class="flex flex-row items-center">
                        <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
                            <span class="p-2">{{ locale.code === $i18n.locale ? ' ' : locale.name }}</span>
                        </NuxtLink>
                        <button class="p-2" :class="darkMode ? 'pi pi-moon' : 'pi pi-sun'" @click="localeStore.toggleDarkMode()" ></button>
                    </div>
                    <ProfileAvatar v-if="getUser"  @click="showMenu = !showMenu"  class="cursor-pointer relative" :userInfo="getUser.user_metadata" :avatarContainer="'avatar-container-md'" />
                    <nuxt-link v-else :to="localePath({ name: 'auth' })"> Sign in</nuxt-link>
                    <ul :class="{ 'menu-show': showMenu }" class="flex flex-row items-center bg-[var(--light-text)] pr-2 py-2 menu-transition">
                        <div @click="showMenu = !showMenu"  class="text- flex items-center cursor-pointer mr-1  bg-transparent">
                            <i class="pi pi-angle-right"></i>
                        </div>
                        <div class="flex flex-col gap-2">
                            <li class="border w-full text-center max-md:text-left rounded">
                                <nuxt-link :to="localePath({ name: 'profile' })">
                                    <h2 class="p-2">Profile</h2>
                                </nuxt-link>
                            </li>
                            <li class="border w-full text-center max-md:text-left rounded">
                                <button class="p-2" :class="darkMode ? 'pi pi-moon' : 'pi pi-sun'" @click="localeStore.toggleDarkMode()" ></button>
                            </li>
                            <li class="border w-full text-center max-md:text-left rounded">
                                <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
                                    <span class="p-2">{{ locale.code === $i18n.locale ? ' ' : locale.name }}</span>
                                </NuxtLink>
                            </li>
                            <li class="border w-full text-center max-md:text-left rounded whitespace-nowrap">
                                <button class="p-2" @click="sessionStore.signOut" >Sign out</button>
                            </li>
                        </div>
                    </ul>
                </div>
                
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
                user: useSupabaseUser(),
                supabase: useSupabaseClient(),
                showMenu: false,
                route: useRoute(),
            }
        },
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

    }
</script>
<style>
body {
    overflow-x: hidden;
}
.menu-transition {
    position: absolute;
    transition: all 0.5s ease-in-out;
    top: -200px;
    right: -200px;
    z-index: 10;
}
.menu-transition li:hover {
    box-shadow: 0 0 10px beige;
}
.menu-show {
    top: 48px;
    right: 0;
}
</style>