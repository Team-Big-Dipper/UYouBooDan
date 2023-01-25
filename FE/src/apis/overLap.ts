import axios, { AxiosResponse, AxiosError } from 'axios';

const overLapAxios = axios.create({ baseURL: 'api' });

// const overLapApi = (email?: string, nickname?: string): void => {
//   overLapAxios
//     .get('/members/verify', {
//       params: {
//         email,
//         nickname,
//       },
//     })
//     .then((res: AxiosResponse) => {
//       console.log('Hooks -> overLapApi res : ', res);
//     })
//     .catch((err: AxiosError) => {
//       console.log(err.message);
//     });
// };
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
      console.log('Hooks -> overLapApi res : ', res);
      callback('사용가능한 이메일 입니다.');
    })
    .catch((err: AxiosError) => {
      console.log(err.message);
      callback('중복된 이메일 입니다.');
    });
};
const overLapNickApi = (nickname?: string): void => {
  overLapAxios
    .get('/members/verify_nick', {
      params: {
        nickname,
      },
    })
    .then((res: AxiosResponse) => {
      console.log('Hooks -> overLapApi res : ', res);
    })
    .catch((err: AxiosError) => {
      console.log(err.message);
    });
};

// export { overLapApi };
export { overLapEmailApi, overLapNickApi };
