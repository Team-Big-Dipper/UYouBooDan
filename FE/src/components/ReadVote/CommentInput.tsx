import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as S from './style';
import { CommentSubmit } from '../../assets/commentSubmit';
import axios from 'axios';

interface Inputs {
  answer: string;
}

const CommentInput = ({ id, setData }: any) => {
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
    let request = {
      id: 6,
      like: 11,
      created_at: '2023-02-30 11:21:21',
      username: 'DAMONG',
      status: 'ACTIVE',
      content: data.answer,
    };
    axios.post(`/api/topics/${String(id)}/comments`, request).then(() => {
      setData((prev: any) => [...prev, request]);
    });
    alert('댓글이 작성되었습니다');
    reset({ answer: '' });
  };

  //console.log(errors.answer?.message);
  console.log(watch('answer'));
  return (
    <>
      <S.CommentInputContainer onSubmit={handleSubmit(onSubmit)}>
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
        <input type="submit" id="btnSubmit" style={{ display: 'none' }} />
        <label htmlFor="btnSubmit">
          <CommentSubmit />
        </label>
      </S.CommentInputContainer>
      {/* <p>{errors.answer?.message}</p> */}
    </>
  );
};
export default CommentInput;
