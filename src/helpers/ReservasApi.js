const url = "https://spa-nirvana.vercel.app/api/reservas";

//Traer Reservas
export const getReservas = async (desde = 0) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = {"Content-Type": "application/json; charset=UTF-8"};

    if (token) headers["x-token"] = token;

    const respuesta = await fetch(`${url}?limite=100&desde=${desde}`, {
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