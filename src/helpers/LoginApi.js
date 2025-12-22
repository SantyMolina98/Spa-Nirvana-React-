const url = "https://spa-nirvana-backend-copia.vercel.app/api/auth/login";


export const authLogin = async (datos) => {
  try{
    const respuesta = await fetch(url, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    
    const data = await respuesta.json();

    return data;

  } catch (error) {
    console.log(error);
    return { msg: "Error al conectar con el backend." };
  }
}