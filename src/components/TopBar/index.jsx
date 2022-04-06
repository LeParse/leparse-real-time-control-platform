import { useEffect } from "react";
import { Container } from "./styles";

import logo from "../../assets/images/logo.png";

import { useAuth } from "../../contexts/auth";

const TopBar = () => {
  const { user, verifyUser } = useAuth();

  useEffect(() => {
    verifyUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <div className="leftContainer">
        <img src={logo} alt="Prime Logo" />
        <h1>Monitor Real-Time Manager</h1>
      </div>
      <div className="rightContainer">
        <h1>{user ? user.name : "Alessandro Oliveira"}</h1>
      </div>
    </Container>
  );
};

export default TopBar;
