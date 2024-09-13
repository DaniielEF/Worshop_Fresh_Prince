export const getData = async (url) => {
  try {
    const respuesta = await fetch(url)
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error("Ocurrió un error al realizar la petición GET: " + error)
  }
}