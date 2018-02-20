import Login from './login'

describe('@views/login', () => {
  it('is a valid view', () => {
    expect(Login).toBeAViewComponent()
  })

  it('redirects to home after successful login', () => {
    const { vm } = mountLogin()

    vm.username = 'correctUsername'
    vm.password = 'correctPassword'

    const routerPush = jest.fn()
    vm.$router = { push: routerPush }

    expect.assertions(2)
    return vm.tryToLogIn().then(() => {
      expect(vm.authError).toEqual(null)
      expect(routerPush).toHaveBeenCalledWith({ name: 'home' })
    })
  })

  it('displays an error after failed login', () => {
    const { vm } = mountLogin()

    const routerPush = jest.fn()
    vm.$router = { push: routerPush }

    expect.assertions(2)
    return vm.tryToLogIn().then(() => {
      expect(vm.authError).toBeTruthy()
      expect(vm.$el.textContent).toContain('error')
    })
  })
})

function mountLogin() {
  return mountShallowView(Login, {
    ...createComponentMocks({
      store: {
        auth: {
          actions: {
            logIn(_, { username, password }) {
              if (
                username === 'correctUsername' &&
                password === 'correctPassword'
              ) {
                return Promise.resolve('testToken')
              } else {
                return Promise.reject(new Error('testError'))
              }
            },
          },
        },
      },
    }),
  })
}
