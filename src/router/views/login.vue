<script>
import Layout from '@layouts/main'
import { authActions } from '@state/helpers'
import appConfig from '@src/app.config'

export default {
  page: {
    title: 'Log in',
    meta: [{ name: 'description', content: `Log in to ${appConfig.title}` }],
  },
  components: { Layout },
  data() {
    return {
      username: '',
      password: '',
      authError: null,
      tryingToLogIn: false,
    }
  },
  methods: {
    ...authActions,
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.tryingToLogIn = true
      // Reset the authError if it existed.
      this.authError = null
      return this.logIn({
        username: this.username,
        password: this.password,
      })
        .then(token => {
          this.tryingToLogIn = false
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          this.tryingToLogIn = false
          this.authError = error
        })
    },
  },
}
</script>

<template>
  <Layout>
    <form
      :class="$style.form"
      @submit.prevent="tryToLogIn"
    >
      <AppInput
        v-model="username"
        name="username"
      />
      <AppInput
        v-model="password"
        name="password"
        type="password"
      />
      <AppButton
        type="submit"
        :disabled="tryingToLogIn"
      >
        <AppIcon
          v-if="tryingToLogIn"
          source="custom"
          name="loading"
        />
        <span v-else>Log in</span>
      </AppButton>
      <p v-if="authError">
        There was an error logging in to your account.
      </p>
    </form>
  </Layout>
</template>

<style lang="scss" module>
@import '~@design';

.form {
  text-align: center;
}
</style>
