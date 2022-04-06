import { useState } from "react";
import { Container } from "./styles";
import { useHistory, useParams } from "react-router";
import { useAuth } from "../../contexts/auth";

import { AiOutlineArrowLeft } from "react-icons/ai";

const Enterprise = () => {
  const history = useHistory();
  const { enterprises } = useAuth();
  const { id } = useParams();

  const [enterprise] = useState(enterprises.filter((e) => e._id === id)[0]);

  return (
    <Container>
      <AiOutlineArrowLeft
        onClick={() => {
          history.goBack();
        }}
        id="back"
        size={36}
      />
      <div className="content">
        <h1>{enterprise?.name}</h1>
        <h3>{enterprise?._id}</h3>
        <div className="infos">
          <div>
            <b>Partner</b>
            <p>{enterprise?.principal_name}</p>
          </div>
          <div>
            <b>CNPJ</b>
            <p>{enterprise?.cnpj}</p>
          </div>
          <div>
            <b>Address</b>
            <p>
              {enterprise?.address.street}, {enterprise?.address.number}
            </p>
            <p>{enterprise?.address.complement}</p>
          </div>
          <div>
            <b>Phone</b>
            <p>{enterprise?.principal_phone}</p>
          </div>
          <div>
            <b>E-mail</b>
            <p>{enterprise?.principal_email}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Enterprise;
