export const useLikesStore = defineStore({
  id: "likes",
  state: () => ({
    likes: [],
  }),
  actions: {
    async getLikes() {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase.from("likes").select();
      error && console.error(error);
      this.likes = data;
    },
    async likePost(post, currentUser) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("likes")
        .insert({ post_id: post.id, user_id: currentUser.id })
        .select();
      if (error) {
        console.error(error);
      } else {
        this.likes = [...this.likes, data[0]];
      }
    },
    async unlikePost(post, currentUser) {
      const likes = this.likes
      console.log(likes)
      console.log(post.id);
      console.log(currentUser.id);
      const currentLike = likes.find((e) => e.post_id === post.id && e.user_id === currentUser.id)
      console.log(currentLike)
      const supabase = useSupabaseClient();
      const { error } = await supabase.from("likes").delete().eq("id", currentLike.id);
      if (error) {
        console.error(error);
      }else {
        this.likes = this.likes.filter((e) => e.id !== currentLike.id);
      }
    },
  },
});