describe('@state/modules/auth', () => {
  const prevLocalStorage = window.localStorage
  beforeAll(() => {
    window.localStorage = {
      getItem: () => null,
      setItem() {},
    }
  })
  afterAll(() => {
    window.localStorage = prevLocalStorage
  })

  it('Getter: loggedIn returns true when currentUser is an object', () => {
    const loggedIn = require('./auth').getters.loggedIn
    const loggedInValue = loggedIn({ currentUser: {} })
    expect(loggedInValue).toEqual(true)
  })

  it('Getter: loggedIn returns false when currentUser is null', () => {
    const loggedIn = require('./auth').getters.loggedIn
    const loggedInValue = loggedIn({ currentUser: null })
    expect(loggedInValue).toEqual(false)
  })

  it('Action: logIn returns a promise that resolves to the currentUser when already logged in', done => {
    const logInPromise = require('./auth').actions.logIn(
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

  it('Action: logIn commits the currentUser and returns a promise that resolves to the user when NOT already logged in and provided a correct username and password', done => {
    const commitMock = jest.fn()

    const logInPromise = require('./auth').actions.logIn(
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

    logInPromise.then(currentUser => {
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
      done()
    })
  })

  it('Action: logIn returns a promise that throws when NOT already logged in and provided an incorrect username and password', done => {
    const logInPromise = require('./auth').actions.logIn(
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

    logInPromise.catch(error => {
      expect(error.message).toEqual('Request failed with status code 401')
      done()
    })
  })
})
