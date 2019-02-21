import BaseInputText from './_base-input-text'

describe('@components/_base-input-text', () => {
  it('works with v-model', () => {
    const wrapper = mount(BaseInputText, { propsData: { value: 'aaa' } })
    const inputWrapper = wrapper.find('input')
    const inputEl = inputWrapper.element

    // Has the correct starting value
    expect(inputEl.value).toEqual('aaa')

    // Emits an update event with the correct value when edited
    inputEl.value = 'bbb'
    inputWrapper.trigger('input')
    expect(wrapper.emitted().update).toEqual([['bbb']])

    // Sets the input to the correct value when props change
    wrapper.setProps({ value: 'ccc' })
    expect(inputEl.value).toEqual('ccc')
  })

  it('allows a type of "password"', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    mount(BaseInputText, {
      propsData: { value: 'aaa', type: 'password' },
    })
    expect(consoleError).not.toBeCalled()
    consoleError.mockRestore()
  })

  it('does NOT allow a type of "checkbox"', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    mount(BaseInputText, {
      propsData: { value: 'aaa', type: 'checkbox' },
    })
    expect(consoleError.mock.calls[0][0]).toContain(
      'custom validator check failed for prop "type"'
    )
    consoleError.mockRestore()
  })
})
