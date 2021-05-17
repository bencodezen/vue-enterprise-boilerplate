import Home from './home.vue'

describe('@views/home', () => {
  it('is a valid view', () => {
    expect(Home).toBeAViewComponent()
  })

  xit('renders an element', () => {
    const { element } = shallowMountView(Home)
    expect(element.textContent).toContain('Hullo')
  })
})
