const body = document.querySelector('body');
const pageControl = (flag) => {
  if (body)
    flag
      ? body.classList.add('body--lock')
      : body.classList.remove('body--lock');
}