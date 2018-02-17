import App from './app'

describe('app.vue', () => {
  it(`renders a root element with an id of 'app'`, () => {
    const { element } = mountShallow(App)
    expect(element.id).toEqual('app')
  })
})
