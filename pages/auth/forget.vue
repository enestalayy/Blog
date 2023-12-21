<template>
    <div class="w-full h-[100vh] flex flex-col items-center justify-center gap-5 ">
        <form @submit.prevent="updatePassword" class="flex flex-col items-center justify-center gap-10 bg-[beige] rounded-xl p-10" >
            <h3 class="p-3">Update your Password</h3>
            <span class="p-float-label w-fit z-10">
                <PrimePassword required v-model="password" @input="checkPassword" @focus="passwordFocused = true" @blur="passwordFocused = false" toggle-mask :feedback="false" />
                <label class="absolute left-2" for="password">{{ $t('password') }}*</label>
                <span
                    @mouseover="showPasswordError = true"
                    @mouseout="showPasswordError = false"
                    v-if="!passwordFocused && !passwordValid && password"
                    class="pi pi-info-circle absolute left-[-25px] top-1 text-xl">
                </span>
            </span>
            <ul id="errorPassword" v-if="showPasswordError" :class="{ 'dark-modeBtn': isDarkMode, 'light-modeBtn': !isDarkMode }" class="mt-0 whitespace-nowrap w-fit absolute z-20 mx-0 top-36 rounded">
                    <li v-if="passwordError" v-for="(error, index) in passwordError" class="text-sm" :key="index">
                        <span class="p-2">{{i18n.t(`${error}`)}}</span>
                    </li>
            </ul>
            <button :class="{ 'dark-modeBtn': isDarkMode, 'light-modeBtn': !isDarkMode }" :disabled="!passwordValid" class="z-10 bg-[#41B883] rounded p-1">
                Change Password
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        setup() {
            definePageMeta({
                layout: 'forget'
            })
        },
        data() {
            return {
                supabase: useSupabaseClient(),
                i18n: useI18n(),
                sessionStore: useSessionStore(),
                inputCheck: useInputCheck(),
                password: '',
                passwordFocused: false,
                showPasswordError: false,
            }
        },
        computed: {
            passwordError() {
                return this.inputCheck.$state.passwordError
            },
            passwordValid() {
                return this.inputCheck.$state.passwordValid
            },
        },  
        methods: {
            checkPassword() {
                this.inputCheck.checkPassword(this.password)
            },
            async updatePassword() {
                try {
                    await this.supabase.auth.updateUser({ password: this.password })
                    this.sessionStore.navigateToHome()
                } catch (error) {
                    throw error
                }
            }
        }
    }
</script>

<style>

</style>