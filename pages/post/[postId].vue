<script setup>
    definePageMeta({
        layout: 'profile'
    })
    const route = useRoute()
    const { postId } = route.params
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
        <PrimeFieldset v-if="post" class="w-full border-2 text-start rounded-xl p-2 my-3 relative">
            <template #legend>
                <div class="flex items-center gap-2 border-2 rounded-md px-2">
                    <PostUserCard :userInfo="post.user" :avatarContainer="'avatar-container-md'" />
                </div>
            </template>
            <div class="flex flex-col gap-2">
                <h3 class="capitalize text-lg"> {{ post.title }} </h3>
                <h3 class="text-md"> {{post.tags}} </h3>
                <div class="text-start text-sm break-all" v-html="post.content"></div>
                <div class="w-3/4 mx-auto flex items-center justify-between my-1">
                    <PostLikeButton :post="post"/>
                    <PrimeButton @click="toggleComment()" icon="pi pi-comment" :label="`${comments.length > 0 ? comments.length : ''}`" />
                </div>
            </div>
        </PrimeFieldset>
        <h3 v-show="!comments.length">No comments yet</h3>
        <PostCommentCards :showComment="showComment" :postId="postId" />
    </div>
</template>
