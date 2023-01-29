import styled from 'styled-components';
import Link from 'next/link';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 119px;
  padding: 0 20%;
  border-bottom: 1px solid #e2e6ee;
`;

export const Logo = styled(Link)`
  /* font-family: 'yg-jalnan' !important; */ // 잘난체 쓰는법
  font-weight: 600;
  font-size: 2.4rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  font-size: 1rem;
  border: none;
  ::placeholder {
    color: #667085;
  }
  outline: none;
`;
