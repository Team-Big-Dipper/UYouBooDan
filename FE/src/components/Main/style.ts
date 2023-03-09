import styled from 'styled-components';
import Link from 'next/link'

export const HotVoteContainer = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 50px;
  }
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

export const Tab = styled.div`
  background-color: white;
  border: 1px solid #d6d9dc;
  padding: 5px 15px;
  border-radius: 50px;
  cursor: pointer;
  &:hover{
    color: white;
    background-color: #4285F4;
    border: 1px solid #4285F4;
  }
  &.clicked{
    color: white;
    background-color: #4285F4;
    border: 1px solid #4285F4;
  }
`;

export const HotVoteArrContainer = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const CardAdd = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Crads = styled.ul`
  display: grid;
  grid-column-gap: 10px;
  grid-auto-flow: column;
  padding: 25px 0px;
  list-style: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
`;

export const AddContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Add = styled(Link)`
  display: flex;
  justify-content: center;
  background-color: white;
  border: 1px solid #d6d9dc;
  color: #667085;
  padding: 5px 15px;
  border-radius: 50px;
  width: fit-content;
  text-decoration: none;
  cursor: pointer;
  &:hover{
    color: white;
    background-color: #4285F4;
    border: 1px solid #4285F4;
  }
`;