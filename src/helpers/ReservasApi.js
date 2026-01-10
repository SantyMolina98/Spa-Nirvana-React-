const url = "https://spa-nirvana-backend.vercel.app/api/reservas";

const token = localStorage.getItem("token");
const limite = 100;

//Traer Reservas
export const getReservas = async (desde = 0) => {
  try {
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