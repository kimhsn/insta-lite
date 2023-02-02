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
    //getImages();
    setImages(
        [
            {
                "id": 9,
                "user": "user1 user1",
                "nom": "Samsung Galaxy A13 ",
                "description": "Téléphone Mobile 4G 64Go Noir, Carte SIM Non Incluse, Smartphone Android, Version FR",
                "priver": true,
                "cacher": true,
                "urlPhoto": "https://farm66.staticflickr.com/65535/52604647633_bd5e6cd47a_z.jpg",
                "creationData": "2023-02-02T21:25:31.000+00:00"
            },
            {
                "id": 10,
                "user": "user1 user1",
                "nom": "SAMSUNG GALAXY M13 5G",
                "description": "Téléphone mobile 4G 64GB, Carte SIM non incluse, Android, Version FR, light bleu",
                "priver": true,
                "cacher": true,
                "urlPhoto": "https://farm66.staticflickr.com/65535/52604647633_bd5e6cd47a_z.jpg",
                "creationData": "2023-02-02T21:25:31.000+00:00"
            },
            {
                "id": 11,
                "user": "user1 user1",
                "nom": "Samsung Galaxy A13 ",
                "description": "Téléphone Mobile 4G 64Go Noir, Carte SIM Non Incluse, Smartphone Android, Version FR",
                "priver": false,
                "cacher": true,
                "urlPhoto": "https://farm66.staticflickr.com/65535/52604647633_bd5e6cd47a_z.jpg",
                "creationData": "2023-02-02T21:25:31.000+00:00"
            },
            {
                "id": 12,
                "user": "user1 user1",
                "nom": "Samsung Galaxy A13 ",
                "description": "Téléphone Mobile 4G 64Go Noir, Carte SIM Non Incluse, Smartphone Android, Version FR",
                "priver": false,
                "cacher": true,
                "urlPhoto": "https://farm66.staticflickr.com/65535/52604647633_bd5e6cd47a_z.jpg",
                "creationData": "2023-02-02T21:25:31.000+00:00"
            },
            {
                "id": 13,
                "user": "user2 user2",
                "nom": "Samsung Galaxy A13 ",
                "description": "Téléphone Mobile 4G 64Go Noir, Carte SIM Non Incluse, Smartphone Android, Version FR",
                "priver": false,
                "cacher": false,
                "urlPhoto": "https://farm66.staticflickr.com/65535/52604647633_bd5e6cd47a_z.jpg",
                "creationData": "2023-02-02T21:25:31.000+00:00"
            },
            {
                "id": 14,
                "user": "user2 user2",
                "nom": "Samsung Galaxy A13 ",
                "description": "Téléphone Mobile 4G 64Go Noir, Carte SIM Non Incluse, Smartphone Android, Version FR",
                "priver": false,
                "cacher": false,
                "urlPhoto": "https://farm66.staticflickr.com/65535/52604647633_bd5e6cd47a_z.jpg",
                "creationData": "2023-02-02T21:25:31.000+00:00"
            },
            {
                "id": 15,
                "user": "user2 user2",
                "nom": "Samsung Galaxy A13 ",
                "description": "Téléphone Mobile 4G 64Go Noir, Carte SIM Non Incluse, Smartphone Android, Version FR",
                "priver": false,
                "cacher": false,
                "urlPhoto": "https://farm66.staticflickr.com/65535/52604647633_bd5e6cd47a_z.jpg",
                "creationData": "2023-02-02T21:25:31.000+00:00"
            },
            {
                "id": 16,
                "user": "user2 user2",
                "nom": "Samsung Galaxy A13 ",
                "description": "Téléphone Mobile 4G 64Go Noir, Carte SIM Non Incluse, Smartphone Android, Version FR",
                "priver": false,
                "cacher": false,
                "urlPhoto": "https://farm66.staticflickr.com/65535/52604647633_bd5e6cd47a_z.jpg",
                "creationData": "2023-02-02T21:25:31.000+00:00"
            },
            {
                "id": 17,
                "user": "user user",
                "nom": "Samsung Galaxy A13 ",
                "description": "Téléphone Mobile 4G 64Go Noir, Carte SIM Non Incluse, Smartphone Android, Version FR",
                "priver": false,
                "cacher": false,
                "urlPhoto": "https://farm66.staticflickr.com/65535/52604647633_bd5e6cd47a_z.jpg",
                "creationData": "2023-02-02T21:25:31.000+00:00"
            },
            {
                "id": 18,
                "user": "user user",
                "nom": "Samsung Galaxy A13 ",
                "description": "Téléphone Mobile 4G 64Go Noir, Carte SIM Non Incluse, Smartphone Android, Version FR",
                "priver": false,
                "cacher": false,
                "urlPhoto": "https://farm66.staticflickr.com/65535/52604647633_bd5e6cd47a_z.jpg",
                "creationData": "2023-02-02T21:25:31.000+00:00"
            },
            {
                "id": 19,
                "user": "user user",
                "nom": "Samsung Galaxy A13 ",
                "description": "Téléphone Mobile 4G 64Go Noir, Carte SIM Non Incluse, Smartphone Android, Version FR",
                "priver": false,
                "cacher": false,
                "urlPhoto": "https://farm66.staticflickr.com/65535/52604647633_bd5e6cd47a_z.jpg",
                "creationData": "2023-02-02T21:25:31.000+00:00"
            },
            {
                "id": 20,
                "user": "user user",
                "nom": "Samsung Galaxy A13 ",
                "description": "Téléphone Mobile 4G 64Go Noir, Carte SIM Non Incluse, Smartphone Android, Version FR",
                "priver": false,
                "cacher": false,
                "urlPhoto": "https://farm66.staticflickr.com/65535/52604647633_bd5e6cd47a_z.jpg",
                "creationData": "2023-02-02T21:25:31.000+00:00"
            }
        ]
    )
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
