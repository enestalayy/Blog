<template>
    <div>
        <PrimeAvatar v-if="!userInfo.avatar" :label="userInfo.full_name[0]" class="p-10 my-auto" shape="circle" />
        <div v-else :class="avatarContainer">
            <div class="avatar-image" :style="{ backgroundImage: 'url(' + userInfo.avatar + ')' }"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            userInfo: {
            type: Object,
            default: null
            },
            avatarContainer: {
            type: String,
            default: 'avatar-container-xl'
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>