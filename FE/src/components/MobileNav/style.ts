import styled from "styled-components";

// Hamburger Menu
export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  text-align: left;
  padding: 0 1rem;
  position: absolute;
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
  padding: 20px;
  div {
    &.subMenu {
      color: #667085;
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
`;

export const VoteConditionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    &.title {
      font-size: 1.3rem;
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
  padding-left: 20px;
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