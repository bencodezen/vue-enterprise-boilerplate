import RandomQuote from './random-quote.vue'

describe('@components/random-quote', () => {
  it('renders an element', () => {
    const { element } = shallowMountView(RandomQuote)
    expect(element.textContent).toContain('Po-ta-toes!')
  })
})
