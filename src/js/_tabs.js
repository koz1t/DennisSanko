const tabs = document.querySelectorAll('.tabs');

tabs.forEach(tab => {
  const
    btns = tab.querySelectorAll('.tabs__btn'),
    content = tab.querySelectorAll('.tabs__content'),
    carousel = tab.querySelector('.tabs__content-carousel'),
    btnContainer = tab.querySelector('.tabs__btns');
  let
    currentItem = 0;

  if (btns.length > 0 && carousel && (btns.length == content.length)) {
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.remove('--active');
      content[i].classList.remove('--active');
    }

    btns[currentItem].classList.add('--active');
    content[currentItem].classList.add('--active');
    carousel.style.transform = `translateX(-${currentItem * 100}%)`;
    carousel.style.height = `${content[currentItem].offsetHeight}px`;

    // Функция для центрирования активной кнопки
    const centerActiveButton = () => {
      const activeBtn = btns[currentItem];
      const btnContainerWidth = btnContainer.offsetWidth;
      const btnOffsetLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.offsetWidth;
      const scrollPosition = btnOffsetLeft - (btnContainerWidth / 2) + (btnWidth / 2);
      btnContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    };

    centerActiveButton(); // Центрируем активную кнопку при загрузке

    btns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        btns[currentItem].classList.remove('--active');
        content[currentItem].classList.remove('--active');
        currentItem = index;
        carousel.style.transform = `translateX(-${currentItem * 100}%)`;
        carousel.style.height = `${content[currentItem].offsetHeight}px`;
        btns[currentItem].classList.add('--active');
        content[currentItem].classList.add('--active');
        centerActiveButton(); // Центрируем активную кнопку при клике
      });
    });
  }
});