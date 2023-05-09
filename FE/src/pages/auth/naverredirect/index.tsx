import { NaverRedirectContainer } from './style';
import LoadingSpinner from '../../../assets/loadingspinner.gif';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import LocalStorage from '../../../constants/localstorage';

const naverredirect = () => {
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  const nowUrl = router.query;

  console.log('nowUrl : ', nowUrl);

  useEffect(() => {
    axios
      .get(`${api}/naver/callback`, {
        params: nowUrl,
      })
      .then((res: AxiosResponse) => {
        const naver_access: any = res.headers.authorization?.split(' ')[1];
        const naver_refresh: any = res.headers.refreshtoken;
        LocalStorage.setItem('accesstoken', naver_access);
        LocalStorage.setItem('refreshtoken', naver_refresh);
        router.push('/mypage');
      })
      .catch((err: AxiosError) => {
        console.log('err : ', err.message);
      });
  }, [nowUrl]);

  return (
    <NaverRedirectContainer>
      <Image src={LoadingSpinner} alt="gif" />
    </NaverRedirectContainer>
  );
};

export default naverredirect;
