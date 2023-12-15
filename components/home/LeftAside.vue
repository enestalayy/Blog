<template>
    <div class="">
        <PrimeFieldset v-for="(post, index) in posts" :key="index" class="border-2 text-start pl-2 py-2">
            <template #legend>
                <div class="flex p-fieldset-legend items-center gap-2 border-2 px-2">
                    <ProfileAvatar :userInfo="post.user" :avatarContainer="'avatar-container-sm'" />
                    <span class="font-bold">{{ post.user.full_name }}</span>
                </div>
            </template>
            <h3>{{ post.title }}</h3>
            <div v-html="post.content" class="m-0 text-xs line-clamp-3"></div>
            <div class="flex items-center justify-around pt-1">
                <PostLikeButton :post="post" />
                <span class="pi pi-comment">{{ post.comments && post.comments.length }}</span>
            </div>
        </PrimeFieldset>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                postStore: usePostStore()
            }
        },
        computed: {
            posts() {
                return this.postStore.$state.posts
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>