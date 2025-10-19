$(document).ready(function() {

  //Leer parámetro de la URL
  const params = new URLSearchParams(window.location.search);
  const packId = params.get("id_pack"); // Ejemplo: fiordos, ruta66, asiatico

  //Definir los packs disponibles
  const packs = {
    fiordos: {
      nombre: "Fiordos Noruegos",
      precio: "700€",
      descripcion: "Noruega: avión, hotel y excursión por los fiordos noruegos.",
      detalle: "Los fiordos noruegos son profundas y estrechas entradas de mar, con laderas empinadas y acantilados altos, formadas por la erosión de glaciares. Se caracterizan por su belleza escénica, con cascadas espectaculares, montañas escarpadas y exuberante vegetación.",
      imagen: "images/fiordos.jpg"
    },
    ruta66: {
      nombre: "Ruta 66 en Moto",
      precio: "1500€",
      descripcion: "Estados Unidos: aventura en moto por la icónica Ruta 66.",
      detalle: "La Ruta 66 recorre Estados Unidos de costa a costa, pasando por desiertos, moteles clásicos y paisajes icónicos. Una experiencia ideal para los amantes de la carretera y la libertad.",
      imagen: "images/ruta66.jpg"
    },
    asiatico: {
      nombre: "Sudeste Asiático",
      precio: "1200€",
      descripcion: "Vietnam, Camboya y Tailandia en un viaje inolvidable.",
      detalle: "El Sudeste Asiático combina playas paradisíacas, templos milenarios y una gastronomía única. Descubre culturas fascinantes y paisajes exóticos en un solo viaje.",
      imagen: "images/sudeste_asiatico.webp"
    }
  };

  // Actualizar contenido dinámicamente
  const pack = packs[packId];

  if (pack) {
    // Cabecera (nombre y precio)
    $(".cabecera-packs h3").eq(0).text(pack.nombre);
    $(".cabecera-packs h3").eq(1).text(pack.precio);

    // Descripción corta
    $(".packs-contenido p").text(pack.descripcion);

    // Descripción larga
    $(".descripcion-pack p").text(pack.detalle);

    // Imagen de fondo
    $(".packs-contenido").css("background-image", `url('${pack.imagen}')`);
  } else {
    // Si no se encuentra el pack, mostramos un aviso básico
    $(".cabecera-packs h3").eq(0).text("Pack no encontrado");
    $(".cabecera-packs h3").eq(1).text("");
    $(".packs-contenido p").text("El pack seleccionado no existe o ha sido eliminado.");
  }

});

function handleCompra(event){

    event.preventDefault();

    let form_valido = true;
    $('.error-texto').text(''); // Se limpian todos los <p> de la clase error-texto (del intento anterior)

    // Recogemos todos los datos del formulario
    const data = new FormData(document.forms['compra']);

    // VALIDACIÓN DEL FORMULARIO DE COMPRA

        // 1. Validación del nombre completo -> Mínimo 3 caracteres de longitud
        const nombre = data.get('nombreCompleto').trim();
        if(nombre.length < 3){
            $('#errorNombreCompleto').text('El nombre completo debe tener al menos 3 caracteres.');
            form_valido = false;
        }

        // 2. Validación del correo electrónico -> Valores tipo nombre@dominio.extensión
        const correo = data.get('correo');
        const regex_correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if(!regex_correo.test(correo)){
            $('#errorCorreo').text('El formato del correo no es válido.');
            form_valido = false;
        }

        // 3. Validación del tipo de tarjeta -> El usuario debe elegir uno de las 3 opciones obligatoriamente
        const tipo_tarjeta = data.get('tipoTarjeta');
        if(tipo_tarjeta === ""){
            $('#errorTipoTarjeta').text('Escoja una de las 3 opciones');
            form_valido = false;
        }

        // 4. Validación del número de tarjeta -> Debe tener 13, 15, 16 o 19 dígitos
        const num_tarjeta = data.get('numeroTarjeta');
        if(!(num_tarjeta.length == 13 || num_tarjeta.length == 15 || num_tarjeta.length == 16 ||
            num_tarjeta.length == 19)){
            $('#errorNumeroTarjeta').text('El número de tarjeta no es válido');
            form_valido = false;
        }

        // 5. Validación del titular de la tarjeta -> Mínimo 3 caracteres de longitud
        const titular = data.get('titularTarjeta').trim();
        if(titular.length < 3){
            $('#errorTitularTarjeta').text('El nombre del titular debe tener al menos 3 caracteres.');
            form_valido = false;
        }

        // 6. Validación de la fecha de caducidad
        const fecha_cad = data.get('fechaCaducidad');
        if (!fecha_cad) { // Se comprueba primero si está vacío
            $('#errorFechaCaducidad').text('Debe introducir una fecha.');
            form_valido = false;
        }

        else {
            const [anio, mes] = fecha_cad.split('-').map(Number); // Convierte a número
            const fecha_hoy = new Date();
            const anio_actual = fecha_hoy.getFullYear();
            const mes_actual = fecha_hoy.getMonth() + 1;

            if(anio < anio_actual || (anio === anio_actual && mes < mes_actual)){
                $('#errorFechaCaducidad').text('La tarjeta ha expirado');
                form_valido = false;
            }
        }
        
        // 7. Validación del CVV -> Debe tener 3 dígitos
        const cvv = data.get('cvv');
        const cvv_regex = /^\d{3}$/;
        if(!cvv_regex.test(cvv)){
            $('#errorCvv').text('El CVV debe tener 3 dígitos.');
            form_valido = false;
        }

        if (form_valido){
            alert('Compra realizada con éxito.');
            // Limpia todos los campos del formulario
            $('#formularioCompra')[0].reset();
        }
}

// Se asigna la función 'handleCompra' al evento 'submit'
document.forms['compra'].addEventListener('submit', handleCompra);

// LÓGICA DEL BOTÓN DE BORRADO
$('#btnBorrar').on('click', function(){
    // Limpia todos los campos del formulario
    document.forms['compra'].reset();
    // Limpia también cualquier mensaje de error que hubiera
    $('.error-texto').text('');
})