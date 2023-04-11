import * as S from './style';
import kakaoAuth from '../../../apis/oauth/kakaoLogin';
import { useEffect } from 'react';
import LoadingSpinner from '../../../assets/loadingspinner.gif';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios, { AxiosResponse, AxiosError } from 'axios';
import LocalStorage from '../../../constants/localstorage';

const kakaoredirect = () => {
  const router = useRouter();

  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  const nowUrl = router.query;
  useEffect(() => {
    axios
      .get(`${api}/kakao/callback`, {
        params: nowUrl,
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
  }, [nowUrl]);

  return (
    <S.KakaoRedirectContainer>
      <Image src={LoadingSpinner} alt="gif" />
    </S.KakaoRedirectContainer>
  );
};

export default kakaoredirect;
