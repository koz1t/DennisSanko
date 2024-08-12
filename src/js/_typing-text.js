const elements = document.querySelectorAll("[data-typing]");
elements.forEach(element => {
  const text = element.getAttribute("data-typing");
  element.style.height = `${element.offsetHeight}px`;
  let index = 0;
  const speed = 60; // скорость печати

  function typeWriter() {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  element.innerHTML = ""; // очистка начального текста
  typeWriter();
});