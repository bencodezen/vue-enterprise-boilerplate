import * as usersModule from './users'

describe('@state/modules/users', () => {
  it('exports a valid Vuex module', () => {
    expect(usersModule).toBeAVuexModule()
  })

  describe('in a store when logged in', () => {
    let store
    beforeEach(() => {
      store = createModuleStore(usersModule, {
        currentUser: validUserExample,
      })
    })

    it('actions.fetchUser returns the current user without fetching it again', () => {
      expect.assertions(2)

      const axios = require('axios')
      const originalAxiosGet = axios.get
      axios.get = jest.fn()

      return store.dispatch('fetchUser', { username: 'admin' }).then((user) => {
        expect(user).toEqual(validUserExample)
        expect(axios.get).not.toHaveBeenCalled()
        axios.get = originalAxiosGet
      })
    })

    it('actions.fetchUser rejects with 400 when provided a bad username', () => {
      expect.assertions(1)

      return store
        .dispatch('fetchUser', { username: 'bad-username' })
        .catch((error) => {
          expect(error.response.status).toEqual(400)
        })
    })
  })

  describe('in a store when logged out', () => {
    let store
    beforeEach(() => {
      store = createModuleStore(usersModule)
    })

    it('actions.fetchUser rejects with 401', () => {
      expect.assertions(1)

      return store
        .dispatch('fetchUser', { username: 'admin' })
        .catch((error) => {
          expect(error.response.status).toEqual(401)
        })
    })
  })
})

const validUserExample = {
  id: 1,
  username: 'admin',
  name: 'Vue Master',
  token: 'valid-token-for-admin',
}
