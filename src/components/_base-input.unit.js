import BaseInput from './_base-input'

describe('@components/base-input', () => {
  it('works with v-model', () => {
    const component = mount(BaseInput, { propsData: { value: 'aaa' } })
    const inputEl = component.find('input').element

    // Has the correct starting value
    expect(inputEl.value).toEqual('aaa')

    // Emits an input event with the correct value when edited
    inputEl.value = 'bbb'
    component.trigger('input')
    expect(component.emitted().input).toEqual([['bbb']])

    // Sets the input to the correct value when props change
    component.setProps({ value: 'ccc' })
    expect(inputEl.value).toEqual('ccc')
  })
})
