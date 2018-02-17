import * as AuthenticationApi from 'mock-authentication-api'

const netWorkLatency = 1000
const userStore = [
  {
    id: 1,
    username: 'admin',
    password: 'password',
    name: 'Vue Master',
    token: 'token-to-use-on-authenticated-requests',
  },
]
AuthenticationApi.configure(netWorkLatency, userStore)

export const state = {
  currentUser: null,
  ...getSavedAuth(),
}

function getSavedAuth() {
  return JSON.parse(window.localStorage.getItem('auth')) || {}
}

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue
    saveAuth(state)
  },
}

function saveAuth(auth) {
  window.localStorage.setItem('auth', JSON.stringify(auth))
}

export const getters = {
  loggedIn(state) {
    return !!state.currentUser
  },
}

export const actions = {
  logIn({ commit, state, getters }, { username, password }) {
    if (getters.loggedIn) return Promise.resolve(state.currentUser)

    return AuthenticationApi.authenticate(username, password).then(user => {
      commit('SET_CURRENT_USER', user)
      return user
    })
  },
  logOut({ commit }) {
    commit('SET_CURRENT_USER', null)
  },
}
