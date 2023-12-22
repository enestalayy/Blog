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
      try {
        const supabase = useSupabaseClient();
        const { error } = await supabase.auth.signOut();
        error && console.error(error)
        this.navigateToHome();
      } catch (error) {
        alert(error.message);
      }
    },
    async deleteUser(id) {
      try {
        const supabase = useSupabaseClient();
        const { data, error } = await supabase.auth.admin.deleteUser(id);
        error && console.error(error);
        if (data) {
          this.signOut();
          this.deleteUserData(id);
          this.deleteUsersPostData(id);
          this.navigateToHome();
        }
      } catch (error) {
        console.error("Bir hata oluştu:", error);
        throw error;
      }
    },
    async deleteUsersPostData(userId) {
      const supabase = useSupabaseClient()
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("id")
          .eq("author_id", userId);
          if(data) {
            const postId = data[0].id
            try {
              const deleteCommentsPromise = supabase
                .from("comments")
                .delete()
                .eq("post_id", postId);
              const deleteLikesPromise = supabase
                .from("likes")
                .delete()
                .eq("post_id", postId);
                const [commentsData, likesData, ] = await Promise.all([
                  deleteCommentsPromise,
                  deleteLikesPromise,
                ]);
            } catch (error) {
              throw error
            }
          }
        error && console.error(error);
      } catch (error) {
        throw error
      }
    },
    async deleteUserData(userId) {
      const supabase = useSupabaseClient();
      try {
          const deleteCommentsPromise = supabase
            .from("comments")
            .delete()
            .eq("user_id", userId)
          const deleteLikesPromise = supabase
            .from("likes")
            .delete()
            .eq("user_id", userId)
          const deletePostsPromise = supabase
            .from("posts")
            .delete()
            .eq("author_id", userId);

          const [commentsData, likesData, postsData] = await Promise.all([
            deleteCommentsPromise,
            deleteLikesPromise,
            deletePostsPromise,
          ]);
      } catch (error) {
        console.error("Bir hata oluştu:", error);
        throw error;
      }
    },
    navigateToHome() {
      const route = useRoute();
      const router = useRouter();
      route.name === "index___tr" || route.name === "index___en"
        ? window.location.reload()
        : router.push(localePath({ name: "index" }));
    },
  },
});