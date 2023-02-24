import styled from "styled-components"

// Hamburger Menu
export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  text-align: left;
  padding: 0 1rem;
  position: fixed;
  top:0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
  background-color: white;
  &.open{
    transform: translateX(0);
  }
`;
export const MenuBottomContainer = styled.div`
  padding:15px;
  div {
    &.subMenu {
      color: #667085;
      margin-bottom: 15px;
      cursor: pointer;
    }
  }
`;

export const VoteConditionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  div {
    &.title {
      font-size: 1.1rem;
      font-family: 'yg-jalnan' !important;
      color: #242424;
    }
  }
`;
export const Hr = styled.hr`
  height: 1px;
  color: #e2e6ee;
  margin: 10px 0 20px 0;
`;

//Login
export const LoginContainer = styled.div`
  background-color: #f8f8f8;
  width: 100vw;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 15px;
  padding-top: 50px;
  div {
    &.goLogin {
      font-size: 1.3rem;
      font-family: 'yg-jalnan' !important;
      padding-bottom: 10px;
      color: #242424;
      cursor: pointer;
    }
    &.SignUp {
      text-decoration: underline;
      color: #667085;
      font-size: 16px;
      cursor: pointer;
    }
  }
`;

//LoginAfter
export const LoginAfterContainer = styled.div`
  background-color: #f8f8f8;
  width: 100vw;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 15px;
  padding-top: 50px;
`;
export const Hello = styled.div`
  font-size: 1.3rem;
  font-family: 'yg-jalnan' !important;
  padding-bottom: 10px;
  color: #242424;
`;
export const MakeVoteContainer = styled.div`
  cursor: pointer;
  width: 100px;
`;

export const userInformContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const Image = styled.div`
  padding: 40px 0;
`;
export const UserInform = styled.div`
margin-left: 30px;
  div {
    &.username {
      color: #ffa800;
      font-weight: 600;
      font-size: 18px;
      line-height: 21.6px;
    }
  }
`;
export const MypageLogoutContainer = styled.div`
  display: flex;
  div {
    color: #667085;
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
  }
`;
export const Mypage = styled.div`
  color: #667085;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  cursor: pointer;
`;
export const Logout = styled.div`
  color: #667085;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  cursor: pointer;
`;