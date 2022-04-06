import styled from "styled-components";

export const Container = styled.div`
  width: 15vw;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 90%);

  box-shadow: 0 0 25px -15px black;
  border: 1px solid rgba(0, 0, 0, 0.25);

  transition: 0.1s ease;

  &:hover {
    transform: translate(-50%, 0);
  }

  .links {
    margin: 24px;
    transition: 0.1s ease;

    &:hover {
      filter: brightness(0.5);
      transform: scale(1.5);
    }
  }
`;
