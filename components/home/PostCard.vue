<template>
    <div>
        <PrimeCard v-for="(post, index) in getpost" :key="index" class="w-full border-2 border-[lime] rounded-xl p-2 my-">
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
                    <button class="flex items-center border ">View Post<i class="pi pi-caret-right"></i></button>
                    <PrimeButton @click="" icon="pi pi-comment" :label="`${post.comments > 0 ? post.comments.length : ''}`" />
                </div>
            </template>
        </PrimeCard>
    </div>
</template>
<script>
export default {
    data() {
        return {
            supabase: useSupabaseClient(),
            postStore: usePostStore(),
        }
    },
    methods:{

    },  
    mounted() {
        this.postStore.getPosts()
    },
    computed: {
        getpost() {
            return this.postStore.$state.posts
        }
    }
}
</script>
<!-- <template>
    <div>
        <PrimeCard class="w-full">
            <template #header>
                <h1>User Avatar</h1>
            </template>
            <template #title> Card Title </template>
            <template #subtitle> Card subtitle </template>
            <template #content>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
            </template>
            <template #footer>
                <Button icon="pi pi-check" label="Save" />
                <Button icon="pi pi-times" label="Cancel" severity="secondary" style="margin-left: 0.5em" />
            </template>
        </PrimeCard>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                supabase: useSupabaseClient()
            }
        },
        mounted() {
            // async function getPosts() {
            //     const { data, error } = await supabase
            //         .from('posts') // 'users' tablosunu seç
            //         .select('*'); // Tüm sütunları seç

            //     if (error) {
            //         console.error('Veri çekme hatası:', error.message);
            //         return null;
            //     }

            //     return data;
            // }
        },  
    },
    
</script> -->
