import Favourites from './favourites.vue'

describe('@views/favourites', () => {
  it('is a valid view', () => {
    expect(Favourites).toBeAViewComponent()
  })

  it(`displays page title`, () => {
    const { element } = shallowMountView(Favourites)

    expect(element.textContent).toContain('Favourite quotes ')
  })
})
