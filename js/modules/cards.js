import site from './site';
export default function cards(transferRate) {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price * +transferRate; // изначально в долларах
      this.parent = document.querySelector(parentSelector);
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

  const getRes = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`ERROR GET fetch ${url} status ${res.status}`);
    }
    return await res.json();
  };

  getRes(site() + 'menu').then((data) => { //!!!
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        '.menu .container'
      ).render();
    });
  });
}
