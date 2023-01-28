import axios, { AxiosResponse, AxiosError } from 'axios';

//    {
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'ngrok-skip-browser-warning': 'any',
//       },
//     }

const overLapAxios = axios.create({ baseURL: 'api' });

const overLapEmailApi = (
  email: string,
  callback: (str: string) => void,
): void => {
  overLapAxios
    .get('/members/verify_email', {
      params: {
        email,
      },
    })
    .then((res: AxiosResponse) => {
      console.log('Hooks -> overLapEmailApi res : ', res);
      callback('사용가능한 이메일 입니다.');
    })
    .catch((err: AxiosError) => {
      console.log(err.message);
      callback('중복된 이메일 입니다.');
    });
};
const overLapNickApi = (
  nickname: string,
  callback: (str: string) => void,
): void => {
  overLapAxios
    .get('/members/verify_nick', {
      params: {
        nickname,
      },
    })
    .then((res: AxiosResponse) => {
      console.log('Hooks -> overLapNickApi res : ', res);
      callback('사용가능한 닉네임 입니다.');
    })
    .catch((err: AxiosError) => {
      console.log(err.message);
      callback('중복된 닉네임 입니다.');
    });
};

export { overLapEmailApi, overLapNickApi };
