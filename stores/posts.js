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
        return data.user.user_metadata;
      } catch (error) {
        console.error("Bir hata oluştu:", error.message);
        return null;
      }
    },
    getCurrentPost(id) {
      return this.posts.find((e) => e.id == id)
    }
  },
});