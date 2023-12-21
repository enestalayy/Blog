<script setup>
const postStore = usePostStore();
onMounted(() => {
  postStore.getPosts();
});
const getPosts = computed(() => postStore.posts);
</script>

<template>
    <div>
        <HomePostCard :posts="getPosts" />
        
    </div>
</template>


