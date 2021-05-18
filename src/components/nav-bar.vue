<script>
import { authComputed } from '@state/helpers'
import NavBarRoutes from './nav-bar-routes.vue'

export default {
  components: { NavBarRoutes },
  data() {
    return {
      persistentNavRoutes: [
        {
          name: 'favourites',
          title: 'Favourites',
        },
      ],
      loggedInNavRoutes: [
        {
          name: 'logout',
          title: 'Log out',
        },
      ],
      loggedOutNavRoutes: [
        {
          name: 'login',
          title: 'Log in',
        },
      ],
    }
  },
  computed: {
    ...authComputed,
    logo() {
      return require('../assets/images/the-one-ring-icon-17.jpeg')
    },
  },
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.logoContainer">
      <router-link to="/">
        <img :src="logo" alt="ring-logo" />
      </router-link>
      <h1>The <span>one app</span> to randomize them all</h1>
    </div>
    <ul :class="$style.listContainer">
      <NavBarRoutes :routes="persistentNavRoutes" />
      <NavBarRoutes v-if="loggedIn" :routes="loggedInNavRoutes" />
      <NavBarRoutes v-else :routes="loggedOutNavRoutes" />
    </ul>
  </div>
</template>

<style lang="scss" module>
@import '@design';

.container {
  display: flex;
  justify-content: space-between;
}

.listContainer {
  padding: 0;
  text-align: right;
  list-style-type: none;

  > li {
    display: inline-block;
    margin-right: $size-grid-padding;
  }
}

.logoContainer {
  display: flex;
  align-items: center;

  img {
    width: 52px;
    height: 52px;
    margin-top: -25px;
  }

  h1 {
    margin-top: 0;
    margin-left: 10px;
  }

  span {
    color: #a28939;
  }
}
</style>
