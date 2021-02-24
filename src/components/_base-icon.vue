<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library as fontAwesomeIconLibrary } from '@fortawesome/fontawesome-svg-core'
import camelCase from 'lodash/camelCase'
import { definition as fsSync } from '@fortawesome/free-solid-svg-icons/faSync'
import { definition as faUser } from '@fortawesome/free-solid-svg-icons/faUser'

// https://fontawesome.com/icons
fontAwesomeIconLibrary.add(fsSync, faUser)

export default {
  components: {
    FontAwesomeIcon,
  },
  inheritAttrs: false,
  props: {
    source: {
      type: String,
      default: 'font-awesome',
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    // Gets a CSS module class, e.g. iconCustomLogo
    customIconClass() {
      return this.$style[camelCase('icon-custom-' + this.name)]
    },
  },
}
</script>

<template>
  <FontAwesomeIcon
    v-if="source === 'font-awesome'"
    v-bind="$attrs"
    :icon="name"
  />
  <span
    v-else-if="source === 'custom'"
    v-bind="$attrs"
    :class="customIconClass"
  />
</template>
