import momenttz from 'moment-timezone';

export const moment = momenttz().tz(momenttz.tz.guess(true));

export const getFormattedDateTime = (date: string, time: string) => {
  const timeZone = momenttz.tz.guess(true);
  const parsedDateTime = momenttz.tz(`${date} ${time}`, 'YYYY-MM-DD HH:mm', timeZone);

  return parsedDateTime.format('h:mm A on ddd, Do MMM');
};
