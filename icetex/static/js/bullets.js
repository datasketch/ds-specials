const Bullets = function Bullets (container, active) {
  this.apiURL = 'https://script.googleusercontent.com/macros/echo?user_content_key=7MIrFauehELYdf9mLKszL8U1Yg2WiZUO7aA02zYms2tpexldO38awP_dJfQ9CRv_JabgNUQuyCJ1SPXzvEGKuLDON3fYUJVVm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnElOzMXHHOo4hqSSbnF7tP4mKuGGC8YUGaewhlAd7fVPpplltiVPIN27JZZCDQQP-0Zj1ymwpdo_&lib=MUF-aWdoeUpX94UwhK3xHMZ0Xtxr02Kpn';
  this.active = active;
  this.container = container;
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
      self.groupByCategory(data)
    })
    .catch(error => console.log(error.message))
}

Bullets.prototype.groupByCategory = function groupByCategory (data) {
  const bullets = this.groupBy(data.data, 'category', 'tag');
  this.createBullets(bullets);
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

Bullets.prototype.createBullets = function createBullets (data) {
  const self = this;
  const bullets = Object.keys(data[this.active]).map(function (tag) {
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
          children: data[self.active][tag].map(function (item) {
            return DOMUtils.createElement('li', {
              attrs: {
                class: 'bullet bg-darkest-blue w-3 h-3 rounded-full',
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
  const self = this;
  const html = bullets.map(function (bullet) {
    return DOMUtils.renderElement(bullet);
  });
  html.forEach(function (node) {
    self.container.appendChild(node);
  });
}
