import axios, { AxiosResponse, AxiosError } from 'axios';
import LocalStorage from '../../constants/localstorage';
import SessionStorage from '../../constants/sessionstorage';
import { useRouter } from 'next/router';

const kakaoAuth = () => {
  const router = useRouter();
  const code = router.query;
  const authApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'ngrok-skip-browser-warning': 'any',
    },
  });

  const authCodeRequest = (): void => {
    authApi
      .get(`/kakao/oauth`)
      .then((res: AxiosResponse) => {
        console.log(
          'backend로 authorization Server에 인가코드 요청 보내달라하기 성공!',
        );
        console.log(
          'backend로 인가코드 보내고 받은 응답(redirectURI) res.data : ',
          res.data,
        );
        router.push(res.data);
      })
      .catch((err: AxiosError) => {
        console.log('err : ', err.message);
      });
  };

  const authCodeSend = (): void => {
    console.log('code : ', code);

    authApi
      .get(`/kakao/callback`, {
        params: code,
      })
      .then((res: AxiosResponse) => {
        console.log('받은 인가코드 back으로 보내기 성공!');
        console.log('인가코드 back으로 보내기 res : ', res);
        const kakao_access: any = res.headers.authorization?.split(' ')[1];
        const kakao_refresh: any = res.headers.refreshtoken;
        LocalStorage.setItem('accesstoken', kakao_access);
        LocalStorage.setItem('refreshtoken', kakao_refresh);
        router.push('/mypage');
      })
      .catch((err: AxiosError) => {
        console.log('err : ', err.message);
      });
  };

  return { authCodeRequest, authCodeSend };
};

export default kakaoAuth;
