import { useState } from "react";
import { Container, CreateEnterpriseModal } from "./styles";
import { useHistory } from "react-router";

import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import Loader from "react-loader-spinner";
import { useTransition, animated } from "react-spring";
import { useAuth } from "../../contexts/auth";
import InputMask from "react-input-mask";
import ToggleButton from "react-toggle-button";

import api from "../../services/api";

const Settings = () => {
  const { notify, users, setUsers, enterprises, setEnterprises } = useAuth();
  const history = useHistory();

  const [searchUserInputValue, setSearchUserInputValue] = useState("");
  const [searchEnterpriseInputValue, setSearchEnterpriseInputValue] =
    useState("");

  const [name, setName] = useState("");
  const [partner, setPartner] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [unities, setUnities] = useState([""]);

  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [phoneUser, setPhoneUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedEnterpriseIdUser, setSelectedEnterpriseIdUser] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [isEnterpriseModalVisible, setIsEnterpriseModalVisible] =
    useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  const [searchEnterpriseModalInputValue, setSearchEnterpriseModalInputValue] =
    useState("");

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

  const transitionBackgroundUser = useTransition(isUserModalVisible, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });
  const transitionUser = useTransition(isUserModalVisible, {
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

  function createEnterprise(e) {
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
        .post("/mongo-db/enterprise/create", ent)
        .then(({ data }) => {
          setIsEnterpriseModalVisible(false);
          setIsLoading(false);
          setName("");
          setPartner("");
          setEmail("");
          setPhone("");
          setCnpj("");
          setStreet("");
          setNumber("");
          setComplement("");
          setZipCode("");
          setUnities([""]);
          setEnterprises((ents) => [...ents, data]);
          notify("info", "Enterprise created!");
        })
        .catch((err) => {
          notify("error", "Error creating enterprise!");
        });
    } else {
      notify("warning", "Fill all fields!");
      setIsLoading(false);
    }
  }

  function createUser(e) {
    e.preventDefault();
    setIsLoading(true);
    if (
      nameUser !== "" &&
      emailUser !== "" &&
      phoneUser !== "" &&
      selectedEnterpriseIdUser !== ""
    ) {
      api
        .post("/mongo-db/user/create", {
          name: nameUser,
          email: emailUser,
          phone: phoneUser,
          cod_enterprise: selectedEnterpriseIdUser,
          cod_unity: [],
          groups: ["Admin", "Gerente"],
          isAdmin,
        })
        .then(() => {
          setIsUserModalVisible(false);
          setIsLoading(false);
          setNameUser("");
          setEmailUser("");
          setPhoneUser("");
          setSelectedEnterpriseIdUser("");
          notify("info", "E-mail with confirmation sent!");
        })
        .catch((err) => {
          notify("error", "Error creating user!");
        });
    } else {
      notify("warning", "Fill all fields!");
      setIsLoading(false);
    }
  }

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

  function removeEnterprise(index) {
    notify("ask", "Are you sure about it?").then((ans) => {
      if (ans) {
        api
          .post("/mongo-db/enterprise/destroy", {
            id: enterprises[index]._id,
          })
          .then(() => {
            let arr = enterprises.filter((_, i) => i !== index);
            setEnterprises(arr);
            notify("info", "Enterprise removed!");
            history.goBack();
          })
          .catch((err) => {
            notify("error", "Error removing enterprise!");
          });
      }
    });
  }

  function removeUser(index) {
    notify("ask", "Are you sure about it?").then((ans) => {
      if (ans) {
        api
          .post("/mongo-db/user/destroy", {
            id: users[index]._id,
          })
          .then(() => {
            let arr = users.filter((_, i) => i !== index);
            setUsers(arr);
            notify("info", "User removed!");
            history.goBack();
          })
          .catch((err) => {
            notify("error", "Error removing user!");
          });
      }
    });
  }

  function showEnterpriseInfo(i) {
    console.log(enterprises[i]._id);
    history.push(`/app/enterprise/${enterprises[i]._id}`);
  }

  function showUserInfo(i) {
    history.push(`/app/user/${users[i]._id}`);
  }

  return (
    <Container>
      <div className="content">
        <h1 className="title">Settings</h1>
        <div className="block">
          <h1>Enterprises</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              value={searchEnterpriseInputValue}
              onChange={(e) => {
                setSearchEnterpriseInputValue(e.target.value);
              }}
              className="searchInput"
              type="text"
            />
            <AiOutlineSearch size={18} />
          </div>
          <div className="list">
            {enterprises
              .filter((v) => {
                if (searchEnterpriseInputValue === "") {
                  return v;
                } else if (
                  v.name
                    .toLowerCase()
                    .includes(searchEnterpriseInputValue.toLowerCase())
                ) {
                  return v;
                }

                return undefined;
              })
              .map((e, i) => {
                return (
                  <div
                    onClick={() => {
                      let index = enterprises.indexOf(e);
                      showEnterpriseInfo(index);
                    }}
                    key={i}
                    className="listItem"
                  >
                    <h3>{e.name}</h3>
                    <AiFillCloseCircle
                      onClick={() => removeEnterprise(i)}
                      size={18}
                      color="rgb(0,100,0)"
                    />
                  </div>
                );
              })}
          </div>
          <button
            onClick={() => {
              setIsEnterpriseModalVisible(true);
            }}
            className="button"
          >
            Create enterprise
          </button>
        </div>
        <div className="block">
          <h1>Users</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              value={searchUserInputValue}
              onChange={(e) => {
                setSearchUserInputValue(e.target.value);
              }}
              className="searchInput"
              type="text"
            />
            <AiOutlineSearch size={18} />
          </div>
          <div className="list">
            {users
              .filter((v) => {
                if (searchUserInputValue === "") {
                  return v;
                } else if (
                  v.name
                    .toLowerCase()
                    .includes(searchUserInputValue.toLowerCase())
                ) {
                  return v;
                }

                return undefined;
              })
              .map((e, i) => {
                return (
                  <div
                    key={i}
                    className="listItem"
                    onClick={() => {
                      let index = users.indexOf(e);
                      showUserInfo(index);
                    }}
                  >
                    <h3>{e.name}</h3>
                    <AiFillCloseCircle
                      onClick={() => removeUser(i)}
                      size={18}
                      color="rgb(0,100,0)"
                    />
                  </div>
                );
              })}
          </div>
          <button
            onClick={() => {
              setIsUserModalVisible(true);
            }}
            className="button"
          >
            Create user
          </button>
        </div>
        <div className="block" style={{ borderRight: 0 }}>
          <h1>Contact us</h1>
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
                <h1 className="title">Create enterprise</h1>
                <AiFillCloseCircle
                  id="closeModal"
                  color="rgb(0,100,0)"
                  size={32}
                  onClick={() => {
                    setIsEnterpriseModalVisible(false);
                    setIsLoading(false);
                    setName("");
                    setPartner("");
                    setEmail("");
                    setPhone("");
                    setCnpj("");
                    setStreet("");
                    setNumber("");
                    setComplement("");
                    setZipCode("");
                    setUnities([""]);
                  }}
                />
                <form onSubmit={createEnterprise}>
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
                    <button type="submit">Create</button>
                  )}
                </form>
              </div>
            </CreateEnterpriseModal>
          )
        );
      })}

      {transitionBackgroundUser((style, bg) => {
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
      {transitionUser((stylesModal, modal) => {
        return (
          modal && (
            <CreateEnterpriseModal style={stylesModal}>
              <div className="enterpriseModal" style={{ height: "60%" }}>
                <h1 className="title">Create user</h1>
                <AiFillCloseCircle
                  id="closeModal"
                  color="rgb(0,100,0)"
                  size={32}
                  onClick={() => {
                    setIsUserModalVisible(false);
                    setIsLoading(false);
                    setNameUser("");
                    setEmailUser("");
                    setPhoneUser("");
                    setSelectedEnterpriseIdUser("");
                  }}
                />
                <form onSubmit={createUser}>
                  <div className="inputBlockContainer">
                    <div className="inputBlock">
                      <label htmlFor="name">Name</label>
                      <input
                        value={nameUser}
                        onChange={(e) => setNameUser(e.target.value)}
                        type="text"
                        name="name"
                        id="name"
                      />
                    </div>
                    <div className="inputBlock">
                      <label htmlFor="email">E-mail</label>
                      <input
                        value={emailUser}
                        onChange={(e) => setEmailUser(e.target.value)}
                        type="email"
                        name="email"
                        id="email"
                      />
                    </div>
                    <div
                      className="inputBlock"
                      style={{
                        width: "25%",
                      }}
                    >
                      <label htmlFor="phone">Phone</label>
                      <InputMask
                        value={phoneUser}
                        onChange={(e) => setPhoneUser(e.target.value)}
                        type="text"
                        name="phone"
                        id="phone"
                        mask="(99) 9 9999-9999"
                      />
                    </div>
                    <div className="inputBlock">
                      <label htmlFor="phone">Is Admin</label>
                      <ToggleButton
                        inactiveLabel={""}
                        activeLabel={""}
                        colors={{
                          activeThumb: {
                            base: "rgb(250,250,250)",
                          },
                          inactiveThumb: {
                            base: "rgb(250,250,250)",
                          },
                          active: {
                            base: "rgb(0, 128, 0)",
                            hover: "rgb(0, 100, 0);",
                          },
                          inactive: {
                            base: "rgb(65,66,68)",
                            hover: "rgb(95,96,98)",
                          },
                        }}
                        value={isAdmin}
                        onToggle={(v) => {
                          setIsAdmin(!v);
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3>Enterprise</h3>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AiOutlineSearch size={18} />
                      <input
                        value={searchEnterpriseModalInputValue}
                        onChange={(e) => {
                          setSearchEnterpriseModalInputValue(e.target.value);
                        }}
                        className="searchInput"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="enterprisesContainer">
                    {enterprises
                      .filter((v) => {
                        if (searchEnterpriseModalInputValue === "") {
                          return v;
                        } else if (
                          v.name
                            .toLowerCase()
                            .includes(
                              searchEnterpriseModalInputValue.toLowerCase()
                            )
                        ) {
                          return v;
                        }

                        return undefined;
                      })
                      .map((e, i) => {
                        return (
                          <div
                            onClick={() => setSelectedEnterpriseIdUser(e._id)}
                            key={i}
                            className={`enterpriseSelect ${
                              selectedEnterpriseIdUser === e._id &&
                              " enterpriseSelected"
                            }`}
                          >
                            {e.name ? e.name : "Prime Automacao"}
                          </div>
                        );
                      })}
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
                    <button type="submit">Create</button>
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

export default Settings;
