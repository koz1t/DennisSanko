const elements = document.querySelectorAll("[data-typing]");
elements.forEach(element => {
  const text = element.getAttribute("data-typing");
  element.style.height = `${element.offsetHeight}px`;
  let index = 0;
  const speed = 100; // скорость печати

  function typeWriter() {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    } else {
      setTimeout(eraseText, 2000); // задержка перед стиранием
    }
  }

  function eraseText() {
    if (index > 0) {
      element.innerHTML = text.substring(0, index - 1);
      index--;
      setTimeout(eraseText, speed);
    } else {
      setTimeout(typeWriter, 2000); // задержка перед повторным печатанием
    }
  }

  element.innerHTML = ""; // очистка начального текста
  typeWriter();
});