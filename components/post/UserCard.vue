<template>
    <div>
        <nuxt-link class="flex flex-row items-center" :to="postOwner ? localePath({ name: 'profile' }) : localePath({ name: 'profile' }) + '/' + userInfo.id">
            <ProfileAvatar :userInfo="user" :avatarContainer="avatarContainer" />
            <div class="flex flex-col items-start pl-1">
                <span class="font-bold text-xs capitalize">{{ user.full_name }}</span>
                <span v-if="user.username" class="text-xs">@{{ user.username }}</span>
            </div>
        </nuxt-link>
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
            default: 'avatar-container-md'
            }
        },
        data() {
            return {
                sessionUser: useSupabaseUser(),
                user: this.userInfo.user_metadata,
            }
        },
        computed: {
            postOwner() {
                if(this.sessionUser){
                    return this.sessionUser.id === this.userInfo.id ? true : false
                }
            }
        }
    }
</script>

<style>

</style>