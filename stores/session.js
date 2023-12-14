export const useSessionStore = defineStore({
  id: "session",
  state: () => ({
    session: null,
    editAccount: false,
  }),
  actions: {
    async getSession() {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase.auth.getSession();
      error && console.error(error);
      console.log(data);
      this.session = data.session.user;
    },
    handleDate(date) {
      const dateObject = new Date(date);
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0");
      const day = String(dateObject.getDate()).padStart(2, "0");
      const formattedDate = `${year}/${month}/${day}`;
      console.log(formattedDate);
      return formattedDate;
    },
    toggleEditAccount() {
      console.log(this.editAccount);
      this.editAccount = !this.editAccount;
    },
    async editMetaData(props) {
      try {
        const infoType = props[0];
        const value = props[1];
        const supabase = useSupabaseClient();
        const { data, error } = await supabase.auth.updateUser({
          data: { [infoType]: `${value}` },
        });
        if (error) {
          console.error("Error updating user:", error.message);
        } else {
          console.log("Updated user data:", data);
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
});