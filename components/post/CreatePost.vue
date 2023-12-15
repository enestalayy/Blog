<template>
    <div>
        <PrimeButton label="Show" icon="pi pi-external-link" @click="visible = true" />
        <PrimeDialog v-model:visible="visible" modal header="Header" class="bg-[beige] rounded-xl dialog" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
                <PostUserCard class="pl-2 p-1" :user="metaData" />
                <PrimeInputText v-model="title" required class="p-1" placeholder="Type a Title*" />
                <div class="p-float-label w-40 relative">
                    <PrimeDropdown v-model="selectedTag" required  inputId="dd-tag" :options="Tags" optionLabel="name" class="w-full p-1 text-[beige] rounded bg-[var(--dark-green)] " />
                    <label class="absolute text-[beige] left-0" for="dd-tag">Select a Tag*</label>
                </div>
            </template>
            <Editor v-model="content" placeholder="Type Here..." editorStyle="height: 320px">
                <template v-slot:toolbar>
                    <span class="ql-formats w-full flex flex-row items-center justify-between text-red-500">
                        <select v-tooltip.bottom="'Font Size'" class="ql-size"></select>
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
                <PrimeButton class="w-full text-center border rounded hover:text-[beige] hover:bg-[var(--dark-green)]" label="Share Post" @click="createPost" autofocus />
            </template>
        </PrimeDialog>
        <div v-show="visible" class="backgroundBlur"></div>
    </div>
</template>
<script setup>
import Editor from 'primevue/editor';
const visible = ref(false);
const user = useSupabaseUser()
const metaData = computed(() => user.value.user_metadata)
const supabase = useSupabaseClient()
const title = ref()
const content = ref()
const selectedTag = ref()

const createPost = async () => {
    try {
        console.log( typeof title.value)
        console.log(typeof selectedTag.value.name)
        console.log(typeof content.value)
        const { data, error } = await supabase
        .from('posts')
        .insert({
            title: title.value, content: JSON.stringify( content.value ), tags: selectedTag.value.name,
            is_published: true
        })
        error && console.error(error)
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}


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
    { name: 'Other..' },
]);
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
</style>