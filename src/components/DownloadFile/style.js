import styled from 'styled-components';

export const Container = styled.div`
  /* display: grid;
  grid-template-columns: 48px;
  grid-template-rows: 48px auto;
  align-items: center;
  justify-items: center;
  text-align: center; */
  display: inline-block;
  cursor: pointer;
  width: 140px;
`;

export const Image = styled.img`
  display: block;
  width: 48px;
  height: 48px;
  margin: auto;
`;

export const Title = styled.span`
  display: block;
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
  text-align: center;
`;