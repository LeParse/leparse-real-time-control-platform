import styled from "styled-components";
import { animated } from "react-spring";

export const Container = styled(animated.div)`
  width: 20%;
  min-height: ${(props) => {
    return props.type === "ask" ? "10rem" : "7.5rem";
  }};
  position: fixed;
  z-index: 999;
  right: 1.5rem;
  top: calc(8vh + 1.5rem);
  background-color: ${(props) => {
    switch (props.type) {
      case "info":
        return "rgb(0, 167, 0)";
      case "warning":
        return "rgb(167,167,0)";
      case "ask":
        return "rgb(0,0,167)";
      case "error":
        return "rgb(167,0,0)";
      default:
        return "rgb(0, 167, 0)";
    }
  }};
  color: white;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 0 30px -15px black;
  cursor: ${(props) => {
    return props.type === "ask" ? "auto" : "pointer";
  }};

  .content {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: ${(props) => {
      return props.type === "ask" ? "flex-start" : "center";
    }};
    .title {
      font-size: 1.25rem;
      font-weight: bold;
      flex: 1;
      text-align: right;
      word-wrap: break-word;
      max-width: calc(100% - 36px - 1.75rem);
    }
  }

  .buttonsAskContainer {
    width: 100%;
    flex: 1;
    display: flex;
    margin-top: 1rem;

    button {
      flex: 1;
      background-color: rgba(0, 0, 167, 1);
      color: white;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: 0.1s ease;

      &:hover {
        filter: brightness(0.85);
      }
    }
  }
`;
