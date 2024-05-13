import { describe, it, expect, vi } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import BaseInputText from '@/components/BaseInputText.vue'

describe('@components/BaseInputText', () => {
  it('works with v-model', () => {
    const wrapper = mount(BaseInputText, {
      props: {
        modelValue: 'aaa',
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
      }
    })
    const inputWrapper = wrapper.find('input')
    const inputEl = inputWrapper.element

    // Has the correct starting value
    expect(inputEl.value).toEqual('aaa')

    // Sets the input to the correct value when props change
    inputWrapper.setValue('ccc')
    expect(inputEl.value).toEqual('ccc')
  })

  it('allows a type of "password"', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    shallowMount(BaseInputText, {
      propsData: { value: 'aaa', type: 'password' }
    })
    expect(consoleError).not.toBeCalled()
    consoleError.mockRestore()
  })

  it('does NOT allow a type of "checkbox"', () => {
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    shallowMount(BaseInputText, {
      propsData: { value: 'aaa', type: 'checkbox' }
    })

    expect(consoleWarn).toBeCalled()
    expect(consoleWarn.mock.calls[0][0]).toContain('custom validator check failed for prop "type"')
    consoleWarn.mockRestore()
  })
})
