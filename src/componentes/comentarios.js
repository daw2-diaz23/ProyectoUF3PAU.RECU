import { comentariosDB } from '../bd.js' 
import { comentario } from '../componentes/comentario.js'

export const comentarios = {
  template: `
  <div class="container" id="divComentarios"></div>
  `,
  script: () => {
    let html = ''
    comentariosDB.forEach(element => {
      html += comentario(element)
    })
    console.log(html)
    document.querySelector('#divComentarios').innerHTML = html
  }
}