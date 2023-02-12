import axios, { AxiosError } from 'axios';
import voteInstance from '../voteInstance';

export const getReadVote = (id: string | string[] = '1', token: string) => {
  try {
    console.log('api readvote');
    const result = voteInstance
      .get(`/topics/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': 'any',
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        } else {
          throw new Error();
        }
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

export const patchSingleVoteItem = (
  topicId: number,
  itemId: number,
  token: string,
) => {
  try {
    console.log('api singlevote');
    const result = voteInstance
      .patch(
        `/topics/${topicId}/vote`,
        {
          topicVoteItemId: itemId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'ngrok-skip-browser-warning': 'any',
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        } else {
          throw new Error();
        }
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

export const patchTopicLike = (topicId: number, token: string) => {
  try {
    console.log('api likevote');
    const result = voteInstance
      .patch(
        `/topics/${topicId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'ngrok-skip-browser-warning': 'any',
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        } else {
          throw new Error();
        }
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
