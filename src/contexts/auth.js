import { createContext, useContext, useState } from "react";
import { useStateM } from "../services/useStateM";
import { useHistory } from "react-router-dom";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Notification from "../components/Notification";

import api from "../services/api";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const [user, setUser] = useState({});
  const [enterprises, setEnterprises] = useState([]);
  const [users, setUsers] = useState([]);

  const [notificationType, setNotificationType] = useState("info");
  const [notificationTitle, setNotificationTitle] = useState("info");
  const [
    notificationAskState,
    setNotificationAskState,
    getNotificationAskState,
  ] = useStateM(undefined);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  async function login(username, password) {
    const { data } = await api.post("/mongo-db/login-web", {
      email: username,
      password,
    });

    data.user && setUser(data.user);

    data.user &&
      localStorage.setItem(
        "@prime-control-platform-user",
        JSON.stringify(data.user)
      );
    data.token &&
      localStorage.setItem("@prime-control-platform-token", data.token);

    if (data.token) api.defaults.headers["Authorization"] = data.token;

    history.push("/app");
  }

  function logout() {
    alert("LOGOUT");
  }

  function notify(type, text) {
    setNotificationType(type);
    setNotificationTitle(text);
    setIsNotificationVisible(true);

    type !== "ask" &&
      setTimeout(() => {
        setIsNotificationVisible(false);
      }, 5000);

    return type === "ask"
      ? new Promise((resolve) => {
          setInterval(() => {
            let state = getNotificationAskState();

            if (state !== undefined) {
              resolve(state);
              setNotificationAskState(undefined);
            }
          }, 100);
        })
      : undefined;
  }

  function verifyUser() {
    let lUser = localStorage.getItem("@prime-control-platform-user");
    let lToken = localStorage.getItem("@prime-control-platform-token");

    api
      .post("/mongo-db/validate-token", {
        user: lUser,
        token: lToken,
      })
      .then(() => {
        setUser(JSON.parse(lUser));
        api.defaults.headers["Authorization"] = lToken;
        api.get("/mongo-db/enterprise/find/all").then(({ data }) => {
          setEnterprises(data);
        });
        api.get(`/mongo-db/user/all`).then(({ data }) => {
          setUsers(data);
        });
        return history.replace("/app");
      })
      .catch((err) => {
        localStorage.removeItem("@prime-control-platform-user");
        localStorage.removeItem("@prime-control-platform-token");
        history.replace("/");
        return notify(
          "error",
          err.response.status === 400 ? "Invalid Token!" : err.message
        );
      });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        notify,
        verifyUser,
        users,
        setUsers,
        enterprises,
        setEnterprises,
      }}
    >
      {children}
      <Notification
        notificationType={notificationType}
        setNotificationType={setNotificationType}
        notificationTitle={notificationTitle}
        setNotificationTitle={setNotificationTitle}
        notificationAskState={notificationAskState}
        setNotificationAskState={setNotificationAskState}
        isNotificationVisible={isNotificationVisible}
        setIsNotificationVisible={setIsNotificationVisible}
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
