import styled from "styled-components";

export const Container = styled.div`
  background-color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;

  h1 {
    font-size: 36px;
    font-weight: bold;
  }

  form {
    border-radius: 16px;
    background-color: white;
    width: 35vw;
    height: 65vh;
    box-shadow: 0 0 15px -15px rgb(0, 128, 0);
    border: 1px solid rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;

    .inputContainer {
      position: relative;

      label {
        font-size: 1.75rem;
        color: rgba(0, 0, 0, 0.25);
        position: absolute;
        top: 24px;
        left: 48px;
        transition: 0.1s ease;
        cursor: text;
      }

      input {
        background-color: transparent;
        font-size: 1.75rem;
        color: black;
        padding: 24px;
        padding-left: 48px;
        outline: none;
        border-bottom: 1px solid rgb(0, 128, 0);
        transition: 0.2s ease;

        &:focus {
          border-bottom: 1px solid rgb(0, 200, 0);
        }
      }

      svg {
        position: absolute;
        top: 30px;
        left: 8px;
        transition: 0.1s ease;
      }
    }

    button[type="submit"] {
      width: 75%;
      height: 105px;
      padding: 24px;
      color: white;
      font-weight: bold;
      font-size: 24px;
      background-color: rgb(0, 128, 0);
      border-radius: 16px;
      cursor: pointer;
      transition: 0.1s ease;

      &:hover {
        filter: brightness(0.85);
      }
    }

    .inputTextToggled {
      transform: translateY(-150%);
      color: rgb(0, 128, 0) !important;
      font-weight: bold;
    }

    .inputIconToggled {
      fill: rgb(0, 128, 0);
    }
  }
`;
