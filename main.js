import { header } from "./src/componentes/header";

import { vistaPanel } from "./src/vistas/panel";
import { vistaRegistro } from "./src/vistas/registro";

document.querySelector('header').innerHTML = header.template
document.querySelector('main').innerHTML = vistaRegistro.template
header.script()
vistaPanel.script()

