export const useCommentStore = defineStore({
  id: "comments",
  state: () => ({
    comments: [],
  }),
  actions: {
    async getComments() {
      try {
        const supabase = useSupabaseClient();
        const { data: allComments, error } = await supabase
          .from("comments")
          .select();
        if (error) {
          console.error(error);
          return;
        }
        const commentsWithAuthors = allComments.map(async (comment) => {
          const user = await this.getAuthor(comment.user_id);
          return {
            ...comment,
            user,
          };
        });
        this.comments = await Promise.all(commentsWithAuthors);
      } catch (error) {
        console.error(error);
      }
    },

    getCurrentComments(id) {
      console.log(this.comments);
      return this.comments.filter((e) => e.post_id == id);
    },
    async getAuthor(id) {
      try {
        const supabase = useSupabaseClient();
        const { data, error } = await supabase.auth.admin.getUserById(id);

        if (error) {
          console.error("Yazar verisi çekme hatası:", error.message);
          return null;
        }
        console.log(data);
        return data.user.user_metadata;
      } catch (error) {
        console.error("Bir hata oluştu:", error.message);
        return null;
      }
    },
    async shareComment(content, postId) {
      try {
        const supabase = useSupabaseClient()
        const { data, error } = await supabase
          .from("comments")
          .insert({ post_id: postId, content: content })
          .select();
          error && console.error(error.message)
          this.comments = [...this.comments, data[0]]
      } catch (error) {
        console.error("Bir hata oluştu:", error.message);
        return null;
      }
    }
  },
});