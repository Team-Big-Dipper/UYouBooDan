import * as S from './style';
import kakaoAuth from '../../../apis/oauth/kakaoLogin';
import { useEffect } from 'react';

const kakaoredirect = () => {
  const { authCodeSend } = kakaoAuth();

  useEffect(() => {
    authCodeSend();
  }, []);

  return (
    <S.KakaoRedirectContainer>
      카카오 리다이렉트 화면 로딩중...
    </S.KakaoRedirectContainer>
  );
};

export default kakaoredirect;
