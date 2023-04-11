import axios, { AxiosResponse, AxiosError } from 'axios';
import LocalStorage from '../../constants/localstorage';
import SessionStorage from '../../constants/sessionstorage';
import { useRouter } from 'next/router';

const kakaoAuth = () => {
  const router = useRouter();
  const code = router.query;
  const authApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  });

  const authCodeRequest = (): void => {
    authApi
      .get(`/kakao/oauth`)
      .then((res: AxiosResponse) => {
        router.push(res.data);
      })
      .catch((err: AxiosError) => {
        console.log('err : ', err.message);
      });
  };

  const authCodeSend = (code: string): void => {
    authApi
      .get(`/kakao/callback`, {
        params: code,
      })
      .then((res: AxiosResponse) => {
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
