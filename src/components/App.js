import React from "react";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import PopupWithForm from "./PopupWithForm.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setIsSelectedCard] = React.useState({
    isOpen: false,
    element: {},
  });

  React.useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      isDeletePopupOpen ||
      selectedCard.isOpen
    ) {
      function handleEsc(event) {
        if (event.key === "Escape") {
          closeAllPopups();
        }
      }
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isDeletePopupOpen,
    selectedCard.isOpen,
  ]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsSelectedCard({ isOpen: true, element: card });
  }

  function handleDeleteClick() {
    setIsDeletePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsSelectedCard({ isOpen: 0, element: {} });
  }

  function handlePopupClick(event) {
    if (event.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onDeleteIcon={handleDeleteClick}
      />
      <Footer />
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonTitle="Сохранить"
        onPopupClick={handlePopupClick}
      >
        <input
          className="popup__input popup__input_type_avatar"
          id="popup-avatar"
          placeholder="Ссылка на картинку"
          name="link"
          type="url"
          required
        />
        <span id="popup-avatar-error" className="popup__error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonTitle="Сохранить"
        onPopupClick={handlePopupClick}
      >
        <input
          className="popup__input popup__input_type_name"
          type="text"
          id="popup-name"
          placeholder="Ваше имя"
          name="name"
          minLength="2"
          maxLength="40"
          required
        />
        <span id="popup-name-error" className="popup__error"></span>
        <input
          className="popup__input popup__input_type_job"
          type="text"
          id="popup-profession"
          placeholder="Чем занимаетесь"
          name="about"
          minLength="2"
          maxLength="200"
          required
        />
        <span id="popup-profession-error" className="popup__error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="element"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonTitle="Сохранить"
        onPopupClick={handlePopupClick}
      >
        <input
          className="popup__input popup__input_type_place"
          type="text"
          id="popup-place"
          placeholder="Название"
          name="name"
          minLength="2"
          maxLength="30"
          required
        />
        <span id="popup-place-error" className="popup__error"></span>
        <input
          className="popup__input popup__input_type_link"
          id="popup-link"
          placeholder="Ссылка на картинку"
          name="link"
          type="url"
          required
        />
        <span id="popup-link-error" className="popup__error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        buttonTitle="Да"
        onPopupClick={handlePopupClick}
      />
      <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
        onPopupClick={handlePopupClick}
      />
    </div>
  );
}
export default App;
