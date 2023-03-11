import styled from 'styled-components';
interface ImageUrl {
  src: string | undefined | null;
}

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

// voteTitle
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
export const Title = styled.input`
  font-size: 1.8rem;
  margin-left: 2%;
  margin-top: 1%;
  font-weight: bold;
  width: 100%;
  border: 1px solid #e2e6ee;
  border-radius: 5px;
  padding: 10px;
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

//UpdateContent
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
export const VoteContent = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: 30px;
  line-height: 2rem;
  color: #667085;
  background-color: #fafafa;
  margin-bottom: 30px;
  border: none;
  @media (max-width: 479px) {
    padding: 15px 10px;
    background-color: #fafafa;
    border-radius: 10px;
    margin-bottom: 0px;
    font-size: 0.9rem;
  }
`;

export const Select = styled.select`
  width: fit-content;
  padding: 5px 7px;
  border: 1px solid #d6d9dc;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  color: #667085;
  margin-bottom: 10px;
`;