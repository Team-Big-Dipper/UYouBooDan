import axios, { AxiosError } from 'axios';
import voteInstance from './voteInstance';

export const getVoteList = (
  pageNm: number = 1,
  size: number = 6,
  condition = 'topics',
) => {
  try {
    if (condition === 'all') {
      condition = 'topics';
    }
    const result = voteInstance
      .get(`/${condition}?_page=${pageNm}&_limit=${size}`)
      .then((res) => {
        return {
          data: res.data,
          pageInfo: {
            page: 1,
            size: 10,
            totalElements: 6,
            totalPages: 3,
          },
        };
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
// export const getTotalList = (pageNm: number = 1, size: number = 6) => {
//   try {
//     const result = voteInstance
//       .get(`/topics?_page=${pageNm}&_limit=${size}`)
//       .then((res) => {
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

// export const getProgressList = (pageNm: number = 1, size: number = 6) => {
//   try {
//     const result = voteInstance
//       .get(`/progress?_page=${pageNm}&_limit=${size}`)
//       .then((res) => {
//         return {
//           data: res.data,
//           pageInfo: {
//             page: 1,
//             size: 10,
//             totalElements: 6,
//             totalPages: 2,
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

// export const getClosedList = (pageNm: number = 1, size: number = 6) => {
//   try {
//     const result = voteInstance
//       .get(`/closed?_page=${pageNm}&_limit=${size}`)
//       .then((res) => {
//         return {
//           data: res.data,
//           pageInfo: {
//             page: 1,
//             size: 10,
//             totalElements: 6,
//             totalPages: 1,
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

// export const getImminentList = (pageNm: number = 1, size: number = 6) => {
//   try {
//     const result = voteInstance
//       .get(`/imminent?_page=${pageNm}&_limit=${size}`)
//       .then((res) => {
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
