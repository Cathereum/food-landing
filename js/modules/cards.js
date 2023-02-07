const cards = () => {
  class MenuCard {
    constructor(src, alt, title, desc, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.desc = desc;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 70;
      this.changeToRUB();
    }

    changeToRUB() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      element.innerHTML = `
          <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
            <div class="menu__item-descr">${this.desc}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
        </div>`;
      this.parent.append(element);
    }
  }

  const getData = async (url) => {
    const data = await fetch(url);

    if (!data.ok) {
      throw new Error(`Could not fetch ${url} status: ${data.status}`);
    }

    return await data.json();
  };

  getData("http://localhost:3000/menu").then((data) => {
    data.forEach((obj) => {
      new MenuCard(
        obj.img,
        obj.altimg,
        obj.title,
        obj.descr,
        obj.price,
        ".menu .container"
      ).render();
    });
  });
};

export default cards;
