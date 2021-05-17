<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'
import RandomQuote from '@components/random-quote.vue'

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { RandomQuote, Layout },
}
</script>

<template>
  <Layout>
    <RandomQuote />
  </Layout>
</template>
