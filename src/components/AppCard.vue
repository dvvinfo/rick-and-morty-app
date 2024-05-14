<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const { item } = toRefs(props)
</script>

<template>
  <article class="card">
    <div class="card__image">
      <img :src="item.image" :alt="item.name" />
    </div>
    <div class="card__content">
      <div class="card__info">
        <h3 class="card__name">{{ item.name }}</h3>
        <div class="card__status">
          <div class="card__circle" v-if="item.status === 'Alive'"></div>
          <span>{{ item.status }}</span> - <span>{{ item.gender }}</span>
        </div>
      </div>
      <div class="card__info">
        <span class="card__title">Last known location:</span>
        <h4 class="card__text">{{ item.location.name }}</h4>
      </div>
      <div class="card__info">
        <span class="card__title">First seen in:</span>
        <h4 class="card__text">{{ item.origin.name }}</h4>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  background-color: var(--color-background-card);
  width: 600px;
  border-radius: 0.5rem;
  margin: 0.75rem;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  &__image {
    flex: 2 1 0%;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      object-position: center center;
      object-fit: cover;
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
    }
  }
  &__name {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-text);
  }
  &__status {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 16px;
    font-weight: 500;
  }
  &__content {
    flex: 3 1 0%;
    position: relative;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__title {
    font-size: 16px;
    font-weight: 500;
    color: var(--color-heading);
  }
  &__text {
    font-size: 16px;
    font-weight: 500;
  }
  &__circle {
    height: 0.5rem;
    width: 0.5rem;
    margin-right: 0.375rem;
    background: rgb(85, 204, 68);
    border-radius: 50%;
  }
}
</style>
