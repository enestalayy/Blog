export const useLikesStore = defineStore({
  id: "likes",
  state: () => ({
    likes: [],
  }),
  actions: {
    async getLikes() {
      try {
        const supabase = useSupabaseClient();
        const { data, error } = await supabase.from("likes").select();
        error && console.error(error);
        this.likes = data;
      } catch (error) {
        console.error(error)
      }
    },
    async likePost(post, currentUser) {
      try {
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
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async unlikePost(post, currentUser) {
      const likes = this.likes;
      const currentLike = likes.find(
        (e) => e.post_id === post.id && e.user_id === currentUser.id
      );
      const supabase = useSupabaseClient();
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("id", currentLike.id);
      if (error) {
        console.error(error);
      } else {
        this.likes = this.likes.filter((e) => e.id !== currentLike.id);
      }
    },
    mostLikedPosts() {
      const postStore = usePostStore()
      const posts = postStore.posts
      const postLike = {};
      this.likes && this.likes.forEach((like) => {
          postLike[like.post_id] = (postLike[like.post_id] || 0) + 1;
      });
      const top5PostIds = Object.entries(postLike)
        .sort(([, aCount], [, bCount]) => bCount - aCount)
        .slice(0, 5)
        .map(([postId]) => postId);
      return top5PostIds.map((postId) =>
        posts.find((post) => post.id === postId)
      );
    },

  },
});