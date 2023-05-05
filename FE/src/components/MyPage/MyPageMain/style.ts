import styled from 'styled-components';

export const MyPageMainContainer = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    width: 78vw;
  }
  @media (max-width: 500px) {
    width: 400px;
  }
`;
export const ContentBoxDiv = styled.div`
  height: 160px;
  margin-bottom: 15px;
  border: 1px solid #d6d9dc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  cursor: pointer;
`;
export const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  padding: 25px 20px 10px 20px;
  width: 100%;
`;

export const ContentTextBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const ContentCategory = styled.div`
  margin-bottom: 8px;
  font-size: 13px;
  color: #667085;
  @media (max-width: 1000px) {
    font-size: 12px;
  }
`;
export const ContentDetail = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 20px;
  font-size: 16px;
  @media (max-width: 1000px) {
    font-size: 15px;
  }
`;
export const ContentInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #667085;
  gap: 7px;
  @media (max-width: 1000px) {
    font-size: 13px;
  }
`;
export const ContentDefaultImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #d6d9dc;
`;
export const ContentInfoNickDiv = styled.div``;
export const ContentInfoCreatedDiv = styled.div``;
export const ContentInfoLineDiv = styled.div`
  border: 0.5px solid #667085;
  height: 14px;
`;
export const ContentDdayDiv = styled.div``;
export const ContentDday = styled.div`
  width: 70px;
  height: 30px;
  border-radius: 15px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4285f4;
  color: white;
`;
export const ContentDdayEnd = styled.div`
  margin: 45px 30px 0 0;
  width: 230px;
  height: 30px;
  border-radius: 15px;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a2adc5;
  color: white;
`;
export const ContentRanking = styled.div`
  height: 25px;
  background-color: #4285f4;
  color: white;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  padding: 0 20px 0 20px;
`;
export const ContentRankingEnd = styled.div`
  height: 25px;
  background-color: #e2e6ee;
  color: #667085;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  padding: 0 20px 0 20px;
`;

export const PageNationDiv = styled.div`
  display: flex;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;
export const LeftDiv = styled.div`
  cursor: pointer;
`;
export const RightDiv = styled.div`
  cursor: pointer;
`;
export const PageNationNumberDiv = styled.div`
  display: flex;
  font-size: 1.3rem;
  color: #667085;
  gap: 40px;
  div {
    cursor: pointer;
  }
`;
