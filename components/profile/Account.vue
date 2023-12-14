<template>
  <div v-if="userInfo" class="border-2 rounded w-full h-40 flex flex-row p-5 justify-between relative">
    <ProfileEditAvatar :avatarContainer="'avatar-container-xl'" />
    <div class="flex flex-col items-start text-sm gap-2 justify-center pr">
        <div class="flex flex-row items-center ">
          <input v-if="editAccount" v-model="newName" @input="this.inputCheck.checkFullName(newName)" :placeholder="metaData.full_name" type="text">
          <h3 v-else>{{ metaData.full_name }}</h3>
          <button v-if="editAccount" :disabled="!nameValid" @click="this.sessionStore.editMetaData(['full_name', newName])" class="pi pi-pencil ml-2 p-1 border rounded-full"></button>
        </div>
        <div class="flex flex-row items-center ">
          <input v-if="editAccount" v-model="username" required placeholder="Username" type="text">
          <h3 v-else v-if="metaData.username">{{ metaData.username }}</h3>
          <button v-if="editAccount" @click="this.sessionStore.editMetaData(['username', username])" class="pi pi-pencil ml-2 p-1 border rounded-full"></button>
        </div>
        <div class="flex flex-row items-center">
          <input v-if="editAccount" v-model="newEmail" @input="this.inputCheck.checkEmail(newEmail)" :placeholder="userInfo.email" type="text">
          <h3 v-else>{{ userInfo.email }}</h3>
          <button v-if="editAccount" :disabled="!emailValid" @click="this.sessionStore.editMetaData(newEmail)" class="pi pi-pencil ml-2 p-1 border rounded-full"></button>
        </div>
        <div class="flex flex-row items-center">
          <PrimeInputMask v-if="editAccount" mask="(+99) 999-999-9999" v-model="newPhone" type="text" :placeholder="metaData.phone" />
          <h3 v-else v-if="metaData.phone">{{ metaData.phone }}</h3>
          <button v-if="editAccount" @click="this.sessionStore.editMetaData(['phone', newPhone])" class="pi pi-pencil ml-2 p-1 border rounded-full"></button>
        </div>
    </div>
    <div class="flex flex-col justify-end">
        <PrimeSpeedDial :model="items" :radius="60" showIcon="pi pi-cog" type="quarter-circle" direction="down-left" :style="{ right: '8px', top: 0 }" />
        <h5 class="text-xs">Joined at {{ handleDate }}</h5>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: useSupabaseUser(),
        sessionStore: useSessionStore(),
        inputCheck: useInputCheck(),
        metaData: null,
        items: [
          {
            label: 'Add',
            icon: 'pi pi-pencil',
            command: () => { this.sessionStore.toggleEditAccount()  }
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
            }
          },
        ]
      }
    },
    computed: {
      userInfo() {
        this.metaData = this.user.user_metadata
        return this.user
      },
      handleDate() {
        return this.sessionStore.handleDate(this.user.created_at)
      },
      nameValid() {
        return this.inputCheck.nameValid
      },
      emailValid() {
        return this.inputCheck.emailValid
      },
      editAccount() {
        return this.sessionStore.editAccount
      },
      
    },
    method: {
      editMetaData() {
        this.sessionStore.editMetaData()
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
