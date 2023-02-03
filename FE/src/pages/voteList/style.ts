import Link from 'next/link';
import styled from 'styled-components';

export const pageNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const pageNumFont = styled.p`
  font-size: 1.3rem;
  margin-right: 1rem;
  cursor: default;
`;
export const VoteList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
export const PageContainer = styled.div`
  display: flex;
  padding: 5% 20% 0 20%;
  @media (max-width: 375px) {
    padding: 15px;
  }
`;
export const Sidebar = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  @media (max-width: 768px) {
    display: none;
  }
`;
export const Pagename = styled.p`
  font-size: 2rem;
  color: #667085;
  font-family: 'yg-jalnan' !important;
  margin: 3rem 0 1rem 0.3rem;
`;
export const SidebarCategory = styled.p`
  font-size: 1.3rem;
  color: #667085;
  font-family: 'yg-jalnan' !important;
  padding: 1rem;
  border-bottom: 1px solid lightgray;
  margin-bottom: 1rem;
  margin-top: 4rem;
`;
export const CategoryTitle = styled.p`
  color: #667085;
  margin-top: 0.5rem;
  padding-left: 1rem;
`;
export const PageLink = styled(Link)`
  display: flex;
  justify-content: end;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20%;
  color: #667085;
  @media (max-width: 1230px) {
    flex-direction: column;
    padding-top: 10%;
  }
`;
export const ButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
  @media (max-width: 375px) {
    margin-bottom: 10px;
    display: flex;
    justify-content: end;
  }
`;
export const PageTitle = styled.div`
  font-size: 2rem;
  font-family: 'yg-jalnan' !important;
  margin-bottom: 1rem;
  color: black;
  @media (max-width: 375px) {
    margin-bottom: 5px;
  }
`;
export const PageSubTitle = styled.p`
  padding: 5px;
  font-size: 1rem;
  @media (max-width: 780px) {
    font-size: 0.8rem;
    width: 180px;
    line-height: 140%;
  }
`;
