import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  padding-top: 8vh;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    h1 {
      color: rgba(0, 0, 0, 0.75);
    }
  }
`;
