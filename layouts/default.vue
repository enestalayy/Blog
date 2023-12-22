<template>
    <div :class="{ 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }" class="min-h-screen max-w-[100vw]">
        <header class="shadow-sm bg-white w-full">
            <NavBar class="w-[100vw]" />
        </header>
        <div class="flex flex-row  items-start">
            <aside :class="{'leftAside': isLeftAside, 'absoluteLeftAside': !isLeftAside}" class="max-md:w-[70vw] md:w-1/3 max-xl:w-1/4 xl:w-1/5 md:rounded max-md:text-left md:text-center sticky top-3 md:mt-5">
                <HomeLeftAside />
            </aside>
            <button @click="toggleAside('isLeftAside')" class="md:hidden h-[100vh] z-20 sticky top-0 bg-[var(--light-text)] p-1"><i :class="isLeftAside ? 'pi-arrow-left' : 'pi-arrow-right'" class="pi"></i></button>
            <main v-if="!(isLeftAside && isRightAside)"
            :class="{'main': isLeftAside || isRightAside}"
            class=" max-md:w-4/5 max-md:mx-auto w-2/5 mt-5 rounded mx-auto text-center"
            >
                <slot :class="{'main': isLeftAside || isRightAside}" />
            </main>
            <button @click="toggleAside('isRightAside')" class="md:hidden h-[100vh] z-20 sticky top-0 bg-[var(--light-text)] p-1"><i :class="isRightAside ? 'pi-arrow-right' : 'pi-arrow-left'" class="pi"></i></button>
            <aside :class="{'rightAside': isRightAside, 'absoluteRightAside': !isRightAside}" class="max-md:h-[100vh] max-md:w-2/5 max-xl:w-1/5 xl:w-1/6 right-0 rounded text-center sticky top-3 pr-1">
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
    const isLeftAside = ref(false)
    const isRightAside = ref(false)
    const toggleAside = (prop) => {
        if(prop === 'isRightAside') {
            isRightAside.value = !isRightAside.value
            isLeftAside.value = false
        }else {
            isLeftAside.value = !isLeftAside.value
            isRightAside.value = false 
        }
    }
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
@media (max-width: 768px) {
    .absoluteLeftAside {
        position: absolute;
        z-index: -5;
        width: 0;
        transform: scaleX(0.3);
        transition: transform 0.5s ease-in, width 0.5s ease-out, left 5.5s ease-in-out;
    }
    .absoluteRightAside {
        position: absolute;
        left: 0;
        z-index: -5;
        width: 0;
        transform: scaleX(0.3);
        transition: transform 0.5s ease-in, width 0.5s ease-out;
    }
}
.leftAside {
    position: sticky;
    left: 0;
    top: 0;
    width: 100%;
    background-color: var(--light-text);
    z-index: 100;
    transform: scaleX(1);
    transition: transform 0.5s ease-in, width 0.5s ease-out;
}
.rightAside {
    position: sticky;
    left: 0;
    top: 0;
    width: 100%;
    background-color: var(--light-text);
    z-index: 100;
    transform: scaleX(1);
    transition: transform 0.5s ease-in, width 0.5s ease-out;
}
.main {
    max-width: 10vw;
    visibility: hidden;
}


</style>