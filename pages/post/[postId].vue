<script setup>
    definePageMeta({
        layout: 'profile'
    })
    const { postId } = useRoute().params
    const postStore = usePostStore()
    const commentStore = useCommentStore()
    const showComment = ref(false)
    const toggleComment = () => {showComment.value = !showComment.value}
    onMounted(() => {
        postStore.getPosts();
    });
    const post = computed(() => {
        return postStore.getCurrentPost(postId)
    })
    const comments = computed(() => commentStore.getCurrentComments(postId))
</script>

<template>
    <div>
        <PrimeCard v-if="post" class="w-full border-2 border-[lime] rounded-xl p-2 my-">
            <template #header>
                <h1>{{post.user.full_name}}</h1>
            </template>
            <template #title> {{ post.title }} </template>
            <template #subtitle> {{post.tags}} </template>
            <template #content>
                <div class="text-start" v-html="post.content"></div>
            </template>
            <template  #footer>
                <div class="w-3/4 mx-auto flex items-center justify-between">
                    <PostLikeButton :post="post"/>
                    <PrimeButton @click="toggleComment()" icon="pi pi-comment" :label="`${comments.length > 0 ? comments.length : ''}`" />
                </div>
            </template>
        </PrimeCard>
        <PostCommentCards :showComment="showComment" :postId="postId" />
    </div>
</template>