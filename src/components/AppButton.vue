<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  label: String
})

const emit = defineEmits(['click'])

const { label } = toRefs(props)

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <button class="button" @click="handleClick">{{ label }}</button>
</template>

<style lang="scss" scoped>
.button{
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  background-color: var(--color-text);
}

</style>
