import React, { useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as S from './style';
import { CommentSubmit } from '../../assets/commentSubmit';
import { patchComment } from '../../apis/comments/comments';
import { getToken } from '../../utils/userToken';

interface Inputs {
  answer: string;
}
interface propsType {
  commentContent: any;
  commentId: number | undefined;
  setCommentContent: Function;
  handleRewiteComment: Function;
  setIsPostComment: Function;
}

const CommentRewriteInput = ({
  commentContent,
  commentId,
  setCommentContent,
  handleRewiteComment,
  setIsPostComment,
}: propsType) => {
  const submitButtonStyle = useMemo(() => {
    return { display: 'none' };
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      answer: commentContent,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const usertoken = getToken();
    if (usertoken !== undefined) {
      if (commentContent === data.answer) {
        handleRewiteComment();
        return;
      }
      patchComment(commentId, data.answer, usertoken).then((res) => {
        if (res?.status === 'REWRITED') {
          setCommentContent(res.data.commentContent);
          alert('댓글이 수정되었습니다');
          handleRewiteComment();
          setIsPostComment((prev: boolean) => !prev);
        } else {
          handleRewiteComment();
        }
      });
    } else {
      alert('로그인을 해주세요');
      handleRewiteComment();
    }
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
    </>
  );
};
export default CommentRewriteInput;
