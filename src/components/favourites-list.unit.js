import FavouritesList from '@components/./favourites-list.vue'

describe('@components/favourites-list', () => {
  it('renders list of cards with quote details', () => {
    const wrapper = shallowMount(FavouritesList, {
      ...createComponentMocks({
        store: {
          favourites: {
            state: {
              favouriteQuotes: [
                {
                  text: 'Mr Frodo!',
                  id: 'ghi',
                  author: 'Samwise Gamgee',
                  movie: 'Return of the King',
                },
              ],
            },
            actions: {
              addFavouriteQuote: jest.fn(),
              deleteFavouriteQuote: jest.fn(),
            },
          },
        },
      }),
    })

    expect(wrapper.element.textContent).toContain('Remove from favourites')
    expect(wrapper.element.textContent).toContain('Mr Frodo!')
    expect(wrapper.element.textContent).toContain('Samwise Gamgee')
    expect(wrapper.element.textContent).toContain('Return of the King')
  })
})
