import MainLayout from './main'

describe('@layouts/main', () => {
  it('renders its content', () => {
    const slotContent = '<p>Hello!</p>'
    const { element } = mountShallow(MainLayout, {
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })
})
