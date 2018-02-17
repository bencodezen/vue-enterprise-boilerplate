import NavBarRoutes from './nav-bar-routes'

const mountRoutes = options => {
  return mount(NavBarRoutes, {
    components: {
      NavBarRoutes,
    },
    render(h) {
      return (
        <ul>
          <NavBarRoutes
            routes={[
              {
                name: 'aaa',
                title: 'bbb',
              },
            ]}
          />
        </ul>
      )
    },
    ...options,
  })
}

describe('@components/nav-bar-routes', () => {
  it('correctly renders routes with text titles', () => {
    const { element } = mountRoutes({
      props: {
        routes: [
          {
            name: 'aaa',
            title: 'bbb',
          },
        ],
      },
    })
    expect(element.textContent).toEqual('bbb')
  })

  it('correctly renders routes with function titles', () => {
    const { element } = mountRoutes({
      props: {
        routes: [
          {
            name: 'aaa',
            title: () => 'bbb',
          },
        ],
      },
    })
    expect(element.textContent).toEqual('bbb')
  })
})
