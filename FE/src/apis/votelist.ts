import axios, { AxiosError } from 'axios';
import voteInstance from './voteInstance';

export const getVoteList = (
  pageNm: number = 1,
  size: number = 6,
  condition = 'all',
) => {
  try {
    let query = '';
    if (condition !== 'all') {
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
      .then((res) => {
        console.log('api call');
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

// json-server용
// export const getVoteList = (
//   pageNm: number = 1,
//   size: number = 6,
//   condition = 'topics',
// ) => {
//   try {
//     if (condition === 'all') {
//       condition = 'topics';
//     }
//     const result = voteInstance
//       .get(`/${condition}?_page=${pageNm}&_limit=${size}`)
//       .then((res) => {
//         console.log('api call');
//         return {
//           data: res.data,
//           pageInfo: {
//             page: 1,
//             size: 10,
//             totalElements: 6,
//             totalPages: 3,
//           },
//         };
//       });
//     return result;
//   } catch (error) {
//     const err = error as AxiosError;
//     if (axios.isAxiosError(err)) {
//       console.error(err);
//     }
//     return;
//   }
// };
