import React from 'react';
import * as S from './style';
type propTypes = {
  image: string | undefined | null;
  updateContent: string | undefined;
  setUpdateContent: React.Dispatch<React.SetStateAction<string | undefined>>
};
const UpdateContent = ({ image, updateContent, setUpdateContent }: propTypes) => {
   const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateContent(e.target.value);
  }
  return (
    <S.VoteContentContainer>
      <S.VoteContent
        value={updateContent || ""}
        onChange={onChangeContent} />
      {!image ? null : (
        <S.AddedImageContainer>
          <S.AddedImage src={image} />
        </S.AddedImageContainer>
      )}
    </S.VoteContentContainer>
  );
};

export default UpdateContent;
