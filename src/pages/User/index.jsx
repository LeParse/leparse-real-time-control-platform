import { useState } from "react";
import { Container } from "./styles";
import { useHistory, useParams } from "react-router";
import { useAuth } from "../../contexts/auth";

import { AiOutlineArrowLeft } from "react-icons/ai";

const User = () => {
  const history = useHistory();
  const { users } = useAuth();
  const { id } = useParams();

  const [user] = useState(users.filter((e) => e._id === id)[0]);

  console.log(user);

  return (
    <Container>
      <AiOutlineArrowLeft
        onClick={() => {
          history.goBack();
        }}
        id="back"
        size={24}
      />
      <div className="content">
        <h1>
          {user?.name}
          {user?.isAdmin && (
            <b
              style={{
                opacity: 0.35,
                fontSize: "0.9rem",
                marginLeft: "0.75rem",
              }}
            >
              Admin
            </b>
          )}
        </h1>
        <h3>{user?._id}</h3>
        <div className="infos">
          <div>
            <b>E-mail</b>
            <p>{user?.email}</p>
          </div>
          <div>
            <b>Groups</b>
            {user?.groups.map((e) => {
              return <p>{e}</p>;
            })}
          </div>
          <div>
            <b>Phone</b>
            <p>{user?.phone}</p>
          </div>
          <div>
            <b>Enterprise ID</b>
            <p>{user?.cod_enterprise}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default User;
