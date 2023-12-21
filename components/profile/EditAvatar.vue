<template>
    <div>
        <ProfileAvatar :userInfo="userInfo.user_metadata" />
        <PrimeFileUpload v-if="editAccount"  class="border rounded p-1 text-xs p-fileupload-file-thumbnail" mode="basic" name="demo[]" accept="image/*" :maxFileSize="1000000" @upload="uploadAvatar" :auto="true" chooseLabel="Edit Avatar" />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: useSupabaseUser(),
                supabase: useSupabaseClient(),
                sessionStore: useSessionStore()
            }
        },
        computed: {
            userInfo() {
                return this.user
            },
            editAccount() {
                return this.sessionStore.editAccount
            }
        },
        methods: {
            async uploadAvatar(e) {
                try {
                    const url = 'https://gwejflvbgemmsrdoypvm.supabase.co/storage/v1/object/public/'
                    const avatarFile = e.files[0];
                    console.log(avatarFile)
                    const { data: storageData, error: storageError } =
                    await this.supabase.storage
                        .from("avatars")
                        .upload('public/' + this.user.id, avatarFile, {
                        cacheControl: "3600",
                        upsert: true,
                        });
                    if (storageError) {
                    console.error("Dosya yüklenirken bir hata oluştu:", storageError);
                    return;
                    }
                    const { user, error } = await this.supabase.auth.updateUser({
                        data: {avatar: url + storageData.fullPath},
                    });
                    error && console.error('user güncellenirken hata: ', error.message)
                    console.log("user başarıyla güncellendi:", user);
                    console.log("Dosya başarıyla yüklendi:", storageData);
                } catch (error) {
                    console.error('Error downloading image: ', error.message)
                }
            }
        },
        
    }
</script>
<style scoped>

</style>
