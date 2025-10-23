import { getRegisteredUser } from '../module/users.mjs';
import { initCarousel } from '../module/carousel.mjs';

$(document).ready(function() {
    const usuario = getRegisteredUser();
    const sesionActiva = sessionStorage.getItem('sesionIniciada');

    if (!sesionActiva || !usuario) {
        alert('Debes iniciar sesión primero.');
        window.location.href = 'home.html';
        return;
    }

    // 🔹 Mostrar nombre completo
    $('.nombre-usuario').text(usuario.nombre + ' ' + usuario.apellidos);

    // 🔹 Mostrar la foto de perfil si existe
    if (usuario.imagen) {
        const $img = $('.perfil img');
        $img.attr('src', usuario.imagen);
        $img.attr('alt', `Foto de ${usuario.nombre}`);
    }

    // 🔹 Botón de cerrar sesión
    $('.cerrar-sesion').on('click', function() {
        sessionStorage.removeItem('sesionIniciada');
        alert('Has cerrado sesión.');
        window.location.href = 'home.html';
    });

    // 🔹 Carrusel
    initCarousel();
});