import React, { useState, useEffect } from "react";

import api from "../utils/Api.js";
import Card from "./Card.js";
function Main(props) {
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserAvatar(data.avatar);
        setUserDescription(data.about);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getCards()
      .then((data) => {
        setCards(
          data.map((item) => ({
            name: item.name,
            likes: item.likes.length,
            link: item.link,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__cover">
          <div
            className="profile__avatar"
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${userAvatar})` }}
          ></div>
          <div className="profile__info">
            <div className="profile__name-block">
              <h1 className="profile__info-name">{userName}</h1>
              <button
                onClick={props.onEditProfile}
                className="profile__edit-button"
                type="button"
                aria-label="открыть редактирование профиля"
              ></button>
            </div>
            <p className="profile__info-profession">{userDescription}</p>
          </div>
        </div>

        <button
          onClick={props.onAddPlace}
          className="profile__button-add"
          type="button"
          aria-label="добавить информацию"
        ></button>
      </section>

      <section className="elements">
        {cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={props.onCardClick}
            onDeleteIcon={props.onDeleteIcon}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
