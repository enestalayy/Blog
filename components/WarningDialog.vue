<template>
    <div>
        <PrimeDialog class="bg-[beige] rounded flex flex-col gap-3 p-3 z-50" v-model:visible="postStore.showDialog" modal header="Header">
            <template #header>
                <h3 class=" w-2/3 mx-auto">
                    {{ $t(`dialogMessages.${dialogMessage}`) }}
                </h3>
            </template>
            <div class="w-full text-center my-2 p-1 rounded">
                <nuxt-link class="bg-[var(--light-text)] p-2 rounded-md" :to="localePath({ name: 'auth' })">{{ $t('dialogMessages.toSignIn') }} <i class="pi pi-arrow-right"></i></nuxt-link>
            </div>
        </PrimeDialog>
        <div v-show="showDialog" class="backgroundBlur"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                t: useI18n(),
                postStore: usePostStore(),
            }
        },
        computed: {
            showDialog() {
                return this.postStore.showDialog
            },
            dialogMessage() {
                return this.postStore.dialogMessage
            }
        }
    }
</script>