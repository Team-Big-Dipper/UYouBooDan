import styled from 'styled-components';

export const ModalBackground = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: white;
`;

export const ModalContainer = styled.div`
  width: 25vw;
  height: 40vh;
  background-color: white;
  color: black;
  position: relative;
  margin: 25vh auto;
  display: flex;
  flex-direction: column;
  justify-content: end;
  border-radius: 10px;
`;

export const ModalLeftButton = styled.span`
  font-size: 1.2rem;
  justify-content: space-between;
  text-align: center;
  border-top: lightgray 1px solid;
  border-right: lightgray 1px solid;
  color: black;
  padding: 2rem;
  cursor: default;
  flex: 1;
  &:hover {
    background-color: #4285f4;
    color: white;
    border-radius: 0 0 0 10px;
  }
`;
export const ModalRightButton = styled.span`
  font-size: 1.2rem;
  justify-content: space-between;
  text-align: center;
  border-top: lightgray 1px solid;
  color: black;
  padding: 2rem;
  cursor: default;
  flex: 1;
  &:hover {
    background-color: #4285f4;
    color: white;
    border-radius: 0 0 10px 0;
  }
`;
export const ModalText = styled.div`
  font-size: 1.2rem;
`;
