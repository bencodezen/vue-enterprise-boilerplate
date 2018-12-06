import BaseLink from './_base-link'

const mountBaseLink = (options = {}) => {
  return mount(BaseLink, {
    stubs: {
      RouterLink: {
        functional: true,
        render(h, { slots, data }) {
          return <a data-router-link="true">{slots().default}</a>
        },
      },
    },
    slots: {
      default: 'hello',
    },
    ...options,
  })
}

describe('@components/_base-link', () => {
  const originalConsoleWarn = global.console.warn
  let warning
  beforeEach(() => {
    warning = undefined
    global.console.warn = jest.fn((text) => {
      warning = text
    })
  })
  afterAll(() => {
    global.console.warn = originalConsoleWarn
  })

  it('exports a valid component', () => {
    expect(BaseLink).toBeAComponent()
  })

  it('warns about missing required props', () => {
    mountBaseLink()
    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(warning).toMatch(/Invalid <BaseLink> props/)
  })

  it('warns about an invalid href', () => {
    mountBaseLink({
      propsData: {
        href: '/some/local/path',
      },
    })
    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(warning).toMatch(/Invalid <BaseLink> href/)
  })

  it('warns about an insecure href', () => {
    mountBaseLink({
      propsData: {
        href: 'http://google.com',
      },
    })
    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(warning).toMatch(/Insecure <BaseLink> href/)
  })

  it('renders an anchor element when passed an `href` prop', () => {
    const externalUrl = 'https://google.com/'
    const { element } = mountBaseLink({
      propsData: {
        href: externalUrl,
      },
    })
    expect(console.warn).not.toHaveBeenCalled()
    expect(element.tagName).toEqual('A')
    expect(element.href).toEqual(externalUrl)
    expect(element.target).toEqual('_blank')
    expect(element.textContent).toEqual('hello')
  })

  it('renders a RouterLink when passed a `name` prop', () => {
    const routeName = 'home'
    const { element, vm } = mountBaseLink({
      propsData: {
        name: routeName,
      },
    })
    expect(console.warn).not.toHaveBeenCalled()
    expect(element.dataset.routerLink).toEqual('true')
    expect(element.textContent).toEqual('hello')
    expect(vm.routerLinkTo).toEqual({ name: routeName, params: {} })
  })

  it('renders a RouterLink when passed `name` and `params` props', () => {
    const routeName = 'home'
    const routeParams = { foo: 'bar' }
    const { element, vm } = mountBaseLink({
      propsData: {
        name: routeName,
        params: routeParams,
      },
    })
    expect(console.warn).not.toHaveBeenCalled()
    expect(element.dataset.routerLink).toEqual('true')
    expect(element.textContent).toEqual('hello')
    expect(vm.routerLinkTo).toEqual({
      name: routeName,
      params: routeParams,
    })
  })

  it('renders a RouterLink when passed a `to` prop', () => {
    const routeName = 'home'
    const { element, vm } = mountBaseLink({
      propsData: {
        to: {
          name: routeName,
        },
      },
    })
    expect(console.warn).not.toHaveBeenCalled()
    expect(element.dataset.routerLink).toEqual('true')
    expect(element.textContent).toEqual('hello')
    expect(vm.routerLinkTo).toEqual({ name: routeName, params: {} })
  })

  it('renders a RouterLink when passed a `to` prop with `params`', () => {
    const routeName = 'home'
    const routeParams = { foo: 'bar' }
    const { element, vm } = mountBaseLink({
      propsData: {
        to: {
          name: routeName,
          params: routeParams,
        },
      },
    })
    expect(console.warn).not.toHaveBeenCalled()
    expect(element.dataset.routerLink).toEqual('true')
    expect(element.textContent).toEqual('hello')
    expect(vm.routerLinkTo).toEqual({ name: routeName, params: routeParams })
  })
})
