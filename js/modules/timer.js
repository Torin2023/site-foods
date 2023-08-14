export default function timer() {
  const deadline = '2023-09-15'; //окончание акции в часовом поясе UTC

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
}
