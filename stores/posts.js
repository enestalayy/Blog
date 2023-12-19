export const usePostStore = defineStore({
  id: "posts",
  state: () => ({
    posts: [],
  }),
  actions: {
    async getPosts() {
      try {
        const supabase = useSupabaseClient();
        const { data: postData, error: postError } = await supabase
          .from("posts")
          .select("*");

        if (postError) {
          console.error("Post verisi çekme hatası:", postError.message);
          return null;
        }

        const postsWithAuthors = await Promise.all(
          postData.map(async (post) => {
            const user = await this.getAuthor(post.author_id);
            return {
              ...post,
              user,
            };
          })
        );
        this.posts = postsWithAuthors;
      } catch (error) {
        console.error("Bir hata oluştu:", error.message);
      }
    },
    async getAuthor(id) {
      try {
        const supabase = useSupabaseClient();
        const { data, error } = await supabase.auth.admin.getUserById(id);
        if (error) {
          console.error("Yazar verisi çekme hatası:", error.message);
          return null;
        }
        return data.user;
      } catch (error) {
        console.error("Bir hata oluştu:", error.message);
        return null;
      }
    },
    getCurrentPost(id) {
      return this.posts.find((e) => e.id == id);
    },
    getUsersPosts(id) {
      console.log("getUsersPOst çalıştı");
      return this.posts.filter((e) => e.author_id === id);
    },

    handlePostDate(date) {
      const now = new Date();
      const formattedDate = new Date(date);
      const diffInSeconds = Math.floor((now - formattedDate) / 1000);
      const minutes = Math.floor(diffInSeconds / 60) % 60;
      const hours = Math.floor(diffInSeconds / 3600) % 24;
      const days = Math.floor(diffInSeconds / (3600 * 24));

      if (days > 1) {
        return `${days}d`;
      } else if (hours > 1) {
        return `${hours}h`;
      } else if (minutes > 1) {
        return `${minutes}m`;
      } else {
        return `just now`;
      }
    },
    async deletePost(postId) {
      try {
        const supabase = useSupabaseClient();
        const sessionStore = useSessionStore()
        await Promise.all([
          supabase.from("posts").delete().eq("id", postId),
          supabase.from("comments").delete().eq("post_id", postId),
          supabase.from("likes").delete().eq("post_id", postId),
        ]);
        sessionStore.navigateToHome()
        console.log("İşlemler başarıyla tamamlandı");
      } catch (error) {
        console.error("Bir hata oluştu:", error);
        throw error
      }
    },
  },
});