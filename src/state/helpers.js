import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const authMethods = mapActions('auth', ['logIn', 'logOut'])

export const favouritesComputed = {
  ...mapState('favourites', ['favouriteQuotes']),
}

export const favouritesMethods = mapActions('favourites', [
  'addFavouriteQuote',
  'deleteFavouriteQuote',
])
