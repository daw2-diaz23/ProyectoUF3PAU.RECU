import { header } from './src/componentes/header.js';

document.querySelector('header').innerHTML = header.template;
header.script();

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('panel-button')) {
    document.getElementById('panel-button').click();
  }
});
