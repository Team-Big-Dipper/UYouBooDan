import styled from 'styled-components';
import Link from 'next/link';

export const AuthContainer = styled.div`
  padding: 10% 7%;
  border: 1px solid #d6d9dc;
  border-radius: 10px;
`;
export const AuthLogo = styled.div`
  font-weight: 800;
  font-size: 2.4rem;
  color: #4285f4;
  display: inline-block;
  padding: 0.5vh 0.5vh 0.2vh 0.5vh;
  background-color: #f3f3f3;
  margin-bottom: 3vh;
`;
export const LoginTitle = styled.div`
  font-weight: 400;
  font-size: 1.3rem;
  margin-bottom: 4vh;
  span {
    display: inline-block;
    margin-top: 1vh;
    font-weight: 800;
    color: #4285f4;
  }
`;
// email
export const LoginEmailContainer = styled.div`
  margin-bottom: 3.5vh;
`;
export const LoginEmailTitle = styled.div`
  font-weight: bold;
  color: #667085;
  font-size: 1rem;
  margin-bottom: 1vh;
`;
export const LoginEmailInputDiv = styled.div`
  border: 1px solid #d6d9dc;
  display: flex;
  justify-content: space-between;
  width: 25.67vw;
  height: 6.5vh;
  border-radius: 9px;
  padding: 0 2%;
  input {
    font-size: 1rem;
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
  margin-bottom: 2.5vh;
`;
export const PwTitle = styled.div`
  font-weight: bold;
  color: #667085;
  font-size: 1rem;
  margin-bottom: 1vh;
`;
export const PwInputDiv = styled.div`
  border: 1px solid #d6d9dc;
  display: flex;
  justify-content: space-between;
  width: 25.67vw;
  height: 6.5vh;
  border-radius: 9px;
  padding: 0 2%;
  margin-bottom: 1vh;
  input {
    font-size: 1rem;
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
  font-size: 0.86rem;
  color: #ff2f2f;
  display: flex;
  align-items: center;
`;

// 로그인 유지 체크박스
export const ContinueCheckBoxDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5vh;
  font-size: 1rem;
  color: #667085;
  gap: 0.5vw;
`;

// 아이디찾기, 비밀번호찾기, 회원가입 버튼
export const SearchAndSignUpDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #667085;
  margin-bottom: 3.5vh;
`;
export const SearchDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3vh;
  gap: 0.7vw;
`;
export const SearchId = styled.div`
  display: flex;
  align-items: center;
  height: 2vh;
  cursor: pointer;
`;
export const SearchDecoDiv = styled.div`
  border-right: 1px solid #667085;
  height: 2vh;
`;
export const SearchPw = styled.div`
  display: flex;
  align-items: center;
  height: 2vh;
  cursor: pointer;
`;
export const SignUpBtnDiv = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: underline;
  color: #667085;
`;
// 로그인 버튼
export const LoginBtnDiv = styled.div`
  margin-bottom: 3vh;
  button {
    width: 100%;
    height: 7vh;
    border: none;
    border-radius: 9px;
    background-color: #4285f4;
    font-size: 1.2rem;
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
  height: 3.5vh;
  margin-bottom: 4vh;
`;
export const FirstDeco = styled.div`
  border-bottom: 1px solid #d6d9dc;
  width: 9.1vw;
  height: 2.1vh;
`;
export const SnsLoginTitle = styled.div`
  display: flex;
  font-weight: bold;
  align-items: center;
  color: #667085;
`;
export const SecondDeco = styled.div`
  border-bottom: 1px solid #d6d9dc;
  width: 9.1vw;
  height: 2.1vh;
`;

// 소셜 로그인 Div
export const SnsLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2vw;
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
