import Profile from './profile'

describe('@views/profile', () => {
  it('is a valid view', () => {
    expect(Profile).toBeAViewComponentUsing({ currentUser: { name: '' } })
  })
  it(`includes the logged in user's name`, () => {
    const { element } = mountShallowView(
      Profile,
      createComponentMocks({
        store: {
          auth: {
            state: {
              currentUser: {
                name: 'My Name',
              },
            },
          },
        },
      })
    )

    expect(element.textContent).toMatch(/My Name\s+Profile/)
  })
})
