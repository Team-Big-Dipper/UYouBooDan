import styled from 'styled-components';

export const SignUpContainer = styled.div`
  border: 1px solid #d6d9dc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 100%;
  padding: 50px 0 50px 0;
  @media (max-width: 500px) {
    width: 350px;
    padding: 20px 0 20px 0;
  }
`;
export const SignUpLogo = styled.div`
  font-weight: 800;
  color: #4285f4;
  display: inline-block;
  background-color: #f3f3f3;
  font-size: 38px;
  padding: 3px;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    font-size: 27px;
    margin-bottom: 15px;
  }
`;
export const SignUpTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 33px;
  @media (max-width: 500px) {
    font-size: 20px;
    margin-bottom: 27px;
  }
`;

// email
export const EmailContainer = styled.div`
  margin-bottom: 28px;
  @media (max-width: 500px) {
    margin-bottom: 23px;
  }
`;
export const EmailTitle = styled.div`
  font-weight: bold;
  font-size: 17px;
  margin-bottom: 8px;
  @media (max-width: 500px) {
    font-size: 15px;
  }
`;
export const EmailInputBtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 375px;
  height: 53px;
  margin-bottom: 8px;
  gap: 5px;
  @media (max-width: 500px) {
    width: 300px;
  }
  button {
    width: 90px;
    font-size: 17px;
    color: #4285f4;
    font-weight: 350;
    border: 1px solid #4285f4;
    border-radius: 9px;
    background-color: white;
    cursor: pointer;
    transition-duration: 0.3s;
    :active {
      background-color: #4285f4;
      color: white;
    }
    @media (max-width: 500px) {
      width: 70px;
      font-size: 14px;
    }
  }
`;
export const EmailInputDiv = styled.div`
  border: 1px solid #d6d9dc;
  display: flex;
  justify-content: space-between;
  width: 275px;
  border-radius: 9px;
  padding: 0 8px 0 8px;
  @media (max-width: 500px) {
    width: 230px;
  }
  input {
    width: 80%;
    font-size: 17px;
    border: none;
    outline: none;
    @media (max-width: 500px) {
      font-size: 15px;
    }
  }
`;
export const EmailDeleteDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const EmailSuccessMsg = styled.div`
  font-size: 13px;
  color: #00c988;
  display: flex;
  align-items: center;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
export const EmailFailureMsg = styled.div`
  font-size: 13px;
  color: #ff2f2f;
  display: flex;
  align-items: center;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

// password
// extends -> 상속 개념!
interface ValidAndExist {
  valid: string;
  exist: string;
}
export const PwContainer = styled.div`
  margin-bottom: 28px;
  @media (max-width: 500px) {
    margin-bottom: 23px;
  }
`;
export const PwTitle = styled.div`
  font-weight: bold;
  font-size: 17px;
  margin-bottom: 8px;
  @media (max-width: 500px) {
    font-size: 15px;
  }
`;
export const PwInput = styled.div<ValidAndExist>`
  border: ${(props) =>
    props.valid === '비밀번호가 일치하지 않습니다.' && props.exist
      ? '1px solid red'
      : '1px solid #d6d9dc'};
  background-color: ${(props) =>
    props.valid === '비밀번호가 일치하지 않습니다.' && props.exist
      ? '#FFF7F7'
      : 'white'};
  display: flex;
  justify-content: space-between;
  height: 53px;
  border-radius: 9px;
  padding: 0 8px 0 8px;
  margin-bottom: 8px;
  input {
    font-size: 17px;
    color: ${(props) =>
      props.valid === '비밀번호가 일치하지 않습니다.' && props.exist
        ? '#FF2F2F'
        : 'black'};
    background-color: ${(props) =>
      props.valid === '비밀번호가 일치하지 않습니다.' && props.exist
        ? '#FFF7F7'
        : 'white'};
    width: 80%;
    border: none;
    outline: none;
    @media (max-width: 500px) {
      font-size: 15px;
    }
  }
`;
export const PwDeleteDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const PwVectorDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
// #FFF7F7 -> 약간 핑크빛
export const PwCheckInput = styled.div<ValidAndExist>`
  border: ${(props) =>
    props.valid === '비밀번호가 일치하지 않습니다.' && props.exist
      ? '1px solid red'
      : '1px solid #d6d9dc'};
  background-color: ${(props) =>
    props.valid === '비밀번호가 일치하지 않습니다.' && props.exist
      ? '#FFF7F7'
      : 'white'};
  display: flex;
  justify-content: space-between;
  height: 53px;
  border-radius: 9px;
  padding: 0 8px 0 8px;
  margin-bottom: 8px;
  input {
    font-size: 17px;
    color: ${(props) =>
      props.valid === '비밀번호가 일치하지 않습니다.' && props.exist
        ? '#FF2F2F'
        : 'black'};
    background-color: ${(props) =>
      props.valid === '비밀번호가 일치하지 않습니다.' && props.exist
        ? '#FFF7F7'
        : 'white'};
    width: 80%;
    border: none;
    outline: none;
    @media (max-width: 500px) {
      font-size: 15px;
    }
  }
`;
export const PwCheckDeleteDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const PwCheckVectorDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const Notice = styled.div`
  font-size: 13px;
  color: #667085;
  margin-bottom: 8px;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
export const PwSuccessMsg = styled.div`
  font-size: 14px;
  color: #00c988;
  display: flex;
  align-items: center;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;
export const PwFailureMsg = styled.div`
  font-size: 14px;
  color: #ff2f2f;
  display: flex;
  align-items: center;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

// NickName

export const NickContainer = styled.div`
  margin-bottom: 28px;
  @media (max-width: 500px) {
    margin-bottom: 23px;
  }
`;
export const NickTitle = styled.div`
  font-weight: bold;
  font-size: 17px;
  margin-bottom: 8px;
  @media (max-width: 500px) {
    font-size: 15px;
  }
`;
export const NickInputAndBtn = styled.div`
  display: flex;
  justify-content: space-between;
  height: 53px;
  width: 375px;
  margin-bottom: 8px;
  gap: 5px;
  @media (max-width: 500px) {
    width: 305px;
  }
  button {
    width: 90px;
    font-size: 17px;
    color: #4285f4;
    font-weight: 350;
    border: 1px solid #4285f4;
    border-radius: 9px;
    background-color: white;
    cursor: pointer;
    transition-duration: 0.3s;
    :active {
      background-color: #4285f4;
      color: white;
    }
    @media (max-width: 500px) {
      width: 70px;
      font-size: 14px;
    }
  }
`;
export const NickInputDiv = styled.div`
  border: 1px solid #d6d9dc;
  display: flex;
  justify-content: space-between;
  width: 275px;
  border-radius: 9px;
  padding: 0 8px 0 8px;
  @media (max-width: 500px) {
    width: 230px;
  }
  input {
    width: 80%;
    font-size: 17px;
    border: none;
    outline: none;
    @media (max-width: 500px) {
      font-size: 15px;
    }
  }
`;
export const NickSuccessMsg = styled.div`
  font-size: 14px;
  color: #00c988;
  display: flex;
  align-items: center;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;
export const NickFailureMsg = styled.div`
  font-size: 14px;
  color: #ff2f2f;
  display: flex;
  align-items: center;
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

// terms 약관동의

export const TermsContainer = styled.div`
  border-top: 1px solid #d6d9dc;
  margin-bottom: 45px;
  padding-top: 30px;
  @media (max-width: 500px) {
    margin-bottom: 40px;
    padding-top: 25px;
  }
`;
export const TermsTitle = styled.div`
  font-weight: bold;
  font-size: 17px;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    font-size: 15px;
    margin-bottom: 15px;
  }
`;
export const TermsContentOne = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 47px;
`;
export const TermsOneRadioAndText = styled.div`
  display: flex;
  font-size: 17px;
  gap: 10px;
  @media (max-width: 500px) {
    font-size: 15px;
    gap: 8px;
  }
  div {
    display: flex;
    align-items: center;
  }
`;
export const TermsOneInfo = styled.div`
  font-size: 15px;
  color: #667085;
  cursor: pointer;
  @media (max-width: 500px) {
    font-size: 14px;
  }
`;
export const TermsContentTwo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 47px;
`;
export const TermsTwoRadioAndText = styled.div`
  display: flex;
  font-size: 17px;
  gap: 10px;
  @media (max-width: 500px) {
    font-size: 15px;
    gap: 8px;
  }
  div {
    display: flex;
    align-items: center;
  }
`;
export const TermsTwoInfo = styled.div`
  font-size: 15px;
  color: #667085;
  cursor: pointer;
  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

// signup Btn
interface Ok {
  isOk: boolean;
}

export const SignUpBtnContainer = styled.div<Ok>`
  button {
    width: 100%;
    height: 56px;
    border: none;
    border-radius: 9px;
    background-color: ${(props) => (props.isOk ? '#4285f4' : '#7b8c9f')};
    font-size: 20px;
    color: white;
    cursor: pointer;
    transition-duration: 0.3s;
    :active {
      background-color: ${(props) => (props.isOk ? '#d6d9dc' : '#7b8c9f')};
    }
    @media (max-width: 500px) {
      font-size: 18px;
    }
  }
`;
