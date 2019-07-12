'use strict';

const tabs = new Tabs(
  document.querySelectorAll('.tab'),
  document.querySelectorAll('.tab-content'),
);
const bullets = new Bullets(document.getElementById('bullets-container'), 'sesiones');

tabs.registerHandler();
bullets.init();
