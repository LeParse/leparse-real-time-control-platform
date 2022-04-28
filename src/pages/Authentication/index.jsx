import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/auth";

import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import Loader from "react-loader-spinner";

import { Container } from "./styles";

const Authentication = (props) => {
  const { verifyUser, login, notify } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailTextRef = useRef();
  const passwordTextRef = useRef();

  function onFocusInput(textRef, iconIndex) {
    textRef.current.classList.add("inputTextToggled");
    iconIndex === 0
      ? document.querySelector("#emailIcon").classList.add("inputIconToggled")
      : document
          .querySelector("#passwordIcon")
          .classList.add("inputIconToggled");
  }

  function onBlurInput(textRef, iconIndex) {
    textRef.current.classList.remove("inputTextToggled");
    iconIndex === 0
      ? document
          .querySelector("#emailIcon")
          .classList.remove("inputIconToggled")
      : document
          .querySelector("#passwordIcon")
          .classList.remove("inputIconToggled");
  }

  async function submitForm(e) {
    e.preventDefault();
    setIsLoading(true);
    login(email, password)
      .then(() => {
        notify("info", "Logged!");
      })
      .catch((err) => {
        notify("error", "Error on Login!");
      });
    setIsLoading(false);
  }

  useEffect(() => {
    verifyUser();
    let isRedirected = !!new URLSearchParams(props.location.search).get(
      "noToken"
    );
    isRedirected && notify("error", "Username/Password invalid!");
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <form onSubmit={submitForm}>
        <h1>Monitor Real-Time Manager</h1>
        <div className="inputContainer">
          <AiOutlineUser id="emailIcon" color="rgb(0,0,0,0.35)" size={24} />
          <label ref={emailTextRef} htmlFor="email">
            E-mail
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => {
              onFocusInput(emailTextRef, 0);
            }}
            onBlur={() => {
              if (email === "") onBlurInput(emailTextRef, 0);
            }}
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="inputContainer">
          <AiOutlineLock id="passwordIcon" color="rgb(0,0,0,0.35)" size={24} />
          <label ref={passwordTextRef} htmlFor="password">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => {
              onFocusInput(passwordTextRef, 1);
            }}
            onBlur={() => {
              if (password === "") onBlurInput(passwordTextRef, 1);
            }}
            type="password"
            name="password"
            id="password"
          />
        </div>
        {isLoading ? (
          <Loader
            type="MutatingDots"
            color="#008000"
            width={100}
            height={100}
          />
        ) : (
          <button type="submit">Login</button>
        )}
      </form>
    </Container>
  );
};

export default Authentication;
