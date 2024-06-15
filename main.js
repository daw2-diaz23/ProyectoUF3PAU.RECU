import { header } from './src/componentes/header.js'
import { vistaComentarios } from './src/vistas/vistaComentarios.js'

document.querySelector('header').innerHTML = header.template
header.script();

document.querySelector('main').innerHTML = vistaComentarios.template
vistaComentarios.script();