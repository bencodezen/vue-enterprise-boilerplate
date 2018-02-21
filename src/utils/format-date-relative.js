// https://date-fns.org/docs/parse
import parseDate from 'date-fns/parse'
// https://date-fns.org/docs/distanceInWords
import distanceInWords from 'date-fns/distance_in_words'
// https://date-fns.org/docs/isToday
import isToday from 'date-fns/is_today'

export default function formatDateRelative(fromDate, toDate = new Date()) {
  fromDate = parseDate(fromDate)
  toDate = parseDate(toDate)
  return distanceInWords(fromDate, toDate) + (isToday(toDate) ? ' ago' : '')
}
