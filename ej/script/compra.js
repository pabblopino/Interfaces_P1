$(document).ready(function(){

    // LÓGICA DEL BOTÓN DE COMPRA

    $('#btnComprar').on('click', function() {
        let form_valido = true;
        $('.error-texto').text(''); // Se limpian todos los <p> de la clase error-texto (del intento anterior)

        // VALIDACIÓN DEL FORMULARIO DE COMPRA

        // 1. Validación del nombre completo -> Mínimo 3 caracteres de longitud
        const nombre = $('#nombreCompleto').val().trim();
        if(nombre.length < 3){
            $('#errorNombreCompleto').text('El nombre completo debe tener al menos 3 caracteres.');
            form_valido = false;
        }

        // 2. Validación del correo electrónico -> Valores tipo nombre@dominio.extensión
        const correo = $('#correo').val();
        const regex_correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if(!regex_correo.test(correo)){
            $('#errorCorreo').text('El formato del correo no es válido.');
            form_valido = false;
        }

        // 3. Validación del tipo de tarjeta -> El usuario debe elegir uno de las 3 opciones obligatoriamente
        const tipo_tarjeta = $('#tipoTarjeta').val();
        if(tipo_tarjeta === ""){
            $('#errorTipoTarjeta').text('Escoja una de las 3 opciones');
            form_valido = false;
        }

        // 4. Validación del número de tarjeta -> Debe tener 13, 15, 16 o 19 dígitos
        const num_tarjeta = $('#numeroTarjeta').val();
        if(!(num_tarjeta.length == 13 || num_tarjeta.length == 15 || num_tarjeta.length == 16 ||
            num_tarjeta.length == 19)){
            $('#errorNumeroTarjeta').text('El número de tarjeta no es válido');
            form_valido = false;
        }

        // 5. Validación del titular de la tarjeta -> Mínimo 3 caracteres de longitud
        const titular = $('#titularTarjeta').val().trim();
        if(titular.length < 3){
            $('#errorTitularTarjeta').text('El nombre del titular debe tener al menos 3 caracteres.');
            form_valido = false;
        }

        // 6. Validación de la fecha de caducidad
        const fecha_cad = $('#fechaCaducidad').val();
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
        const cvv = $('#cvv').val();
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
    })

    // LÓGICA DEL BOTÓN DE BORRADO
    $('#btnBorrar').on('click', function(){
        // Limpia todos los campos del formulario
        $('#formularioCompra')[0].reset();
        // Limpia también cualquier mensaje de error que hubiera
        $('.error-texto').text('');
    })
    
})