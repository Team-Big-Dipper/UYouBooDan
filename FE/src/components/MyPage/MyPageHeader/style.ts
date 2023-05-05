import styled from 'styled-components';

export const MypageHeaderContainer = styled.div`
  height: 120vh;
  @media (max-width: 500px) {
    width: 400px;
  }
`;
export const HeaderTitleDiv = styled.div`
  font-size: 1.9rem;
  font-family: 'yg-jalnan' !important;
  margin-bottom: 45px;
`;
export const RadioContainer = styled.div`
  display: flex;
  margin-bottom: 23px;
  gap: 20px;
  color: #667085;
`;
export const RadioListDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 17px;
  div {
    display: flex;
    align-items: center;
  }
  @media (max-width: 1057px) {
    font-size: 15px;
  }
  @media (max-width: 804px) {
    font-size: 12px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
