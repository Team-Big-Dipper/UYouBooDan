import styled from 'styled-components';
import Link from 'next/link';
import DatePicker from 'react-datepicker'

export const CreateContainer = styled.div`
  flex: 1;
  padding: 5% 20%;
`;

export const Path = styled.div`
  margin-bottom: 2vh;
  font-size: 0.85rem;
`;

export const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 4vh;
  color: #242424;
`;

export const CategoryTitle = styled.div`
  font-size: 1rem;
  margin: 6vh 0 2vh 0;
  font-weight: 600;
  span{
    color: red;
  }
`;

export const Select = styled.select`
  width: fit-content;
  padding: 5px 7px;
  border: 1px solid #d6d9dc;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  color: #667085;
  margin-bottom: 10px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #d6d9dc;
  border-radius: 6px;
  padding-right: 10px;
  margin: 1vh 0;
`;
export const Input = styled.input`
  padding: 5px 30px 5px 7px;
  color: #667085;
  width: 100%;
  border: none;
  border-radius: 6px;
  outline: none;
`;
export const BtnClear = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  color: #667085;
  background-color: #d6d9dc;
  border-radius: 50%;
  padding: 5px;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.6rem;
`;

export const ErrorLength = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const QuestionTitleLength = styled.div`
  font-size: 0.85rem;
  /* margin-top: 1vh; */
  display: flex;
  justify-content: flex-end;
  span{
    color: #667085;
  }
`;

export const SubQuestion = styled.div`
  margin-left: 1vw;
`;

export const SubTitle = styled.div`
  font-size: 0.85rem;
  margin: 2vh 0;
  span{
     color: #667085;
  }
`;

export const ContentInput = styled.textarea`
  padding: 7px;
  color: #667085;
  width: 100%;
  border: 1px solid #d6d9dc;
  border-radius: 6px;
  height: 15vh;
  outline: none;
  resize: none;
`;

//추가설명 밑 이미지 첨부
export const SumContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ContentImg = styled.img`
  margin: 10px 20px 10px 0;
  border-radius: 5px;
  width: 20%;
  height: 20%;
`;
export const UploadDelete = styled.div`
  display: flex;
`;
export const ImgLabel = styled.label`
  display: inline-block;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
  border: 2px solid #e2e6ee;
  padding: 15px 20px;
  border-radius: 5px;
  color: #667085;
`;
export const SumnailUpload = styled.input`
  margin-left: 10px;
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
export const DeleteSumnaeil = styled.button`
  background-color: var(--color-navy);
  color: white;
  width: 55px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
`;

//tabselect
export const Nav = styled.nav`
`;

export const TabHr = styled.hr`
  border: 1px solid #e2e6ee;
  margin-bottom: 2vh;
  margin-top: -2px;
`;

//글투표
// export const InputWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   border: 1px solid #d6d9dc;
//   border-radius: 6px;
//   padding-right: 10px;
//   margin: 1vh 0;
// `;
export const AnswerInput = styled.input`
  padding: 5px 30px 5px 7px;
  color: #667085;
  width: 100%;
  border: none;
  border-radius: 6px;
  outline: none;
`;
export const DeleteInput = styled.div`
  outline: none;
  cursor: pointer;
  border: none;
  color: #667085;
  background-color: #d6d9dc;
  border-radius: 50%;
  padding: 5px;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.6rem;
`;
export const PlusInput = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  div{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: 800;
    background-color: #d6d9dc;
    color: #667085;
    border-radius: 50%;
    width: 25px;
    height: 25px;
  }
`;

export const Hr = styled.hr`
  height: 10px;
  background-color: #FAFAFA;
  border: none;
  margin: 4vh 0;
`;

export const TabWarning = styled.div`
  color: #667085;
  font-size: 0.85rem;
  display: flex;
  span{
    color: red;
  }
`;

export const VoteTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 2vh;
  font-weight: 600;
  span{
    color: red;
  }
`;

export const Radio = styled.div`
  display: flex;
  div{
    margin-right: 2vw;
  }
  input{
    margin-right: 0.6vw;
    cursor: pointer;
  }
`;

export const Warning = styled.div`
  color: #667085;
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7vh;
  span{
    color: red;
  }
`;
//datepicker
export const StyledDatePicker = styled(DatePicker)`
  border: 1px solid #d6d9dc;
  width: 200px;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`;


export const Btns = styled.div`
  display: flex;
  margin: 2vh 0;
  justify-content: center;
`;
export const Cancle = styled.div`
  width: 10vw;
  border: 1px solid #4285F4;
  color: #4285F4;
  background-color: white;
  border-radius: 12px;
  padding: 1.3vh 1.4vw;
  margin-right: 1vw;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  display: flex;
  justify-content: center;
  font-size: 0.9rem;
`;
export const Submit = styled.button`
  width: 10vw;
  background-color: #4285F4;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1.3vh 1.4vw;
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.9rem;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-left: 10px;
`;
export const CategoryErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
`;