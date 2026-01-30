const url = `${import.meta.env.VITE_API_URL}/api/reservas`;

const limite = 100;

//Traer Reservas
export const getReservas = async (desde = 0) => {
  try {
    const token = localStorage.getItem("token");
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
    throw new Error("No se pudieron obtener las reservas");
  }
}

//Subir Reservas
export const crearReserva = async (datos) => {
  try {
    const token = localStorage.getItem("token");
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
    throw new Error("No se pudo crear la reserva");
  }
}


//Eliminar Reservas
export const eliminarReserva = async (id) => {
  try {
    const token = localStorage.getItem("token");
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
    throw new Error("No se pudo eliminar la reserva");
  }
}