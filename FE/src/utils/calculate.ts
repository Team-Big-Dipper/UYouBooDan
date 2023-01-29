export const CalcTotal = (arr: any) => {
  const countArr = arr.map((el: any) => {
    return el.totalVote;
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
