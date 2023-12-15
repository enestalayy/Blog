<template>
    <div class="flex flex-row items-center">
        <ProfileAvatar :userInfo="user" :avatarContainer="'avatar-container-sm'" />
        <div class="flex flex-col items-start pl-1">
            <span class="font-bold text-xs capitalize">{{ user.full_name }}</span>
            <span v-if="user.username" class="text-xs">@{{ user.username }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['user']
        
    }
</script>

<style lang="scss" scoped>

</style>