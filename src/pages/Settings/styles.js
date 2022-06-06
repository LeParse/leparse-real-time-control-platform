import { animated } from "react-spring";
import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  padding-top: 8vh;

  .content {
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-evenly;

    h1.title {
      font-size: 1.5rem;
      margin: 1.5rem;
      position: absolute;
      left: 0;
      top: 8vh;
    }

    .block {
      display: flex;
      flex-direction: column;
      height: 90%;
      flex: 1;
      padding: 1.5rem;
      border-right: 1px solid rgb(0, 128, 0, 0.35);

      h1 {
        color: rgba(0, 0, 0, 0.75);
        margin-bottom: 1.5rem;
      }

      .button {
        width: 100%;
        padding: 1.25rem;
        color: white;
        font-weight: bold;
        font-size: 1rem;
        background-color: rgb(0, 128, 0);
        border-radius: 1rem;
        cursor: pointer;
        transition: 0.1s ease;

        &:hover {
          filter: brightness(0.85);
        }
      }

      .list {
        width: 100%;
        border-radius: 1rem;
        flex: 1;
        overflow: hidden auto;
        padding: 1rem;

        .listItem {
          margin-bottom: 0.5rem;
          border-radius: 1rem;
          width: 100%;
          border: 1px solid rgb(0, 128, 0);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem;
          cursor: pointer;

          h3 {
            color: rgba(0, 0, 0, 0.8);
            font-size: 0.85rem;
          }

          svg {
            cursor: pointer;
            transition: 0.1s ease;

            &:hover {
              filter: brightness(0.5);
            }
          }
        }
      }

      .searchInput {
        background-color: transparent;
        font-size: 1rem;
        color: black;
        padding: 1rem;
        outline: none;
        border-bottom: 1px solid rgb(0, 128, 0);
        transition: 0.2s ease;
        margin-left: 1rem;

        &:focus {
          border-bottom: 1px solid rgb(0, 200, 0);
        }
      }
    }
  }
`;

export const CreateEnterpriseModal = styled(animated.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .enterpriseModal {
    position: relative;
    background-color: white;
    width: 75%;
    height: 70%;
    border-radius: 1rem;
    box-shadow: 0 0 25px -15px black;
    border: 1px solid rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    overflow: hidden auto;

    padding-top: 5rem;
    padding-bottom: 0;

    transition: 0.5s ease;

    .title {
      position: absolute;
      top: 1.5rem;
      left: 1.5rem;
    }

    #closeModal {
      position: absolute;
      right: 1.5rem;
      top: 1.5rem;
      cursor: pointer;
      transition: 0.1s ease;

      &:hover {
        filter: brightness(0.5);
      }
    }

    form {
      width: 100%;
      border-radius: 1rem;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      overflow: hidden auto;
      padding-bottom: 1rem;

      padding-left: 1.5rem;
      padding-right: 1.5rem;

      .inputBlockContainer {
        width: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;

        .inputBlock {
          flex: 1;
          height: auto;
          display: flex;
          flex-direction: column;
          margin: 1rem;

          label {
            font-size: 1rem;
            margin: 1rem;
          }

          input {
            background-color: transparent;
            width: 100%/3;
            font-size: 1rem;
            color: black;
            padding: 1rem;
            outline: none;
            border-bottom: 1px solid rgb(0, 128, 0);
            transition: 0.2s ease;

            &:focus {
              border-bottom: 1px solid rgb(0, 200, 0);
            }
          }
        }
      }

      h3 {
        align-self: flex-start;
        font-size: 1.5rem;
        margin: 1rem;
      }

      .addUnitiesContainer {
        width: 100%;
        padding: 1.5rem;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        flex-wrap: wrap;

        .addUnitiesUnity {
          background-color: transparent;
          width: 100%;
          font-size: 1rem;
          color: black;
          padding: 1rem;
          outline: none;
          border-bottom: 1px solid rgb(0, 128, 0);
          transition: 0.2s ease;
          margin: 1rem;

          &:focus {
            border-bottom: 1px solid rgb(0, 200, 0);
          }
        }

        .addUnityButton {
          cursor: pointer;
          transition: 0.1s ease;
          margin: 1rem;

          &:hover {
            filter: brightness(0.5);
          }
        }

        .removeUnityButton {
          cursor: pointer;
          transition: 0.1s ease;
          margin-left: -1.5rem;
          margin-right: 1.5rem;

          &:hover {
            filter: brightness(0.5);
          }
        }
      }

      button {
        width: 100%;
        padding: 1.25rem;
        margin-top: 1.5rem;
        color: white;
        font-weight: bold;
        font-size: 1.25rem;
        background-color: rgb(0, 128, 0);
        border-radius: 1rem;
        cursor: pointer;
        transition: 0.1s ease;

        &:hover {
          filter: brightness(0.85);
        }
      }
    }

    .enterprisesContainer {
      width: 100%;
      padding: 1.5rem;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      flex-wrap: wrap;

      .enterpriseSelect {
        background-color: rgb(167, 0, 0);
        padding: 1.5rem;
        font-size: 1rem;
        color: white;
        border-radius: 1rem;
        cursor: pointer;
        margin: 1rem;
        transition: 0.1s ease;

        &:hover {
          filter: brightness(0.75);
        }
      }

      .enterpriseSelected {
        background-color: rgb(0, 128, 0);
      }
    }

    .searchInput {
      background-color: transparent;
      font-size: 1rem;
      color: black;
      padding: 1rem;
      outline: none;
      border-bottom: 1px solid rgb(0, 128, 0);
      transition: 0.2s ease;
      margin-left: 1rem;

      &:focus {
        border-bottom: 1px solid rgb(0, 200, 0);
      }
    }
  }
`;
