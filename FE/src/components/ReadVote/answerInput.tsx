import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as S from './style';
import { AnswerSubmit } from '../../assets/answerSubmit';

interface Inputs {
  answer: string;
}

const AnswerInput = () => {
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
    alert('댓글이 작성되었습니다!');
  };

  console.log(errors);
  //console.log(watch('answer'));
  return (
    <>
      <S.AnswerInputContainer onSubmit={handleSubmit(onSubmit)}>
        <S.AnswerInput
          {...register('answer', {
            required: '글자를 입력하세요',
            maxLength: {
              value: 4,
              message: '4자 이하의 댓글만 작성이 가능합니다',
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
