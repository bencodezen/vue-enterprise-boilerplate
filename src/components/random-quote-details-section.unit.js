import RandomQuoteDetailsSection from './random-quote-details-section.vue'

describe('@components/random-quote-details-section', () => {
  it('renders quote details', () => {
    const wrapper = shallowMount(RandomQuoteDetailsSection, {
      ...createComponentMocks({
        store: {
          favourites: {
            state: {
              favouriteQuotes: [],
            },
            actions: {
              addFavouriteQuote: jest.fn(),
              deleteFavouriteQuote: jest.fn(),
            },
          },
        },
      }),
      propsData: {
        quote: {
          dialog: 'Mr Frodo!',
          character: 'abc',
          movie: 'def',
          _id: 'ghi',
        },
        characters: [
          {
            name: 'Samwise Gamgee',
            _id: 'abc',
          },
        ],
        movies: [
          {
            name: 'Return of the King',
            _id: 'def',
          },
        ],
        quoteText: 'Mr Frodo!',
      },
    })

    expect(wrapper.element.textContent).toContain('Samwise Gamgee')
  })

  it('renders add to favourites button when quote is not favourited', () => {
    const wrapper = shallowMount(RandomQuoteDetailsSection, {
      ...createComponentMocks({
        store: {
          favourites: {
            state: {
              favouriteQuotes: [],
            },
            actions: {
              addFavouriteQuote: jest.fn(),
              deleteFavouriteQuote: jest.fn(),
            },
          },
        },
      }),
      propsData: {
        quote: {
          dialog: 'Mr Frodo!',
          character: 'abc',
          movie: 'def',
          _id: 'ghi',
        },
        characters: [
          {
            name: 'Samwise Gamgee',
            _id: 'abc',
          },
        ],
        movies: [
          {
            name: 'Return of the King',
            _id: 'def',
          },
        ],
        quoteText: 'Mr Frodo!',
      },
    })

    expect(wrapper.element.textContent).toContain('Add to favourites')
  })

  it('renders remove from favourites button when quote is already favourited', () => {
    const wrapper = shallowMount(RandomQuoteDetailsSection, {
      ...createComponentMocks({
        store: {
          favourites: {
            state: {
              favouriteQuotes: [
                {
                  text: 'Mr Frodo!',
                  id: 'ghi',
                  author: 'abc',
                  movie: 'def',
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
      propsData: {
        quote: {
          dialog: 'Mr Frodo!',
          character: 'abc',
          movie: 'def',
          _id: 'ghi',
        },
        characters: [
          {
            name: 'Samwise Gamgee',
            _id: 'abc',
          },
        ],
        movies: [
          {
            name: 'Return of the King',
            _id: 'def',
          },
        ],
        quoteText: 'Mr Frodo!',
      },
    })

    expect(wrapper.element.textContent).toContain('Remove from favourites')
  })

  it('calls add to favourites when button clicked', async () => {
    const addFavouriteQuote = jest.fn()
    const wrapper = shallowMount(RandomQuoteDetailsSection, {
      ...createComponentMocks({
        store: {
          favourites: {
            state: {
              favouriteQuotes: [],
            },
            actions: {
              addFavouriteQuote,
              deleteFavouriteQuote: jest.fn(),
            },
          },
        },
      }),
      propsData: {
        quote: {
          dialog: 'Mr Frodo!',
          character: 'abc',
          movie: 'def',
          _id: 'ghi',
        },
        characters: [
          {
            name: 'Samwise Gamgee',
            _id: 'abc',
          },
        ],
        movies: [
          {
            name: 'Return of the King',
            _id: 'def',
          },
        ],
        quoteText: 'Mr Frodo!',
      },
    })

    await wrapper.find('section').trigger('click')

    expect(addFavouriteQuote).toHaveBeenCalled()
  })

  it('calls add to favourites when button clicked', async () => {
    const deleteFavouriteQuote = jest.fn()
    const wrapper = shallowMount(RandomQuoteDetailsSection, {
      ...createComponentMocks({
        store: {
          favourites: {
            state: {
              favouriteQuotes: [
                {
                  text: 'Mr Frodo!',
                  id: 'ghi',
                  author: 'abc',
                  movie: 'def',
                },
              ],
            },
            actions: {
              addFavouriteQuote: jest.fn(),
              deleteFavouriteQuote,
            },
          },
        },
      }),
      propsData: {
        quote: {
          dialog: 'Mr Frodo!',
          character: 'abc',
          movie: 'def',
          _id: 'ghi',
        },
        characters: [
          {
            name: 'Samwise Gamgee',
            _id: 'abc',
          },
        ],
        movies: [
          {
            name: 'Return of the King',
            _id: 'def',
          },
        ],
        quoteText: 'Mr Frodo!',
      },
    })

    await wrapper.find('section').trigger('click')

    expect(deleteFavouriteQuote).toHaveBeenCalled()
  })
})
