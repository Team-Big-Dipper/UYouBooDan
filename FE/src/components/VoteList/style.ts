import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

interface isClosed {
  isClosed: boolean;
}

interface ChangePageNum {
  isCurrentPage: boolean;
}

export const LoadingImage = styled(Image)`
  margin: 0px auto 130px auto;
`;
export const pageNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 200px;

  @media (min-width: 480px) and (max-width: 767px) {
    margin-top: 80px;
    margin-bottom: 120px;
  }
  @media (max-width: 479px) {
    margin-top: 50px;
    margin-bottom: 80px;
    font-size: 0.6rem;
  }
`;
export const pageNumFont = styled.p<ChangePageNum>`
  font-size: ${(props) => (props.isCurrentPage ? '1.2rem' : '0.8rem')};
  margin: 0 10px;
  cursor: default;
  @media (max-width: 479px) {
    font-size: 0.9rem;
  }
`;
export const VoteList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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
  cursor: default;
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
  cursor: default;
`;
export const PageLink = styled(Link)`
  display: flex;
  justify-content: end;
`;

export const PageHeader = styled.div`
  display: flex;
  height: 135px;
  justify-content: space-between;
  padding-top: 71px;
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
    padding-top: 50px;
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
export const CurrentCategoty = styled.p`
  font-size: 1rem;
`;
export const CardItem = styled.div`
  border: 1px solid #e2e6ee;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 150px;
  margin-bottom: 15px;
  justify-content: space-between;
  &:hover {
    border-color: #4285f4;
  }
`;

export const CardCategory = styled.div`
  font-size: 0.8rem;
  margin-bottom: 10px;
  color: #667085;
`;

export const CardContentsDiv = styled.div`
  padding: 20px 23px 0 23px;
`;
export const CardContents = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 479px) {
    margin-top: 14px;
  }
`;
export const Content = styled.div`
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  line-height: 130%;
  width: 85%;
  height: 40px;
`;

export const CardDDay = styled.div<isClosed>`
  background-color: ${(props) => (props.isClosed ? '#a2adc5' : '#4285f4')};
  color: white;
  padding: 9px;
  border-radius: 15px;
  width: 70px;
  height: 30px;
  text-align: center;
  font-size: 0.8rem;

  @media (max-width: 479px) {
    padding: 9px;
  }
`;
export const Date = styled.div`
  margin: 0 1%;
  color: #667085;
`;
export const ProfileContainer = styled.div`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

export const TheFirstItem = styled.div`
  background-color: #fafafa;
  width: 100%;
  height: 25px;
  border-radius: 0 0 10px 10px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: #667085;
  font-size: 0.8rem;
`;

export const UserName = styled.div`
  color: #a2adc5;
  margin: 0 1%;
`;

export const RadioButton = styled.input`
  cursor: pointer;
  margin-right: 6px;
  margin-top: 30px;
  @media (max-width: 767px) {
    width: 1rem;
    margin-right: 8px;
  }
`;
export const ButtonLabel = styled.label`
  cursor: pointer;
  margin-right: 10px;
  margin-top: 30px;
  @media (max-width: 767px) {
    font-size: 1rem;
    margin-right: 8px;
  }
`;
