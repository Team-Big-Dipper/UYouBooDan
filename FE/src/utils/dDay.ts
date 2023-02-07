export const DdayCal= (closedAt: string):number | string => {
  //closedAt: '2023-02-02 22:30:00'
  //new Date().toISOString().replace('T', ' ').replace(/\..*/, '')
  const setDate = new Date(closedAt.replace(' ', 'T'));
  const now = new Date();

  const dis = setDate.getTime() - now.getTime();
  const min1 = 1000 * 60;

  const d = Math.floor(dis / (min1 * 60 * 24));
  const h = Math.floor((dis % (min1 * 60 * 24)) / (min1 * 60));
  const m = Math.floor((dis % (min1 * 60)) / min1);
  const s = Math.floor((dis % min1) / 1000);

  return (d === 0) ? 'day' : d
};