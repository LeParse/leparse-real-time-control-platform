import { Container } from "./styles";
import {
  AiFillInfoCircle,
  AiFillWarning,
  AiFillExclamationCircle,
  AiFillQuestionCircle,
} from "react-icons/ai";
import { useTransition } from "react-spring";

const Notification = (props) => {
  const transition = useTransition(props.isNotificationVisible, {
    from: {
      x: 450,
      opacity: 0,
    },
    enter: {
      x: 0,
      opacity: 1,
    },
    leave: {
      x: 450,
      opacity: 0,
    },
  });

  function closeNotification() {
    props.setIsNotificationVisible(false);
  }

  function click() {
    props.notificationType !== "ask" && closeNotification();
  }

  return transition((styles, isVisible) => {
    return (
      isVisible && (
        <Container onClick={click} style={styles} type={props.notificationType}>
          <div className="content">
            {(() => {
              switch (props.notificationType) {
                case "info":
                  return <AiFillInfoCircle size={36} color="white" />;
                case "warning":
                  return <AiFillExclamationCircle size={36} color="white" />;
                case "ask":
                  return <AiFillQuestionCircle size={36} color="white" />;
                case "error":
                  return <AiFillWarning size={36} color="white" />;
                default:
                  return <AiFillInfoCircle size={36} color="white" />;
              }
            })()}
            <p className="title">{props.notificationTitle}</p>
          </div>
          {props.notificationType === "ask" && (
            <div className="buttonsAskContainer">
              <button
                onClick={() => {
                  props.setNotificationAskState(true);
                  closeNotification();
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  props.setNotificationAskState(false);
                  closeNotification();
                }}
              >
                No
              </button>
            </div>
          )}
        </Container>
      )
    );
  });
};

export default Notification;
