const url = "https://spa-nirvana-backend.vercel.app/api/categorias";

const token = localStorage.getItem("token");
const limite = 8;

//Traer todas las categorías
export const getCategorias = async (desde = 0) => {
  try {
    const respuesta = await fetch(`${url}?limite=${limite}&desde=${desde}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });

    const data = await respuesta.json();

    return data;
  } catch (error) {
    console.log(error);
    return { msg: "No se pudo obtener las categorías." };
  }
}

//Traer categoría por ID
export const getCategoriaById = async (id) => {
  try {
    const respuesta = await fetch(`${url}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });

    const data = await respuesta.json();

    return data;
  } catch (error) {
    console.log(error);
    return { msg: "No se pudo obtener la categoría." };
  }
}

//Crear nueva categoría
export const crearCategoria = async (datos) => {
  try {
    const respuesta = await fetch(url, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });

    const data = await respuesta.json();

    return data;
  } catch (error) {
    console.log(error);
    return { msg: "No se pudo crear la categoría." };
  }
}

//Actualizar categoría
export const actualizarCategoria = async (id, datos) => {
  try {
    const respuesta = await fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });

    const data = await respuesta.json();

    return data;
  } catch (error) {
    console.log(error);
    return { msg: "No se pudo actualizar la categoría." };
  }
}

//Eliminar categoría
export const eliminarCategoria = async (id) => {
  try {
    const respuesta = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });

    const data = await respuesta.json();

    return data;
  } catch (error) {
    console.log(error);
    return { msg: "No se pudo eliminar la categoría." };
  }
}