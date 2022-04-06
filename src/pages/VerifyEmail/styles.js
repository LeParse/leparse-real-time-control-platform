import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  label,
  input {
    font-size: 1.5rem;
  }

  input {
    padding: 1.5rem;
    margin: 2rem;
    border-bottom: 1px solid rgb(0, 128, 0);
    outline: none;
    transition: 0.2s ease;

    &:focus {
      filter: brightness(2);
    }
  }

  button {
    font-size: 1.5rem;
    padding: 1.5rem;
    border-radius: 1rem;
    background-color: rgb(0, 128, 0);
    color: white;
    width: 25rem;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      filter: brightness(0.8);
    }
  }

  h1 {
    padding: 3rem;
  }
`;
