import axios from 'axios'

export const state = {
  dataArray: getSavedState('playground.data') || [],
}

export const mutations = {
  SET_PLAYGROUND_DATA(state, newData) {
    state.dataArray = newData
    saveState('playground.data', newData)
  },
}

export const getters = {
  // sending data to component.
  getDataArray() {
    return state.dataArray
  },
}

export const actions = {
  fetchDataFromServer({ commit }) {
    return axios
      .get('https://reqres.in/api/users?page=2')
      .then((response) => {
        const tempData = response.data.data
        commit('SET_PLAYGROUND_DATA', [...tempData])
        return tempData
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          commit('SET_PLAYGROUND_DATA', [])
        } else {
          commit('SET_PLAYGROUND_DATA', [])
          console.warn(error)
        }
        return null
      })
  },
}

//   privateutils localstorage functions.
//  i would have used them as global functions and imported them but i didn't want to change other files

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}
