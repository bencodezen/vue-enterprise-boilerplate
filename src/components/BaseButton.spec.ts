import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BaseButton from './BaseButton.vue'

describe('BaseButton Componenet', () => {
  it('renders its content', () => {
    const slotContent = '<strong>Click me!</strong>'
    const { element } = shallowMount(BaseButton, {
      slots: {
        default: slotContent
      }
    })
    expect(element.innerHTML).toContain(slotContent)
  })

  it('renders default content', () => {
    const slotContent = ''
    const { element } = shallowMount(BaseButton, {
      slots: {
        default: slotContent
      }
    })
    expect(element.innerHTML).toContain('Submit')
  })
})
