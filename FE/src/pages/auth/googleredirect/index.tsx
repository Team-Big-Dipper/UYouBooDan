import * as S from './style';
import { useEffect } from 'react';
import LoadingSpinner from '../../../assets/loadingspinner.gif';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios, { AxiosResponse, AxiosError } from 'axios';
import LocalStorage from '../../../constants/localstorage';

const googleredirect = () => {
  const router = useRouter();

  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  const nowUrl = router.query.code;

  useEffect(() => {
    axios
      .get(`${api}/google/callback`, {
        params: {
          code: nowUrl,
        },
      })
      .then((res: AxiosResponse) => {
        const google_access: any = res.headers.authorization?.split(' ')[1];
        const google_refresh: any = res.headers.refreshtoken;
        LocalStorage.setItem('accesstoken', google_access);
        LocalStorage.setItem('refreshtoken', google_refresh);
        router.push('/mypage');
      })
      .catch((err: AxiosError) => {
        console.log('err : ', err.message);
      });
  }, [nowUrl]);

  return (
    <S.GoogleRedirectContainer>
      <Image src={LoadingSpinner} alt="gif" />
    </S.GoogleRedirectContainer>
  );
};

export default googleredirect;
