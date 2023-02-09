export const ParseDate = (value: any): any => {
  const year = value?.substring(0, 4);
  const month = value?.substring(5, 7);
  const day = value?.substring(8, 10);
  const hour = value?.substring(11, 13);
  const minute = value?.substring(14, 16);
  const second = value?.substring(17, 19);
  const result = new Date(year, month - 1, day, hour, minute, second);

  return result;
};

export const ChangDateFormat = (date: string | undefined) => {
  const year = date?.substring(0, 4);
  const month = date?.substring(5, 7);
  const day = date?.substring(8, 10);
  return year + '.' + month + '.' + day;
};
