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
  display: flex;
`;
export const LikeButton = styled.div`
  display: flex;
  align-items: flex-start;
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

interface Clicked {
  clicked: boolean;
}

export const SelectTextDuple = styled.div<Clicked>`
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

interface isVoted {
  isTopicVoteItemVoted: boolean;
}
export const SelectTextSingle = styled.button<isVoted>`
  width: 100%;
  border-style: solid;
  border-width: 1px;
  font-size: 1rem;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  margin-bottom: 0.5rem;
  background-color: ${(props) =>
    props.isTopicVoteItemVoted ? '#4285f4' : 'white'};
  color: ${(props) => (props.isTopicVoteItemVoted ? 'white' : 'black')};
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
  cursor: default;
`;

export const DupleImgItem = styled.img<Clicked>`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 10px;
  border-radius: 10px;
  filter: ${(props) => (props.clicked ? 'brightness(60%)' : null)};
`;
export const DupleImageContainer = styled.button`
  width: 18vw;
  height: 30vh;
  min-width: 250px;
  min-height: 200px;
  position: relative;
  background: none;
  border: none;
`;
export const SingleImgItem = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 10px;
  border-radius: 10px;
  z-index: 1;
`;

export const SingleImageContainer = styled.button<isVoted>`
  width: 18vw;
  height: 30vh;
  min-width: 250px;
  min-height: 200px;
  position: relative;
  background: none;
  border: none;
  z-index: 1;
  filter: ${(props) => (props.isTopicVoteItemVoted ? 'brightness(60%)' : null)};
`;

export const ImageVoteCount = styled.div`
  position: absolute;
  top: 10%;
  left: 80%;
  font-size: 1rem;
  color: white;
  padding: 0.5rem 0.8rem;
  background-color: #4285f4;
  opacity: 90%;
  border-radius: 10px;
  z-index: 1;
`;

export const AnswerCard = styled.div`
  border-bottom: 1px solid #667085;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;
export const AnswerInputContainer = styled.form`
  border-top: 1px solid lightgray;
  padding: 18px;
  display: flex;
  align-items: center;
  margin: 2px 0;
  background-color: #f6f9fe;
`;
export const AnswerInput = styled.input`
  flex: 1;
  height: 6.5vh;
  border-radius: 8px;
  border: 1px solid lightgray;
  margin: 0 1% 0 0;
  padding: 0.3rem;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;
export const AnswerCardTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const AnswerUserName = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 11%;
`;
export const AnswerLike = styled.div`
  color: #667085;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
`;
export const AnswerContent = styled.div`
  padding: 1rem 0;
  font-size: 1rem;
  line-height: 150%;
`;
export const AnswerCardBottom = styled.div`
  display: flex;
  justify-content: end;
  color: #667085;
  cursor: default;
`;
export const AnswerCreatedAt = styled.div`
  font-size: 0.9rem;
  margin: 0 0.5rem;
`;
export const AnswerButtons = styled.div`
  font-size: 0.9rem;
  margin: 0 0.5rem;
  cursor: default;
`;
export const AddAnswerButton = styled.div`
  font-size: 1rem;
  text-decoration: underline;
  cursor: default;
`;

export const AnswerPageBtns = styled.div`
  margin: 3rem 1rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
`;

export const AnswerPage = styled.div`
  margin: 0 1rem;
  cursor: default;
`;
