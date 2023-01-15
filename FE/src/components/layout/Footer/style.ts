import styled from 'styled-components';

export const FooterDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e2e6ee;
  height: 240px;
  padding: 0 20%;
  justify-content: center;
  align-items: flex-start; // 좌우에서 왼쪽 시작
  /* align-items: center; */
`;
export const FooterLogo = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #667085;
  margin-bottom: 1.3vh;
`;
export const CopyRight = styled.div`
  font-size: 0.9rem;
  color: #667085;
`;
