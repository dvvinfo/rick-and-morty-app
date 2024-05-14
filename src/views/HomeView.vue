<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AppCard from '../components/AppCard.vue'
import AppLoader from '../components/AppLoader.vue'

const items = ref([])
const isLoading = ref(false)
const currentPage = ref(1)
const totalPages = ref(0)

const fetchData = async (page = 1) => {
  try {
    isLoading.value = true
    const res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
    items.value = res.data.results
    totalPages.value = res.data.info.pages
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const updateHandler = async (page) => {
  currentPage.value = page
  await fetchData(page)
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
        <div class="cards">
          <AppLoader v-if="isLoading" />
          <AppCard v-else v-for="item in items" :key="item.id" :item="item" />
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
.cards {
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
@media (max-width: 740px) {
  .title {
    font-size: 3.75rem;
  }
}
@media (max-width: 480px) {
  .title {
    font-size: 2.5rem;
  }
}
</style>
