import { vistaLogin } from '../vistas/login.js';
import { vistaPanel } from '../vistas/panel.js';
import { vistaRegistro } from '../vistas/registro.js';
import { vistaComentarios } from '../vistas/vistaComentarios.js';

export const header = {
    template: `
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand">Gestión de incidencias FPLLEFIA</a>
          <div>
            <button id="panel-button" class="btn btn-secondary ms-2">PANEL</button>
            <button id="comentarios-button" class="btn btn-secondary ms-2">COMENTARIOS</button>
            <button id="login-button" class="btn btn-secondary ms-2">LOGIN</button>
            <button id="registro-button" class="btn btn-secondary ms-2">REGISTRO</button>
          </div>
          <div>
            <span>administrador@fpllefia.com</span>
          </div>
        </div>
      </nav>
    `,
    script: () => {
        document.getElementById('panel-button').addEventListener('click', () => {
          document.getElementById('app').innerHTML = vistaPanel.template;
          // Puedes agregar lógica específica para vistaPanel aquí
        });
        document.getElementById('login-button').addEventListener('click', () => {
          document.getElementById('app').innerHTML = vistaLogin.template;
          // Puedes agregar lógica específica para vistaLogin aquí
        });
        document.getElementById('registro-button').addEventListener('click', () => {
          document.getElementById('app').innerHTML = vistaRegistro.template;
          // Puedes agregar lógica específica para vistaRegistro aquí
        });
        document.getElementById('comentarios-button').addEventListener('click', () => {
            document.getElementById('app').innerHTML = vistaComentarios.template;
            // Puedes agregar lógica específica para vistaRegistro aquí
          });
      }
  };