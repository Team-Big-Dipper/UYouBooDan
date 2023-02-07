import axios, { AxiosError } from 'axios';
import voteInstance from './voteInstance';

export const getReadVote = (id: number = 1, token: string = '') => {
  try {
    const result = voteInstance
      .get(`/topic/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
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
