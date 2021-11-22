import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="element">
      <button
        className="element__big-picture"
        type="button"
        onClick={handleClick}
      >
        <img
          className="element__picture"
          src={props.card.link}
          alt={`Фото ${props.card.name}`}
        />
      </button>
      <button
        className="element__remove"
        type="button"
        onClick={props.onDeleteIcon}
      ></button>
      <div className="element__group">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-cover">
          <button className="element__like" type="button"></button>
          <span className="element__like-counter">{props.card.likes}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
