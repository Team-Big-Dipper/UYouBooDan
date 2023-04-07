import voteInstance from '../voteInstance';

export const getVoteList = (
  pageNm: number = 1,
  size: number = 6,
  condition: string = 'all',
) => {
  let query = '';
  if (condition !== 'all' && condition !== null) {
    query = `page=${pageNm}&size=${size}&filter=${condition}`;
  } else {
    query = `page=${pageNm}&size=${size}`;
  }
  const result = voteInstance
    .get(`/topics?${query}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': 'any',
      },
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      console.log(err);
      return 'Err';
    });
  return result;
};
