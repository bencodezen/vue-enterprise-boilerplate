import formatDateRelative from './format-date-relative'

describe('@utils/format-date-relative', () => {
  it('correctly compares dates years apart', () => {
    const fromDate = new Date(2002, 5, 1)
    const toDate = new Date(2017, 4, 10)
    const timeAgoInWords = formatDateRelative(fromDate, toDate)
    expect(timeAgoInWords).toEqual('almost 15 years')
  })

  it('correctly compares dates months apart', () => {
    const fromDate = new Date(2017, 8, 1)
    const toDate = new Date(2017, 11, 10)
    const timeAgoInWords = formatDateRelative(fromDate, toDate)
    expect(timeAgoInWords).toEqual('3 months')
  })

  it('correctly compares dates days apart', () => {
    const fromDate = new Date(2017, 11, 1)
    const toDate = new Date(2017, 11, 10)
    const timeAgoInWords = formatDateRelative(fromDate, toDate)
    expect(timeAgoInWords).toEqual('9 days')
  })

  it('compares to now when passed only one date', () => {
    const fromDate = new Date(2010, 11, 1)
    const timeAgoInWords = formatDateRelative(fromDate)
    expect(timeAgoInWords).toContain('years ago')
  })
})
