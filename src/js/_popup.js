const popupInit = (popup, callers) => {
  if (popup) {
    const btns = document.querySelectorAll(callers);

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        popup.classList.add('popup--active');
      })
    });

    popup.addEventListener('click', (e) => {
      if (!e.target.closest('.popup__content') || e.target.closest('.popup__close')) {
        popup.classList.remove('popup--active');
      }
    })
  }
}

const feedbackPopup = document.querySelector('#feedback-popup');
popupInit(feedbackPopup, '[data-popup-feedback]');