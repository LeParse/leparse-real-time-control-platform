import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 8vh;
  position: fixed;
  box-shadow: 0 0 15px -7.5px black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;

  img {
    width: 2rem;
  }

  .leftContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    h1 {
      margin-left: 24px;
      font-size: 1.25rem;
      color: rgba(0, 0, 0, 0.75);
    }
  }

  .rightContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    h1 {
      margin-left: 24px;
      font-size: 1.25rem;
    }
  }
`;
