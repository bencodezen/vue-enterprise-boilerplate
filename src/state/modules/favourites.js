import { isEmpty } from 'lodash'

export const state = {
  favouriteQuotes: [],
}

export const mutations = {
  INIT_FAVOURITE_QUOTES(state) {
    state.favouriteQuotes = Array.isArray(getSavedState('favouriteQuotes'))
      ? getSavedState('favouriteQuotes')
      : []
  },
  ADD_FAVOURITE_QUOTE(state, quote) {
    const savedState = getSavedState('favouriteQuotes')
    state.favouriteQuotes = isEmpty(savedState)
      ? [quote]
      : [...savedState, quote]
    saveState('favouriteQuotes', state.favouriteQuotes)
  },
  DELETE_FAVOURITE_QUOTE(state, quote) {
    const savedState = getSavedState('favouriteQuotes')
    state.favouriteQuotes = savedState.filter(
      (favouriteQuote) => favouriteQuote.id !== quote.id
    )
    saveState('favouriteQuotes', state.favouriteQuotes)
  },
}

export const getters = {}

export const actions = {
  init({ commit }) {
    commit('INIT_FAVOURITE_QUOTES')
  },
  addFavouriteQuote({ commit }, quote = {}) {
    commit('ADD_FAVOURITE_QUOTE', quote)
  },
  deleteFavouriteQuote({ commit }, quote = {}) {
    commit('DELETE_FAVOURITE_QUOTE', quote)
  },
}

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}
