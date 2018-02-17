// https://date-fns.org/docs/parse
import parseDate from 'date-fns/parse'
// https://date-fns.org/docs/format
import formatDate from 'date-fns/format'

export default date => {
  date = parseDate(date)
  return formatDate(date, 'MMM Do, YYYY')
}
