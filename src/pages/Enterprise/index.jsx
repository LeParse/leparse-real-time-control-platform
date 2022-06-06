import { useState } from "react";
import { Container, CreateEnterpriseModal } from "./styles";
import { useHistory, useParams } from "react-router";
import { useAuth } from "../../contexts/auth";

import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiOutlineSearch,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import InputMask from "react-input-mask";
import Loader from "react-loader-spinner";
import { useTransition, animated } from "react-spring";

import api from "../../services/api";

const Enterprise = () => {
  const history = useHistory();
  const { enterprises, notify, setEnterprises } = useAuth();
  const { id } = useParams();

  const [enterprise] = useState(enterprises.filter((e) => e._id === id)[0]);
  const [isEnterpriseModalVisible, setIsEnterpriseModalVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(enterprise?.name);
  const [partner, setPartner] = useState(enterprise?.principal_name);
  const [email, setEmail] = useState(enterprise?.principal_email);
  const [phone, setPhone] = useState(enterprise?.principal_phone);
  const [cnpj, setCnpj] = useState(enterprise?.cnpj);
  const [street, setStreet] = useState(enterprise?.address.street);
  const [number, setNumber] = useState(enterprise?.address.number);
  const [complement, setComplement] = useState(enterprise?.address.complement);
  const [zipCode, setZipCode] = useState(enterprise?.address.zip_code);
  const [unities, setUnities] = useState(enterprise?.unities);

  const transitionBackgroundEnterprise = useTransition(
    isEnterpriseModalVisible,
    {
      from: {
        opacity: 0,
      },
      enter: {
        opacity: 1,
      },
      leave: {
        opacity: 0,
      },
    }
  );
  const transitionEnterprise = useTransition(isEnterpriseModalVisible, {
    from: {
      transform: "scale(0)",
      opacity: 0,
    },
    enter: {
      transform: "scale(1)",
      opacity: 1,
    },
    leave: {
      transform: "scale(0)",
      opacity: 0,
    },
  });

  function addUnity() {
    let uns = unities.concat([""]);
    setUnities(uns);
  }

  function removeUnity(index) {
    let arr = unities.filter((_, i) => i !== index);
    setUnities(arr);
  }

  function handleText(e, i) {
    let uns = [...unities];
    uns[i] = e.target.value;
    setUnities(uns);
  }

  function edit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (
      name !== "" &&
      partner !== "" &&
      email !== "" &&
      phone !== "" &&
      cnpj !== "" &&
      street !== "" &&
      number !== "" &&
      complement !== "" &&
      zipCode !== "" &&
      unities.length > 0
    ) {
      const ent = {
        _id: id,
        name,
        principal_name: partner,
        principal_email: email,
        principal_phone: phone,
        cnpj,
        address: {
          street,
          number,
          complement,
          zip_code: zipCode,
        },
        unities,
      };
      api
        .post("/mongo-db/enterprise/update", ent)
        .then(() => {
          setIsEnterpriseModalVisible(false);
          setIsLoading(false);
          let current_ent = enterprises.map((e, i) => {
            return e._id === ent._id && i;
          });
          current_ent = current_ent.filter((c) => {
            return c !== false;
          })[0];
          let ents = enterprises;
          ents[current_ent] = ent;
          setEnterprises(ents);
          notify("info", "Enterprise updated!");
        })
        .catch((err) => {
          notify("error", "Error creating enterprise!");
        });
    } else {
      notify("warning", "Fill all fields!");
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <AiOutlineArrowLeft
        onClick={() => {
          history.goBack();
        }}
        id="back"
        size={24}
      />
      <button
        className="editButton"
        onClick={() => {
          setIsEnterpriseModalVisible(true);
        }}
      >
        Edit
      </button>
      <div className="content">
        <h1>{name}</h1>
        <h3>{id}</h3>
        <div className="infos">
          <div>
            <b>Partner</b>
            <p>{partner}</p>
          </div>
          <div>
            <b>CNPJ</b>
            <p>{cnpj}</p>
          </div>
          <div>
            <b>Address</b>
            <p>
              {street}, {number}
            </p>
            <p>{zipCode}</p>
            <p>{complement}</p>
          </div>
          <div>
            <b>Phone</b>
            <p>{phone}</p>
          </div>
          <div>
            <b>E-mail</b>
            <p>{email}</p>
          </div>
        </div>
      </div>
      {transitionBackgroundEnterprise((style, bg) => {
        return (
          bg && (
            <animated.div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                position: "fixed",
                left: 0,
                top: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...style,
              }}
            />
          )
        );
      })}
      {transitionEnterprise((stylesModal, modal) => {
        return (
          modal && (
            <CreateEnterpriseModal style={stylesModal}>
              <div className="enterpriseModal">
                <h1 className="title">Edit enterprise</h1>
                <AiFillCloseCircle
                  id="closeModal"
                  color="rgb(0,100,0)"
                  size={32}
                  onClick={() => {
                    setIsEnterpriseModalVisible(false);
                    setIsLoading(false);
                  }}
                />
                <form onSubmit={edit}>
                  <div className="inputBlockContainer">
                    <div className="inputBlock">
                      <label htmlFor="name">Name</label>
                      <input
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        type="text"
                        name="name"
                        id="name"
                      />
                    </div>
                    <div className="inputBlock">
                      <label htmlFor="partner">Partner</label>
                      <input
                        value={partner}
                        onChange={(e) => setPartner(e.target.value)}
                        type="text"
                        name="partner"
                        id="partner"
                      />
                    </div>
                    <div className="inputBlock">
                      <label htmlFor="email">E-mail</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        id="email"
                      />
                    </div>
                  </div>
                  <div className="inputBlockContainer">
                    <div className="inputBlock">
                      <label htmlFor="phone">Phone</label>
                      <InputMask
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        name="phone"
                        id="phone"
                        mask="(99) 9 9999-9999"
                      />
                    </div>
                    <div className="inputBlock">
                      <label htmlFor="cnpj">CNPJ</label>
                      <InputMask
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        type="text"
                        name="cnpj"
                        id="cnpj"
                        mask="99.999.999/9999-99"
                        accept="num"
                      />
                    </div>
                    <div className="inputBlock">
                      <label htmlFor="street">Street</label>
                      <input
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        type="text"
                        name="street"
                        id="street"
                      />
                    </div>
                  </div>
                  <div className="inputBlockContainer">
                    <div className="inputBlock">
                      <label htmlFor="number">Number</label>
                      <input
                        value={number}
                        onChange={(e) =>
                          setNumber(e.target.value.replace(/\D/, ""))
                        }
                        type="text"
                        name="number"
                        id="number"
                      />
                    </div>
                    <div className="inputBlock">
                      <label htmlFor="complement">Complement</label>
                      <input
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        type="text"
                        name="complement"
                        id="complement"
                      />
                    </div>
                    <div className="inputBlock">
                      <label htmlFor="zipCode">Zip code</label>
                      <InputMask
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        type="text"
                        name="zipCode"
                        id="zipCode"
                        mask="99999-999"
                      />
                    </div>
                  </div>
                  <h3>Unities</h3>
                  <div className="addUnitiesContainer">
                    {unities.map((value, i) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            width: "33%",
                          }}
                          key={i}
                        >
                          <input
                            value={value}
                            onChange={(e) => handleText(e, i)}
                            type="text"
                            className="addUnitiesUnity"
                          />
                          <AiFillCloseCircle
                            className="removeUnityButton"
                            color="rgba(0,0,0,0.5)"
                            size={24}
                            onClick={() => removeUnity(i)}
                          />
                        </div>
                      );
                    })}
                    <AiFillPlusCircle
                      className="addUnityButton"
                      size={36}
                      color="rgb(0,100,0)"
                      onClick={addUnity}
                    />
                  </div>
                  {isLoading ? (
                    <Loader
                      type="MutatingDots"
                      color="#008000"
                      width={100}
                      height={100}
                      id="loader"
                    />
                  ) : (
                    <button type="submit">Save</button>
                  )}
                </form>
              </div>
            </CreateEnterpriseModal>
          )
        );
      })}
    </Container>
  );
};

export default Enterprise;
