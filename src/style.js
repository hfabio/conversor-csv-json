import styled from 'styled-components';

export const Page = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-content: center;
  justify-items: center;

  > section:first-of-type{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: min(450px,100%);
    > div {
      width: 100%;
      /* height: 33%; */
      display: flex;
      justify-content: space-between;

      > input[type=text]{
        width: 120px;
        border-radius: 50px;
        border: 1px #ccc solid;
        border-style: dashed;
        padding: 0 5% 0;
        font-size: 1.2rem;
        font-weight: bold;
      }
      > input[type=text]:focus {
          outline: none;
        border: 1px #aaa solid;
      }
    }
  }

  >section:last-of-type{
    width: 100%;
    height: 100%;
    gap: 16px;
    overflow-y: auto;
    box-sizing: border-box;
    display: inline-flex;
    flex-wrap: wrap;
    padding: 0 5% 0;
  }
`;