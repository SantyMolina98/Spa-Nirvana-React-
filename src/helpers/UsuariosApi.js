const url = "https://spa-nirvana-backend.vercel.copia.app/api/usuarios";
//Traer Usuarios
export const getUsuarios = async (desde = 0) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = {"Content-Type": "application/json; charset=UTF-8"};

    if (token) headers["x-token"] = token;

    const respuesta = await fetch(`${url}?limite=${limite}&desde=${desde}`, {
      method: "GET",
      headers 
    });
    const data = await respuesta.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudieron obtener los usuarios");
  }
}

//Traer Usuario por ID
export const getUsuarioById = async (id) => {
  try{
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = {"Content-Type": "application/json; charset=UTF-8"};  

    if (token) headers["x-token"] = token;

    const respuesta = await fetch(`${url}/${id}`, { 
      method: "GET",
      headers 
    });
    const data = await respuesta.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo obtener el usuario");
  }
}

//Crear un nuevo Usuario (Registro)
export const crearUsuario = async (datos) => {
  try{
    const respuesta = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
    if(!respuesta.ok){
      throw new Error(data.msg || "No se pudo crear el usuario");
    }
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo crear el usuario");
  }
}

//Actualizar Usuario
export const actualizarUsuario = async (id, datos) => {
  try{
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = {"Content-Type": "application/json; charset=UTF-8"};

    if (token) headers["x-token"] = token;

    const respuesta = await fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers 
    });
    const data = await respuesta.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo actualizar el usuario");
  }
}

//Eliminar Usuario (no físicamente)
export const eliminarUsuario = async (id) => {
  try{
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = {"Content-Type": "application/json; charset=UTF-8"};

    if (token) headers["x-token"] = token;

    const respuesta = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers
    });
    const data = await respuesta.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo eliminar el usuario");
  }
}

export const solicitarRecuperacion = async (email) => {
  try {
    const respuesta = await fetch(`${url}/olvide-password`, {
      method: "POST",
      body: JSON.stringify({ correo: email }),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al solicitar recuperación");
  }
}

export const restablecerContrasena = async (token, newPassword) => {
  try {    
    const respuesta = await fetch(`${url}/nuevo-password/${token}`, {
      method: "POST",
      body: JSON.stringify({ password: newPassword }),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al restablecer contraseña");
  }
}