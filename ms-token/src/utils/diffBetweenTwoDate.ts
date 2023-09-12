import * as moment from 'moment';

export const isDiffBetweenTwoDate = (
  date1: Date,
  date2: Date,
  diff: number,
): boolean => {
  const momentDate1 = moment(date1);
  const momentDate2 = moment(date2);

  const diffInMinutes = momentDate2.diff(momentDate1, 'minutes');

  return diffInMinutes > diff;
};
