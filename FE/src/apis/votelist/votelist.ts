import axios, { AxiosError } from 'axios';
import voteInstance from '../voteInstance';

export const getVoteList = (
  pageNm: number = 1,
  size: number = 6,
  condition: string = 'all',
) => {
  try {
    let query = '';
    if (condition !== 'all' && condition !== null) {
      query = `page=${pageNm}&size=${size}&filter=${condition}`;
    } else {
      query = `page=${pageNm}&size=${size}`;
    }
    console.log('api votelist', condition);
    const result = voteInstance
      .get(`/topics?${query}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': 'any',
        },
      })
      .then((res) => {
        return res.data;
      });
    return result;
  } catch (error) {
    const err = error as AxiosError;
    if (axios.isAxiosError(err)) {
      console.error(err);
    }
    return;
  }
};
