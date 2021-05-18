<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'
import FavouritesList from '@components/favourites-list.vue'

export default {
  page: {
    title: 'Favourites',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, FavouritesList },
}
</script>

<template>
  <Layout>
    <FavouritesList />
  </Layout>
</template>
