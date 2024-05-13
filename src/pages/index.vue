<script setup lang="ts">
useHead({
  title: 'Home - Vue Enterprise Boilerplate',
  meta: [
    {
      name: 'description',
      content: 'Welcome to the Vue Enterprise Boilerplate!'
    }
  ]
})

const text = ref('')
const capitalizedText = computed(() => {
  return text.value.toUpperCase()
})
</script>

<template>
  <AppLayout>
    <h1>Home Page</h1>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <BaseInputText v-model="text" />
    <p>{{ text }} - {{ capitalizedText }}</p>
    <input type="text" />
  </AppLayout>
</template>

<style lang="scss" scoped></style>
