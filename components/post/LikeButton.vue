<template>
    <div>
        <PrimeButton :class="isLiked() ? 'pi-heart-fill' : 'pi-heart'" @click="updateLikes" class="pi">{{ postLike()  }}</PrimeButton>
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
            }
        },
        computed: {
            currentUser() {
                return this.sessionStore.$state.session
            },
            getLikes() {
                const likes = this.likeStore.$state.likes
                return likes
            },
            
        },
        mounted() {
            this.likeStore.getLikes()
            this.postLike()
            this.isLiked()
        },
        methods: {
            async updateLikes() {
                const isLiked = this.isLiked()
                try {
                    if (!isLiked) {
                        await this.likeStore.likePost(this.post, this.currentUser);
                    } else {
                        await this.likeStore.unlikePost(this.post, this.currentUser)
                    }
                } catch (error) {
                    console.error("Like error:", error);
                }
            },
            postLike() {
                const postLike = this.getLikes.filter((e) => e.post_id === this.post.id)
                return postLike.length
            },
            isLiked() {
                const currentPost = this.getLikes.find((e) => e.post_id === this.post.id && e.user_id === this.currentUser.id)
                return currentPost ? true : false
            }
        },


    }
</script>

<style lang="scss" scoped>

</style>