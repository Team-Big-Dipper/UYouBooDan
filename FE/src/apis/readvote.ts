import axios, { AxiosError } from 'axios';
import voteInstance from './voteInstance';

export const getReadVote = (id: string | string[] = '1') => {
  try {
    const result = voteInstance
      .get(`/topics/${id}`, {
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
