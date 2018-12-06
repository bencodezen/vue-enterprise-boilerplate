<script>
export default {
  model: {
    event: 'update',
  },
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>

<template>
  <input
    :type="type"
    :class="$style.input"
    :value="value"
    @input="$emit('update', $event.target.value)"
    v-on="$listeners"
  />
</template>

<style lang="scss" module>
@import '@design';

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
