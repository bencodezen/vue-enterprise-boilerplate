import axios from 'axios'

export const state = {
  currentUser: null,
  ...getSavedState('auth'),
}

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue
    saveState('auth', state)
  },
}

export const getters = {
  loggedIn(state) {
    return !!state.currentUser
  },
}

export const actions = {
  logIn({ commit, state, getters }, { username, password }) {
    if (getters.loggedIn) return Promise.resolve(state.currentUser)

    return axios.post('/api/session', { username, password }).then(response => {
      const user = response.data
      commit('SET_CURRENT_USER', user)
      return user
    })
  },
  logOut({ commit }) {
    commit('SET_CURRENT_USER', null)
  },
}

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key)) || {}
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}
