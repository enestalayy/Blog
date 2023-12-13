export const useSessionStore = defineStore({
    id: "session",
    state: () => ({
        session: null
    }),
    actions: {
        async getSession() {
            const supabase = useSupabaseClient()
            const { data, error } = await supabase.auth.getSession()
            error && console.error(error)
            this.session = data.session.user
        }
    }
})