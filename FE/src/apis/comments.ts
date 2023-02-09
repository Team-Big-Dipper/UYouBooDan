import axios, { AxiosError } from 'axios';
import voteInstance from './voteInstance';

export const getComments = async (
  pageNm: number = 1,
  size: number = 6,
  topicId: string = '1',
) => {
  try {
    const data = await voteInstance
      .get(`/topics/${topicId}/comments?page=${pageNm}&size=${size}`, {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_ACCESSTOKEN,
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': 'any',
        },
      })
      .then((res) => {
        console.log('calling comment');
        return res.data;
      });
    return { ...data };
  } catch (error) {
    const err = error as AxiosError;
    if (axios.isAxiosError(err)) {
      console.error(err);
    }
    return;
  }
};

export const postComment = async (topicId: string, comment: string = '') => {
  try {
    const result = voteInstance
      .post(
        `/topics/${topicId}/comments`,
        {
          commentContent: comment,
        },
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_API_ACCESSTOKEN,
          },
        },
      )
      .then((res) => {
        if (res.status === 201) {
          return { status: 'CREATED', ...res.data };
        }
        console.log('post comment');
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

export const patchComment = async (
  commentId: number | undefined,
  comment: string = '',
) => {
  console.log('댓글아이디', commentId);
  try {
    const result = voteInstance
      .patch(
        `/topics/comments/${commentId}`,
        {
          commentContent: comment,
        },
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_API_ACCESSTOKEN,
          },
        },
      )
      .then((res) => {
        if ((res.status = 200)) {
          return { status: 'REWRITED', ...res.data };
        }
        console.log('patch comment');
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

export const deleteComment = async (commendId: number | undefined) => {
  try {
    if (commendId === 0) {
      return;
    } else {
      console.log('delete comment');
      const result = await voteInstance
        .patch(
          `/topics/comments/${commendId}/remove`,
          {},
          {
            headers: {
              Authorization: process.env.NEXT_PUBLIC_API_ACCESSTOKEN,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            return 'REMOVED';
          }
        });
      return result;
    }
  } catch (error) {
    const err = error as AxiosError;
    if (axios.isAxiosError(err)) {
      console.error(err);
    }
    return;
  }
};
export const postCommentLike = async (commendId: number | undefined) => {
  try {
    if (commendId === 0) {
      return;
    } else {
      console.log('like comment');
      const result = voteInstance.post(
        `/topics/comments/${commendId}/like`,
        {},
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_API_ACCESSTOKEN,
          },
        },
      );
      return result;
    }
  } catch (error) {
    const err = error as AxiosError;
    if (axios.isAxiosError(err)) {
      console.error(err);
    }
    return;
  }
};

//json-server용

// export const getComments = async (
//   pageNm: number = 1,
//   size: number = 6,
//   topicId: number = 1,
// ) => {
//   try {
//     const pageInfo = {
//       pageInfo: {
//         page: 1,
//         size: 6,
//         totalElements: 12,
//         totalPages: 2,
//       },
//     };
//     const data = await voteInstance
//       .get(`/comments?_page=${pageNm}&_limit=${size}`) //topicId 추가할 것
//       .then((res) => {
//         console.log('calling comment');
//         return { data: res.data };
//       });
//     const best = await voteInstance.get(`/comment`).then((res) => {
//       console.log('calling best');
//       return { ...res };
//     });
//     return { ...best['data'], ...data, ...pageInfo };
//   } catch (error) {
//     const err = error as AxiosError;
//     if (axios.isAxiosError(err)) {
//       console.error(err);
//     }
//     return;
//   }
// };

// export const postComment = async (
//   comment: string = '',
//   topicId: number = 1,
// ) => {
//   try {
//     const result = await voteInstance
//       .post('/comments', {
//         //topicId 추가할 것
//         data: {
//           createdAt: new Date(),
//           modifiedAt: new Date(),
//           commendId: 17,
//           memberId: 1,
//           commentContent: comment,
//           commentStatus: 'ACTIVE',
//           totalLike: 0,
//         },
//       })
//       .then((res) => {
//         return res.data;
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

// export const deleteComment = async (commendId: number) => {
//   try {
//     const result = await voteInstance.delete(`/comments/${commendId}`); //topicId 추가할 것
//     return;
//   } catch (error) {
//     const err = error as AxiosError;
//     if (axios.isAxiosError(err)) {
//       console.error(err);
//     }
//     return;
//   }
// };
