<template>
    <form @submit.prevent="handleLogin" class="flex flex-col items-center mt-5 gap-7">
        <span class="p-float-label w-fit z-10">
            <PrimeInputText @input="checkEmail" v-model="email" class="relative" id="email" />
            <label class="absolute left-2" for="email">{{ $t('email') }}</label>
        </span>
        <span class="p-float-label w-fit z-10">
            <PrimePassword @input="checkPassword" v-model="password" class="relative" inputId="password" :feedback="false"/>
            <label class="absolute left-2" for="password">{{ $t('password') }}</label>
        </span>
        <button :class="{ 'dark-modeBtn': isDarkMode, 'light-modeBtn': !isDarkMode }" :disabled="!formValid" class="z-10 rounded p-1 relative" @mouseover="showWarning = true" @mouseout="showWarning = false">
            {{ $t('logIn') }}
            <PrimeInlineMessage v-if="showWarning && !formValid && this.email && this.password" class="absolute top-[120%] left-[-120%] text-sm whitespace-nowrap w-fit flex items-center" severity="info">
                <span class="pl-1">{{ $t('incorrectError') }}</span>
            </PrimeInlineMessage>
        </button>
        <button class="z-10 text-sm forgotBtn">
            {{ $t('forgot') }}
        </button>
        <div>{{ $t('loginWith') }}</div>
        <button @click="handleGoogleLogin" class="z-10 text-sm forgotBtn">
            Google
        </button>
    </form>
</template>
<script>
    export default {
        data() {
            return {
                supabase: useSupabaseClient(),
                localeStore: useLocaleStore(),
                inputCheck: useInputCheck(),
                email: '',
                password: '',
                formValid: false,
                showWarning: false,
            };
        },
        computed: {
            isDarkMode() {
                return this.localeStore.$state.isDarkMode
            }
        },  
        methods: {
            checkEmail() {
                this.inputCheck.checkEmail(this.email)
                this.checkFormValidity();
            },
            checkPassword() {
                this.inputCheck.checkPassword(this.password)
                this.checkFormValidity();
            },
            checkFormValidity() {
                this.formValid = this.inputCheck.$state.passwordValid && this.inputCheck.$state.emailValid
            },
            async handleLogin() {
                try {
                    const { data, error } = await this.supabase.auth.signInWithPassword({
                        email: this.email,
                        password: this.password,
                    });
                    if (error) {
                        console.error('Giriş yapılırken hata:', error.message);
                    } else {
                        console.log('Giriş başarılı:', data);
                        const user = data.user;
                        console.log('Kullanıcı bilgileri:', user);
                    }
                } catch (error) {
                    console.error('Bir hata oluştu:', error.message);
                }
            },
            async handleGoogleLogin() {
                try {
                    const { error } = await this.supabase.auth.signInWithOAuth({
                    provider: 'google',
                    });
                    if (error) {
                    console.error('Google ile giriş yapılırken hata:', error.message);
                    }
                } catch (error) {
                    console.error('Bir hata oluştu:', error.message);
                }
            },
        }
    }
</script>
<style>
label{
    transition: all 0.15s ease-in-out;
}
button:disabled {
    background-color: rgba(65, 185, 131, 0.2);
}
.p-inputtext {
    padding-left: 5px;
}
</style>
