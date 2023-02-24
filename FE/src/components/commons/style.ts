import styled from 'styled-components';
import Link from 'next/link';

export const ModalBackground = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: white;
  z-index: 2;
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
  z-index: 2;
  @media (max-width: 375px) {
    width: 90%;
  }
`;

export const ModalButtonContainer = styled.div`
  display: flex;
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
  z-index: 2;

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
  z-index: 2;

  &:hover {
    background-color: #4285f4;
    color: white;
    border-radius: 0 0 10px 0;
  }
`;
export const ModalText = styled.div`
  font-size: 1.2rem;
  z-index: 2;
`;

export const LinkContainer = styled.div`
  width: 25vw;
  height: 40vh;
  background-color: white;
  color: black;
  position: relative;
  margin: 25vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  z-index: 2;
`;

export const LinkCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 35%;
`;

//makeVote
export const CreateVoteBtn = styled(Link)`
  color: #4285f4;
  background-color: white;
  font-family: 'yg-jalnan' !important;
  border: none;
  height: 50px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  text-decoration: none;
`;
