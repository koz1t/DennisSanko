const items = document.querySelectorAll('.quotation-list__item');
let currentIndex = 0;

function activateNextItem() {
  // Удаляем класс --active у всех элементов
  items.forEach(item => item.classList.remove('--active'));

  // Добавляем класс --active к текущему элементу
  items[currentIndex].classList.add('--active');

  // Переходим к следующему элементу
  currentIndex = (currentIndex + 1) % items.length;
}

// Запускаем функцию сразу и затем каждые 5 секунд
activateNextItem();
setInterval(activateNextItem, 3000);