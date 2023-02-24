import React, {useState} from "react";
import { Inputs } from "../../pages/createvote";
import * as S from './style';
import { UseFormRegister } from 'react-hook-form';

export const AddInput = ({register}:{register: UseFormRegister<Inputs>}) =>{
  const [inputFields, setInputFields] = useState([''])
  const [answer, setAnswer] = useState('')
console.log(inputFields)
  const addInputField = () => {
    if(inputFields.length < 6){
      setInputFields([...inputFields, ''])
    }
    else{alert('6개까지만 가능합니다!')}
  }
  const handleChange = (index: number, evnt: any) => {
    console.log(index, evnt.target.value)
    const {name, value} = evnt.target;
    const list: any[] = [...inputFields];
    list[index] = value;
    setInputFields(list);
    setAnswer(value)
  }
  return(
    <div>
      <S.TabWarning>
        질문에 대한 답을 글로 작성해주세요. &nbsp;<span>*</span>&nbsp;최대
        6개까지 가능합니다.
      </S.TabWarning>
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            {
              inputFields.map((data, index)=>{
                  return(
                    <S.InputWrapper key={index}>
                      <S.AnswerInput 
                        {...register('topicVoteItems',{required:true})}
                        type="text" 
                        onChange={(evnt)=>handleChange(index, evnt)} 
                        value={answer} 
                        name="answer" 
                        className="form-control"  
                        placeholder="답을 입력해주세요." />
                    </S.InputWrapper>
                  )
              })
            }
          <div className="row">
          <div className="col-sm-12">
          <S.PlusInput>
            <div onClick={addInputField}>+</div>
          </S.PlusInput>
          </div>
            </div>
              </div>
            </div>
            <div className="col-sm-4">
            </div>
        </div>
    </div>
  )
}