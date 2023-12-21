<template>
    <div class="flex flex-col gap-5">
        <h1>Most Liked Posts</h1>
        <PrimeFieldset v-if="mostLikedPosts" v-for="(post, index) in mostLikedPosts" :key="index" class="border-2 rounded text-start pl-2 py-2 relative">
            <template #legend>
                <div class="flex p-fieldset-legend items-center gap-2 border-2 px-2">
                    <PostUserCard :userInfo="post.user" :avatarContainer="'avatar-container-sm'" />
                </div>
            </template>
            <div class="flex flex-row items-center px-1 justify-between">
                <h3 class="text-sm line-clamp-1 ">{{ post.title }}</h3>
                <p class="text-xs">{{ this.postStore.handlePostDate(post.updated_at) }}</p>
            </div>
            <h3 class="text-xs pl-2">#{{ post.tags }}</h3>
            <div v-html="post.content" class="m-0 text-xs break-all line-clamp-3"></div>
            <div class="flex items-center justify-around pt-1">
                <PostLikeButton :post="post" />
                <h3 v-show="getComment(post.id)">{{ getComment(post.id) + 'comment' }}</h3>
            </div>
            <PostEditPost :post="post" v-show="user && (user.id === post.author_id)" />
        </PrimeFieldset>
    </div>
</template>

<script>

    export default {
    data() {
        return {
            user: useSupabaseUser(),
            postStore: usePostStore(),
            commentStore: useCommentStore(),
            likeStore: useLikesStore(),
            postLikes: {}
        };
    },
    computed: {
        posts() {
            return this.postStore.posts;
        },
        likes() {
            return this.likeStore.likes
        },
        mostLikedPosts() {
            return this.likeStore.mostLikedPosts()
        }
    },
    methods: {
        getComment(id) {
            return this.commentStore.getCurrentComments(id) && this.commentStore.getCurrentComments(id).length
        },
    }
}
</script>
