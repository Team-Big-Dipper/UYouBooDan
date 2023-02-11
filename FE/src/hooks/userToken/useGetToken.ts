import LocalStorage from '../../constants/localstorage';
import SessionStorage from '../../constants/sessionstorage';

export const useGetToken = () => {
  const localToken = LocalStorage.getItem('accesstoken');
  const sessionToken = SessionStorage.getItem('accesstoken');
  // console.log(localToken, sessionToken);

  if (localToken !== undefined && localToken !== null) {
    return localToken;
  } else if (sessionToken !== undefined && sessionToken !== null) {
    return sessionToken;
  } else {
    return;
  }
};
