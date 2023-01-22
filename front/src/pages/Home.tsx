import React, { useContext, useEffect, useState } from "react";
import CardInsta from "../components/Cards/CardInsta";
import { GlobalStyle } from "../Styles/global";
import { SideBar } from "../components/Sidebar/Index";
import  {LoginContext}  from "../context/AuthContext";
import axios from 'axios';
import "../Styles/Card.css";

const Home = () => {
  
  const admin = "admin";
  const date = new Date();
  const [api,setApi] = useState("http://localhost:8080");
  const { user, setUser } = useContext(LoginContext);
  const [images,setImages] = useState<any[]>([])
  const token = user?.jwt;



  const getImages = () => {
    console.log(user);

    axios.get(`${api}/insta/photos`,{headers: {"Authorization" : `Bearer ${token}`} }).then(
      response => {
          if( response.status === 200) {
             setImages(response.data);
             console.log(response.data);
          }
      }
    )
}

  useEffect( () => {
    getImages();
 },[]);

  return (
    <React.Fragment>
      <SideBar />
      <GlobalStyle />

      <div className="cards-container">
        {images.map((card) => (
          <CardInsta
            id={card.id}
            nom={card.nom}
            description={card.description}
            imgUrl={card.urlPhoto}
            priver={card.priver}
            user={card.user}
            currentUser = {user}
            api = {api}
            getImages = {getImages}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Home;
