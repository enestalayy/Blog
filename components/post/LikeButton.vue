<template>
    <div>
        <PrimeButton :class="isLiked ? 'pi-heart-fill' : 'pi-heart'" @click="likePost" class="pi">{{ getLikeNumber }}</PrimeButton>
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
                isLiked: false,
                likes: null
            }
        },
        computed: {
            currentUser() {
                return this.sessionStore.$state.session
            },
            getLikes() {
                return this.likeStore.$state.likes
            },
            getLikeNumber() {
                const postLike = this.getLikes.filter((e) => e.post_id === this.post.id)
                return postLike.length
            }
        },
        mounted() {
            this.likeStore.getLikes()
        },
        methods: {
            async likePost() {
                this.isLiked = !this.isLiked
                if (this.isLiked === true) {
                    try {
                        await this.likeStore.likePost(this.post, this.currentUser);
                    } catch (error) {
                        console.error("Like error:", error);
                    }
                } else {

                }
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>