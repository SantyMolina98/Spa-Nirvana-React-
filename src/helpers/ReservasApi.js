const url = `${import.meta.env.VITE_API_URL}/api/reservas`;

const limite = 100;

//Traer Reservas del usuario autenticado
export const getReservas = async (desde = 0, estado = null) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {"Content-Type": "application/json; charset=UTF-8"};

    if (token) headers["x-token"] = token;

    const urlCompleta = `${url}?limite=${limite}&desde=${desde}`;

    const respuesta = await fetch(urlCompleta, {
      method: "GET",
      headers
    });
    
    const data = await respuesta.json();

    
    if (data.reservas && estado) {
      const reservasOriginales = data.reservas.length;
      data.reservas = data.reservas.filter(reserva => 
        reserva.estado && reserva.estado.toLowerCase() === estado.toLowerCase()
      );
    }

    return data;
  } catch (error) {
    console.log("Error en getReservas:", error);
    throw new Error("No se pudieron obtener las reservas");
  }
}

//Traer TODAS las reservas (solo Admin)
export const getReservasAdmin = async (desde = 0) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {"Content-Type": "application/json; charset=UTF-8"};

    if (token) headers["x-token"] = token;

    const respuesta = await fetch(`${url}/admin?limite=${limite}&desde=${desde}`, {
      method: "GET",
      headers
    });
    
    const data = await respuesta.json();

    return data;
  } catch (error) {
    console.log("Error en getReservasAdmin:", error);
    throw new Error("No se pudieron obtener las reservas");
  }
}

//Subir Reservas
export const crearReserva = async (datos) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {"Content-Type": "application/json; charset=UTF-8"};

    if (token) headers["x-token"] = token;

    console.log("[ReservasApi] Enviando reserva:", datos);

    const respuesta = await fetch(url, {
      method: "POST",
      body: JSON.stringify(datos),
      headers 
    });
    
    const data = await respuesta.json();
    console.log("[ReservasApi] Respuesta del servidor (status " + respuesta.status + "):", data);

    // Si el servidor responde con error, lanzar el mensaje del backend
    if (!respuesta.ok || data.ok === false) {
      const errorMsg = data.msg || data.message || "Error al crear la reserva";
      console.error("[ReservasApi] Error del backend:", errorMsg);
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error("[ReservasApi] Error en crearReserva:", error);
    throw error;
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