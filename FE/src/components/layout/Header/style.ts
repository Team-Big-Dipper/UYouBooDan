import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 119px;
  padding: 0 20%;
  border-bottom: 1px solid #e2e6ee;
`;

export const Logo = styled.h2`
  font-weight: 600;
  font-size: 2.4rem;
  display: flex;
  align-items: center;
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

export const Mypage = styled.h4`
  display: flex;
  justify-content: flex-end;
  font-size: 0.85rem;
  margin-bottom: 10px;
`;

export const AllVote = styled.h3`
  font-size: 1.25rem;
`;

export const MakeVote = styled.h3`
  font-size: 1.25rem;
  padding: 0 20px;
`;

export const SearchDiv = styled.div`
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
