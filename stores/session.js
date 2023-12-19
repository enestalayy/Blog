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
      data.session && (this.session = data.session.user);
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
        console.error(error);
      }
    },
    async signOut() {
      console.log("signOut çalıştı");
      try {
        const supabase = useSupabaseClient();
        const { error } = await supabase.auth.signOut();
        if (error) { 
          throw error
        }else this.navigateToHome();
      } catch (error) {
        alert(error.message);
      } finally {
      }
    },
    async deleteUser(id) {
      try {
        const supabase = useSupabaseClient();
        const { data, error } = await supabase.auth.admin.deleteUser(id);
        error && console.error(error);
        if (data) {
          this.deleteUserData(id);
          this.navigateToHome();
        }
      } catch (error) {
        console.error("Bir hata oluştu:", error);
        throw error;
      }
    },
    async deleteUserData(userId) {
      const supabase = useSupabaseClient();
      try {
        const deleteCommentsPromise = supabase
          .from("comments")
          .delete()
          .eq("user_id", userId);
        const deleteLikesPromise = supabase
          .from("likes")
          .delete()
          .eq("user_id", userId);
        const deletePostsPromise = supabase
          .from("posts")
          .delete()
          .eq("author_id", userId);

        const [commentsData, likesData, postsData] = await Promise.all([
          deleteCommentsPromise,
          deleteLikesPromise,
          deletePostsPromise,
        ]);

        console.log("Yorumlar başarıyla silindi:", commentsData);
        console.log("Beğeniler başarıyla silindi:", likesData);
        console.log("Postlar başarıyla silindi:", postsData);
      } catch (error) {
        console.error("Bir hata oluştu:", error);
        throw error;
      }
    },
    navigateToHome() {
      const router = useRouter();
      router.name === "index___tr" || "index___en"
      ? window.location.reload()
      : router.push("/");
    },
  },
});