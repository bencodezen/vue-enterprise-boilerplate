import formatDate from './format-date'

describe('@utils/format-date', () => {
  it('correctly compares dates years apart', () => {
    const date = new Date(2002, 5, 1)
    const formattedDate = formatDate(date)
    expect(formattedDate).toEqual('Jun 1st, 2002')
  })

  it('correctly compares dates months apart', () => {
    const date = new Date(2017, 8, 1)
    const formattedDate = formatDate(date)
    expect(formattedDate).toEqual('Sep 1st, 2017')
  })

  it('correctly compares dates days apart', () => {
    const date = new Date(2017, 11, 11)
    const formattedDate = formatDate(date)
    expect(formattedDate).toEqual('Dec 11th, 2017')
  })
})
