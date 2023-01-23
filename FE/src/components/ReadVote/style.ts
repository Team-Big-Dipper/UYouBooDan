import { color } from '@mui/system';
import styled from 'styled-components';

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

export const SelectTextBtn = styled.button<{ clicked: boolean }>`
  border-style: solid;
  border-width: 1px;
  font-size: 1rem;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  margin-bottom: 0.5rem;
  background-color: ${(props) => (props.clicked ? '#4285f4' : 'white')};
  color: ${(props) => (props.clicked ? 'white' : 'black')};
  border-color: ${(props) => (props.clicked ? '#4285f4' : 'black')};
`;

export const buttonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3%;
`;

export const button = styled.div`
  border-color: ${(props) => (props.color ? props.color : 'gray')};
  border-width: 1px;
  border-style: solid;
  border-radius: 15px;
  color: ${(props) => (props.color ? 'white' : 'gray')};
  background-color: ${(props) => props.color};
  padding: 1rem 1.5rem;
  margin: 0.3rem;
`;
