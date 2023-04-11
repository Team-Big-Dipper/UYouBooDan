import axios, { AxiosResponse, AxiosError } from 'axios';

const overLapAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

// 이메일 중복확인 요청
const overLapEmailApi = (
  email: string,
  callback: (str: string) => void,
): void => {
  overLapAxios
    .get(`/members/verify-email`, {
      params: {
        email,
      },
    })
    .then((res: AxiosResponse) => {
      callback('사용가능한 이메일 입니다.');
    })
    .catch((err: AxiosError) => {
      console.log('err : ', err.message);
      callback('중복된 이메일 입니다.');
    });
};

// 닉네임 중복확인 요청
const overLapNickApi = (
  nickname: string,
  callback: (str: string) => void,
): void => {
  overLapAxios
    .get('/members/verify-nickname', {
      params: {
        nickname,
      },
    })
    .then((res: AxiosResponse) => {
      callback('사용가능한 닉네임 입니다.');
    })
    .catch((err: AxiosError) => {
      console.log('err : ', err.message);
      callback('중복된 닉네임 입니다.');
    });
};

export { overLapEmailApi, overLapNickApi };
