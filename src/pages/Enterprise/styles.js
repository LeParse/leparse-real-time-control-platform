import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  padding-top: 8vh;

  svg#back {
    position: absolute;
    top: 11vh;
    left: 2vw;
    cursor: pointer;
    transition: 0.1s ease;

    &:hover {
      fill: rgb(0, 128, 0);
    }
  }

  .content {
    margin-top: 8vh;
    width: 100%;
    height: calc(100% - 8vh);
    padding: 3rem;

    h1 {
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }

    h3 {
      color: rgba(0, 0, 0, 0.5);
    }

    .infos {
      width: 100%;
      height: 90%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 50%;
        padding: 2rem;

        b {
          font-size: 2rem;
        }

        p {
          font-size: 1.5rem;
          margin: 1rem;
        }
      }
    }
  }
`;
