<script>
import NavBar from '@components/nav-bar.vue'

export default {
  components: { NavBar },
}
</script>

<template>
  <div :class="$style.container">
    <NavBar />
    <slot />
  </div>
</template>

<style lang="scss" module>
.container {
  min-width: 90vw;
  max-width: 90vw;
  margin: 20px;
}
</style>
