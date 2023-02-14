import React, { useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as S from './style';
import { CommentSubmit } from '../../assets/commentSubmit';
import { postComment } from '../../apis/comments/comments';
import { getToken } from '../../utils/userToken';

interface Inputs {
  answer: string;
}
interface propsType {
  topicId: string;
  setCommentData: Function;
  setIsPostComment: Function;
}

const CommentInput = ({
  topicId,
  setCommentData,
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
      answer: '',
    },
  });
  const obj = useMemo(
    () => ({
      required: '글자를 입력하세요',
      maxLength: {
        value: 400,
        message: '400자 이하의 댓글만 작성이 가능합니다',
      },
    }),
    [],
  );
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const usertoken = getToken();
    if (usertoken !== undefined) {
      postComment(topicId, data.answer, usertoken).then((res) => {
        if (res?.status === 'CREATED') {
          console.log(res);
          const obj = { ...res.data, commentId: res.data.commentId + 10 };
          setCommentData((prev: object[]) => [obj, ...prev]);
          alert('댓글이 작성되었습니다');
          setIsPostComment((prev: boolean) => !prev);
        }
      });
      reset({ answer: '' });
    } else {
      alert('로그인을 해주세요');
    }
  };

  return (
    <>
      <S.CommentInputContainer
        rewrite={false}
        onSubmit={handleSubmit(onSubmit)}
      >
        <S.CommentInput {...register('answer', obj)} placeholder="댓글" />
        <input type="submit" id="btnSubmit" style={submitButtonStyle} />
        <label htmlFor="btnSubmit">
          <CommentSubmit />
        </label>
      </S.CommentInputContainer>
    </>
  );
};
export default CommentInput;
