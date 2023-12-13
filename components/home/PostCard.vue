<template>
    <div>
        <PrimeCard v-for="(post, index) in posts" :key="index" class="w-full border-2 rounded-xl p-2 my-">
            <template #header>
                <h1>{{post.user.full_name}}</h1>
            </template>
            <template #title> {{ post.title }} </template>
            <template #subtitle> {{post.tags}} </template>
            <template #content>
                <p class="m-0 text-start line-clamp-3">
                    {{post.content}}
                </p>
            </template>
            <template  #footer>
                <div class="w-3/4 mx-auto flex items-center justify-between">
                    <PostLikeButton :post="post"/>
                    {{ post.id }}
                    <NuxtLink :to="`/${post.id}`" class="flex items-center border ">View Post<i class="pi pi-caret-right"></i></NuxtLink>
                    <PrimeButton @click="" icon="pi pi-comment" :label="`${post.comments > 0 ? post.comments.length : ''}`" />
                </div>
            </template>
        </PrimeCard>
    </div>
</template>
<script>
export default {
    props: ['posts'],
}
</script>

