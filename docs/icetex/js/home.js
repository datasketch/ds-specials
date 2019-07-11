'use strict';

const Tabs = function Tabs (tabs, contents) {
  this.tabs = Array.prototype.map.call(tabs, function (tab) { return tab; });
  this.contents = Array.prototype.map.call(contents, function (content) { return content; });
  this.state = {
    tab: this.tabs.find(function (tab) {
      return tab.classList.contains('active');
    }),
    content: this.contents.find(function (content) {
      return content.classList.contains('active');
    }),
  };
}

Tabs.prototype.registerHandler = function () {
  const self = this;
  this.tabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {
      self.handleClick(event)
    });
  });
}


Tabs.prototype.handleClick = function (event) {
  if (event.currentTarget === this.state.tab) return;
  this.updateTab(event.currentTarget);
  this.updateContent(event.currentTarget);
}

Tabs.prototype.updateTab = function (target) {
  this.state.tab.classList.remove('active');
  target.classList.add('active');
  this.state.tab = target;
}

Tabs.prototype.updateContent = function (target) {
  const content = this.contents.find(function (content) {
    return content.getAttribute('id') === target.dataset.tab;
  });
  this.state.content.classList.remove('active');
  content.classList.add('active');
  this.state.content = content;
}

const tabs = new Tabs(
  document.querySelectorAll('.tab'),
  document.querySelectorAll('.tab-content')
);

tabs.registerHandler();
