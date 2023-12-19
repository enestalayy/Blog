<template>
    <div>
        <ProfileAccount />
        <HomePostCard class="rounded-none" :posts="getUsersPosts" />
        <h1 v-if="!getUsersPosts.length > 0">{{ $t('noPost') }}</h1>

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'profile'
})
const postStore = usePostStore()
const user = useSupabaseUser()
onMounted(() => {
    postStore.getPosts()
})
const getUsersPosts = computed(() => {
    const session = user.value;
    const id = session ? session.id : null;
    if (id !== null) {
        return postStore.getUsersPosts(id);
    } else {
        return [];
    }
});
</script>

<style>
.p-speeddial-action-icon {
    line-height: 40px;
}
.pi-trash {
    color: red;
}
</style>