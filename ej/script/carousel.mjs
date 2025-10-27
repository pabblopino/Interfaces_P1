// LÓGICA DEL CARRUSEL
function initCarousel(){    
    // Selecciona todos los elementos necesarios del DOM
    const track = $('.carrusel-track');
    const items = $('.carrusel-item');
    const nextBtn = $('.next');
    const prevBtn = $('.prev');

    let index = 0; // Índice de la diapositiva actual
    let slideInterval; // Variable para guardar el intervalo

    function showSlide(n) {
        // Lógica circular, si se sale por un extremo aparece el otro extremo
        if (n < 0) {
            index = items.length - 1; // Si es menor que 0, va al final
        } else if (n >= items.length) {
            index = 0; // Si supera el número de items, vuelve al principio
        } else {
            index = n;
        }
        
        // Calcula el desplazamiento necesario para mostrar el item correcto
        const offset = -index * 100; // Multiplicamos por 100 porque cada item ocupa el 100%
        track.css('transform', `translateX(${offset}%)`); // Usamos backticks para la plantilla de string
    }

    function startSlideShow(){
        clearInterval(slideInterval); // Limpia cualquier intervalo anterior para evitar duplicados
        slideInterval = setInterval(() => {
            showSlide(index + 1); // Pasa a la siguiente diapositiva
        }, 2000); // Cada 2 segundos (2000 milisegundos)
    }

    // Event Listeners para los botones
    nextBtn.on("click", function() {
        showSlide(index + 1);
        startSlideShow(); // Reinicia el temporizador al hacer clic
    });

    prevBtn.on("click", function() {
        showSlide(index - 1);
        startSlideShow(); // Reinicia el temporizador al hacer clic
    });

    // Inicialización: Muestra la primera diapositiva y comienza el pase automático
    showSlide(index);
    startSlideShow();
}

export { initCarousel }