<template>
    <form @submit.prevent="submitRegister" class="flex flex-col items-center mt-5 gap-7" >
            <span class="p-float-label w-fit z-10">
                <PrimeInputText @input="checkFullName" required v-model="name" @focus="nameFocused = true" @blur="nameFocused = false" class="relative" id="name" />
                <label class="absolute left-2" for="name">{{ $t('fullName') }}*</label>
                <PrimeInlineMessage v-if="!nameValid && !nameFocused && name.length > 0" class="absolute top-7 left-0 w-fit flex items-center" severity="info">
                    <span class="pl-1 text-sm whitespace-nowrap">{{ $t('nameError') }}</span>
                </PrimeInlineMessage>
            </span>
            <span class="p-float-label w-fit z-10">
                <PrimeInputText @input="checkEmail" required v-model="email" class="relative" @focus="emailFocused = true" @blur="emailFocused = false" id="email" />
                <label class="absolute left-2" for="email">{{ $t('email') }}*</label>
                <PrimeInlineMessage v-if="!emailValid && !emailFocused && email.length > 0" class="absolute top-7 left-0 w-fit flex items-center" severity="info">
                    <span class="pl-1 text-sm whitespace-nowrap">{{ $t('emailError') }}</span>
                </PrimeInlineMessage>
            </span>
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
            <span class="p-float-label w-fit z-10">
                <PrimeInputMask v-model="phone" mask="(999) 999-9999" />
                <label class="absolute left-2"  for="phone">{{ $t('phone') }}</label>
            </span>
            <PrimeToast class="rounded w-fit bg-yellow-500" />
            <button :class="{ 'dark-modeBtn': isDarkMode, 'light-modeBtn': !isDarkMode }" :disabled="!formValid || userExists" class="z-10 bg-[#41B883] rounded p-1">
                {{ $t('signUp') }}
            </button>
        </form>
</template>
<script>
    export default {
        data() {
            return {
                supabase: useSupabaseClient(),
                i18n: useI18n(),
                localeStore: useLocaleStore(),
                inputCheck: useInputCheck(),
                toast: useToast(),
                name: '',
                phone: '',
                email: '',
                password: '',
                emailFocused: false,
                nameFocused: false,
                nameValid: false,
                passwordFocused: false,
                formValid: false,
                showPasswordError: false,
                userExists: false,
                existEmail: []
            };
        },
        computed: {
            passwordError() {
                return this.inputCheck.$state.passwordError
            },
            emailValid() {
                return this.inputCheck.$state.emailValid
            },
            passwordValid() {
                return this.inputCheck.$state.passwordValid
            },
            isDarkMode() {
                return this.localeStore.$state.isDarkMode
            }
        },  
        methods: {
            checkFullName() {
                this.nameValid = (this.name && this.name.trim().split(/\s+/).length >= 2);
                this.checkFormValidity();
            },
            checkEmail() {
                this.inputCheck.checkEmail(this.email)
                this.checkFormValidity();
            },
            checkPassword() {
                this.inputCheck.checkPassword(this.password)
                this.checkFormValidity();
            },
            checkFormValidity() {
                this.existEmail && (this.userExists = this.existEmail.find((e) => e === this.email))
                this.formValid = this.passwordValid && this.nameValid && this.emailValid && !this.userExists
            },
            async submitRegister() {
                try {
                    const { data, error } = await this.supabase.auth.signUp({
                    email: this.email,
                    password: this.password,
                    full_name: this.name,
                    options: {
                        data: {
                        full_name: this.name,
                        phone: this.phone,
                    },
                    }
                    });
                    if (error) {
                        console.error('Supabase hatası:', error.message);
                    } else {
                        console.log('Kullanıcı başarıyla eklendi:', data);
                    }
                } catch (error) {
                    console.error('Bir hata oluştu:', error.message);
                }
                // if (this.inputCheck.emailExist(this.email)){
                //     this.toast.add({ severity: 'warn', summary: this.$t('emailExistWarn') });
                //     console.log('kullanıcı mevcut!')
                //     this.existEmail.push(this.email)
                //     this.checkFormValidity()
                // }else {
                //     try {
                //         const { data, error } = await this.supabase.from('users').insert([
                //         { 
                //             full_name: this.name, 
                //             email: this.email,
                //             password: this.password,
                //             phone: this.phone, 
                //         },
                //         ]);
                //         if (error) {
                //             console.error('Supabase hatası:', error);
                //         } else {
                //             console.log('Kullanıcı başarıyla eklendi:', data);
                //         }
                //     } catch (error) {
                //         console.error('Bir hata oluştu:', error.message);
                //     }
                // }
            },
        }
    }
</script>
<style>
.p-toast-message-content {
    display: flex;
    align-items: center;
    padding: 10px;
    width: 30vw;
}
.p-toast-message-text {
    padding-left: 10px;
}
</style>