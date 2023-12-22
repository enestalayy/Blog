<template>
    <div  class="card flex justify-content-center ">
        <PrimeButton v-if="!props.post" icon="pi pi-plus" class="border-2 rounded w-7 h-7 createPostBtn" @click="createPost" />
        <PrimeButton v-else  type="button" icon="pi pi-ellipsis-v" @click="toggle" class="text-xs absolute right-0 top-[-15px]" aria-haspopup="true" aria-controls="overlay_menu" />
        <PrimeMenu ref="menuRef" id="overlay_menu" :model="items" :popup="true" />
        <PrimeDialog v-model:visible="visible" modal header="Header" class="bg-[beige] rounded-xl dialog" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
                <PostUserCard class="pl-2 p-1" :userInfo="postAuthor" :avatarContainer="'avatar-container-sm'" />
                <PrimeInputText v-model="title" required class="p-1 max-md:w-[100px] max-md:text-xs" :placeholder="$t('Type a Title') + '*'" />
                <div class="p-float-label w-40 relative">
                    <PrimeDropdown v-model="selectedTag" required  inputId="dd-tag" :options="translatedTags" optionLabel="name" class="w-full p-1 max-md:text-xs text-[beige] rounded bg-[var(--dark-green)] " />
                    <label class="absolute text-[beige] left-0" for="dd-tag">{{ $t('Select a Tag') }}*</label>
                </div>
            </template>
            <Editor v-model="content" :placeholder="$t('Type here') + '...'" editorStyle="height: 320px">
                <template v-slot:toolbar>
                    <span class="ql-formats w-full flex flex-row items-center justify-between text-red-500">
                        <select class="ql-font" v-tooltip.bottom="'Font Style'"></select>
                        <button v-tooltip.bottom="'Bold'" class="ql-bold">1</button>
                        <button v-tooltip.bottom="'Italic'" class="ql-italic">2</button>
                        <button v-tooltip.bottom="'Underline'" class="ql-underline">3</button>
                        <select class="ql-color" v-tooltip.bottom="'Text Color'"></select>
                        <select class="ql-background" v-tooltip.bottom="'Background Color'"></select>
                    </span>
                </template>
            </Editor>
            <template  #footer>
                <PrimeButton v-if="props.post" @click="updatePost" class="w-full text-center border rounded hover:text-[beige] hover:bg-[var(--dark-green)]" label="Update Post" autofocus />
                <PrimeButton v-else @click="sharePost" class="w-full text-center border rounded hover:text-[beige] hover:bg-[var(--dark-green)]" :label="$t('Share Post')" autofocus />
            </template>
        </PrimeDialog>
        <div v-show="visible" class="backgroundBlur"></div>
    </div>
</template>

<script setup>
import Editor from 'primevue/editor';
const props = defineProps(['post'])
const supabase = useSupabaseClient()
const { t } = useI18n()
const user = useSupabaseUser()
const postStore = usePostStore()
const sessionStore = useSessionStore()
const postAuthor = user.value ? user.value : null;
const visible = ref(false);
const Tags = ref([
    { name: 'Technology Trends' },
    { name: 'Space Exploration' },
    { name: 'Continuous Learning' },
    { name: 'Engineering Marvels' },
    { name: 'Digital Transformation' },
    { name: 'Future of Work' },
    { name: 'Environmental Sustainability' },
    { name: 'Health and Wellness Tech' },
    { name: 'Inspirational Stories' },
    { name: 'Travel Adventures' },
    { name: 'Culinary Delights' },
    { name: 'Art and Creativity' },
    { name: 'Book Reviews' },
    { name: 'Mindfulness and Meditation' },
    { name: 'Global Perspectives' },
    { name: 'Entrepreneurship Insights' },
    { name: 'Science and Nature Wonders' },
    { name: 'Parenting Journeys' },
    { name: 'Fashion Trends' },
    { name: 'Gaming and Entertainment' },
    { name: 'Other' },
]);
const content = ref(props.post && props.post.content)
const title = ref(props.post && props.post.title)
const translatedTags = computed(() => Tags.value.map(tag => ({ name: t(`tags.${tag.name}`) })));
const selectedTag = ref(props.post && Tags.value.find((e) => t(`tags.${e.name}`) === props.post.tags))
const sharePost = async () => { 
    try {
    const { error } = await supabase
    .from('posts')
    .insert({
        title: title.value, content: content.value , tags: selectedTag.value.name,
    })
    error && console.error(error)
    sessionStore.navigateToHome()
    visible.value = false
    } catch (error) {
        console.error(error)
    }
 }
const updatePost = async () => { 
    try {
    const { error } = await supabase
    .from('posts')
    .update({
        title: title.value, content: content.value , tags: selectedTag.value.name,
    })
      .eq('id', props.post.id)
    error && console.error(error)
    sessionStore.navigateToHome()
    visible.value = false
    } catch (error) {
        console.error(error)
    }
 }
const createPost = () => {
    if(sessionStore.session) {
        visible.value = true
    }else postStore.activeDialog('createPost')
}
const items = ref([
  {
    label: t('Edit Post'),
    icon: 'pi pi-file-edit',
    command: () => { visible.value = true  }
  },
  {
    label: t('Delete Post'),
    icon: 'pi pi-trash',
    command: () => { postStore.deletePost(props.post.id)  }
  },
]);

const menuRef = ref(null);

const toggle = (event) => {
  if (menuRef.value) {
    menuRef.value.toggle(event);
  }
};

</script>


<style>
.ql-formats {
    display: flex !important;
}
.p-dialog-header-icons {
    padding-right: 5px !important;
}
.p-dialog-header-close-icon path {
    padding: 0 7px !important;
}
.backgroundBlur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
}
.dialog {
    box-shadow: 0 0 15px beige;
}
.p-dropdown-item:hover {
    background-color: var(--dark-green);
    color: beige;
}	
.p-dropdown-items-wrapper {
    border-radius: 10px;
    background-color: beige;
}
.createPostBtn:hover {
    box-shadow: 0 0 10px beige;
}
</style>