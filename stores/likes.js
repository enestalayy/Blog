export const useLikesStore = defineStore({
  id: "likes",
  state: () => ({
    likes: [],
  }),
  actions: {
    async getLikes() {
        const supabase = useSupabaseClient();
        const { data, error } = await supabase
            .from("likes")
            .select()
        error && console.error(error)
        console.log(data)
        this.likes = data;
    },
    async likePost(post, currentUser) {
        const supabase = useSupabaseClient()
        const { data, error } = await supabase
            .from("likes")
            .insert({ post_id: post.id, user_id: currentUser.id })
            .select();
        if (error) {
            console.error(error);
        } else {
            this.likes = data;
        }
    },
  },
});