const url = "https://spa-nirvana-backend.vercel.app/api/servicios";

//Traer Servicios
export const getServicios = async (limite = 0, pagina = 0) => {
  try {
    const respuesta = await fetch(`${url}?limite=${limite}&pagina=${pagina}`);
    const data = await respuesta.json();
    
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudieron obtener los servicios");
  }
}

//Traer Servicio por ID
export const getServicioById = async (id) => {
  try {
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
    throw new Error("No se pudo obtener el servicio");
  }
}

//Crear un nuevo Servicio
export const crearServicio = async (datos) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = {"Content-Type": "application/json; charset=UTF-8"};

    if (token) headers["x-token"] = token;

    const respuesta = await fetch(url, {
      method: "POST",
      body: JSON.stringify(datos),
      headers 
    });
    const data = await respuesta.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo crear el servicio");
  }
}

//Actualizar Servicio
export const actualizarServicio = async (id, datos) => {
  try {
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
    throw new Error("No se pudo actualizar el servicio");
  }
}

//Eliminar un Servicio
export const eliminarServicio = async (id) => {
  try {
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
    throw new Error("No se pudo eliminar el servicio");
  }
}