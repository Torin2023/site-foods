export default function calc() {
  // Calc
  const result = document.querySelector('.calculating__result span');
  let height,
    weight,
    age,
    sex = document.querySelector('#gender .calculating__choose-item_active').id,
    ratio = +document
      .querySelector(
        '.calculating__choose_big .calculating__choose-item_active'
      )
      .getAttribute('data-ratio');

  function calcTotal() {
    if (sex == 'female')
      result.textContent = Math.floor(
        ratio * (447 + weight * 9 + height * 3 - age * 4)
      );
    else
      result.textContent = Math.floor(
        ratio * (88 + weight * 13 + height * 5 - age * 6)
      );
    if (result.textContent == 'NaN') result.textContent = '____';
  }
  calcTotal();

  function getStaticInfo(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
        } else {
          sex = e.target.getAttribute('id');
        }
        elements.forEach((el) => {
          el.classList.remove('calculating__choose-item_active');
        });
        e.target.classList.add('calculating__choose-item_active');
        calcTotal();
      });
    });
  }
  getStaticInfo('.calculating__choose_big div');
  getStaticInfo('#gender div');

  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/) || input.value < 1) {
        input.style.border = '2px solid red';
      } else input.style.border = '';
      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }
  getDynamicInfo('#height');
  getDynamicInfo('#weight');
  getDynamicInfo('#age');
}
