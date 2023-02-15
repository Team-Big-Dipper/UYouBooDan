import styled from 'styled-components';
interface ImageUrl {
  src: string | undefined | null;
}
interface isVoted {
  isChangedComponent: boolean | undefined;
}
interface Rewrite {
  rewrite: boolean;
}
interface CurrentPage {
  isCurrentPage: boolean;
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
  align-items: center;
  margin-top: 10px;
  height: 45px;
  overflow: hidden;
  @media (min-width: 480px) and (max-width: 767px) {
    flex-direction: column;
    margin: 0;
    height: fit-content;
    align-items: flex-start;
  }
  @media (max-width: 479px) {
    display: flex;
    flex-direction: column;
    margin: 5px auto;
    height: fit-content;
    align-items: flex-start;
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
    //margin-left: 4px;
    margin-left: 0;
  }
`;
export const DevideIconDiv = styled.div`
  display: flex;
  margin-left: 10px;
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
  width: fit-content;
  height: 20px;
  justify-content: space-between;
  @media (min-width: 480px) and (max-width: 767px) {
    margin: 0;
    height: fit-content;
  }
  @media (max-width: 479px) {
    margin-left: 0;
    height: fit-content;
  }
`;
export const ContentInfoSpan = styled.span`
  overflow: hidden;
  height: 17px;
  width: fit-content;
  @media (min-width: 480px) and (max-width: 767px) {
    height: fit-content;
  }
  @media (max-width: 479px) {
    height: fit-content;
  }
`;
export const LikeButton = styled.div`
  display: flex;
  align-items: flex-start;
`;
export const CategoryIcon = styled.div`
  border-radius: 15px;
  width: 80px;
  height: 26px;
  background: ${(props) => props.color};
  text-align: center;
  padding: 7px;
  color: white;
  margin-right: 3px;
  font-size: 0.9rem;
`;
export const DdayIcon = styled.div`
  font-size: 0.9rem;
  border-radius: 15px;
  width: 80px;
  height: 26px;
  background: #4285f4;
  padding: 7px;
  text-align: center;
  color: white;
`;
export const VoteContent = styled.div`
  width: 100%;
  font-size: 1rem;
  padding: 30px;
  line-height: 2rem;
  color: #667085;
  background-color: #fafafa;
  margin-bottom: 30px;
  @media (max-width: 479px) {
    padding: 15px 10px;
    background-color: #fafafa;
    border-radius: 10px;
    margin-bottom: 0px;
    font-size: 0.9rem;
  }
`;
export const VoteContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
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
  border: 1px solid #e2e6ee;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  background-color: ${(props) =>
    props.isChangedComponent ? '#4285f4' : 'white'};
  color: ${(props) => (props.isChangedComponent ? 'white' : 'black')};
`;

export const VoteResultDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const VoteResultContent = styled.div`
  margin-left: 10px;
`;
export const VoteResultPercentageDiv = styled.div<isVoted>`
  position: absolute;
  right: 20px;
  color: ${(props) => (props.isChangedComponent ? 'white' : ' #a2adc5')};
`;

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
export const CommentListCondition = styled.div`
  background-color: white;
  padding: 15px 0 10px 0;
  font-size: 0.9rem;
`;
export const DeletedContent = styled.div`
  color: #667085;
`;
export const CommentCard = styled.div`
  border-bottom: 1px solid #e2e6ee;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: white;
`;
export const CommentInputContainer = styled.form<Rewrite>`
  border-top: ${(props) => (props.rewrite ? null : '1px solid lightgray')};
  padding: ${(props) => (props.rewrite ? '0px' : '18px')};
  display: flex;
  align-items: ${(props) => (props.rewrite ? 'flex-end' : 'center')};
  margin: ${(props) => (props.rewrite ? '10px 0' : '2px 0')};
  background-color: ${(props) => (props.rewrite ? null : ' #f6f9fe')};
  width: 100%;
  height: fit-content;
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
  margin: 0 5px 5px 0;
  padding: 10px;
  font-size: 1rem;
  width: 100%;
  &:focus {
    outline: none;
  }
`;
export const CommentCardTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const CommentUserName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  min-width: 50px;
  margin-left: 10px;
  font-weight: bold;
  @media (max-width: 767px) {
    margin-left: 5px;
  }
`;
export const UserDataDiv = styled.div`
  display: flex;
  align-items: center;
`;
export const CommentLike = styled.div`
  color: #667085;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
`;
export const CommentContent = styled.div`
  padding: 10px 5px;
  color: #242424;
  font-size: 1rem;
  line-height: 150%;
  @media (max-width: 479px) {
    font-size: 0.9rem;
  }
`;
export const CommentCardBottomContainer = styled.div`
  display: flex;
  justify-content: end;
  color: #667085;
  cursor: default;
`;
export const CommentCreatedAt = styled.div`
  font-size: 0.8rem;
  margin: 0 5px;
`;
export const CommentButtons = styled.div`
  font-size: 0.8rem;
  margin: 0 5px;
  cursor: default;
`;

export const CommentPageBtns = styled.div`
  padding: 30px 10px;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  background-color: white;
  align-items: center;

  @media (max-width: 479px) {
    font-size: 0.6rem;
  }
`;

export const CommentPageNum = styled.div<CurrentPage>`
  font-size: ${(props) => (props.isCurrentPage ? '1.2rem' : '0.8rem')};
  margin: 0 10px;
  cursor: default;
  @media (max-width: 479px) {
    font-size: 0.9rem;
  }
`;
