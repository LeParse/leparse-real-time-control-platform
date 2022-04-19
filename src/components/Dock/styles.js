import styled from "styled-components";

export const Container = styled.div`
  width: 8vh;
  height: 15vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;

  position: fixed;
  bottom: 50%;
  left: 0;
  transform: translate(-90%, 50%);

  box-shadow: 0 0 25px -15px black;
  border: 1px solid rgba(0, 0, 0, 0.25);

  transition: 0.1s ease;

  &:hover {
    transform: translate(0, 50%);
  }

  .links {
    margin: 1.25rem;
    transition: 0.1s ease;

    &:hover {
      filter: brightness(0.5);
      transform: scale(1.5);
    }
  }
`;
