import styled from 'styled-components';

export const MyPageMainContainer = styled.div`
  height: 103vh;
`;
export const ContentBoxDiv = styled.div`
  height: 20vh;
  margin-bottom: 15px;
  border: 1px solid #d6d9dc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  cursor: pointer;
  :hover {
    border-color: #4285f4;
  }
`;
export const ContentBox = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  /* border: 1px solid blue; */
  height: 100%;
`;

export const ContentTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 0 10px 20px;
  height: 100%;
  /* border: 1px solid red; */
`;
export const ContentCategory = styled.div`
  margin-bottom: 8px;
  font-size: 0.8rem;
  color: #667085;
`;
export const ContentDetail = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 20px;
`;
export const ContentInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #667085;
  gap: 7px;
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
export const ContentDday = styled.div`
  margin: 45px 30px 0 0;
  width: 230px;
  height: 30px;
  border-radius: 15px;
  font-size: 0.8rem;
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
  /* background-color: #a2adc5; */
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
  gap: 20px;
`;
export const PageNationNumberDiv = styled.div`
  display: flex;
  font-size: 1.3rem;
  color: #667085;
  gap: 30px;
`;
