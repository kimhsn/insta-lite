import React from "react";
import CardInsta from "../components/Cards/CardInsta";
import { GlobalStyle } from "../Styles/global";
import { SideBar } from "../components/Sidebar/Index";
import "../Styles/Card.css";

const Home = () => {
  const admin = "admin";
  const date = new Date();

  const cardsData = [
    {
      id: 1,
      nom: "CARD 1",
      content: "Clark Kent",
      imgUrl: "https://unsplash.it/200/200",
      admin: admin,
      date: date,
    },
    {
      id: 2,
      nom: "CARD 2",
      content: "Bruce Wayne",
      imgUrl: "https://unsplash.it/201/200",
      admin: admin,
      date: date,
    },
    {
      id: 3,
      nom: "CARD 3",
      content: "Peter Parker",
      imgUrl: "https://unsplash.it/200/201",
      admin: admin,
      date: date,
    },
    {
      id: 4,
      nom: "CARD 4",
      content: "Tony Stark",
      imgUrl: "https://unsplash.it/201/201",
      admin: admin,
      date: date,
    },
    {
      id: 5,
      nom: "CARD 5",
      description: "Reed Richards",
      imgUrl: "https://unsplash.it/202/200",
      admin: admin,
      date: date,
    },
    {
      id: 6,
      nom: "CARD 6",
      description: "Wade Wilson",
      imgUrl: "https://unsplash.it/200/199",
      admin: admin,
      date: date,
    },
    {
      id: 7,
      nom: "CARD 7",
      description: "Peter Quill",
      imgUrl: "https://unsplash.it/199/199",
      admin: admin,
      date: date,
    },
    {
      id: 8,
      nom: "CARD 8",
      description: "Steven Rogers",
      imgUrl: "https://unsplash.it/199/200",
      admin: admin,
      date: date,
    },
    {
      id: 9,
      nom: "CARD 9",
      description: "Bruce Banner",
      imgUrl: "https://unsplash.it/200/198",
      admin: admin,
      date: date,
    },
    {
      id: 10,
      nom: "CARD 10",
      description: "Vincent Strange",
      imgUrl: "https://unsplash.it/198/199",
      admin: admin,
      date: date,
    },
  ];

  return (
    <React.Fragment>
      <SideBar />
      <GlobalStyle />

      <div className="cards-container">
        {cardsData.map((card) => (
          <CardInsta
            id={card.id}
            nom={card.nom}
            description={card.description}
            imgUrl={card.imgUrl}
            admin={card.admin}
            date={card.date}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Home;
