import AppIcon from './app-icon'

describe('@components/app-icon', () => {
  it('renders a font-awesome icon', () => {
    const { element } = mountShallow(AppIcon, {
      ...createComponentMocks({
        style: {
          fa: 'fa',
          'fa-some-icon': 'fa-some-icon',
        },
      }),
      propsData: {
        name: 'some-icon',
      },
    })

    expect(element.className).toEqual('fa fa-some-icon')
  })

  it('renders a custom icon', () => {
    const { element } = mountShallow(AppIcon, {
      ...createComponentMocks({
        style: {
          iconCustomSomeIcon: 'icon-custom-some-icon',
        },
      }),
      propsData: {
        source: 'custom',
        name: 'some-icon',
      },
    })

    expect(element.className).toEqual('icon-custom-some-icon')
  })
})
