<template>
    <div class="flex flex-col gap-5 ">
        <h1 class="text-xl border-2 rounded">{{ $t('Most Liked Posts') }}</h1>
        <PrimeFieldset v-if="mostLikedPosts" v-for="(post, index) in mostLikedPosts" :key="index" class="border-2 rounded text-start pl-2 py-2 relative max-md:border-[var(--dark-bg-darkblue)]">
            <template #legend>
                <div class="flex max-md:border-[var(--dark-bg-darkblue)] p-fieldset-legend items-center gap-2 border-2 px-2">
                    <PostUserCard  :userInfo="post.user" :avatarContainer="'avatar-container-sm'" />
                </div>
            </template>
            <div class="flex flex-row items-center px-1 justify-between">
                <h3 class="text-sm line-clamp-1 capitalize">{{ post.title }}</h3>
                <p class="text-xs">{{ this.postStore.handlePostDate(post.updated_at) }}</p>
            </div>
            <nuxt-link :to="localePath(`/tags/${post.tags}`)" class="text-xs pl-2">#{{ post.tags }}</nuxt-link>
            <div v-html="post.content" class="m-0 text-xs break-all line-clamp-3"></div>
            <div class="flex items-center justify-around pt-1">
                <PostLikeButton :post="post" />
                <h3 v-show="getComment(post.id)">{{ getComment(post.id) + $t('comment') }}</h3>
                <PrimeButton @click="sessionToPost(post.id)" class="border rounded max-md:border-[var(--dark-bg-darkblue)] p-1 text-sm" >
                    {{ $t('View Post') }} <i class="pi pi-arrow-right text-xs pl-1"></i>
                </PrimeButton>
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
            router: useRouter(),
            postStore: usePostStore(),
            sessionStore: useSessionStore(),
            commentStore: useCommentStore(),
            likeStore: useLikesStore(),
            postLikes: {},
            showDialog: false
        };
    },
    mounted() {
        this.sessionStore.getSession();
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
        },
        getSession(){
            return this.sessionStore.session
        }
    },
    methods: {
        getComment(id) {
            return this.commentStore.getCurrentComments(id) && this.commentStore.getCurrentComments(id).length
        },
        sessionToPost(postId) {
            this.getSession
            ? this.router.push(this.localePath(`/post/${postId}`))
            : this.postStore.activeDialog('viewPost')   
        },
    }
}
</script>
