import React, {useState} from "react";
import * as S from './style';

export const AddInput = () =>{
  const [inputFields, setInputFields] = useState([{fullName: '', }])

  const addInputField = () => {
    if(inputFields.length < 6){
      setInputFields([...inputFields, {
        fullName: '',
      }])
    }
    else{alert('6개까지만 가능합니다!')}
  }
  const handleChange = (index: number,evnt: any) => {
    const {name, value} = evnt.target;
    const list: any = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
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
                          const {fullName}= data;
                          return(
                            <div className="row my-3" key={index}>
                    <div className="col">
                    <div className="form-group">
                    <input type="text" onChange={(evnt)=>handleChange(index, evnt)} value={fullName} name="fullName" className="form-control"  placeholder="Full Name" />
                    </div>
                    </div>
                  </div>
                          )
                      })
                  }
                <div className="row">
                    <div className="col-sm-12">
                    <button className="btn btn-outline-success " onClick={addInputField}>Add New</button>
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