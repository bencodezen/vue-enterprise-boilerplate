<script setup lang="ts">
useHead({
  title: 'About - Vue Enterprise Boilerplate',
  meta: [
    {
      name: 'description',
      content: 'The about page for Vue Enterprise Boilerplate!'
    }
  ]
})
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
