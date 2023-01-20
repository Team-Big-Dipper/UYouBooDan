const useOverLapCheck = () => {
  const emailCheck = (email: string) => {
    if (email === 'rlgywnd@naver.com') {
      console.log('일치용!');
    }
    return;
  };
  const nickCheck = (nick: string) => {
    return;
  };

  return { emailCheck, nickCheck };
};

export default useOverLapCheck;
