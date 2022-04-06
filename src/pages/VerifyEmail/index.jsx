import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import Loader from "react-loader-spinner";

import api from "../../services/api";

import { Container } from "./styles";

const VerifyEmail = () => {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { token, id } = useParams();
  const { notify } = useAuth();

  function sendPasswordToSet() {
    if (password !== cpassword)
      return notify("error", "Passwords don't match!");
    setIsLoading(true);
    api
      .post(`/mongo-db/verify-email/${token}/${id}`, {
        password,
      })
      .then(() => {
        setIsLoading(false);
        setIsSent(true);
      })
      .catch((err) => {
        if (err.response.status === 400) notify("error", "Invalid token!");
      });
  }

  return (
    <Container>
      {!isSent ? (
        <>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
          <label htmlFor="cpassword">Confirm password</label>
          <input
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
            type="password"
            name="cpassword"
            id="cpassword"
          />
          {isLoading ? (
            <Loader
              type="MutatingDots"
              color="#008000"
              width={100}
              height={100}
              id="loader"
            />
          ) : (
            <button onClick={sendPasswordToSet}>Set password</button>
          )}
        </>
      ) : (
        <h1>
          Password was set! Now you can access{" "}
          <b style={{ color: "rgb(0,128,0)" }}>Real-Time App</b> with your new
          account.
        </h1>
      )}
    </Container>
  );
};

export default VerifyEmail;
