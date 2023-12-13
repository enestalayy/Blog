export const useSessionStore = defineStore({
  id: "session",
  state: () => ({
    session: null,
  }),
  actions: {
    async getSession() {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase.auth.getSession();
      error && console.error(error);
      console.log(data);
      this.session = data.session.user;
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
    async onUpload(event) {
      try {
        const supabase = useSupabaseClient(); // Make sure to get the Supabase client instance
        const avatarFile = event.files[0];

        // 1. Upload the file to Supabase Storage
        const { data: storageData, error: storageError } =
          await supabase.storage
            .from("avatars")
            .upload("public/avatar1.png", avatarFile, {
              cacheControl: "3600",
              upsert: false,
            });

        if (storageError) {
          console.error("Dosya yüklenirken bir hata oluştu:", storageError);
          return;
        }

        console.log("Dosya başarıyla yüklendi:", storageData);

        // 2. Update the user's avatar in the Supabase User table
        const { data: userData, error: userError } = await supabase
          .auth // Assuming your user table is named 'users'
          .updateUser({
            data: {avatar: storageData.Key}, // Assuming the storage key is the avatar URL
          })
          .eq("id", this.session.id);

        if (userError) {
          console.error(
            "Kullanıcı avatarı güncellenirken bir hata oluştu:",
            userError
          );
          return;
        }

        console.log("Kullanıcı avatarı başarıyla güncellendi:", userData);
      } catch (error) {
        console.error("Dosya yüklenirken bir hata oluştu:", error.message);
      }
    },
  },
});