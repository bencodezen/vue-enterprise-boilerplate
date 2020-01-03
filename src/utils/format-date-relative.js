// https://date-fns.org/docs/formatDistance
import formatDistance from 'date-fns/formatDistance'
// https://date-fns.org/docs/isToday
import isToday from 'date-fns/isToday'

export default function formatDateRelative(fromDate, toDate = new Date()) {
  return formatDistance(fromDate, toDate) + (isToday(toDate) ? ' ago' : '')
}
