import BaseInput from './_base-input'

describe('@components/_base-input', () => {
  it('works with v-model', () => {
    const wrapper = mount(BaseInput, { propsData: { value: 'aaa' } })
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
})
