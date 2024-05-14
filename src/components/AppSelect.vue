<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  id: String,
  label: String,
  modelValue: String,
  options: Array
})

const emits = defineEmits(['update:modelValue'])

const { id, label, modelValue, options } = toRefs(props)

const handleChange = (event) => {
  emits('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="input-select">
    <label class="label" :for="id">{{ label }}</label>
    <select class="select" :id="id" :value="modelValue" @change="handleChange">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.input-select {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 8px;
  width: 300px;
}
.select {
  width: 85%;
  padding: 5px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
  background-color: var(--color-text);
}
</style>
