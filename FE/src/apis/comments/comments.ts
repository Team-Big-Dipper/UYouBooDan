import axios, { AxiosError } from 'axios';
import voteInstance from '../voteInstance';

export const getComments = async (
  pageNm: number = 1,
  size: number = 6,
  topicId: string | string[] | undefined,
) => {
  try {
    console.log('get comment');
    const data = await voteInstance
      .get(`/topics/${topicId}/comments?page=${pageNm}&size=${size}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': 'any',
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return 'Err';
      });
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const postComment = async (
  topicId: string,
  comment: string = '',
  token: string,
) => {
  try {
    console.log('post comment');
    const result = voteInstance
      .post(
        `/topics/${topicId}/comments`,
        {
          commentContent: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 201) {
          return { status: 'CREATED', ...res.data };
        }
      })
      .catch((e) => {
        alert(e.response.data.message);
        console.log(e.response.data.message);
      });
    return result;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const patchComment = async (
  commentId: number | undefined,
  comment: string = '',
  token: string,
) => {
  try {
    console.log('patch comment', commentId);
    const result = voteInstance
      .patch(
        `/topics/comments/${commentId}`,
        {
          commentContent: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          return { status: 'REWRITED', ...res.data };
        }
      })
      .catch((e) => {
        alert(e.response.data.message);
        console.log(e.response.data.message);
      });
    return result;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteComment = async (
  commendId: number | undefined,
  token: string,
) => {
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
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            return 'REMOVED';
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          alert(err.response.data.message);
        });
      return result;
    }
  } catch (error) {
    console.error(error);
    return;
  }
};
export const postCommentLike = async (
  commendId: number | undefined,
  token: string,
) => {
  try {
    if (commendId === 0) {
      return;
    } else {
      console.log('post like comment');
      const result = voteInstance
        .post(
          `/topics/comments/${commendId}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          return res.data;
        });
      return result;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
