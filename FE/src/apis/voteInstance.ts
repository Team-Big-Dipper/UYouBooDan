import axios from 'axios';

const voteInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 5000,
});

// axios.interceptors.request.use(
//   function (config) {
//     // 요청이 전달되기 전에 작업 수행
//     console.info('calling api');
//     return config;
//   },
//   function (error) {
//     // 요청 오류가 있는 작업 수행
//     return Promise.reject(error);
//   },
// );
export default voteInstance;
