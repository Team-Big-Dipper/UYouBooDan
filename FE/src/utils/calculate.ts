import { ParseDate } from './parseDate';

export const CalcTotal = (arr: any) => {
  const countArr = arr.map((el: any) => {
    return el.numberOfVotes;
  });
  const total = countArr.reduce(function add(sum: number, currValue: number) {
    return sum + currValue;
  }, 0);
  return total;
};

export const CalcPercentage = (count: number, totalCount: number) => {
  let result = 0;
  result = Math.round((count / totalCount) * 100);
  return result;
};

export const CalcDday = (end: any): string => {
  const startDate = new Date();
  const endDate = ParseDate(end);
  const distance = endDate.getTime() - startDate.getTime();
  const day = Math.floor(distance / (1000 * 60 * 60 * 24));

  if (day >= 0 && day < 1) {
    return 'D-day';
  } else if (day >= 1) {
    return 'D-' + day;
  } else {
    return '';
  }
};
