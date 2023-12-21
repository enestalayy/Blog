<template>
    <div>
        <PrimeFieldset v-for="(post, index) in latestPosts" :key="index" class="w-full border-2 text-start rounded-xl p-2 my-3 relative">
            <template #legend>
                <div class="flex p-fieldset-legend items-center gap-2 border-2 px-2">
                    <PostUserCard :userInfo="post.user" :avatarContainer="'avatar-container-md'"  />
                </div>
            </template>
            <div class="flex flex-row justify-between ">
                <h3 class="capitalize">{{ post.title }}</h3>
                <p class="text-xs whitespace-nowrap">{{ this.postStore.handlePostDate(post.created_at) }}</p>
            </div>
            <h3 class="text-sm">#{{ post.tags }}</h3>
            <div v-html="post.content" class="m-0 text-xs break-all line-clamp-3"></div>
            <div class="flex items-center justify-around pt-1">
                <PostLikeButton :post="post" />
                <button @click="sessionToPost(post.id)">
                    <i class="pi pi-comment"></i>
                    {{ getComments(post.id) && getComments(post.id).length + 'comment' }}
                </button>
                <button @click="sessionToPost(post.id)"><PrimeButton class="border rounded p-1" >View Post <i class="pi pi-arrow-right text-xs pl-1"></i></PrimeButton></button>
            </div>
            <PrimeToast />
            <PostEditPost v-show="this.user &&(post.author_id === this.user.id)" :post="post" />
            <PrimeDialog v-if="showDialog" class="bg-[beige] rounded flex flex-col gap-3 p-3" v-model:visible="showDialog" modal header="Header">
                    <template #header>
                        <h3 class=" w-2/3 mx-auto">
                            You need to sign in to see the posts or comments
                        </h3>
                    </template>
                    <div class="w-full text-center my-2 p-1 rounded">
                        <nuxt-link class="bg-[var(--light-text)] p-2 rounded-md" :to="localePath({ name: 'auth' })">Go to Sign in Page <i class="pi pi-arrow-right"></i></nuxt-link>
                    </div>
                </PrimeDialog>
            <div v-show="showDialog" class="backgroundBlur">
            </div>
        </PrimeFieldset>
        <button v-show="nextPageExists" @click="loadMorePosts">Daha Fazla Göster</button>
    </div>
</template>
<script>
export default {
    props: ['posts'],
    data() {
        return {
            user: useSupabaseUser(),
            postStore: usePostStore(),
            sessionStore: useSessionStore(),
            commentStore: useCommentStore(),
            router: useRouter(),
            showDialog: false,
            bottomReached: false
        }
    },
    mounted() {
        this.sessionStore.getSession();
        this.commentStore.getComments()
    },
    computed: {
        latestPosts() {
            const sortedPosts = [...this.posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            const end = this.postStore.currentPage * this.postStore.postsPerPage;
            return sortedPosts.slice(0, end);
        },
        getSession() {
            return this.sessionStore.session
        },
        
        nextPageExists() {
            return this.posts.length >= this.postStore.currentPage * 10
        }
    },
    methods: {
        toggle(event) {
            if (Array.isArray(this.$refs.menu)) {
                this.$refs.menu.forEach(menuItem => {
                    menuItem.toggle(event);
                });
            }
        },
        sessionToPost(postId) {
            this.getSession
            ? this.router.push(`post/${postId}`)
            : this.showDialog = true   
        },
        loadMorePosts() {
            this.postStore.setPage(this.postStore.currentPage + 1);
        },
        getComments(postId) {
            this.commentStore.getCurrentComments(postId)
        },
    }
}
</script>
<style>
.p-menu-list {
    display: flex;
    flex-direction: column;
    padding: 3px;
    gap: 8px;
    color: beige;
    border-radius: 5px;
    background-color: var(--light-text);
}
</style>
