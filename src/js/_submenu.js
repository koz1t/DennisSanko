const initSubmenu = (items) => {
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      item.parentElement.classList.toggle('active');
    });
  });
}

initSubmenu(document.querySelectorAll('.nav__item-has-child > a'));
initSubmenu(document.querySelectorAll('.nav__submenu-item-has-child > a'));