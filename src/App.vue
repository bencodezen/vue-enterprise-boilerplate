<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import appConfig from '@/app.config'

export default {
  page: {
    // All subcomponent titles will be injected into this template
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
}
</script>

<!-- This should generally be the only global CSS in the app -->
<style lang="scss">
@import '~normalize.css/normalize.css';
@import '~@design';

*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  @extend %typography-small;
}

a,
a:visited {
  color: $color-link-text;
}

h1 {
  @extend %typography-xxlarge;
}

h2 {
  @extend %typography-xlarge;
}

h3 {
  @extend %typography-large;
}

h4 {
  @extend %typography-medium;
}

h5,
h6 {
  @extend %typography-small;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
