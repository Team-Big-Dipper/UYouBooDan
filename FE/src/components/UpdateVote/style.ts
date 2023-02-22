import styled from 'styled-components';

export const ReadVoteBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 10px 10px 10px;
  @media (max-width: 479px) {
    margin: 30px 0;
  }
`;
export const ReadVoteBtn = styled.div`
  border-color: ${(props) => (props.color ? props.color : 'gray')};
  border-width: 1px;
  border-style: solid;
  border-radius: 15px;
  color: ${(props) => (props.color ? 'white' : 'gray')};
  background-color: ${(props) => props.color};
  padding: 1rem 1.5rem;
  margin: 15px 5px 50px 5px;
  cursor: default;

  @media (max-width: 479px) {
    width: 100px;
    text-align: center;
    padding: 20px;
    margin: 20px 5px 35px 5px;
  }
`;