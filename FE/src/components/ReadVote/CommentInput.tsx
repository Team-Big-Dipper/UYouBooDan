import React, { useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as S from './style';
import { CommentSubmit } from '../../assets/commentSubmit';
import { postComment } from '../../apis/comments';

interface Inputs {
  answer: string;
}
interface propsType {
  topicId: string;
  setData: Function;
}

const CommentInput = ({ topicId, setData }: propsType) => {
  console.log(topicId);
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
      answer: '',
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    postComment(topicId, data.answer).then((res) => {
      if (res?.status === 'CREATED') {
        console.log(res);
        setData((prev: object[]) => [res.data, ...prev]);
        alert('댓글이 작성되었습니다');
      }
    });
    reset({ answer: '' });
    console.log(data.answer);
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
