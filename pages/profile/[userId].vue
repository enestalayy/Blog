<template>
  <div>
    <div v-if="userData" class="w-full h-32 px-2 border rounded flex flex-row items-center justify-between max-md:text-sm">
        <ProfileAvatar :userInfo="userData.user_metadata" :avatarContainer="'avatar-container-xl'" />
       <div class="flex flex-col items-start">
            <h3>{{ userData.user_metadata.full_name }}</h3>
            <h3>{{ userData.email }}</h3>
            <h3 v-show="userData.user_metadata.username">@{{ userData.user_metadata.username }}</h3>
       </div>
       <div class="flex flex-col h-[100%] w-1/4 justify-end">
            <h5 class="text-xs flex wrap">{{ $t('Joined at')+ ' ' + handleDate }}</h5>
        </div>
    </div>
    <HomePostCard class="rounded-none" :posts="getUsersPosts" />
  </div>
</template>

<script setup>
    const { params } = useRoute();
    const userId = ref(params.userId);
    const postStore = usePostStore()
    const sessionStore = useSessionStore()
    definePageMeta({
      layout: 'profile',
    });
    const userData = ref(null);
    onMounted(async () => {
        postStore.getPosts();
        const user = await postStore.getAuthor(userId.value);
        console.log(user)
        userData.value = user;
    });
    
    const getUsersPosts = computed(() => {
    if (userId.value !== null) {
        return postStore.getUsersPosts(userId.value);
    } else {
        return [];
    }
    });

    const handleDate = computed(() => sessionStore.handleDate(userData.value.created_at))

</script>

<style scoped>
</style>
