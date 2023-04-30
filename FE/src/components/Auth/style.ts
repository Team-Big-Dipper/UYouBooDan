import styled from 'styled-components';
import Link from 'next/link';

export const AuthContainer = styled.div`
  border: 1px solid #d6d9dc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 100%;
  padding: 50px 0 50px 0;
  @media (max-width: 500px) {
    width: 350px;
    padding: 20px 0 20px 0;
  }
`;
export const AuthLogo = styled.div`
  font-weight: 800;
  color: #4285f4;
  display: inline-block;
  background-color: #f3f3f3;
  font-size: 38px;
  padding: 3px;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    font-size: 27px;
    margin-bottom: 15px;
  }
`;
export const LoginTitle = styled.div`
  font-weight: 400;
  font-size: 21px;
  margin-bottom: 33px;
  @media (max-width: 500px) {
    font-size: 19px;
    margin-bottom: 27px;
  }
  span {
    display: inline-block;
    margin-top: 10px;
    font-weight: 800;
    color: #4285f4;
    @media (max-width: 500px) {
      font-size: 19px;
    }
  }
`;
// email
export const LoginEmailContainer = styled.div`
  margin-bottom: 28px;
`;
export const LoginEmailTitle = styled.div`
  font-weight: bold;
  color: #667085;
  font-size: 16px;
  margin-bottom: 9px;
`;
export const LoginEmailInputDiv = styled.div`
  border: 1px solid #d6d9dc;
  display: flex;
  justify-content: space-between;
  width: 375px;
  height: 53px;
  border-radius: 9px;
  padding: 0 8px 0 8px;
  @media (max-width: 500px) {
    width: 320px;
  }
  input {
    font-size: 16px;
    width: 80%;
    border: none;
    outline: none;
  }
`;
export const LoginEmailDeleteDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

// password
export const PwContainer = styled.div`
  margin-bottom: 20px;
`;
export const PwTitle = styled.div`
  font-weight: bold;
  color: #667085;
  font-size: 16px;
  margin-bottom: 9px;
`;
export const PwInputDiv = styled.div`
  border: 1px solid #d6d9dc;
  display: flex;
  justify-content: space-between;
  width: 375px;
  height: 53px;
  border-radius: 9px;
  padding: 0 8px 0 8px;
  margin-bottom: 9px;
  @media (max-width: 500px) {
    width: 320px;
  }
  input {
    font-size: 16px;
    color: black;
    width: 80%;
    border: none;
    outline: none;
  }
`;
export const PwDeleteDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const PwVectorDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

// 유효성 msg
export const LoginValidMsg = styled.div`
  font-size: 13px;
  color: #ff2f2f;
  display: flex;
  align-items: center;
`;

// 로그인 유지 체크박스
export const ContinueCheckBoxDiv = styled.div`
  display: flex;
  align-items: center;
  color: #667085;
  margin-bottom: 12px;
  font-size: 16px;
  gap: 7px;
`;

// 아이디찾기, 비밀번호찾기, 회원가입 버튼
export const SearchAndSignUpDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #667085;
  margin-bottom: 28px;
`;
export const SearchDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 23px;
  gap: 10px;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;
export const SearchId = styled.div`
  display: flex;
  align-items: center;
  height: 15px;
  cursor: pointer;
`;
export const SearchDecoDiv = styled.div`
  border-right: 1px solid #667085;
  height: 15px;
`;
export const SearchPw = styled.div`
  display: flex;
  align-items: center;
  height: 15px;
  cursor: pointer;
`;
export const SignUpBtnDiv = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: underline;
  color: #667085;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;
// 로그인 버튼
export const LoginBtnDiv = styled.div`
  margin-bottom: 53px;
  button {
    width: 100%;
    height: 57px;
    border: none;
    border-radius: 9px;
    background-color: #4285f4;
    font-size: 19px;
    color: white;
    cursor: pointer;
    transition-duration: 0.3s;
    :active {
      background-color: #d6d9dc;
    }
  }
`;

// 소셜로그인 타이틀? ->  ------- SNS LOGIN -------
export const SnsLoginTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  height: 28px;
  margin-bottom: 32px;
`;
export const FirstDeco = styled.div`
  border-bottom: 1px solid #d6d9dc;
  width: 135px;
  height: 15px;
  @media (max-width: 500px) {
    width: 100px;
  }
`;
export const SnsLoginTitle = styled.div`
  display: flex;
  font-weight: bold;
  align-items: center;
  color: #667085;
`;
export const SecondDeco = styled.div`
  border-bottom: 1px solid #d6d9dc;
  width: 135px;
  height: 15px;
  @media (max-width: 500px) {
    width: 100px;
  }
`;

// 소셜 로그인 Div
export const SnsLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
export const KaKaoLoginDiv = styled.div`
  cursor: pointer;
`;
export const NaverLoginDiv = styled.div`
  cursor: pointer;
`;
export const GoogleLoginDiv = styled.div`
  cursor: pointer;
`;
