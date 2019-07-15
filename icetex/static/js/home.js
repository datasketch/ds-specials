'use strict';

const tabs = new Tabs(
  document.querySelectorAll('.tab'),
  document.querySelectorAll('.tab-content'),
);
const bullets = new Bullets({
  bullets: document.getElementById('bullets-container'),
  buttons: document.getElementById('bullets-buttons'),
  info: document.getElementById('bullets-info'),
});

tabs.registerHandler();
bullets.init();
