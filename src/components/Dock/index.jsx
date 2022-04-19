import { Container } from "./styles";
import { Link } from "react-router-dom";

import { AiFillHome, AiFillSetting, AiOutlineLogout } from "react-icons/ai";

import { useAuth } from "../../contexts/auth";

const Dock = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Link className="links" to="/app">
        <AiFillHome size={24} color="rgb(0,128,0)" />
      </Link>
      <Link className="links" to="/app/settings">
        <AiFillSetting size={24} color="rgb(0,128,0)" />
      </Link>
      <Link className="links" to="#" onClick={logout}>
        <AiOutlineLogout size={24} color="rgb(0,128,0)" />
      </Link>
    </Container>
  );
};

export default Dock;
