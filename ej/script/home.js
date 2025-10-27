import { login } from '../script/users.mjs'
import { initCarousel } from '../script/carousel.mjs'

$(document).ready(function(){

    // LÓGICA DEL BOTÓN INICIAR SESIÓN
    $('#btnIniciarSesion').on('click', function(){
        // Borra los errores anteriores
        $('.error-texto').text('');

        // Obtiene los datos del usuario
        const user = $('#usuario').val().trim();
        const password = $('#password').val();

        const login_status = login(user, password);

        switch (login_status){

            case 'USER_NOT_FOUND':
                $('.error-texto').text('El usuario introducido no existe');
                break;

            case 'USER_INVALID':
                $('.error-texto').text('El usuario o contraseña no coinciden');
                break;

            default:
                alert('Inicio de sesión exitoso');
                window.location.href  = 'home-usuario.html';
                break;
        }
    });

    // Se inicializa el carrusel
    initCarousel();
});