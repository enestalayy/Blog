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
    const postStore = usePostStore()
    onMounted(() => {
        postStore.getPosts();
    });
    const tagPosts = computed(() => postStore.posts.filter((e) => e.tags === tag))
</script>
