<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  id: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: [String, Number],
  placeholder: String
})
const { id, type, modelValue } = toRefs(props)

const emits = defineEmits(['update:modelValue'])

const handleInput = (event) => {
  emits('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="input-wrapper">
    <input
      class="input"
      :type="type"
      :id="id"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
    />
  </div>
</template>

<style lang="scss" scoped>
.input {
  padding: 5px;
  border-radius: 5px;
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  background-color: var(--color-text);
}
.input-wrapper {
  width: 300px;
}
</style>
