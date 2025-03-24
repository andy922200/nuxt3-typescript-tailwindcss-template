<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSiteStore } from '@/store/site'
import { useNuxtApp } from '#app'
import MaterialSymbolsLightSearch from '~icons/material-symbols-light/search'
import MdiHamburgerMenu from '~icons/mdi/hamburger-menu'

defineOptions({
  name: 'Index',
})

useHead({
  title: 'Test Index Page',
  meta: [
    {
      property: 'og:title',
      content: 'Test Index Page',
    },
  ],
})

const { $dayjs, $demoAPI } = useNuxtApp()
const siteStore = useSiteStore()
const { site } = storeToRefs(siteStore)
const { t } = useI18n()
const products = ref([
  { code: 'A1', name: 'Apple', category: 'Fruit', quantity: 10 },
  { code: 'B2', name: 'Banana', category: 'Fruit', quantity: 20 },
  { code: 'C3', name: 'Carrot', category: 'Vegetable', quantity: 30 },
  { code: 'D4', name: 'Dragon Fruit', category: 'Fruit', quantity: 40 },
  { code: 'E5', name: 'Eggplant', category: 'Vegetable', quantity: 50 },
  { code: 'F6', name: 'Fig', category: 'Fruit', quantity: 60 },
])

const language = computed({
  get: () => site.value.language,
  set: (lang: string) => {
    siteStore.setLanguage(lang)
  },
})

const fetchData = async () => {
  const res = await $demoAPI.getADemo({ id: '1' })
  console.log(res)
  console.log('dayjs check', $dayjs().format('YYYY-MM-DDTHH:mm:ss'))

  siteStore.fetchDemo()
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="index__wrapper">
    <div class="test">
      <div class="m-2 w-[200px]">
        <select
          id="locale-select"
          v-model="language"
          class="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          <option value="en-us">en-us</option>
          <option value="zh-tw">zh-tw</option>
        </select>
      </div>

      <p class="hello">
        <span>{{ t('route.helloWorld') }}</span>
        <MdiHamburgerMenu class="text-green-400" />
      </p>

      <Button
        label="Search"
        pt:root="bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex items-center gap-2"
        pt:label="text-white font-bold text-lg"
        pt:icon="text-white text-xl"
      >
        <template #icon>
          <MaterialSymbolsLightSearch class="text-xl text-white" />
        </template>
      </Button>

      <DataTable :value="products" table-style="min-width: 50rem" class="hidden lg:block">
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>

      <!-- ✅ 小螢幕使用卡片呈現 -->
      <div class="grid grid-cols-1 gap-4 lg:hidden">
        <div v-for="item in products" :key="item.code" class="rounded border p-4 shadow">
          <div class="font-semibold">
            Code: <span class="font-normal">{{ item.code }}</span>
          </div>
          <div class="font-semibold">
            Name: <span class="font-normal">{{ item.name }}</span>
          </div>
          <div class="font-semibold">
            Category: <span class="font-normal">{{ item.category }}</span>
          </div>
          <div class="font-semibold">
            Quantity: <span class="font-normal">{{ item.quantity }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.test {
  .hello {
    color: red;
  }
}
</style>
