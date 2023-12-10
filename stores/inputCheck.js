export const useInputCheck = defineStore({
  id: "inputCheck",
  state: () => ({
    passwordError: [],
    emailValid: false,
    passwordValid: false,
    passwordCorrect: false
  }),
  actions: {
    checkPassword(password) {
      const specialRegex = /.*[!@#$%^&*(),.?":{}|<>].*/;
      const uppercaseRegex = /[A-Z]/;
      const numberRegex = /\d/;
      this.passwordError = [];
      password.length < 8 && this.passwordError.push("passwordError.character");
      !uppercaseRegex.test(password) &&
        this.passwordError.push("passwordError.uppercase");
      !numberRegex.test(password) &&
        this.passwordError.push("passwordError.number");
      !specialRegex.test(password) &&
        this.passwordError.push("passwordError.special");
      this.passwordError.length > 0 &&
        this.passwordError.unshift("passwordError.contain");
      this.passwordValid =
        password.length > 0 && this.passwordError.length === 0;
    },
    checkEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailValid = emailRegex.test(email);
    },
    supabase() {
      return useSupabaseClient()
    },
    async emailExist(email) {
      const supabase = this.supabase()
      try {
        const { data, error } = await supabase
          .from('users')
          .select('email, password')
          .eq('email', email)
          .single()
        if (error) {
          console.error('Supabase hatası:', error);
          return false;
        }

      } catch (error) {
        console.error('Bir hata oluştu:', error.message); 
        return false;
      }
    },
  },
});
