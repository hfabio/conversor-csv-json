import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;//max(30vw, 400px);
  height: 100%;//max(40vh, 400px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;

export const Clear = styled.button`
  width: 120px;
  height: 36px;
  border: none;
  background-color: orange;
  color: white;
`;