import React from "react";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import PopupWithForm from "./PopupWithForm.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
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
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, element: card });
  }

  function handleDeleteClick() {
    setDeletePopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedCard({ isOpen: 0, element: {} });
  }

  function handlePopupClick(event) {
    if (event.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  return (
    <html lang="ru">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Место</title>
      </head>

      <body class="page">
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
            class="popup__input popup__input_type_avatar"
            id="popup-avatar"
            placeholder="Ссылка на картинку"
            name="link"
            type="url"
            required
          />
          <span id="popup-avatar-error" class="popup__error"></span>
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
            class="popup__input popup__input_type_name"
            type="text"
            id="popup-name"
            placeholder="Ваше имя"
            name="name"
            minlength="2"
            maxlength="40"
            required
          />
          <span id="popup-name-error" class="popup__error"></span>
          <input
            class="popup__input popup__input_type_job"
            type="text"
            id="popup-profession"
            placeholder="Чем занимаетесь"
            name="about"
            minlength="2"
            maxlength="200"
            required
          />
          <span id="popup-profession-error" class="popup__error"></span>
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
            class="popup__input popup__input_type_place"
            type="text"
            id="popup-place"
            placeholder="Название"
            name="name"
            minlength="2"
            maxlength="30"
            required
          />
          <span id="popup-place-error" class="popup__error"></span>
          <input
            class="popup__input popup__input_type_link"
            id="popup-link"
            placeholder="Ссылка на картинку"
            name="link"
            type="url"
            required
          />
          <span id="popup-link-error" class="popup__error"></span>
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
      </body>
    </html>
  );
}
export default App;
