const Bullets = function Bullets (containers) {
  this.apiURL = 'https://script.googleusercontent.com/macros/echo?user_content_key=7MIrFauehELYdf9mLKszL8U1Yg2WiZUO7aA02zYms2tpexldO38awP_dJfQ9CRv_JabgNUQuyCJ1SPXzvEGKuLDON3fYUJVVm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnElOzMXHHOo4hqSSbnF7tP4mKuGGC8YUGaewhlAd7fVPpplltiVPIN27JZZCDQQP-0Zj1ymwpdo_&lib=MUF-aWdoeUpX94UwhK3xHMZ0Xtxr02Kpn';
  this.containers = containers;
}

Bullets.prototype.init = function init () {
  this.fetchData();
}

Bullets.prototype.fetchData = function fetchData () {
  const self = this;
  window.fetch(this.apiURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Se ha producido un error obteniendo los datos');
    })
    .then(function (data) {
      self.data = data.data;
      self.groupedByKey = self.groupByCategory();
      self.categories = Object.keys(self.groupedByKey);
      self.category = self.categories[0];
      self.createButtons();
      self.createBullets();
    })
    .catch(error => console.log(error.message));
}

Bullets.prototype.groupByCategory = function groupByCategory () {
  return this.groupBy(this.data, 'category', 'tag');
}

Bullets.prototype.groupBy = function groupBy (data, key, nested_key) {
  const self = this;
  const groupedByKey = data.reduce(function (group, item) {
    const slug = item[key].toLowerCase().replace(/\s/g, '-');
    group[slug] = group[slug] || [];
    group[slug].push(item);
    return group;
  }, {});
  if (nested_key) {
    Object.keys(groupedByKey).forEach(function (key) {
      const group = self.groupBy(groupedByKey[key], nested_key);
      groupedByKey[key] = group;
    });
  }
  return groupedByKey;
}

Bullets.prototype.createButtons = function createButtons () {
  const self = this;
  const buttons = this.categories.map(function (category) {
    return DOMUtils.createElement('button', {
      attrs: {
        class: `bullet-btn text-xs uppercase bg-darkest-black text-white px-4 py-2 font-extrabold tracking-wider${self.category === category ? ' active': ''}`,
        'data-category': category,
      },
      children: [category.replace(/-/g, ' ')],
    })
  })
  this.renderButtons(buttons);
  this.registerButtonsHandler();
}

Bullets.prototype.renderButtons = function renderButtons (buttons) {
  const self = this;
  const html = buttons.map(function (button) {
    return DOMUtils.renderElement(button);
  });
  html.forEach(function (node) {
    self.containers.buttons.appendChild(node);
  });
}

Bullets.prototype.createBullets = function createBullets (data) {
  const self = this;
  const bullets = Object.keys(this.groupedByKey[this.category]).map(function (tag) {
    return DOMUtils.createElement('div', {
      attrs: {
        class: 'flex flex-col mb-8 md:mb-0',
      },
      children: [
        DOMUtils.createElement('h4', {
          attrs: {
            class: 'uppercase text-darkest-black font-extrabold tracking-wider mb-4 text-center',
          },
          children: [tag.replace(/-/g, ' ')],
        }),
        DOMUtils.createElement('ul', {
          attrs: {
            class: 'bullets w-full flex-grow justify-between items-center flex md:flex-col',
          },
          children: self.groupedByKey[self.category][tag].map(function (item) {
            return DOMUtils.createElement('li', {
              attrs: {
                class: 'bullet bg-darkest-blue w-3 h-3 rounded-full',
                'data-tag': tag,
                'data-id': item.id,
              },
            });
          }),
        }),
      ],
    });
  });
  this.renderBullets(bullets);
}

Bullets.prototype.renderBullets = function renderBullets (bullets) {
  this.containers.bullets.innerHTML = '';
  const self = this;
  const html = bullets.map(function (bullet) {
    return DOMUtils.renderElement(bullet);
  });
  html.forEach(function (node) {
    self.containers.bullets.appendChild(node);
  });
  this.bullet = document.querySelector('.bullet');
  this.displayBulletInfo();
  // TODO: use the Tab class
  this.registerBulletsHandler();
}

Bullets.prototype.displayBulletInfo = function displayBulletInfo () {
  this.bullet.classList.add('active');
  this.containers.info.innerHTML = '';
  const id = Number(this.bullet.dataset.id);
  const tag = this.bullet.dataset.tag;
  const info = this.groupedByKey[this.category][tag].find(function (item) {
    return item.id === id
  });
  const heading = DOMUtils.renderElement(DOMUtils.createElement('h2', {
    attrs: {
      class: 'uppercase text-darkest-black text-xl md:text-4xl tracking-wider mt-4',
    },
    children: [info.name],
  }));
  const body = DOMUtils.renderElement(DOMUtils.createElement('p', {
    attrs: {
      class: 'text-lighter-black mt-4 text-xs md:text-base md:mt-8',
    },
    children: [info.review]
  }));
  this.containers.info.appendChild(heading);
  this.containers.info.appendChild(body);
}

Bullets.prototype.registerButtonsHandler = function registerButtonsHandler () {
  const self = this;
  const buttons = Array.prototype.map.call(document.querySelectorAll('.bullet-btn'), function (button) {
    return button;
  });
  buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      const target = event.currentTarget;
      const category = target.dataset.category;
      if (self.category === category) return;
      self.category = category;
      self.createBullets();
    });
  });
}

Bullets.prototype.registerBulletsHandler = function registerBulletsHandler () {
  const self = this;
  const bullets = Array.prototype.map.call(document.querySelectorAll('.bullet'), function (bullet) {
    return bullet;
  });
  bullets.forEach(function (bullet) {
    bullet.addEventListener('click', function (event) {
      self.bullet.classList.remove('active');
      self.bullet = event.currentTarget;
      self.displayBulletInfo();
    });
  });
}