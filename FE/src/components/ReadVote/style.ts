import styled from 'styled-components';
interface ImageUrl {
  src: string | undefined | null;
}
interface isVoted {
  isChangedComponent: boolean;
}

export const VoteTitleOutLine = styled.div`
  margin-top: 5%;
  margin-bottom: 2%;
  @media (max-width: 479px) {
    padding: 10px;
  }
`;
export const TitleContainer = styled.div`
  display: flex;
  @media (min-width: 480px) and (max-width: 767px) {
    flex-direction: column;
    margin-bottom: 20px;
  }
  @media (max-width: 479px) {
    flex-direction: column;
    margin-bottom: 10px;
  }
`;
export const Title = styled.div`
  font-size: 2rem;
  margin-left: 2%;
  margin-top: 1%;
  font-weight: bold;
  @media (min-width: 480px) and (max-width: 767px) {
    margin-top: 15px;
    margin-left: 0px;
  }
  @media (max-width: 479px) {
    margin-top: 10px;
    margin-left: 0;
  }
`;
export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  @media (min-width: 480px) and (max-width: 767px) {
    flex-direction: column;
    margin: 0;
  }
  @media (max-width: 479px) {
    display: flex;
    flex-direction: column;
    margin: 5px auto;
  }
`;
export const DevideSubtitleDiv = styled.div`
  display: flex;
  margin-left: 8%;
  margin-top: 5px;
  @media (min-width: 480px) and (max-width: 767px) {
    margin-left: 0;
  }
  @media (max-width: 479px) {
    line-height: 150%;
    margin-left: 4px;
  }
`;
export const DevideIconDiv = styled.div`
  display: flex;
  margin-left: 8%;
  margin-top: 2%;
  @media (min-width: 480px) and (max-width: 767px) {
    margin: 15px 0;
  }
  @media (max-width: 479px) {
    margin-top: 15px;
    margin-left: 0px;
  }
`;
export const ContentInfo = styled.div`
  color: #667085;
  display: flex;
  margin-left: 15px;
  @media (min-width: 480px) and (max-width: 767px) {
    margin: 0;
  }
  @media (max-width: 479px) {
    margin-left: 0;
  }
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
  padding: 4px;
  color: white;
  margin-right: 3px;
`;
export const DdayIcon = styled.div`
  border-radius: 10px;
  width: 4rem;
  height: 1.4rem;
  background: #4285f4;
  padding: 4px;
  text-align: center;
  color: white;
`;
export const VoteContent = styled.div`
  width: 100%;
  padding: 2rem 1rem;
  line-height: 2rem;
  background-color: #fafafa;
  @media (max-width: 479px) {
    padding: 15px 10px;
    background-color: #fafafa;
    border-radius: 10px;
  }
`;
export const VoteContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 479px) {
    padding: 10px;
  }
`;

export const AddedImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const AddedImage = styled.div<ImageUrl>`
  background-image: url(${(props) => props?.src});
  border-radius: 10px;
  background-position: center;
  margin: 10px 0;
  width: 347px;
  height: 347px;
  background-size: cover;
  @media (max-width: 479px) {
    margin: 10px;
    width: 165px;
    height: 165px;
  }
`;

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
    props.isChangedComponent ? '#4285f4' : 'white'};
  color: ${(props) => (props.isChangedComponent ? 'white' : 'black')};
`;

export const ReadVoteBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

export const ReadVoteBtn = styled.div`
  border-color: ${(props) => (props.color ? props.color : 'gray')};
  border-width: 1px;
  border-style: solid;
  border-radius: 15px;
  color: ${(props) => (props.color ? 'white' : 'gray')};
  background-color: ${(props) => props.color};
  padding: 1rem 1.5rem;
  margin: 15px 5px 30px 5px;
  cursor: default;

  @media (max-width: 479px) {
    width: 110px;
    text-align: center;
    margin: 20px 5px 35px 5px;
  }
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
  width: 270px;
  height: 270px;
  min-width: 250px;
  min-height: 200px;
  position: relative;
  background: none;
  border: none;
  z-index: 1;
  filter: ${(props) => (props.isChangedComponent ? 'brightness(60%)' : null)};
  @media (max-width: 479px) {
    width: 165px;
    height: 165px;
    min-width: 165px;
    min-height: 165px;
  }
`;

export const ImageVoteCount = styled.div`
  position: absolute;
  top: 10%;
  left: 80%;
  font-size: 1rem;
  color: white;
  padding: 10px;
  background-color: #4285f4;
  opacity: 90%;
  border-radius: 10px;
  z-index: 1;
  @media (max-width: 479px) {
    padding: 8px 5px;
    font-size: 0.8rem;
  }
`;

export const CommentListContainer = styled.div`
  padding-top: 10px;
  background-color: #fafafa;
`;

export const CommentCard = styled.div`
  border-bottom: 1px solid #e2e6ee;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: white;
`;
export const CommentInputContainer = styled.form`
  border-top: 1px solid lightgray;
  padding: 18px;
  display: flex;
  align-items: center;
  margin: 2px 0;
  background-color: #f6f9fe;
`;
export const CommentHeader = styled.p`
  padding: 30px 0 10px 10px;
  background-color: white;
  font-weight: bold;
  font-size: 1.1rem;
`;
export const CommentInput = styled.input`
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
export const CommentCardTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const CommentUserName = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90px;
`;
export const CommentLike = styled.div`
  color: #667085;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
`;
export const CommentContent = styled.div`
  padding: 1rem 0;
  font-size: 1rem;
  line-height: 150%;
`;
export const CommentCardBottomContainer = styled.div`
  display: flex;
  justify-content: end;
  color: #667085;
  cursor: default;
`;
export const CommentCreatedAt = styled.div`
  font-size: 0.9rem;
  margin: 0 0.5rem;
`;
export const CommentButtons = styled.div`
  font-size: 0.9rem;
  margin: 0 0.5rem;
  cursor: default;
`;

export const CommentPageBtns = styled.div`
  padding: 3rem 1rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  background-color: white;
`;

export const CommentPage = styled.div`
  margin: 0 1rem;
  cursor: default;
`;
