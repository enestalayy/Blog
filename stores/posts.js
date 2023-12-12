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
        console.log(this.posts);
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
        console.log(data.user);
        return data.user.user_metadata;
      } catch (error) {
        console.error("Bir hata oluştu:", error.message);
        return null;
      }
    },
    async likePost(post, currentUser) {
      const supabase = useSupabaseClient();
      const updatedLikes = post.likes.length > 0 ? [...post.likes, currentUser] : [currentUser];
      console.log(post.id)
      const { data, error } = await supabase
        .from("posts")
        .update({ likes: updatedLikes })
        .eq("id", post.id)
        .select();
      if (error) {
        console.error(error);
      } else {
        console.log("Post updated with new likes:", data);
      }
    },
  },
});