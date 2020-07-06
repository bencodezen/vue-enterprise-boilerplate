<script>
import Layout from '@layouts/main.vue'
import PlaygroundComp from '@components/playgroundComp.vue'
// import PlaygroundComp from '../../components/playgroundComp.vue'

export default {
  page() {
    return {}
  },
  components: {
    Layout,
    PlaygroundComp,
  },
  props: {},
}
</script>

<template>
  <Layout>
    <h3>Playground Assignment</h3>
    <PlaygroundComp />
  </Layout>
</template>
