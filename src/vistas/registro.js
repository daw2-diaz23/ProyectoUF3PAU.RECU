import { users } from "../base/registroUsuarios";
import { vistaLogin } from "./login";

export const vistaRegistro = {
    template: // html
    `
    <div class="container">
        <h1 class="mt-5 text-center">Registro</h1>
        <div class="m-5 mx-auto" style="max-width: 400px">
            <form action="" class="form border shadow-sm p-3">
                <label for="nombre" class="form-label">Nombre:</label>
                <input required id="nombre" type="text" class="form-control" />
                <label for="apellidos" class="form-label">Apellidos:</label>
                <input id="apellidos" type="text" class="form-control" />
                <label for="email" class="form-label">Email:</label>
                <input required id="email" type="text" class="form-control" />
                <label for="pass" class="form-label mt-3">Contraseña:</label>
                <input required minlength="6" id="pass" type="password" class="form-control" />
                <a class="btn btn-primary w-100 mt-3" id="enviar" href="#">Enviar</a>
            </form>
        </div>
    </div>
    `,
    script: () => {
        document.querySelector('#enviar').addEventListener('click', (e) => {
            e.preventDefault();
            const nombre = document.querySelector('#nombre').value.trim(); 
            const apellidos = document.querySelector('#apellidos').value.trim();
            const email = document.querySelector('#email').value.trim();
            const password = document.querySelector('#pass').value.trim();
            //si no se completan todos los campos no se puede registrar
            if (!nombre || !apellidos || !email || !password) {
                alert('Por favor, completa todos los campos obligatorios.');
                return; 
            }
    
            const objeto = {
                nombre: nombre,
                apellidos: apellidos,
                email: email,
                password: password
            };
    
            
            let comprovarEmail = false;
            users.forEach(user => {
                if (user.email === email) {
                    comprovarEmail = true;
                }
            });
    
            if (comprovarEmail) {
                alert('Este correo ya ha sido usado');
            } else {
               //si el email no ha sido usado se hace el push a la bd
                users.push(objeto);
                const texto = JSON.stringify(users);
        
                localStorage.setItem('registroLocal', texto);
                console.log(users);
                //Comprobar si se ha guardado en la bd
                if (!users) {
                    alert('No se guardó correctamente en la base de datos');
                } else {
                    alert('Tu usuario ha sido registrado correctamente');
                    //si se guarda vamos directos a iniciar sesión 
                    document.querySelector('main').innerHTML = vistaLogin .template;
                    vistaLogin.script();
                }
            }
        });
    }
}