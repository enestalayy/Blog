<template>
    <div>
        <div :class="avatarContainer">
            <PrimeAvatar v-if="!userInfo.avatar" :label="getInitials(userInfo.full_name)" class="flex items-center justify-center bg-[var(--light-text)] border border-black w-full h-full whitespace-nowrap" shape="circle" />
            <div v-else class="avatar-image" :style="{ backgroundImage: 'url(' + userInfo.avatar + ')' }"></div>
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
        },
        methods: {
            getInitials(fullName) {
            const [firstName, lastName] = fullName.split(' ');
            return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
            }
        }
    }
</script>
