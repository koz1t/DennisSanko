const 
  header = document.querySelector('.header'),
  burgerBtn = document.querySelector('.burger-btn');

if (header && burgerBtn) {

  const menuControl = (flag) => {
    if (flag) {
      header.classList.add('header--burger-active');
      pageControl(true);
    } else {
      pageControl(false);
      header.classList.remove('header--burger-active');
    }
  }

  const closeBurger = (e) => {
    if (!e.target.closest('.header') && !e.target.closest('.burger-btn'))
      burgerBtn.click();
  }
  
  const checkActiveBurger = (flag) => {
    menuControl(flag);
    flag 
      ? document.addEventListener('click', closeBurger)
      : document.removeEventListener('click', closeBurger);
  }

  checkActiveBurger(burgerBtn.classList.contains('burger-btn--active'));

  burgerBtn.addEventListener('click', () => {
    checkActiveBurger(burgerBtn.classList.toggle('burger-btn--active'));
  });
   
};