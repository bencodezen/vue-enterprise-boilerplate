import * as authModule from './auth'

describe('@state/modules/auth', () => {
  it('exports a valid Vuex module', () => {
    expect(authModule).toBeAVuexModule()
  })

  it('Getter: loggedIn returns true when currentUser is an object', () => {
    const loggedIn = authModule.getters.loggedIn
    const loggedInValue = loggedIn({ currentUser: {} })
    expect(loggedInValue).toEqual(true)
  })

  it('Getter: loggedIn returns false when currentUser is null', () => {
    const loggedIn = authModule.getters.loggedIn
    const loggedInValue = loggedIn({ currentUser: null })
    expect(loggedInValue).toEqual(false)
  })

  it('Action: logIn returns a promise that resolves to the currentUser when already logged in', done => {
    const logInPromise = authModule.actions.logIn(
      {
        state: {
          currentUser: {
            name: 'My Name',
          },
        },
        getters: {
          loggedIn: true,
        },
      },
      {}
    )

    logInPromise.then(currentUser => {
      expect(currentUser).toEqual({ name: 'My Name' })
      done()
    })
  })

  it('Action: logIn commits the currentUser and returns a promise that resolves to the user when NOT already logged in and provided a correct username and password', () => {
    const commitMock = jest.fn()

    return authModule.actions
      .logIn(
        {
          getters: {
            loggedIn: false,
          },
          commit: commitMock,
        },
        {
          username: 'admin',
          password: 'password',
        }
      )
      .then(currentUser => {
        const expectedCurrentUser = {
          id: 1,
          username: 'admin',
          name: 'Vue Master',
          token: 'mock-token',
        }
        expect(currentUser).toEqual(expectedCurrentUser)
        expect(commitMock).toHaveBeenCalledWith(
          'SET_CURRENT_USER',
          expectedCurrentUser
        )
      })
  })

  it('Action: logIn returns a promise that throws when NOT already logged in and provided an incorrect username and password', () => {
    return authModule.actions
      .logIn(
        {
          getters: {
            loggedIn: false,
          },
        },
        {
          username: 'bad username',
          password: 'bad password',
        }
      )
      .catch(error => {
        expect(error.message).toEqual('Request failed with status code 401')
      })
  })
})
