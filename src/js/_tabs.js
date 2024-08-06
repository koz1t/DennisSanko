const tabs = document.querySelectorAll('.tabs');

tabs.forEach(tab => {
  const
    btns = tab.querySelectorAll('.tabs__btn'),
    content = tab.querySelectorAll('.tabs__content'),
    carousel = tab.querySelector('.tabs__content-carousel');
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

    btns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        btns[currentItem].classList.remove('--active');
        content[currentItem].classList.remove('--active');
        currentItem = index;
        carousel.style.transform = `translateX(-${currentItem * 100}%)`;
        carousel.style.height = `${content[currentItem].offsetHeight}px`;
        btns[currentItem].classList.add('--active');
        content[currentItem].classList.add('--active');
      })
    });
  }
});