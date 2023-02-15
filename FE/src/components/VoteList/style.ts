import styled from 'styled-components';

interface isClosed {
  isClosed: boolean;
}

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
