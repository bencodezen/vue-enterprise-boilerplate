import AppInput from './app-input'

describe('@components/app-input', () => {
  it('works with v-model', () => {
    const parent = mount({
      components: { AppInput },
      data: () => ({ foo: '' }),
      template: `<AppInput v-model="foo"/>`,
    })
    const input = parent.find('input')

    expect(input.element.value).toEqual('')

    input.element.value = 'aaa'
    input.trigger('input')

    expect(parent.vm.foo).toEqual('aaa')

    parent.vm.foo = 'bbb'
    parent.update()

    expect(input.element.value).toEqual('bbb')
  })
})
