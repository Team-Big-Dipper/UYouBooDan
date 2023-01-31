import LocalStorage from '../../constants/localstorage';
import SessionStorage from '../../constants/sessionstorage';
import * as S from './style';
import { useRouter } from 'next/router';
import MySideBar from './MyPageSideBar';
import MyPageHeader from './MyPageHeader';
import MyPageMain from './MyPageMain';

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
      <MySideBar />
      <S.MyPageRightContainer>
        <MyPageHeader />
        <MyPageMain />
      </S.MyPageRightContainer>
    </S.MyPageContainer>
  );
};

export default MyPage;
