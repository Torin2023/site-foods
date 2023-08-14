export default function slider() {
  // slider
  const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current');

  let slideIndex = 1;

  if (slides.length < 10) total.textContent = `0${slides.length}`;
  else total.textContent = `${slides.length}`;

  showSlide(slideIndex);
  prev.addEventListener('click', () => showSlide(--slideIndex));
  next.addEventListener('click', () => showSlide(++slideIndex));

  function showSlide(n) {
    if (n < 1) slideIndex = slides.length;
    if (n > slides.length) slideIndex = 1;
    slides.forEach((slide) => (slide.style.display = 'none'));
    slides[slideIndex - 1].style.display = 'block';
    if (slideIndex < 10) current.textContent = `0${slideIndex}`;
    else current.textContent = `${slideIndex}`;
  }
}
