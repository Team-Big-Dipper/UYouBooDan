import styled from 'styled-components';
import Link from 'next/link';

export const MyPageContainer = styled.div`
  display: flex;
  /* border: 1px solid blue; */
`;
export const MyPageRightContainer = styled.div`
  width: 85%;
  padding-top: 50px;
  margin-left: 30px;
  border: 1px solid green;
`;

export const SideBarContainer = styled.div`
  /* border: 1px solid red; */
`;
export const SideBarRouteText = styled.div`
  font-size: 0.8rem;
`;
export const SibeBarCategotyDiv = styled.div`
  padding-top: 120px;
`;
export const SideBarUserInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

export const UserNickDiv = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #667085;
  margin-bottom: 20px;
`;
export const EditBtnDiv = styled.div`
  font-size: 1rem;
  text-decoration: underline;
  color: #667085;
  margin-bottom: 20px;
`;
export const CreateVoteBtnDiv = styled(Link)``;

export const CategoryDiv = styled.div``;
export const CategoryTitle = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #667085;
  padding-left: 0.5vw;
  margin-bottom: 1vh;
`;
export const UnderlineDiv = styled.div`
  border: 0.5px solid #d6d9dc;
  margin-bottom: 2.5vh;
`;
export const CategoryListDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.5vw;
  font-size: 1rem;
  color: #667085;
  gap: 15px;
  margin-bottom: 7vh;
  cursor: pointer;
`;
