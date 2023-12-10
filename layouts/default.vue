<template>
    <div :class="{ 'dark-mode': isDarkMode }" class="min-h-screen">
        <header class="shadow-sm bg-white w-full">
            <NavBar />
        </header>
        <main class="w-3/5 my-5 mx-auto text-center">
            <slot />
        </main>
    </div>
</template>
<script setup>
    const localeStore = useLocaleStore()
        localeStore.initializeDarkModeFromCookie();
    const isDarkMode = computed(() => localeStore.$state.isDarkMode)
</script>
<style>
.dark-mode {
    background-color: rgb(21, 21, 21);
    color: azure;
}
</style>