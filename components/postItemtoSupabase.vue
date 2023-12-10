<template>
    <div>
        
    </div>
</template>
<script>
export default {
    methods: {
    async submitRegister() {
                if (this.inputCheck.emailExist(this.email)){
                    this.toast.add({ severity: 'warn', summary: this.$t('emailExistWarn') });
                    console.log('kullanıcı mevcut!')
                    this.existEmail.push(this.email)
                    this.checkFormValidity()
                }else {
                    try {
                        const { data, error } = await this.supabase.from('users').insert([
                        { 
                            full_name: this.name, 
                            email: this.email,
                            password: this.password,
                            phone: this.phone, 
                        },
                        ]);
                        if (error) {
                            console.error('Supabase hatası:', error);
                        } else {
                            console.log('Kullanıcı başarıyla eklendi:', data);
                        }
                    } catch (error) {
                        console.error('Bir hata oluştu:', error.message);
                    }
                }
            }
},
}
</script>