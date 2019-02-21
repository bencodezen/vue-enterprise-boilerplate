<script>
export default {
  // Disable automatic attribute inheritance, so that $attrs are
  // passed to the <input>, even if it's not the root element.
  // https://vuejs.org/v2/guide/components-props.html#Disabling-Attribute-Inheritance
  inheritAttrs: false,
  // Change the v-model event name to `update` to avoid changing
  // the behavior of the native `input` event.
  // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
  model: {
    event: 'update',
  },
  props: {
    type: {
      type: String,
      default: 'text',
      // Only allow types that essentially just render text boxes.
      validator(value) {
        return [
          'email',
          'number',
          'password',
          'search',
          'tel',
          'text',
          'url',
        ].includes(value)
      },
    },
  },
}
</script>

<template>
  <input
    :type="type"
    :class="$style.input"
    v-bind="
      $attrs
      // https://vuejs.org/v2/guide/components-props.html#Disabling-Attribute-Inheritance
    "
    @input="$emit('update', $event.target.value)"
    v-on="
      $listeners
      // https://vuejs.org/v2/guide/components-custom-events.html#Binding-Native-Events-to-Components
    "
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
