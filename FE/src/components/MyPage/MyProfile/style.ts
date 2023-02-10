import styled from 'styled-components';

export const MyProfileContainer = styled.div`
  height: 120vh;
  padding: 5% 7%;
`;

export const MyProfileTitleDiv = styled.div`
  font-size: 1.9rem;
  font-family: 'yg-jalnan' !important;
  margin-bottom: 110px;
`;
export const PwContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;
export const PwTitle = styled.div`
  width: 365px;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 1vh;
`;
export const PwInputDiv = styled.div`
  border: 1px solid #d6d9dc;
  display: flex;
  justify-content: space-between;
  width: 370px;
  height: 51.5px;
  border-radius: 9px;
  padding: 0 2%;
  margin-bottom: 1vh;
  input {
    font-size: 1rem;
    color: black;
    width: 80%;
    border: none;
    outline: none;
  }
`;
export const PwDeleteDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const PwVectorDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

// 유효성 msg
export const ValidMsg = styled.div`
  width: 370px;
  font-size: 0.86rem;
  color: #ff2f2f;
  display: flex;
  align-items: center;
`;

export const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
  button {
    width: 220px;
    height: 7vh;
    border: none;
    border-radius: 9px;
    background-color: #4285f4;
    font-size: 1.2rem;
    color: white;
    cursor: pointer;
    transition-duration: 0.3s;
    :active {
      background-color: #d6d9dc;
    }
  }
`;
