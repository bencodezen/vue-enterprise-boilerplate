import Timeout from './_timeout'

describe('@views/timeout', () => {
  it('is a valid view', () => {
    expect(Timeout).toBeAViewComponent()
  })
})
