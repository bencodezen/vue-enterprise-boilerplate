<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'text',
    // Only allow types that essentially just render text boxes
    validator: (value: string) =>
      ['email', 'number', 'password', 'search', 'tel', 'text', 'url'].includes(value)
  }
})

const model = defineModel()
</script>

<template>
  <input v-model="model" :type="type" :class="$style.input" />
</template>

<style lang="scss" module>
.input {
  @extend %typography-small;

  display: block;
  width: 100%;
  padding: $size-input-padding-vertical $size-input-padding-horizontal;
  margin-bottom: $size-grid-padding;
  line-height: 1;
  border: $size-input-border solid $color-input-border;
  border-radius: $size-input-border-radius;
}
</style>
