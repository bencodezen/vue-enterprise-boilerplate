import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const authMethods = mapActions('auth', ['logIn', 'logOut'])

//  exporting computed helpers for the playground module

export const playgroundComputed = {
  ...mapState('playground', {
    currentUser: (state) => state.dataArray,
  }),
  ...mapGetters('playground', ['getDataArray']),
}

export const playgroundMethods = mapActions('playground', [
  'fetchDataFromServer',
])
