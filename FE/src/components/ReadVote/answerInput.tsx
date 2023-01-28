import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as S from './style';
import { AnswerSubmit } from '../../assets/answerSubmit';
import axios from 'axios';

interface Inputs {
  answer: string;
}

const AnswerInput = ({ id, setData }: any) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      answer: '',
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data.answer);
    let request = {
      id: 5,
      like: 11,
      created_at: '20230112',
      username: 'DAMONG',
      status: 'ACTIVE',
      content: data.answer,
    };
    axios.post(`/api/topic/${String(id)}/comments`, request).then(() => {
      setData((prev: any) => [...prev, request]);
    });
    alert('댓글이 작성되었습니다!');
  };

  // console.log(errors);
  //console.log(watch('answer'));
  return (
    <>
      <S.AnswerInputContainer onSubmit={handleSubmit(onSubmit)}>
        <S.AnswerInput
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
          <AnswerSubmit />
        </label>
      </S.AnswerInputContainer>
      {/* <p>{errors.answer?.message}</p> */}
    </>
  );
};
export default AnswerInput;
