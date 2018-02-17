<script>
import Layout from '@layouts/main'
import { authGetters } from '@state/helpers'

export default {
  page() {
    return {
      title: this.currentUser.name,
      meta: [
        {
          name: 'description',
          content: `The user profile for ${this.currentUser.name}.`,
        },
      ],
    }
  },
  components: { Layout },
  computed: {
    ...authGetters,
  },
}
</script>

<template>
  <Layout>
    <h1>
      <AppIcon name="user"/>
      {{ currentUser.name }}
      Profile
    </h1>
    <pre>{{ currentUser }}</pre>
  </Layout>
</template>
