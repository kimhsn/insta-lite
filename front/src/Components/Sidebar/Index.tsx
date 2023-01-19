import { useState } from "react";

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
} from "react-icons/all";

import logoImg from "../../assets/images/logo.png";
import userImg from "../../assets/images/eu.jpg";

export function SideBar() {
  const [sideBar, setSideBar] = useState(false);

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
                <a href="/" title="Alguma coisa">
                  <AiFillHome />
                </a>
                <a href="/" title="Alguma coisa">
                  <BsImages />
                </a>
                <a href="/" title="Alguma coisa">
                  <AiFillVideoCamera />
                </a>
                <a href="/" title="Alguma coisa">
                  <FaUserAlt />
                </a>
              </ul>
            </nav>
            <div>
              {/* Icones que pode não ser tão principais no app */}
              <ul>
                <a href="/" title="Notificações">
                  <MdSettings />
                </a>
                <a href="/" title="Configurações">
                  <MdSettings />
                </a>
                <a href="/" title="Sair da conta">
                  <RiLogoutCircleRLine />
                </a>
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
                  <a href="/" title="Alguma coisa">
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
