<template>
    <div :class="{ 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }" class="min-h-screen">
        <header class="shadow-sm bg-white w-full">
            <NavBar />
        </header>
        <div class="flex flex-row mt-5 items-start">
            <aside class="w-1/5 rounded text-center">
                <HomeLeftAside />
            </aside>
        <main class="w-1/2 rounded mx-auto text-center">
            <slot />
        </main>
        <aside class="w-1/5 rounded text-center">
            <HomeRightAside />
        </aside>
        </div>
    </div>
</template>
<script setup>
    const localeStore = useLocaleStore()
    onMounted(() => {
        localeStore.initializeDarkModeFromCookie();
    })
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