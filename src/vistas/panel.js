import { incidents } from '../base/tickets.js';

export const vistaPanel = {
  template: `
    <div class="container mt-5">
      <h1>Administración de incidencias</h1>
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
          </tr>
        </thead>
        <tbody id="ticketsResueltos">
          <!-- Filas generadas dinámicamente -->
        </tbody>
      </table>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Observaciones</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Código incidencia: <span id="modalCodigo">123546</span></p>
            <label for="comentario" class="form-label">Comentario:</label>
            <textarea class="form-control" id="comentario">Este es un comentario sobre esta incidencia</textarea>
            <p class="small text-end">Autor: <span id="modalAutor">Pepe Loco</span></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="saveChanges">Guardar cambios</button>
          </div>
        </div>
      </div>
    </div>
  `,
  script: () => {
    function resolveTicket(codi) {
      const incident = incidents.find(incident => incident.codi === codi);
      if (incident) {
        incident.estat = 'resolt';
        incident.data_resolt = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        renderTables();
      }
    }

    function renderTables() {
      const ticketsPendientes = document.getElementById('ticketsPendientes');
      const ticketsResueltos = document.getElementById('ticketsResueltos');

      ticketsPendientes.innerHTML = '';
      ticketsResueltos.innerHTML = '';

      incidents.forEach(incident => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${incident.codi}</td>
          <td>${incident.data}</td>
          <td>${incident.aula}</td>
          <td>${incident.grup}</td>
          <td>${incident.ordinador}</td>
          <td>${incident.descripcio}</td>
          <td>${incident.alumne}</td>
          ${incident.estat === 'pendent' ? `
            <td><button class="btn btn-success" title="Resolver ticket" onclick="resolveTicket(${incident.codi})">Resolver</button></td>
            <td><button class="btn btn-warning" title="Añadir comentario"><i class="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></button></td>
            <td><button class="btn btn-info" title="Ver comentarios"><i class="bi bi-chat-left-text"></i></button></td>
            <td><button class="btn btn-danger" title="Eliminar ticket"><i class="bi bi-trash3"></i></button></td>
          ` : `
            <td>${incident.data_resolt || ''}</td>
            <td><button class="btn btn-info" title="Ver comentarios"><i class="bi bi-chat-left-text"></i></button></td>
            <td><button class="btn btn-danger" title="Eliminar ticket"><i class="bi bi-trash3"></i></button></td>
          `}
        `;

        if (incident.estat === 'pendent') {
          ticketsPendientes.appendChild(row);
        } else {
          ticketsResueltos.appendChild(row);
        }
      });
    }

    // Executa el renderTables directament
    renderTables();
  }
};


