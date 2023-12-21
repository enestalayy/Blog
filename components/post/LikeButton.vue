<template>
    <div class="text-center" >
        <PrimeButton @click="updateLikes" class="flex flex-row items-center">
            <i :class="isLiked ? 'pi-heart-fill' : 'pi-heart'" class="pi"></i>
            <p class="inline">{{ postLike() }}</p>
        </PrimeButton>
    </div>
    <PrimeDialog class="bg-[beige] rounded flex flex-col gap-3 p-3 z-50" v-model:visible="showDialog" modal header="Header">
            <template #header>
                <h3 class=" w-2/3 mx-auto">
                    You need to sign in to like the posts
                </h3>
            </template>
            <div class="w-full text-center my-2 p-1 rounded">
                <nuxt-link class="bg-[var(--light-text)] p-2 rounded-md" :to="localePath({ name: 'auth' })">Go to Sign in Page <i class="pi pi-arrow-right"></i></nuxt-link>
            </div>
        </PrimeDialog>
    <div v-show="showDialog" class="backgroundBlur">

    </div>
</template>

<script>
    export default {
        props: ['post'],
        data() {
            return {
                sessionStore: useSessionStore(),
                supabase: useSupabaseClient(),
                postStore: usePostStore(),
                likeStore: useLikesStore(),
                user: useSupabaseUser(),
                showDialog: false
            }
        },
        computed: {
            currentUser() {
                return this.user
            },
            getLikes() {
                const likes = this.likeStore.$state.likes
                return likes
            },
            isLiked() {
                var currentPost = false
                this.currentUser && (currentPost = this.getLikes.find((e) => e.post_id === this.post.id && e.user_id === this.currentUser.id))
                return currentPost ? true : false
            }
        },
        mounted() {
            this.likeStore.getLikes()
            this.postLike()
        },
        methods: {
            async updateLikes() {
                const isLiked = this.isLiked
                if(this.sessionStore.session) {
                    try {
                        if (!isLiked) {
                            await this.likeStore.likePost(this.post, this.currentUser);
                        } else {
                            await this.likeStore.unlikePost(this.post, this.currentUser)
                        }
                    } catch (error) {
                        console.error("Like error:", error);
                    }
                }else this.showDialog = true
            },
            postLike() {
                const postLike = this.getLikes.filter((e) => e.post_id === this.post.id)
                return postLike.length === 0 ? '' : postLike.length + 'like'
            },
            
        },


    }
</script>
