<template>
    <div>
        <div v-if="getSession" class="border-2 rounded w-full h-40 flex flex-row p-5 justify-between relative">
            <div class="flex flex-col">
                <PrimeAvatar :label="`${getSession.user_metadata.full_name[0]}`" class="p-10 my-auto" shape="circle" />
                <PrimeFileUpload v-if="editAccount" class="border rounded p-1 text-xs p-fileupload-file-thumbnail" mode="basic" name="demo[]" url="public/avatar1.png" accept="image/*" :maxFileSize="1000000" @upload="sessionStorage.onUpload(event)" :auto="true" chooseLabel="Edit Avatar" />
            </div>
            <div class="flex flex-col items-start text-sm gap-2 justify-center pr">
                <h3>{{ getSession.user_metadata.full_name }}</h3>
                <h3>{{ getSession.email }}</h3>
                <h3 v-if="getSession.user_metadata.phone">{{ getSession.user_metadata.phone }}</h3>
            </div>
            <div class="flex flex-col justify-end">
                <PrimeSpeedDial :model="items" :radius="60" showIcon="pi pi-cog" type="quarter-circle" direction="down-left" :style="{ right: '8px', top: 0 }" />
                <h5 class="text-xs">Joined at {{ handleDate }}</h5>
            </div>
        </div>

        <HomePostCard class="rounded-none" :posts="getUsersPosts" />
    </div>
</template>

<script setup>
definePageMeta({
        layout: 'profile'
    })
const postStore = usePostStore()
const sessionStore = useSessionStore()
const supabase = useSupabaseClient()
onMounted(() => {
    postStore.getPosts()
    sessionStore.getSession()
})
const getSession = computed(() => sessionStore.session)
const getUsersPosts = computed(() => {
    const session = getSession.value;
    const id = session ? session.id : null;
    if (id !== null) {
        return postStore.getUsersPosts(id);
    } else {
        return [];
    }
});

const editAccount = ref(false)
const handleDate = computed(() => sessionStore.handleDate(getSession.value.created_at))


const items = ref([
    {
        label: 'Add',
        icon: 'pi pi-pencil',
        command: () => { editAccount.value = !editAccount.value }
    },
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        }
    },
    {
        label: 'Upload',
        icon: 'pi pi-upload',
        command: () => {
            router.push('/fileupload');
        }
    },
    {
        label: 'Vue Website',
        icon: 'pi pi-external-link',
        command: () => {
            window.location.href = 'https://vuejs.org/'
        }
    }
])
</script>

<style>
.pi {
    line-height: 30px;
}
.pi-trash {
    color: red;
}
</style>