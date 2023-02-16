import styled from 'styled-components';

export const EditContainer = styled.div`
  height: 120vh;
  padding: 5% 7%;
`;
export const EditTitleDiv = styled.div`
  font-size: 1.9rem;
  font-family: 'yg-jalnan' !important;
  margin-bottom: 15px;
`;
export const EditAdditional = styled.div`
  font-size: 0.9rem;
  color: #667085;
  margin-bottom: 40px;
`;
export const ImgPreviewDiv = styled.div`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d6d9dc;
  margin-bottom: 35px;
  img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
    justify-content: center;
    align-items: center;
  }
`;

// NickName
export const NickContainer = styled.div`
  margin-bottom: 15px;
`;
export const NickTitle = styled.div`
  font-size: 0.9rem;
  color: #667085;
  margin-bottom: 5px;
`;
// nickname 버튼 누르기 전
export const NickBtnClickBefore = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid red; */
  button {
    width: 120px;
    height: 40px;
    background-color: white;
    color: #667085;
    border: 1px solid #d6d9dc;
    border-radius: 7px;
    cursor: pointer;
    transition-duration: 0.3s;
    :active {
      background-color: #d6d9dc;
    }
  }
`;
export const NickValue = styled.div`
  font-weight: bold;
`;

// nickname 버튼 누른 후
export const NickBtnCLickAfter = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  button {
    width: 120px;
    height: 40px;
    background-color: white;
    color: #4285f4;
    border: 1px solid #4285f4;
    border-radius: 7px;
    cursor: pointer;
    transition-duration: 0.3s;
    :active {
      background-color: #d6d9dc;
    }
  }
`;
export const NickInputDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border: 1px solid #d6d9dc;
  border-radius: 7px;
  width: 77%;
  height: 40px;
  margin-bottom: 5px;
  input {
    font-size: 1rem;
    width: 80%;
    border: none;
    outline: none;
  }
`;
export const NickDeleteDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const NickMsgDiv = styled.div``;
export const NickSuccessMsg = styled.div`
  font-size: 0.86rem;
  color: #00c988;
  display: flex;
  align-items: center;
`;
export const NickFailureMsg = styled.div`
  font-size: 0.86rem;
  color: #ff2f2f;
  display: flex;
  align-items: center;
`;

// 프로필 이미지 수정

interface IsImgClick {
  imgClick: boolean;
}

export const ProfileImgContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  /* border: 1px solid red; */
`;
export const ProfileImgTitle = styled.div<IsImgClick>`
  color: ${(props) => (props.imgClick ? 'black' : '#667085')};
  font-weight: ${(props) => (props.imgClick ? 'bold' : '400')};
`;
export const ImgEditBtnClickBefore = styled.div`
  button {
    width: 120px;
    height: 40px;
    background-color: white;
    color: #667085;
    border: 1px solid #d6d9dc;
    border-radius: 7px;
    cursor: pointer;
    transition-duration: 0.3s;
    :active {
      background-color: #d6d9dc;
    }
  }
`;
export const ImgEditBtnClickAfter = styled.div`
  display: flex;
  gap: 15px;
`;
export const ImgValueInputDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 170px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #d6d9dc;
  border-radius: 7px;
  input {
    width: 80%;
    border: none;
    outline: none;
  }
`;
export const ImgDeleteDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const ImgInputLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.85rem;
  width: 120px;
  height: 40px;
  background-color: white;
  color: #667085;
  border: 1px solid #d6d9dc;
  border-radius: 7px;
  cursor: pointer;
  transition-duration: 0.3s;
  :active {
    background-color: #d6d9dc;
  }
`;

// 구분선 태그
export const HorizonDiv = styled.div`
  border: 0.1px solid #d6d9dc;
  margin-bottom: 40px;
`;

// email
export const EmailContainer = styled.div`
  margin-bottom: 50px;
`;
export const EmailTitle = styled.div`
  color: #667085;
  font-size: 1rem;
  margin-bottom: 20px;
`;
export const EmailValue = styled.div`
  font-weight: bold;
`;

// password

export const PwContainer = styled.div`
  margin-bottom: 70px;
`;
export const PwTitle = styled.div`
  color: #667085;
  font-size: 1rem;
  margin-bottom: 5px;
`;
export const PwEditClickBefore = styled.div`
  display: flex;
  gap: 10px;
  button {
    width: 120px;
    height: 40px;
    background-color: white;
    color: #4285f4;
    border: 1px solid #4285f4;
    border-radius: 7px;
    cursor: pointer;
    transition-duration: 0.3s;
    :active {
      background-color: #d6d9dc;
    }
  }
`;
export const PwInputBeforeDiv = styled.div`
  display: flex;
  width: 270px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #d6d9dc;
  border-radius: 7px;
  input {
    width: 80%;
    border: none;
    outline: none;
  }
`;

interface ValidAndExist {
  valid: string;
  exist: string;
}
export const PwEditClickAfter = styled.div``;

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
  width: 300px;
  height: 40px;
  border-radius: 7px;
  padding: 0 10px;
  margin-bottom: 8px;
  input {
    font-size: 1rem;
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
  width: 300px;
  height: 40px;
  border-radius: 7px;
  padding: 0 10px;
  margin-bottom: 8px;
  input {
    font-size: 1rem;
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
  font-size: 0.8rem;
  color: #667085;
  margin-bottom: 1vh;
`;
export const PwSuccessMsg = styled.div`
  font-size: 0.86rem;
  color: #00c988;
  display: flex;
  align-items: center;
`;
export const PwFailureMsg = styled.div`
  font-size: 0.86rem;
  color: #ff2f2f;
  display: flex;
  align-items: center;
`;

// 수정취소,수정저장 버튼 컨테이너
export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
export const EditCancleBtnDiv = styled.div`
  button {
    background-color: white;
    border: 0.8px solid #667085;
    border-radius: 9px;
    width: 100px;
    height: 45px;
    cursor: pointer;
    transition-duration: 0.3s;
    :active {
      background-color: #d6d9dc;
    }
  }
`;
export const EditSaveBtnDiv = styled.div`
  button {
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 9px;
    width: 100px;
    height: 45px;
    cursor: pointer;
    transition-duration: 0.3s;
    :active {
      background-color: #d6d9dc;
    }
  }
`;
