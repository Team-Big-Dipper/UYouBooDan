import axios, { AxiosError } from 'axios';
import voteInstance from '../voteInstance';

export const getReadVote = (id: string | string[] = '1', token: string) => {
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
      }
    })
    .catch((err) => {
      console.log(err);
      return 'Err';
    });
  return result;
};

export const patchSingleVoteItem = (
  topicId: number,
  itemId: number,
  token: string,
) => {
  console.log('api patchsinglevote', topicId, itemId, token);
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
      console.log(res);
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

export const patchTopicLike = (topicId: number, token: string) => {
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
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

export const deletevote = async (topicId: number, token: string) => {
  console.log('delete');
  try {
    console.log('api likevote');
    await voteInstance.delete(`/topics/${topicId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': 'any',
      },
    });
  } catch (error) {
    const err = error as AxiosError;
    if (axios.isAxiosError(err)) {
      console.error(err);
    }
  }
};
