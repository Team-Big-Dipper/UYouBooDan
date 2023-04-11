import LocalStorage from '../../constants/localstorage';
import SessionStorage from '../../constants/sessionstorage';

const useLogin = () => {
  const checkedLogin = (
    access: string,
    refresh: string,
    checked: boolean,
  ): void => {
    if (checked) {
      LocalStorage.setItem('accesstoken', access);
      LocalStorage.setItem('refreshtoken', refresh);
    } else {
      SessionStorage.setItem('accesstoken', access);
    }
  };

  const loginMsgFunc = (
    resMsg: string,
    setLoginMsg: (str: string) => void,
  ): void => {
    if (resMsg === '비밀번호 불일치.') {
      setLoginMsg('비밀번호를 확인하세요.');
    } else if (resMsg === '존재하지 않는 이메일.') {
      setLoginMsg('존재하지 않는 이메일입니다.');
    }
  };

  return { checkedLogin, loginMsgFunc };
};

export default useLogin;
