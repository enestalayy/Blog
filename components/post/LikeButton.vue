<template>
    <div>
        <PrimeButton :class="isLiked ? 'pi-heart-fill' : 'pi-heart'" @click="updateLikes" class="pi">{{ postLike() }}</PrimeButton>
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
                user: useSupabaseUser()
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
                console.log(isLiked)
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
            
        },


    }
</script>

<style lang="scss" scoped>

</style>