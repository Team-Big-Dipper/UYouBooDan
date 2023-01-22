import styled from 'styled-components';

export const PageContainer = styled.div`
  border: 1px solid red;
  display: flex;
  padding: 5% 20% 0 20%;
  flex-direction: column;
`;

export const VoteTitleOutLine = styled.div`
  margin-top: 5%;
  margin-bottom: 2%;
`;
export const TitleContainer = styled.div`
  display: flex;
`;
export const Title = styled.div`
  font-size: 2rem;
  margin-left: 2%;
  margin-top: 1%;
  font-weight: bold;
`;
export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const devideDiv = styled.div`
  display: flex;
  margin-left: 8%;
  margin-top: 2%;
`;
export const ContentInfo = styled.div`
  color: #667085;
`;
export const CategoryIcon = styled.div`
  border-radius: 10px;
  width: 5rem;
  height: 1.4rem;
  background: ${(props) => props.color};
  text-align: center;
  padding: 2%;
  color: white;
`;
export const DdayIcon = styled.div`
  border-radius: 10px;
  width: 4rem;
  height: 1.4rem;
  background: #4285f4;
  padding: 2%;
  text-align: center;
  color: white;
`;
export const VoteContent = styled.div`
  padding: 2rem 1rem;
  line-height: 2rem;
`;

export const AddedImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin: 2rem 0;
`;

export const SelectTextBtn = styled.button`
  border: 1px solid black;
  font-size: 1rem;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  margin-bottom: 0.5rem;
  background-color: white;
  &:hover {
    color: white;
    border-color: #4285f4;
    background-color: #4285f4;
  }
  /* &:focus {
    color: white;
    border-color: #4285f4;
    background-color: #4285f4;
  } */
`;
