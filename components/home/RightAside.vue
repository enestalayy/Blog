<template>
    <div class="flex flex-col gap-7 ">
        <ul class="border-2 rounded-md py-1 max-md:border-[var(--dark-bg-darkblue)]">
            <h1>{{ $t('Most Popular Tags') }}</h1>
            <li v-for="(count, tag) in MostPopularTags" :key="tag">
                <div class="flex flex-row items-center justify-start border-t max-md:border-t-[var(--dark-bg-darkblue)] pl-2 py-2">
                <nuxt-link :to="localePath(`/tags/${tag}`)" class="text-sm md:hover:text-[var(--light-text)]">#{{ tag }}</nuxt-link> 
                <h3 class="text-xs pl-2 capitalize">{{ count + $t('post') }}</h3>
                </div>
            </li>
        </ul>
        <ul class="border-2 rounded-md py-1 max-md:border-[var(--dark-bg-darkblue)]">
            <h1>{{ $t('Most Popular Users') }}</h1>
            <li class="p-2 border-t max-md:border-t-[var(--dark-bg-darkblue)]" v-for="(user, index) in MostPopularUsers" :key="index">
                <PostUserCard :userInfo="user" :avatarContainer="'avatar-container-sm'" />
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
    data() {
        return {
            user: useSupabaseUser(),
            postStore: usePostStore(),
        };
    },
    computed: {
        posts() {
            return this.postStore.$state.posts;
        },
        MostPopularTags() {
            const tagCounts = {}
            this.posts.forEach(post => {
                post.tags && (tagCounts[post.tags] = (tagCounts[post.tags] || 0) + 1);
            });
            const top5Tags = Object.fromEntries(
                Object.entries(tagCounts).sort(([, aCount], [, bCount]) => bCount - aCount).slice(0, 5)
            );
            return top5Tags;
        },
        MostPopularUsers() {
            const userCounts = [];
            this.posts.forEach(post => {
                post.user &&
                (userCounts[post.user.id] = post.user);
            });
            const top5Users = Object.values(userCounts).slice(0, 5);
            return top5Users;
        },
    },
    
}
</script>
