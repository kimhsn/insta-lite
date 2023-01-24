import { useState } from "react";
import { useContext } from "react";
import { Container, Content, ClosedSideBar, OpenSideBar } from "./styles";
import {
  MdSettings,
  BsArrowRight,
  BsArrowLeft,
  AiFillVideoCamera,
  AiFillHome,
  IoMdNotifications,
  FaUserAlt,
  BsImages,
  RiLogoutCircleRLine,
  BiLogOutCircle,
  RiUserSettingsFill,
} from "react-icons/all";
import { Navigate, useNavigate, Link } from "react-router-dom";

import { LoginContext } from "../../context/AuthContext";

import logoImg from "../../assets/images/logo.png";
import userImg from "../../assets/images/eu.jpg";

export function SideBar() {
  const [sideBar, setSideBar] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  function handleChangeSideBar() {
    setSideBar((prevState) => !prevState);
  }
  return (
    <Container>
      <Content>
        {!sideBar ? (
          <ClosedSideBar>
            <nav>
              <button onClick={handleChangeSideBar}>
                <BsArrowRight />
              </button>

              <img src={logoImg} alt="Eu" />

              {/* Links principais do app */}
              <ul>
                <div
                  style={{
                    marginBottom: "38px",
                    marginTop: "20px",
                  }}
                  title="home"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  <AiFillHome size={"20px"} />
                </div>
                <div
                  style={{ marginBottom: "38px" }}
                  title="images"
                  onClick={() => {
                    navigate("/images");
                  }}
                >
                  <BsImages size={"20px"} />
                </div>
                <div
                  style={{ marginBottom: "38px" }}
                  title="videos"
                  onClick={() => {
                    navigate("/videos");
                  }}
                >
                  <AiFillVideoCamera size={"20px"} />
                </div>

                <div
                  style={{ marginBottom: "38px" }}
                  title="profile"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <FaUserAlt size={"20px"} />
                </div>
              </ul>
            </nav>
            <div>
              {/* Icones que pode não ser tão principais no app */}
              <ul>
                <div
                  style={{ marginBottom: "18px" }}
                  title="users"
                  onClick={() => {
                    navigate("/users");
                  }}
                >
                  {" "}
                  <RiUserSettingsFill size={"20px"} />
                </div>
                <br />
                <div
                  style={{ marginBottom: "18px" }}
                  title="configurations"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  {" "}
                  <MdSettings size={"20px"} />
                </div>
                {isLoggedIn ? (
                  <a href="/" title="Deconnexion">
                    <BiLogOutCircle size={"20px"} />
                  </a>
                ) : (
                  <a href="/" title="Connexion">
                    <RiLogoutCircleRLine size={"20px"} />
                  </a>
                )}
              </ul>

              <span>
                <img src={userImg} alt="Eu" />
              </span>
            </div>
          </ClosedSideBar>
        ) : (
          <OpenSideBar>
            <section>
              <nav>
                <span>
                  <button onClick={handleChangeSideBar}>
                    <BsArrowLeft />
                  </button>
                </span>
                <div>
                  <img src={logoImg} alt="Eu" />
                  <h1>Insta Lite</h1>
                </div>

                {/* Icones principais do app */}
                <ul>
                  <a href="/" title="Alguma coisa">
                    <AiFillHome />
                    <p>Accueil</p>
                  </a>
                  <a href="/" title="Alguma coisa">
                    <BsImages />
                    <p>Images</p>
                  </a>
                  <a href="/" title="Alguma coisa">
                    <AiFillVideoCamera />
                    <p>Vidéos</p>
                  </a>
                  <a href="/profile" title="Alguma coisa">
                    <FaUserAlt />
                    <p>Profile</p>
                  </a>
                </ul>
              </nav>
              <div>
                {/* Icones que pode não ser tão principais no app */}
                <ul>
                  <a href="/">
                    <IoMdNotifications />
                    <p>Notifications</p>
                  </a>
                  <a href="/">
                    <MdSettings />
                    <p>Configuration</p>
                  </a>
                  <a href="/">
                    <RiLogoutCircleRLine />
                    <p>Déconnexion</p>
                  </a>
                </ul>

                <span>
                  <img src={userImg} alt="Eu" />
                  <p> Prenom Nom </p>
                </span>
              </div>
            </section>
            <aside onClick={handleChangeSideBar} />
          </OpenSideBar>
        )}
      </Content>
    </Container>
  );
}
