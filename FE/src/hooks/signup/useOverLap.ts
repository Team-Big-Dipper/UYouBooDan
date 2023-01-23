import axios from 'axios';

const useOverLapCheck = () => {
  const emailCheck = (email: string) => {
    // if (email === 'rlgywnd@naver.com') {
    //   console.log('일치!');
    // }
    // return;
    // axios.get('/api/members/verify', { email : string })
  };
  const nickCheck = (nick: string) => {
    return;
  };

  return { emailCheck, nickCheck };
};

export default useOverLapCheck;
