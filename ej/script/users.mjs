/**
 * Registra un usuario, almacenando sus datos en el localStorage
 * @param {object} user Es un objeto que contiene los datos del usuario a guardar
 */
function register(user) {
    // Recuperar usuarios existentes o array vacío
    const usuarios = JSON.parse(localStorage.getItem('registered_users')) || [];

    // Verificar si ya existe el login
    const existe = usuarios.some(u => u.login === user.login);
    if (existe) {
        alert('Ese login ya está registrado.');
        return false;
    }

    // Añadir el nuevo usuario
    usuarios.push(user);
    localStorage.setItem('registered_users', JSON.stringify(usuarios));
    return true;
}

/**
 * Comprueba las credenciales de un usuario con las almacenadas en el localStorage
 * @param {string} user 
 * @param {string} password 
 * @returns 
 */
function login(user, password) {
    const usuarios = JSON.parse(localStorage.getItem('registered_users')) || [];

    if (usuarios.length === 0) {
        return 'USER_NOT_FOUND'; // No hay usuarios
    }

    const usuarioEncontrado = usuarios.find(u => u.login === user && u.password === password);
    if (!usuarioEncontrado) {
        return 'USER_INVALID'; // No coincide login o password
    }

    // Guardar quién está logueado actualmente
    sessionStorage.setItem('sesionIniciada', usuarioEncontrado.login);
    return 'USER_VALID';
}

/**
 * Devuelve el usuario actualmente logueado
 * @returns {object|null} Usuario activo o null
 */
function getRegisteredUser() {
    const usuarios = JSON.parse(localStorage.getItem('registered_users')) || [];
    const loginActivo = sessionStorage.getItem('sesionIniciada');
    if (!loginActivo) return null;

    return usuarios.find(u => u.login === loginActivo) || null;
}

export { register, login, getRegisteredUser };