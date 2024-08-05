const menuParentItems = document.querySelectorAll('.nav__item-has-child');

menuParentItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    item.classList.toggle('active');
  });
});