<template>
  <button :class="$style.button">
    <slot>Submit</slot>
  </button>
</template>

<style lang="scss" module>
.button {
  @extend %typography-small;

  padding: $size-button-padding;
  border: none;
  background: $color-button-bg;
  color: $color-button-text;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background: $color-button-disabled-bg;
  }
}
</style>
