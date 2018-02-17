import NavBar from './nav-bar'

describe('@components/nav-bar', () => {
  it(`displays the user's full name in the profile link`, () => {
    const { vm } = mountShallow(
      NavBar,
      createComponentMocks({
        store: {
          state: {
            auth: {
              currentUser: {
                name: 'My Name',
              },
            },
          },
          getters: {
            loggedIn: () => true,
          },
        },
      })
    )

    const profileRoute = vm.loggedInNavRoutes.find(
      route => route.name === 'profile'
    )
    expect(profileRoute.title()).toEqual('Logged in as My Name')
  })
})
