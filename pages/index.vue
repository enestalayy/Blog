<script setup>
const postStore = usePostStore();
onMounted(() => {
  postStore.getPosts();
});
const getPosts = computed(() => postStore.posts);
console.log(getPosts)
</script>

<template>
    <div>
        <HomePostCard :posts="getPosts" />
    </div>
</template>


