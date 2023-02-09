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
        console.log('get comment');
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
      console.log('post like comment');
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
