<script>
import Layout from '@layouts/main'

export default {
  page: {
    title: 'Page timeout',
    meta: [
      { name: 'description', content: 'The page timed out while loading.' },
    ],
  },
  components: { Layout },
}
</script>

<template>
  <Layout>
    <h1 :class="$style.title">
      The page timed out while loading
    </h1>
  </Layout>
</template>

<style lang="scss" module>
.title {
  text-align: center;
}
</style>
