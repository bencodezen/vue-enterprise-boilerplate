import RandomQuote from './random-quote.vue'
import BaseButton from './_base-button.vue'

describe('@components/random-quote', () => {
  it('renders a button', () => {
    const { element } = shallowMountView(RandomQuote)
    expect(element.textContent).toContain('Po-ta-toes!')
  })

  it('fetches data when mounted', async () => {
    const fetchData = jest.fn()
    shallowMountView(RandomQuote, {
      methods: {
        fetchData,
      },
    })

    expect(fetchData).toHaveBeenCalled()
  })

  it('displays quote text after clicking on button', async () => {
    const fetchData = jest.fn()
    const wrapper = shallowMountView(RandomQuote, {
      data() {
        return {
          quotes: [
            {
              dialog: 'Mr Frodo!',
              character: 'abc',
              movie: 'def',
            },
          ],
        }
      },
      methods: {
        fetchData,
      },
      stubs: {
        BaseButton,
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.element.textContent).toContain('Mr Frodo!')
  })
})
