import React, { useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as S from './style';
import { CommentSubmit } from '../../assets/commentSubmit';
import { postComment } from '../../apis/comments/comments';
import { useGetToken } from '../../hooks/userToken/useGetToken';

interface Inputs {
  answer: string;
}
interface propsType {
  topicId: string;
  setData: Function;
  setIsPostComment: Function;
}

const CommentInput = ({ topicId, setData, setIsPostComment }: propsType) => {
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
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const usertoken = useGetToken();
    if (usertoken !== undefined) {
      postComment(topicId, data.answer, usertoken).then((res) => {
        if (res?.status === 'CREATED') {
          console.log(res);
          setData((prev: object[]) => [res.data, ...prev]);
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
        <S.CommentInput
          {...register('answer', {
            required: '글자를 입력하세요',
            maxLength: {
              value: 400,
              message: '400자 이하의 댓글만 작성이 가능합니다',
            },
          })}
          placeholder="댓글"
        />
        <input type="submit" id="btnSubmit" style={submitButtonStyle} />
        <label htmlFor="btnSubmit">
          <CommentSubmit />
        </label>
      </S.CommentInputContainer>
    </>
  );
};
export default CommentInput;
