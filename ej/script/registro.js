import { register } from '../module/users.mjs';


// LÓGICA DEL BOTÓN GUARDAR
$('#btnGuardar').prop('disabled', true); // Se deshabilita el botón de guardar
$('#politica').on('change', function() { // Cuando el checkbox de política cambie, esta función tiene efecto
    // Si el chechkbox de política está marcado, se habilita el botón de guardar (y viceversa)
    $('#btnGuardar').prop('disabled', !this.checked);
});

// VALIDACIÓN DEL FORMULARIO DE REGISTRO

function handleRegister(event) {

    event.preventDefault(); // Previene que la página se recargue

    let form_valido = true;
    $('.error-texto').text(''); // Se limpian todos los <p> de la clase error-texto (del intento anterior)

    // Recogemos todos los datos del formulario de golpe
    const data = new FormData(document.forms['registro']);

    // 1. Validación del nombre -> Mínimo 3 caracteres de longitud
    const nombre = data.get('nombre').trim(); // Cogemos el valor y quitamos los espacios del principio y el final
    
    if (nombre.length < 3){
        $('#errorNombre').text('El nombre debe tener al menos 3 caracteres.');
        form_valido = false;
    }

    // 2. Validación de apellidos -> Mínimo 2 cadenas de 3 caracteres de longitud
    const apellidos = data.get('apellidos').trim();
    const apellidos_separados = apellidos.split(' ');

    if (apellidos_separados.length < 2 || apellidos_separados[0].length < 3 ||
        apellidos_separados[1].length < 3){
            $('#errorApellidos').text('Introduce al menos 2 apellidos de 3 caracteres.');
            form_valido = false;
    }

    // 3. Validación del correo -> Valores tipo nombre@dominio.extensión
    const correo = data.get('correo');
    const regex_correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (!regex_correo.test(correo)) {
            $('#errorCorreo').text('El formato del correo no es válido.');
            form_valido = false;
        }
    
    // 4. Confirmación del correo -> Correo2 coincide con Correo
    const correo2 = data.get('correo2');

    if (correo != correo2){
        $('#errorCorreo2').text('Los correos no coinciden.');
        form_valido = false;
    }

    // 5. Validación fecha de nacimiento -> La fecha no puede ser futura ni inválida
    const fecha_val = data.get('fecha');
    if (fecha_val) { // La validación solo se ejecuta si el campo no está vacío, porque la fecha es opcional
        const fecha_nacimiento = new Date(fecha_val);
        const fecha_hoy = new Date();

        // isNan: El usuario no introduce una fecha, por tanto no se convierte correctamente a Date
        if (isNaN(fecha_nacimiento.getTime()) || fecha_nacimiento >= fecha_hoy){
            $('#errorFecha').text('La fecha no es válida o es futura.');
            form_valido = false;
        }
    }


    // 6. Validación del login -> Mínimo 5 caracteres de longitud
    const login = data.get('login');
    
    if (login.length < 5) {
        $('#errorLogin').text('El login debe tener al menos 5 caracteres.');
        form_valido = false;
    }

    // 7. Validación de contraseña -> Mínimo 8 caracteres de longitud, 2 números, 1 carácter especial,
    // 1 letra minúscula y 1 letra mayúscula
    const password = data.get('password');
    const regex_password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?=.*[\W_]).{8,}$/;
    
    if (!regex_password.test(password)) {
        $('#errorPassword').text('La contraseña no cumple los requisitos.');
        form_valido = false;
    }

    // 8. Validación imagen de perfil -> Solo admite .webp, .png o .jpg

    const imagen_file = data.get('imagen'); // Obtiene el elemento HTML del input

    if (imagen_file.size === 0) {
        $('#errorImagen').text('Debes subir una imagen de perfil.');
        form_valido = false;
    }

    else {
        // Si hay un archivo, se procede a validar su formato
        const nombre_archivo = imagen_file.name;
        const extension = nombre_archivo.split('.').pop().toLowerCase();
        
        // Se comprueba si la extensión no está en la lista de formatos permitidos
        if (!(extension == 'webp' || extension == 'png' || extension == 'jpg')) {
            $('#errorImagen').text('Formato no válido (.webp, .png, .jpg).');
            form_valido = false;
        }
    }


    // Resultado de la validación
     if (form_valido) {
        // 🔸 Convertir la imagen a base64 para poder guardarla de forma persistente
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagenBase64 = e.target.result;

            const usuario = {
                login: login,
                password: password,
                nombre: nombre,
                apellidos: apellidos,
                correo: correo,
                fecha_nacimiento: fecha_val,
                imagen: imagenBase64 // se guarda en base64
            };

            register(usuario);
            alert("Registro exitoso. ¡Bienvenido, " + nombre + "!");
            sessionStorage.setItem('sesionIniciada', 'true');
            window.location.href = 'home-usuario.html';
        };
        reader.readAsDataURL(imagen_file);
    }
}

document.forms['registro'].addEventListener('submit', handleRegister);