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
    <h1>The page timed out while loading</h1>
  </Layout>
</template>
