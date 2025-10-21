/**
 * Registra un usuario, almacenando sus datos en el localStorage
 * @param {object} user Es un objeto que contiene los datos del usuario a guardar
 */
function register(user){
    const register_data_as_string = JSON.stringify(user); // Convierte los datos del registro en string
    localStorage.setItem("registered_user", register_data_as_string);
}

/**
 * Comprueba las credenciales de un usuario con las almacenadas en el localStorage
 * @param {string} user 
 * @param {string} password 
 * @returns 
 */
function login(user, password){
    const registered_user_str = localStorage.getItem('registered_user');
    if (!registered_user_str) {
        return 'USER_NOT_FOUND'; // No hay nadie registrado
    }
    const registered_user = JSON.parse(registered_user_str);
    
    if (!(user === registered_user.login && password === registered_user.password)){
        return 'USER_INVALID';
    }
    return 'USER_VALID';    
}

function getRegisteredUser() {
    const registered_user_str = localStorage.getItem('registered_user');
    if (!registered_user_str) return null;
    return JSON.parse(registered_user_str);
}


export { register, login, getRegisteredUser };