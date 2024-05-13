<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Home - Vue Enterprise Boilerplate',
  meta: [
    {
      name: 'description',
      content: 'Welcome to the Vue Enterprise Boilerplate!'
    }
  ]
})
</script>

<template>
  <AppLayout>
    <TheWelcome />
  </AppLayout>
</template>

<style lang="scss" scoped></style>
