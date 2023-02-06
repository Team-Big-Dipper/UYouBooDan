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
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 30px 80px 10px 80px;
  }
  @media (max-width: 479px) {
    padding: 30px 50px 10px 50px;
  }
`;
export const Sidebar = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  margin-right: 50px;
  @media (max-width: 767px) {
    display: none;
  }
`;
export const Pagename = styled.p`
  height: 70px;
  font-size: 2rem;
  color: #667085;
  font-family: 'yg-jalnan' !important;
  margin: 45px 0 10px 4px;
  line-height: 40px;
`;
export const SidebarLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
export const SidebarCategory = styled.p`
  font-size: 1.3rem;
  color: #667085;
  font-family: 'yg-jalnan' !important;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 15px;
  margin-top: 30px;
`;
export const CategoryTitle = styled.p`
  color: #667085;
  margin-top: 0.5rem;
  padding-left: 1rem;
  line-height: 30px;
`;
export const PageLink = styled(Link)`
  display: flex;
  justify-content: end;
`;

export const PageHeader = styled.div`
  display: flex;
  height: 135px;
  justify-content: space-between;
  padding-top: 68px;
  color: #667085;
  margin-bottom: 100px;
  @media (min-width: 768px) and (max-width: 1040px) {
    flex-direction: column;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    flex-direction: column;
    padding-top: 20px;
    margin-bottom: 70px;
  }
  @media (max-width: 479px) {
    height: 190px;
    flex-direction: column;
    margin-bottom: 50px;
  }
`;
export const ButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
  @media (max-width: 479px) {
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
  @media (max-width: 479px) {
    margin-bottom: 5px;
  }
`;
export const PageSubTitle = styled.p`
  padding: 5px;
  font-size: 1rem;
  @media (min-width: 480px) and (max-width: 767px) {
    width: 180px;
    line-height: 140%;
  }
  @media (max-width: 479px) {
    line-height: 140%;
    margin: 10px 0;
  }
`;
