import tabs from './modules/tabs';
import timer from './modules/timer';
import cards from './modules/cards';
import slider from './modules/slider';
import calc from './modules/calc';
import forms from './modules/forms';

window.addEventListener('DOMContentLoaded', () => {
  tabs();
  timer('2023-09-14'); //окончание акции в часовом поясе UTC
  cards(101); // курс рублей к доллару
  slider();
  calc();
  forms();
});
