import LocalStorage from '../../constants/localstorage';
import SessionStorage from '../../constants/sessionstorage';
import * as S from './style';
import { useRouter } from 'next/router';

const MyPage = () => {
  const router = useRouter();

  const logoutHandler = () => {
    LocalStorage.removeItem('accesstoken');
    LocalStorage.removeItem('refreshtoken');
    SessionStorage.removeItem('accesstoken');
    router.push('/main', '/main');
  };

  return (
    <S.MyPageContainer>
      <div>My Page 컴포넌트</div>
      <div>
        <button onClick={logoutHandler}>임시로그아웃버튼</button>
      </div>
    </S.MyPageContainer>
  );
};

export default MyPage;
