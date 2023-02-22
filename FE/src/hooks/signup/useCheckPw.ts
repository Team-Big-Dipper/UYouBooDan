const useCheckPw = (
  pw: string,
  pwCheck: string,
  callback: (str: string) => void,
) => {
  const checkPw = () => {
    if (pw === pwCheck) {
      callback('비밀번호가 일치합니다.');
    } else {
      callback('비밀번호가 일치하지 않습니다.');
    }
    return;
  };

  return { checkPw };
};

export default useCheckPw;
