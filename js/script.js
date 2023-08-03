'use strict';
const transferRate = 100; // курс рублей к доллару
const deadline = '2023-09-15'; //окончание акции в часовом поясе UTC

window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.remove('show', 'fade');
      item.classList.add('hide');
    });
    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    if (event.target?.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (event.target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  const promotionDeadline = document.querySelector('#promotion__deadline');
  promotionDeadline.textContent = ' ' + new Date(deadline).toLocaleDateString();

  function getTimeRemaining(endtime) {
    const s1 = Date.parse(endtime) / 1000, //дедлайн в сек
      d = new Date(),
      s2 = Date.parse(d) / 1000, //сегодня в сек
      s3 = 60 * d.getTimezoneOffset(), //коррекция часового пояса секунд
      t = s1 - s2 + s3; //секунд осталось с коррекцией пояса, тогда совпадёт с локальной полночью

    if (t <= 0)
      return {
        total: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

    const secs = Math.floor(t % 60), //остаток секунд
      mins = Math.floor((t / 60) % 60), //остаток минут
      hours = Math.floor((t / 60 / 60) % 24), //остаток часов
      days = Math.floor(t / 60 / 60 / 24); //полных дней

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: mins,
      seconds: secs,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else return num;
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000); //назначили таймер

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval); // сняли таймер
      }
    }
  }

  setClock('.timer', deadline);

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price; // изначально в долларах
      this.transfer = transferRate;
      this.changePrice();
      this.parent = document.querySelector(parentSelector);
    }

    changePrice() {
      this.price *= this.transfer; // конвертация
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = `
      <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
      `;
      this.parent.append(element);
    }
  }

  new MenuCard(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container'
  ).render();
  new MenuCard(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    30,
    '.menu .container'
  ).render();
  new MenuCard(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    15,
    '.menu .container'
  ).render();


  const forms = document.querySelectorAll('form');
  const message = {
    success: 'Спасибо! Данные отправлены успешно.',
    failure: 'Что-то пошло не так (',
  };

  forms.forEach((item) => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const r = new XMLHttpRequest();
      r.open('POST', 'server.php');
      r.setRequestHeader('Content-Type', 'application/json'); // для формата json
      const formData = new FormData(form);

      const obj = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });
      const json = JSON.stringify(obj);

      r.send(json);

      r.addEventListener('load', () => {
        form.reset();
        if (r.status === 200) {
          console.log(r.response);
          showThanksModal(message.success);
        } else {
          showThanksModal(message.failure);
        }
      });
    });
  }


  //modal
  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

  modalTrigger.forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal();
    });
  });

  function openModal() {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') === '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });


  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class='modal__content'>
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 2000);
      // если окно закрывается вручную то основная форма не успевает сразу вернутся, а только тут по таймеру 
      
  }

  //end
});
