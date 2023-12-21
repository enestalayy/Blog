<template>
    <div :class="{ 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }" class="min-h-screen max-w-[100vw]">
        <header class="shadow-sm bg-white w-full">
            <NavBar class="w-[100vw]" />
        </header>
        <div class="flex flex-row mt-5 items-start pl-1">
            <aside class="w-1/5 fixed rounded text-center sticky top-3">
                <HomeLeftAside />
            </aside>
        <main class="w-2/5 rounded mx-auto text-center">
            <slot />
        </main>
        <aside class="w-1/6 fixed right-0 rounded text-center sticky top-3 pr-1">
            <HomeRightAside />
        </aside>
        </div>
    </div>
</template>
<script setup>
    const localeStore = useLocaleStore()
    localeStore.initializeDarkModeFromCookie();
    const isDarkMode = computed(() => localeStore.$state.isDarkMode)
    const isAsideTop = ref(false);

    const handleScroll = () => {
        isAsideTop.value = window.scrollY > 0;
    };

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>
<style>

.light-mode {
    background-color: var(--light-bg);
    color: var(--dark-bg-darkblue);
}
.asideTop-0 {
  top: 0;
  transition: top 0.3s ease-in-out;
}

</style>