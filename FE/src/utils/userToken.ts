import LocalStorage from '../constants/localstorage';
import SessionStorage from '../constants/sessionstorage';

export const getToken = () => {
  const localToken = LocalStorage.getItem('accesstoken');
  const sessionToken = SessionStorage.getItem('accesstoken');

  if (localToken !== undefined && localToken !== null) {
    return localToken;
  } else if (sessionToken !== undefined && sessionToken !== null) {
    return sessionToken;
  } else {
    return;
  }
};
