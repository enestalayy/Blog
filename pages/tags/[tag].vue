<template>
    <div>
        <HomePostCard :posts="tagPosts" />
    </div>
</template>

<script setup>
    definePageMeta({
        layout: 'default'
    })
    const { tag } = useRoute().params
    const { t } = useI18n()
    const postStore = usePostStore()
    onMounted(() => {
        postStore.getPosts();
    });
    const tagPosts = computed(() => postStore.posts.filter((e) => e.tags === tag))
</script>
