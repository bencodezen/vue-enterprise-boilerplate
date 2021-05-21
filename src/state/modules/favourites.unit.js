import * as favouritesModule from './favourites'

describe('@state/modules/favourites', () => {
  it('exports a valid Vuex module', () => {
    expect(favouritesModule).toBeAVuexModule()
  })

  describe('in a store', () => {
    let store
    beforeEach(() => {
      store = createModuleStore(favouritesModule)
      window.localStorage.clear()
    })

    it('mutations.INIT_FAVOURITE_QUOTES correctly sets default favourite quotes in localStorage', () => {
      store.commit('INIT_FAVOURITE_QUOTES')
      expect(store.state.favouriteQuotes).toEqual([])
    })

    it('mutations.ADD_FAVOURITE_QUOTE correctly saves new quote in localStorage', () => {
      let savedFavouriteQuotes = JSON.parse(
        window.localStorage.getItem('favouriteQuotes')
      )
      expect(savedFavouriteQuotes).toEqual(null)

      store.commit('ADD_FAVOURITE_QUOTE', validQuoteExample)

      savedFavouriteQuotes = JSON.parse(
        window.localStorage.getItem('favouriteQuotes')
      )
      expect(savedFavouriteQuotes).toEqual([validQuoteExample])
    })

    it('mutations.DELETE_FAVOURITE_QUOTE correctly removew quote from localStorage', () => {
      let savedFavouriteQuotes = JSON.parse(
        window.localStorage.getItem('favouriteQuotes')
      )
      expect(savedFavouriteQuotes).toEqual(null)

      store.commit('ADD_FAVOURITE_QUOTE', validQuoteExample)

      savedFavouriteQuotes = JSON.parse(
        window.localStorage.getItem('favouriteQuotes')
      )
      expect(savedFavouriteQuotes).toEqual([validQuoteExample])

      store.commit('DELETE_FAVOURITE_QUOTE', validQuoteExample)

      savedFavouriteQuotes = JSON.parse(
        window.localStorage.getItem('favouriteQuotes')
      )
      expect(savedFavouriteQuotes).toEqual([])
    })

    it('actions.addFavouriteQuote commits the favouriteQuote', () => {
      return store.dispatch('addFavouriteQuote', validQuoteExample).then(() => {
        expect(store.state.favouriteQuotes).toEqual([validQuoteExample])
      })
    })

    it('actions.deleteFavouriteQuote commits the favouriteQuote', () => {
      store.dispatch('addFavouriteQuote', validQuoteExample).then(() => {
        expect(store.state.favouriteQuotes).toEqual([validQuoteExample])
      })

      return store
        .dispatch('deleteFavouriteQuote', validQuoteExample)
        .then(() => {
          expect(store.state.favouriteQuotes).toEqual([])
        })
    })
  })
})

const validQuoteExample = {
  text: 'Mr Frodo!',
  id: 'ghi',
  author: 'Samwise Gamgee',
  movie: 'Return of the King',
}
