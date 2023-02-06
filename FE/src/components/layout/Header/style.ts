import styled from 'styled-components';
import Link from 'next/link';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 119px;
  padding: 0 20%;
  border-bottom: 1px solid #e2e6ee;
  @media screen and (max-width: 768px) {
    padding: 0 5%;
  }
`;

export const Logo = styled(Link)`
  /* font-family: 'yg-jalnan' !important; */ // 잘난체 쓰는법
  font-weight: 600;
  font-size: 2.4rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  @media screen and (max-width: 768px) {
    width: 70vw;
  }
  @media (min-width: 769px) {
    width: 100vw;
  }
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const HamburgerIcon = styled.button`
  position: absolute;
  top: 5.7em;
  right: 5%;
  margin-left: -2em;
  margin-top: -45px;
  width: 2em;
  height: 40px;
  z-index: 5;
  border: none;
  background-color: white;
  cursor: pointer;
  div {
    position: relative;
    width: 3em;
    height: 7px;
    border-radius: 3px;
    background-color: #4285f4;
    margin-top: 8px;
    transition: all 0.3s ease-in-out;
  }
  &.open {
    border-radius: 1px;
    background-color: #f8f8f8;
    position: fixed;
    div {
      background-color: black;
      &.top {
        transform: rotate(-45deg);
        margin-top: 25px;
      }
      &.middle {
        transform: rotate(45deg);
        margin-top: -7px;
      }
      &.bottom {
        opacity: 0;
        transform: rotate(45deg);
      }
    }
  }
  @media (min-width: 769px) {
    display: none;
  }
`;

export const Vote = styled.div`
  display: flex;
  align-items: center;
`;

export const Mypage = styled(Link)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 10px;
  margin-right: 1vw;
  text-decoration: none;
  color: black;
  gap: 0.3vw;
`;
export const LoginSignUpDiv = styled.div`
  display: flex;
  /* border: 1px solid red; */
  justify-content: end;
  padding-right: 1vw;
  gap: 2vw;
`;
export const Login = styled(Link)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 10px;
  text-decoration: none;
  color: black;
  &:hover {
    color: #4285f4;
  }
  &:focus {
    color: #4285f4;
  }
`;
export const SignUp = styled(Link)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 10px;
  text-decoration: none;
  color: black;
  &:hover {
    color: #4285f4;
  }
  &:focus {
    color: #4285f4;
  }
`;

export const AllVote = styled(Link)`
  font-size: 1.25rem;
  text-decoration: none;
  color: black;
  white-space: nowrap;
  &:focus {
    color: #4285f4;
  }
  &:hover {
    color: #4285f4;
  }
`;

export const MakeVote = styled(Link)`
  font-size: 1.25rem;
  padding: 0 20px;
  text-decoration: none;
  white-space: nowrap;
  color: black;
  &:focus {
    color: #4285f4;
  }
  &:hover {
    color: #4285f4;
  }
`;

export const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: solid 1px #d6d9dc;
  border-radius: 30px;
  width: 17vw;
  height: 50px;
  padding: 15px 18px;
`;

export const Search = styled.input`
  font-size: 0.85rem;
  border: none;
  ::placeholder {
    color: #667085;
  }
  outline: none;
`;
