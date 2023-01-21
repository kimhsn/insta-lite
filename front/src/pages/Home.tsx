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
      title: "CARD 1",
      content: "Clark Kent",
      imgUrl: "https://unsplash.it/200/200",
      admin: admin,
      date: date,
    },
    {
      id: 2,
      title: "CARD 2",
      content: "Bruce Wayne",
      imgUrl: "https://unsplash.it/201/200",
      admin: admin,
      date: date,
    },
    {
      id: 3,
      title: "CARD 3",
      content: "Peter Parker",
      imgUrl: "https://unsplash.it/200/201",
      admin: admin,
      date: date,
    },
    {
      id: 4,
      title: "CARD 4",
      content: "Tony Stark",
      imgUrl: "https://unsplash.it/201/201",
      admin: admin,
      date: date,
    },
    {
      id: 5,
      title: "CARD 5",
      content: "Reed Richards",
      imgUrl: "https://unsplash.it/202/200",
      admin: admin,
      date: date,
    },
    {
      id: 6,
      title: "CARD 6",
      content: "Wade Wilson",
      imgUrl: "https://unsplash.it/200/199",
      admin: admin,
      date: date,
    },
    {
      id: 7,
      title: "CARD 7",
      content: "Peter Quill",
      imgUrl: "https://unsplash.it/199/199",
      admin: admin,
      date: date,
    },
    {
      id: 8,
      title: "CARD 8",
      content: "Steven Rogers",
      imgUrl: "https://unsplash.it/199/200",
      admin: admin,
      date: date,
    },
    {
      id: 9,
      title: "CARD 9",
      content: "Bruce Banner",
      imgUrl: "https://unsplash.it/200/198",
      admin: admin,
      date: date,
    },
    {
      id: 10,
      title: "CARD 10",
      content: "Vincent Strange",
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
            title={card.title}
            content={card.content}
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
