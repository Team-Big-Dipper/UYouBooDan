import styled from 'styled-components';

export const CardItem = styled.div`
  border: 1px solid #e2e6ee;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 150px;
  padding: 3%;
  margin-bottom: 3%;
  justify-content: space-between;
`;

export const CardCategory = styled.div`
  font-size: 0.8rem;
  margin-bottom: 2%;
  color: #667085;
`;

export const CardContents = styled.div`
  display: flex;
  justify-content: space-between;
  height: 3vh;
  @media (max-width: 479px) {
    margin-top: 14px;
  }
`;
export const Content = styled.div`
  //border: 1px solid blue;
`;

export const CardDDay = styled.div`
  background-color: #4285f4;
  color: white;
  padding: 0.7%;
  border-radius: 15px;
  width: 4rem;
  text-align: center;
  @media (max-width: 479px) {
    padding: 7px;
    font-size: 0.8rem;
    padding: 4px;
  }
`;
export const Date = styled.div`
  margin: 0 1%;
  color: #667085;
`;
export const ProfileContainer = styled.div`
  font-size: 0.8rem;
  display: flex;
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
