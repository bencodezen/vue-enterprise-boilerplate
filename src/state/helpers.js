import { mapState, mapGetters, mapActions } from 'vuex'

export const authGetters = {
  ...mapState({
    currentUser: state => state.auth.currentUser,
  }),
  ...mapGetters(['loggedIn']),
}

export const authActions = mapActions(['logIn', 'logOut'])
