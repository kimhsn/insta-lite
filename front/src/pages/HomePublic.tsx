import React, { useContext, useEffect, useState } from "react";
import CardInsta from "../components/Cards/CardInsta";
import { GlobalStyle } from "../Styles/global";
import { SideBar } from "../components/Sidebar/Index";
import { LoginContext } from "../context/AuthContext";
import axios from "axios";
import "../Styles/Card.css";
import CardInstaPublic from "../components/Cards/CardInstaPublic";
import {
    BiLogIn
  } from "react-icons/all";
import { Navigate, useNavigate, Link } from "react-router-dom";

const HomePublic = () => {
  const admin = "admin";
  const date = new Date();
  const [api, setApi] = useState("http://localhost:8080");
  const { user, setUser } = useContext(LoginContext);
  const [images, setImages] = useState<any[]>([]);
  const token = user?.jwt;
  const navigate = useNavigate();

  const getImages = () => {
    axios
      .get(`${api}/insta/photos`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setImages(response.data);
          console.log(response.data);
        }
      });
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <React.Fragment>
      <BiLogIn  size={32} id="homePublicLoginIcon" onClick={()=> {navigate('/login')}}/>

      <div className="cards-container">
        {images.map((card) => {
            return card.priver || card.cacher ? '' :
            <CardInstaPublic
                id={card.id}
                nom={card.nom}
                description={card.description}
                imgUrl={card.urlPhoto}
                priver={card.priver}
                cacher={card.cacher}
                user={card.user}
                currentUser={user}
                api={api}
                getImages={getImages}
          />
        }
       )}
      </div>
    </React.Fragment>
  );
};

export default HomePublic;
