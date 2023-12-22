<template>
    <div :class="{ 'dark-mode-auth': isDarkMode, 'light-mode-auth': !isDarkMode }" class="min-h-screen">
        <header class="shadow-sm w-full">
            <NavBar  />
        </header>
        <main :class="{ 'light-mode-auth-form': !isDarkMode }" class="w-3/5 mt-5 mx-auto text-center">
            <slot />
        </main>
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
.dark-mode-auth{
    background-color: var(--dark-bg-darkblue);
    color: var(--dark-text);
}
.light-mode-auth{
    background-color: var(--light-bg);
    color: var(--dark-bg-darkblue);
}
.dark-mode-authBtn {
    background-color: var(--light-text);
    color: var(--dark-text);
}
.light-mode-authBtn {
    background-color: var(--light-text);
}
.dark-mode-auth .forgotBtn:hover {
    color: aqua;
}
.light-mode-auth .forgotBtn:hover {
    color: blue;
}
</style>
