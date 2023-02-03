import { useState } from "react";
import { useContext } from "react";
import { Container, Content, ClosedSideBar, OpenSideBar } from "./styles";
import {
  BsArrowRight,
  BsArrowLeft,
  AiFillHome,
  FaUserAlt,
  RiLogoutCircleRLine,
  BiLogOutCircle,
  RiUserSettingsFill,
} from "react-icons/all";
import { useNavigate, Link } from "react-router-dom";
import scLogo from "../../assets/scLogo.jpg";
import logoImg from "../../assets/images/logo.png";
import { LoginContext } from "../../context/AuthContext";

export function SideBar() {
  const [sideBar, setSideBar] = useState(false);
  const navigate = useNavigate();

  const { user, setUser } = useContext(LoginContext);
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

              <ul>
                <div
                  style={{
                    marginBottom: "38px",
                    marginTop: "20px",
                    cursor: "pointer",
                  }}
                  title="home"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  <AiFillHome size={"20px"} />
                </div>

                <div
                  style={{ marginBottom: "38px", cursor: "pointer" }}
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
              <ul>
                <div
                  style={{ marginBottom: "18px", cursor: "pointer" }}
                  title="users"
                  onClick={() => {
                    navigate("/users");
                  }}
                >
                  <RiUserSettingsFill size={"20px"} />
                </div>
                <br />
                <div
                  style={{ marginBottom: "18px", cursor: "pointer" }}
                  title="configurations"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <BiLogOutCircle size={"20px"} />
                </div>
              </ul>

              <span>
                <img src={scLogo} alt="profileImg" />
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
                  <Link to="/home">
                    <AiFillHome />
                    <p>Accueil</p>
                  </Link>
                  <Link to="/profile">
                    <FaUserAlt />
                    <p>Profil</p>
                  </Link>
                </ul>
              </nav>
              <div>
                <ul>
                  <Link to="/users">
                    <RiUserSettingsFill />
                    <p>Administration</p>
                  </Link>
                  <Link to="/">
                    <RiLogoutCircleRLine />
                    <p>Déconnexion</p>
                  </Link>
                </ul>

                <span>
                  <img src={scLogo} alt="Eu" />
                  <p>
                    {user?.prenom} {user?.nom}{" "}
                  </p>
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
