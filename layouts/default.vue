<template>
    <div :class="{ 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }" class="min-h-screen max-w-[100vw]">
        <header class="shadow-sm bg-white w-full">
            <NavBar class="w-[100vw]" />
        </header>
        <div class="flex flex-row my-5 items-start">
            <aside class="w-1/5 fixed rounded text-center">
                <HomeLeftAside />
            </aside>
        <main class="w-2/5 rounded mx-auto text-center">
            <slot />
        </main>
        <aside class="w-1/6 fixed right-0 rounded text-center">
            <HomeRightAside />
        </aside>
        </div>
    </div>
</template>
<script setup>

    const localeStore = useLocaleStore()
        localeStore.initializeDarkModeFromCookie();
    const isDarkMode = computed(() => localeStore.$state.isDarkMode)
</script>
<style>
.dark-mode {
    background-color: var(--dark-bg-darkblue);
    color: var(--dark-text);
}
.light-mode {
    background-color: var(--light-bg);
    color: var(--dark-bg-darkblue);
}
</style>