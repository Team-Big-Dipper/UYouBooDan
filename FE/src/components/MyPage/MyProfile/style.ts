import styled from 'styled-components';

export const MyProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 120vh;
  padding: 25px 35px 25px 35px;
  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const MyProfileTitleDiv = styled.div`
  font-size: 1.9rem;
  font-family: 'yg-jalnan' !important;
  margin-bottom: 110px;
  @media (max-width: 500px) {
    font-size: 25px;
  }
`;
export const PwContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  width: 375px;
  padding-left: 40px;
  @media (max-width: 768px) {
    padding-left: 0;
  }
  @media (max-width: 500px) {
    width: 300px;
  }
`;
export const PwTitle = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 8px;
`;
export const PwInputDiv = styled.div`
  border: 1px solid #d6d9dc;
  display: flex;
  justify-content: space-between;
  width: 375px;
  height: 53px;
  border-radius: 9px;
  padding: 0 8px 0 8px;
  margin-bottom: 8px;
  @media (max-width: 500px) {
    width: 100%;
  }
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
    height: 56px;
    border: none;
    border-radius: 9px;
    background-color: #4285f4;
    font-size: 19px;
    color: white;
    cursor: pointer;
    @media (max-width: 768px) {
      width: 100%;
    }
    @media (max-width: 500px) {
      width: 100%;
      font-size: 17px;
    }
    transition-duration: 0.3s;
    :active {
      background-color: #d6d9dc;
    }
  }
`;
