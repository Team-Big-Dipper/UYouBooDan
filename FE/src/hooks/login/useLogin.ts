const useLogin = (access: string, refresh: string, checked: boolean) => {
  const checkedLogin = () => {
    if (checked) {
      localStorage.setItem('accesstoken', access);
      localStorage.setItem('refreshtoken', refresh);
    } else {
      sessionStorage.setItem('accesstoken', access);
    }
  };

  return {};
};

export default useLogin;
