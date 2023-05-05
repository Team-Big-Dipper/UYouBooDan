import styled from 'styled-components';
import Link from 'next/link';

export const MyPageContainer = styled.div`
  display: flex;
`;
export const MyPageRightContainer = styled.div`
  width: 100%;
  padding-top: 50px;
  margin-left: 30px;
`;

export const SideBarContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
export const SideBarRouteText = styled.div`
  font-size: 0.8rem;
`;
export const SibeBarCategotyDiv = styled.div`
  padding-top: 40px;
`;
export const SideBarUserInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 15px;
  }
`;
export const SideBarImgDiv = styled.div`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d6d9dc;
  margin-bottom: 15px;
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
  cursor: pointer;
  &:hover {
    color: #4285f4;
  }
`;
export const CreateVoteBtnDiv = styled(Link)``;

export const CategoryDiv = styled.div``;
export const CategoryTitle = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #667085;
  padding-left: 6px;
  margin-bottom: 8px;
`;
export const UnderlineDiv = styled.div`
  border: 0.5px solid #d6d9dc;
  margin-bottom: 20px;
`;
export const CategoryListDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 6px;
  font-size: 1rem;
  color: #667085;
  gap: 15px;
  margin-bottom: 55px;
  cursor: pointer;
  div {
    &:hover {
      color: #4285f4;
    }
  }
`;
