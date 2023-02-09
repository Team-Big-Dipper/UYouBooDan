import React, { useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as S from './style';
import { CommentSubmit } from '../../assets/commentSubmit';
import { patchComment } from '../../apis/comments';

interface Inputs {
  answer: string;
}
interface propsType {
  commentContent: any;
  commentId: number | undefined;
  setCommentContent: Function;
  setIsRewiteComment: Function;
}

const CommentRewriteInput = ({
  commentContent,
  commentId,
  setCommentContent,
  setIsRewiteComment,
}: propsType) => {
  console.log(commentId);
  const submitButtonStyle = useMemo(() => {
    return { display: 'none' };
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      answer: commentContent,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    patchComment(commentId, data.answer).then((res) => {
      if (res?.status === 'REWRITED') {
        console.log(res);
        setCommentContent(res.data.commentContent);
        alert('댓글이 수정되었습니다');
        setIsRewiteComment((prev: boolean) => !prev);
      }
    });
    reset({ answer: '' });
    console.log(data.answer);
  };

  return (
    <>
      <S.CommentInputContainer rewrite={true} onSubmit={handleSubmit(onSubmit)}>
        <S.CommentInput
          {...register('answer', {
            required: '글자를 입력하세요',
            maxLength: {
              value: 400,
              message: '400자 이하의 댓글만 작성이 가능합니다',
            },
          })}
        />
        <input type="submit" id="btnPatchSubmit" style={submitButtonStyle} />
        <label htmlFor="btnPatchSubmit">
          <CommentSubmit />
        </label>
      </S.CommentInputContainer>
      {/* <S.CommentInputSubmitButton>취소</S.CommentInputSubmitButton> */}
    </>
  );
};
export default CommentRewriteInput;
