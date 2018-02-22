<script>
import camelCase from 'lodash/camelCase'

export default {
  props: {
    source: {
      type: String,
      // http://fontawesome.io/icons/
      default: 'font-awesome',
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    customIconClass() {
      return this.$style[camelCase('icon-custom-' + this.name)]
    },
  },
}
</script>

<template>
  <span
    v-if="source === 'font-awesome'"
    :class="[
      $style.fa,
      $style['fa-' + name],
    ]"
  />
  <span
    v-else-if="source === 'custom'"
    :class="customIconClass"
  />
</template>

<style lang="scss" module>
$fa-font-path: 'font-awesome/fonts';

@import '~font-awesome/scss/font-awesome';

.iconCustomLoading {
  @extend .fa;
  @extend .fa-refresh;

  :global {
    animation: spin 2s linear infinite;
  }
}
</style>
