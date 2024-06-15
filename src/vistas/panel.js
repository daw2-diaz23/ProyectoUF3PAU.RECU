import { incidents } from '../base/tickets.js';

export const vistaPanel = {
  template: `
    <div class="container mt-5">
      <h1>Administración de incidencias</h1>
      <button class="btn btn-primary mt-3" id="addTicketBtn">Añadir nuevo ticket</button>
      <h2 class="mt-5">Tickets pendientes</h2>
      <table class="table mt-4">
        <thead>
          <tr>
            <th>Código</th>
            <th>Fecha</th>
            <th>Aula</th>
            <th>Grupo</th>
            <th>Ordenador</th>
            <th>Descripción</th>
            <th>Alumno</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody id="ticketsPendientes">
          <!-- Filas generadas dinámicamente -->
        </tbody>
      </table>
      <h2 class="mt-5">Tickets resueltos</h2>
      <table class="table mt-4">
        <thead>
          <tr>
            <th>Código</th>
            <th>Fecha</th>
            <th>Fecha resuelto</th>
            <th>Aula</th>
            <th>Grupo</th>
            <th>Ordenador</th>
            <th>Descripción</th>
            <th>Alumno</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="ticketsResueltos">
          <!-- Filas generadas dinámicamente -->
        </tbody>
      </table>
    </div>
    <!-- Ventana de edición -->
    <div id="editWindow" class="edit-window" style="display: none;">
      <div class="edit-window-content">
        <h2>Editar Incidencia</h2>
        <label for="editCodigo">Código:</label>
        <input type="text" id="editCodigo" readonly>
        <label for="editFecha">Fecha:</label>
        <input type="text" id="editFecha">
        <label for="editAula">Aula:</label>
        <input type="text" id="editAula">
        <label for="editGrupo">Grupo:</label>
        <input type="text" id="editGrupo">
        <label for="editOrdenador">Ordenador:</label>
        <input type="text" id="editOrdenador">
        <label for="editDescripcion">Descripción:</label>
        <textarea id="editDescripcion"></textarea>
        <label for="editAlumno">Alumno:</label>
        <input type="text" id="editAlumno">
        <button id="saveEdit">Guardar cambios</button>
        <button id="cancelEdit">Cancelar</button>
      </div>
    </div>
    <!-- Ventana de creación -->
    <div id="createWindow" class="edit-window" style="display: none;">
      <div class="edit-window-content">
        <h2>Crear Nuevo Ticket</h2>
        <label for="createCodigo">Código:</label>
        <input type="text" id="createCodigo">
        <label for="createFecha">Fecha:</label>
        <input type="text" id="createFecha">
        <label for="createAula">Aula:</label>
        <input type="text" id="createAula">
        <label for="createGrupo">Grupo:</label>
        <input type="text" id="createGrupo">
        <label for="createOrdenador">Ordenador:</label>
        <input type="text" id="createOrdenador">
        <label for="createDescripcion">Descripción:</label>
        <textarea id="createDescripcion"></textarea>
        <label for="createAlumno">Alumno:</label>
        <input type="text" id="createAlumno">
        <button id="saveCreate">Guardar</button>
        <button id="cancelCreate">Cancelar</button>
      </div>
    </div>
    <style>
      .edit-window {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 1px solid #ccc;
        padding: 20px;
        z-index: 1000;
      }
      .edit-window-content {
        display: flex;
        flex-direction: column;
      }
      .edit-window-content label {
        margin-top: 10px;
      }
      .edit-window-content input, .edit-window-content textarea {
        padding: 5px;
        margin-top: 5px;
      }
      .edit-window-content button {
        margin-top: 10px;
        padding: 10px;
      }
    </style>
  `,
  script: () => {
    let currentEditCodi = null;

    function renderTables() {
      const ticketsPendientes = document.getElementById('ticketsPendientes');
      const ticketsResueltos = document.getElementById('ticketsResueltos');

      ticketsPendientes.innerHTML = '';
      ticketsResueltos.innerHTML = '';

      incidents.forEach(incident => {
        const row = document.createElement('tr');
        if (incident.estat === 'pendent') {
          row.innerHTML = `
            <td>${incident.codi}</td>
            <td>${incident.data}</td>
            <td>${incident.aula}</td>
            <td>${incident.grup}</td>
            <td>${incident.ordinador}</td>
            <td>${incident.descripcio}</td>
            <td>${incident.alumne}</td>
            <td><button class="btn btn-success" title="Resolver ticket" onclick="resolveTicket(${incident.codi})">Resolver</button></td>
            <td><button class="btn btn-warning" title="Editar" onclick="openEditWindow(${incident.codi})">Editar</button></td>
            <td><button class="btn btn-info" title="Ver comentarios"><i class="bi bi-chat-left-text"></i></button></td>
            <td><button class="btn btn-danger" title="Eliminar ticket" onclick="deleteTicket(${incident.codi})"><i class="bi bi-trash3"></i></button></td>
          `;
          ticketsPendientes.appendChild(row);
        } else {
          row.innerHTML = `
            <td>${incident.codi}</td>
            <td>${incident.data}</td>
            <td>${incident.data_resolt || ''}</td>
            <td>${incident.aula}</td>
            <td>${incident.grup}</td>
            <td>${incident.ordinador}</td>
            <td>${incident.descripcio}</td>
            <td>${incident.alumne}</td>
            <td><button class="btn btn-info" title="Ver comentarios"><i class="bi bi-chat-left-text"></i></button></td>
            <td><button class="btn btn-danger" title="Eliminar ticket" onclick="deleteTicket(${incident.codi})"><i class="bi bi-trash3"></i></button></td>
          `;
          ticketsResueltos.appendChild(row);
        }
      });
    }

    function resolveTicket(codi) {
      const incident = incidents.find(incident => incident.codi === codi);
      if (incident) {
        incident.estat = 'resolt';
        incident.data_resolt = new Date().toLocaleDateString('es-ES');
        renderTables();
      }
    }

    function deleteTicket(codi) {
      const index = incidents.findIndex(incident => incident.codi === codi);
      if (index !== -1) {
        incidents.splice(index, 1);
        renderTables();
      }
    }

    function openEditWindow(codi) {
      const incident = incidents.find(incident => incident.codi === codi);
      if (incident) {
        currentEditCodi = codi;
        document.getElementById('editCodigo').value = incident.codi;
        document.getElementById('editFecha').value = incident.data;
        document.getElementById('editAula').value = incident.aula;
        document.getElementById('editGrupo').value = incident.grup;
        document.getElementById('editOrdenador').value = incident.ordinador;
        document.getElementById('editDescripcion').value = incident.descripcio;
        document.getElementById('editAlumno').value = incident.alumne;
        document.getElementById('editWindow').style.display = 'block';
      }
    }

    function saveChanges() {
      const incident = incidents.find(incident => incident.codi === currentEditCodi);
      if (incident) {
        incident.data = document.getElementById('editFecha').value;
        incident.aula = document.getElementById('editAula').value;
        incident.grup = document.getElementById('editGrupo').value;
        incident.ordinador = document.getElementById('editOrdenador').value;
        incident.descripcio = document.getElementById('editDescripcion').value;
        incident.alumne = document.getElementById('editAlumno').value;
        renderTables();
        closeEditWindow();
      }
    }

    function closeEditWindow() {
      document.getElementById('editWindow').style.display = 'none';
    }

    function openCreateWindow() {
      document.getElementById('createWindow').style.display = 'block';
    }

    function saveNewTicket() {
      const newTicket = {
        codi: document.getElementById('createCodigo').value,
        data: document.getElementById('createFecha').value,
        aula: document.getElementById('createAula').value,
        grup: document.getElementById('createGrupo').value,
        ordinador: document.getElementById('createOrdenador').value,
        descripcio: document.getElementById('createDescripcion').value,
        alumne: document.getElementById('createAlumno').value,
        estat: 'pendent'
      };
      incidents.push(newTicket);
      renderTables();
      closeCreateWindow();
    }

    function closeCreateWindow() {
      document.getElementById('createWindow').style.display = 'none';
    }

    document.getElementById('saveEdit').addEventListener('click', saveChanges);
    document.getElementById('cancelEdit').addEventListener('click', closeEditWindow);

    document.getElementById('saveCreate').addEventListener('click', saveNewTicket);
    document.getElementById('cancelCreate').addEventListener('click', closeCreateWindow);
    document.getElementById('addTicketBtn').addEventListener('click', openCreateWindow);

    window.resolveTicket = resolveTicket;
    window.deleteTicket = deleteTicket;
    window.openEditWindow = openEditWindow;

    renderTables();
  }
};
