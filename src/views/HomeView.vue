<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import AppCard from '@/components/AppCard.vue'
import AppLoader from '@/components/AppLoader.vue'
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import AppSelect from '@/components/AppSelect.vue'

const items = ref([])
const isLoading = ref(false)
const currentPage = ref(1)
const totalPages = ref(0)
const errors = ref('')

const filterName = ref('')
const filterStatus = ref('')

const options = ref([
  { label: 'Any', value: '' },
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' }
])

const fetchData = async (page = 1) => {
  try {
    isLoading.value = true
    let url = `https://rickandmortyapi.com/api/character/?page=${page}`
    if (filterName.value) {
      url += `&name=${filterName.value}`
    }
    if (filterStatus.value) {
      url += `&status=${filterStatus.value}`
    }

    const res = await axios.get(url)
    items.value = res.data.results
    totalPages.value = res.data.info.pages
    errors.value = null
  } catch (error) {
    if (error.response.status === 404) {
      errors.value = error.response.data.error
    }
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const updateHandler = async (page) => {
  currentPage.value = page
  await fetchData(page)
}

const applyFilters = async () => {
  currentPage.value = 1
  await fetchData()
}

onMounted(fetchData)
</script>

<template>
  <main>
    <div class="wrapper">
      <section class="header">
        <h1 class="title">Rick and Morty</h1>
      </section>
      <section class="content">
        <div class="filters">
          <AppInput id="name" label="Name" v-model="filterName" placeholder="Enter name" />
          <AppSelect id="status" label="Status" v-model="filterStatus" :options="options" />
          <AppButton label="Apply" @click="applyFilters" />
        </div>
        <AppLoader v-if="isLoading" />
        <template v-else-if="errors">
          <p class="error">{{ errors }}</p>
        </template>
        <div class="cards" v-else>
          <div class="cards-content">
            <AppCard v-for="item in items" :key="item.id" :item="item" />
          </div>
          <div class="pagination-wrapper">
            <v-pagination
              v-model="currentPage"
              :pages="totalPages"
              active-color="#0083b6"
              @update:modelValue="updateHandler"
              :hideFirstButton="true"
              :hideLastButton="true"
            />
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss">
.header {
  background-color: var(--color-background-section);
}
.title {
  font-size: 5.625rem;
  font-weight: 900;
  text-align: center;
  color: var(--color-background);
}
.content {
  padding: 4.5rem 0px;
}
.cards-content {
  max-width: 1920px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.pagination-wrapper {
  display: flex;
  align-self: center;
  justify-content: center;
  margin-top: 30px;
}
.filters {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}
.error {
  font-size: 20px;
  font-weight: 500;
  text-align: center;
}
@media (max-width: 740px) {
  .title {
    font-size: 3.75rem;
  }
  .filters {
    flex-direction: column;
  }
}
@media (max-width: 480px) {
  .title {
    font-size: 2.5rem;
  }
}
</style>
