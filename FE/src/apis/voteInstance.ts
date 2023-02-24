import axios, { AxiosError } from 'axios';

const voteInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 5000,
});

// voteInstance.interceptors.response.use(async (error) => {
//   if (error instanceof AxiosError) {
//     if (error.response?.status === 401) {
//       return '잘못된 요청입니다';
//     }
//   }
//   return Promise.reject(error.response);
// });

export default voteInstance;
