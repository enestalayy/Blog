<template>
    <div class="">
                <PrimeFieldset v-for="(post, index) in posts" :key="index" class="border-2 text-start pl-2 py-2">
                    <template #legend>
                        <div class="flex p-fieldset-legend items-center gap-2 border-2 px-2">
                            <PrimeAvatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                            <span class="font-bold">{{ post.user.full_name }}</span>
                        </div>
                    </template>
                    <h3>{{ post.title }}</h3>
                    <p class="m-0 text-xs line-clamp-3">
                        {{ post.content }}
                    </p>
                    <div class="flex items-center justify-around pt-1">
                        <span class="pi pi-heart">{{ post.likes && post.likes.length }}</span>
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