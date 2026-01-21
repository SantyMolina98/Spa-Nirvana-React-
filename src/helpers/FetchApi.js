const url = `${import.meta.env.VITE_API_URL}`;

export const crearUsuario = async (datos) => {
  try{
    const respuesta = await fetch(`${url}/api/usuarios`, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await respuesta.json();

    return data;
  } catch (error) {
    console.log( error);
    return { msg: "Error al conectar con el backend" };
  }
}
