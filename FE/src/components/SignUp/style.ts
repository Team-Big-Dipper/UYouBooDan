import exp from 'constants';
import styled from 'styled-components';

export const SignUpContainer = styled.div`
  /* text-align: center; */
  padding: 10% 7%;
  border: 1px solid #d6d9dc;
  border-radius: 10px;
  /* height: 60vh; */
`;
export const SignUpLogo = styled.div`
  font-weight: 800;
  font-size: 2.4rem;
  color: #4285f4;
  /* border: 1px solid black; */
  display: inline-block;
  padding: 0.5vh 0.5vh 0.2vh 0.5vh;
  background-color: #f3f3f3;
  margin-bottom: 3vh;
`;
export const SignUpTitle = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 4vh;
`;

// email
export const EmailContainer = styled.div`
  /* border: 1px solid black; */
  margin-bottom: 3.5vh;
`;
export const EmailTitle = styled.div`
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 1vh;
`;
export const EmailInputBtnDiv = styled.div`
  display: flex;
  /* border: 1px solid red; */
  justify-content: space-between;
  height: 5.5vh;
  margin-bottom: 1vh;
  button {
    width: 6vw;
    font-size: 1rem;
    color: #4285f4;
    font-weight: 350;
    border: 1px solid #4285f4;
    border-radius: 9px;
    background-color: white;
    cursor: pointer;
    transition-duration: 0.3s;
    :active {
      background-color: #d6d9dc;
    }
  }
`;
export const EmailInputDiv = styled.div`
  border: 1px solid #d6d9dc;
  display: flex;
  justify-content: space-between;
  width: 19vw;
  border-radius: 9px;
  padding: 0 2%;
  input {
    font-size: 1rem;
    border: none;
    outline: none;
  }
`;
// export const EmailInputDelete = styled.div`
//   padding: 7% 3%;
//   padding: 0.1vh 0 0 0.65vh;
//   margin-top: 1.5vh;
//   /* border: 1px solid black; */
//   height: 2.3vh;
//   width: 2.3vh;
//   border-radius: 50%;
//   color: #667085;
//   background-color: #e2e6ee;
//   cursor: pointer;
// `;
export const EmailValidMsg = styled.div`
  font-size: 0.86rem;
  color: #02c988;
`;

// password

export const PwContainer = styled.div`
  margin-bottom: 3.5vh;
`;
export const PwTitle = styled.div`
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 1vh;
`;
export const PwInput = styled.div`
  border: 1px solid #d6d9dc;
  display: flex;
  justify-content: space-between;
  height: 5.5vh;
  border-radius: 9px;
  padding: 0 2%;
  margin-bottom: 1vh;
  input {
    font-size: 1rem;
    width: 80%;
    border: none;
    outline: none;
  }
`;
export const PwDelete = styled.div``;
export const PwInputImg = styled.div``;
export const PwCheckInput = styled.div`
  border: 1px solid #d6d9dc;
  display: flex;
  justify-content: space-between;
  height: 5.5vh;
  border-radius: 9px;
  padding: 0 2%;
  margin-bottom: 1vh;
  input {
    font-size: 1rem;
    width: 80%;
    border: none;
    outline: none;
  }
`;
export const PwCheckDelete = styled.div``;
export const PwCheckImg = styled.div``;
export const PwNotice = styled.div`
  font-size: 0.8rem;
  color: gray;
  margin-bottom: 1vh;
`;
export const PwValidMsg = styled.div`
  font-size: 0.86rem;
  color: #02c988;
`;

// NickName

export const NickContainer = styled.div`
  margin-bottom: 3.5vh;
`;
export const NickTitle = styled.div`
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 1vh;
`;
export const NickInputAndBtn = styled.div`
  display: flex;
  /* border: 1px solid red; */
  justify-content: space-between;
  height: 5.5vh;
  margin-bottom: 1vh;
  button {
    width: 6vw;
    font-size: 1rem;
    color: #4285f4;
    font-weight: 350;
    border: 1px solid #4285f4;
    border-radius: 9px;
    background-color: white;
    cursor: pointer;
    transition-duration: 0.3s;
    :active {
      background-color: #d6d9dc;
    }
  }
`;
export const NickInputDiv = styled.div`
  border: 1px solid #d6d9dc;
  display: flex;
  justify-content: space-between;
  width: 19vw;
  border-radius: 9px;
  padding: 0 2%;
  input {
    font-size: 1rem;
    border: none;
    outline: none;
  }
`;
export const NickValidMsg = styled.div`
  font-size: 0.86rem;
  color: #02c988;
`;

// terms 약관동의

export const TermsContainer = styled.div`
  border-top: 1px solid #d6d9dc;
  margin-bottom: 5vh;
  padding-top: 3.5vh;
`;
export const TermsTitle = styled.div`
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 2.5vh;
`;

// signup Btn

export const SignUpBtnContainer = styled.div`
  button {
    width: 100%;
    height: 7vh;
    border: none;
    border-radius: 9px;
    background-color: #4285f4;
    font-size: 1.2rem;
    color: white;
    cursor: pointer;
    transition-duration: 0.3s;
    :active {
      background-color: #d6d9dc;
    }
  }
`;
