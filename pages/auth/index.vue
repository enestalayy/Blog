<template>
  <section id="form" class="flex flex-col items-center justify-start mt-[10vh] mx-auto h-screen text-white-500 w-full">
        <div class="mx-auto mt-5 z-50 border-2 border-[#41B883] rounded w-1/2 h-7">
            <button @click="showLoginForm" :class="{ 'active': activeForm === 'login'}" class="border-r-2 border-[#41B883] h-full text-center w-1/2 max-md:text-sm" >{{ $t('logIn') }}</button>
            <button @click="showRegisterForm" :class="{ 'active': activeForm === 'register'}" class="border-l-2 border-[#41B883] h-full text-center w-1/2 max-md:text-sm" >{{ $t('signUp') }}</button>
        </div>
        <div class="mt-10 h-3/4 relative" :class="{ flipLeft: activeForm === 'register', flipRight: activeForm === 'login'}">
            <AuthLogin class="absolute w-[190px] left-[-95px] loginForm" :class="{flip: activeForm === 'login'}" v-if="activeForm === 'login'"  />
            <AuthRegister class="absolute w-[190px] left-[-95px] signUpForm" v-if="activeForm === 'register'"  />
        </div>
        <ul class="animate">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
    </section>
</template>
<script setup>
    definePageMeta({
        layout: 'auth'
    })
    const activeForm = ref('login');
    const showLoginForm = () => {
        activeForm.value = 'login';
    };
    const showRegisterForm = () => {
        activeForm.value = 'register';
    };
</script>
<style scoped>
#form {
    width: 350px;
    position: relative;
    box-shadow: 0px 0px 25px #41B883;
    border-radius: 10px;
    height: 450px;
    overflow: hidden;
    transform-style: preserve-3d;
}
.flipRight {
    transform: rotateY(180deg);
    transition: all 0.5s;
}
.flipLeft {
    transform: rotateY(0deg);
    transition: all 0.5s;
}
.flip {
  transform: rotateY(180deg);
}
.active {
  background-color: #41B883;
}
#form form{
    transition: all .3s linear;
}
@media (max-width: 767px) {
    #form {
        width: 290px !important;
    }
}
@media (max-width: 639px) {
    #form {
        width: 250px !important;
    }
    .signUpForm {
        left: -93px;
    }
}
.animate {
    height: 100%;
    display: block;
    margin: 0;
    padding: 0;
    width: 100%
}
.animate > li {
    position: absolute;
    height: 50px;
    width: 50px;
    border-radius: 100%;
    top: 105%;
    left: 10px;
    box-shadow: 0 0 10px rgb(65, 185, 131);
    background: rgba(65, 185, 131, 0.6);
    z-index: -1;
    overflow: hidden;
    animation: move 10s linear infinite
}
.animate > li:nth-last-of-type(2) {
    left: 70px;
    animation-delay: 3.5s;
    height: 15px;
    width: 15px;
}
.animate > li:nth-last-of-type(3) {
    left: 140px;
    animation-delay: 3s
}
.animate > li:nth-last-of-type(4) {
    left: 210px;
    animation-delay: 5.5s
}
.animate > li:nth-last-of-type(5) {
    left: 280px;
    animation-delay: 1.8s;
    height: 65px;
    width: 65px
}
.animate > li:nth-last-of-type(6) {
    left: 140px;
    animation-delay: 6.8s;
    height: 25px;
    width: 25px
}
.animate > li:nth-last-of-type(7) {
    left: 280px;
    animation-delay: 5s;
    height: 35px;
    width: 35px
}
@keyframes move {
    to {
        top: -50px;
    }
}
</style>