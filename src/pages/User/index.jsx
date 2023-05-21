import { useState, useEffect } from "react";
import { Container, CreateEnterpriseModal } from "./styles";
import { useHistory, useParams } from "react-router";
import { useAuth } from "../../contexts/auth";
import { useTransition, animated } from "react-spring";

import InputMask from "react-input-mask";
import ToggleButton from "react-toggle-button";
import Loader from "react-loader-spinner";
import {
  AiFillCloseCircle,
  AiOutlineSearch,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import api from "../../services/api";

const User = () => {
  const history = useHistory();
  const { users, notify, setUsers, enterprises } = useAuth();
  const { id } = useParams();

  const [user] = useState(users.filter((e) => e._id === id)[0]);

  const [nameUser, setNameUser] = useState(user?.name);
  const [emailUser, setEmailUser] = useState(user?.email);
  const [phoneUser, setPhoneUser] = useState(user?.phone);
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin);
  const [selectedEnterpriseIdUser, setSelectedEnterpriseIdUser] = useState(
    enterprises.filter((e) => e._id === user?.cod_enterprise)[0]?._id
  );
  const [selectedUnities, setSelectedUnities] = useState([]);

  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [searchEnterpriseModalInputValue, setSearchEnterpriseModalInputValue] =
    useState("");
  const [
    searchEnterpriseUnitiesModalInputValue,
    setSearchEnterpriseUnitiesModalInputValue,
  ] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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

  function edit(e) {
    e.preventDefault();
    setIsLoading(true);
    let usr = {
      _id: id,
      name: nameUser,
      email: emailUser,
      phone: phoneUser,
      cod_enterprise: selectedEnterpriseIdUser,
      cod_unity: selectedUnities,
      groups: ["Admin", "Gerente"],
      isAdmin,
    };

    if (
      nameUser !== "" &&
      emailUser !== "" &&
      phoneUser !== "" &&
      selectedEnterpriseIdUser !== "" &&
      selectedUnities.length > 0
    ) {
      api
        .post("/mongo-db/user/update", usr)
        .then(() => {
          setIsUserModalVisible(false);
          setIsLoading(false);
          let current_usr = users.map((u, i) => {
            return u._id === id && i;
          });
          current_usr = current_usr.filter((u) => {
            return u !== false;
          })[0];
          let usrs = users;
          usrs[current_usr] = usr;
          setUsers(usrs);
          notify("info", "User updated!");
        })
        .catch((err) => {
          notify("error", "Error updating user!");
        });
    } else {
      notify("warning", "Fill all fields!");
      setIsLoading(false);
    }
  }

  function selectUnity(i) {
    if (selectedUnities.indexOf(i) > -1) {
      setSelectedUnities(
        selectedUnities.slice(0, i).concat(selectedUnities.slice(i + 1))
      );
    } else {
      setSelectedUnities([...selectedUnities, i]);
    }
  }

  useEffect(() => {
    setSelectedUnities(user?.cod_unity);
  }, []);

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
          setIsUserModalVisible(true);
        }}
      >
        Edit
      </button>
      <div className="content">
        <h1>
          {nameUser}
          {isAdmin && (
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
            <p>{emailUser}</p>
          </div>
          <div>
            <b>Groups</b>
            {user?.groups.map((e) => {
              return <p>{e}</p>;
            })}
          </div>
          <div>
            <b>Phone</b>
            <p>{phoneUser}</p>
          </div>
          <div>
            <b>Enterprise ID</b>
            <p>{selectedEnterpriseIdUser}</p>
          </div>
        </div>
      </div>
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
                <h1 className="title">Edit user</h1>
                <AiFillCloseCircle
                  id="closeModal"
                  color="rgb(0,100,0)"
                  size={32}
                  onClick={() => {
                    setIsUserModalVisible(false);
                    setIsLoading(false);
                  }}
                />
                <form onSubmit={edit}>
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3>Unities</h3>
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
                        value={searchEnterpriseUnitiesModalInputValue}
                        onChange={(e) => {
                          setSearchEnterpriseUnitiesModalInputValue(
                            e.target.value
                          );
                        }}
                        className="searchInput"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="enterprisesContainer">
                    {enterprises
                      ?.find((e) => e._id === selectedEnterpriseIdUser)
                      ?.unities?.filter((v) => {
                        if (searchEnterpriseUnitiesModalInputValue === "") {
                          return v;
                        } else if (
                          v.name
                            .toLowerCase()
                            .includes(
                              searchEnterpriseUnitiesModalInputValue.toLowerCase()
                            )
                        ) {
                          return v;
                        }

                        return undefined;
                      })
                      .map((e, i) => {
                        return (
                          <div
                            onClick={() => selectUnity(i)}
                            key={i}
                            className={`enterpriseSelect ${
                              selectedUnities.indexOf(i) > -1 &&
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

export default User;
