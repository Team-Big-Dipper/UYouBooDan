import voteInstance from '../voteInstance';

export const getReadVote = (id: string | string[] = '1', token: string) => {
  const result = voteInstance
    .get(`/topics/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': 'any',
      },
    })
    .then((res: any) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err: any) => {
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
    .then((res: any) => {
      console.log(res);
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error();
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
  return result;
};

export const patchTopicLike = (topicId: number, token: string) => {
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
    .then((res: any) => {
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error();
      }
    })
    .catch((err:any) => {
      console.log(err);
    });
  return result;
};

export const deletevote = async (topicId: number, token: string) => {
  try {
    await voteInstance.delete(`/topics/${topicId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'ngrok-skip-browser-warning': 'any',
      },
    });
  } catch (err) {
    console.log(err);
  }
};
