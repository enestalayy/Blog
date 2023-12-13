<template>
    <div>
        <div v-if="showComment" class="card flex flex-col justify-content-center mt-5 ease-in duration-600">
            <form @submit="shareComment" class="flex flex-col gap-2">
                <span class="w-2/3 mx-auto relative">
                    <PrimeTextarea required placeholder="Comment here..." id="comment" class=" w-full rounded-md p-2" v-model="comment"  rows="2" cols="30" autoResize />
                    <PrimeButton class="absolute bottom-3 right-5 border p-1 px-1 rounded" type="submit" label="Share" raised  />
                </span>
            </form>
        </div>
        <PrimeFieldset v-if="getComments" v-for="(comment, index) in getComments" :key="index" class="border-2 text-start pl-2 py-2">
            <template #legend>
                <div class="flex p-fieldset-legend items-center gap-2 border-2 px-2">
                    <PrimeAvatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                    <span class="font-bold">{{ comment.user.full_name }}</span>
                </div>
            </template>
            <p class="m-0 text-xs" >{{ comment.content }}</p>
            <div class="flex items-center justify-around pt-1">
            </div>
        </PrimeFieldset>
    </div>
</template>

<script>
    export default {
        props: ['postId', 'showComment'],
        data() {
            return {
                commentStore: useCommentStore(),
                comment: ''
            }
        },
        mounted() {
            this.commentStore.getComments()
        },
        computed: {
            getComments() {
                return this.commentStore.getCurrentComments(this.postId)
            }
        },
        methods: {
            shareComment() {
                this.commentStore.shareComment(this.comment, this.postId)
            },

        }
    }
</script>

<style scoped>
.p-inputtextarea {
    padding-bottom: 40px;
}
</style>