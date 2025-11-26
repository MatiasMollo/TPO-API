import axios from "axios";
import { getJwtHeaders } from "../utils";

const api = "http://localhost:3000/api/citas";



export async function getCitas(params = {}, isJwt = false) {
  const config = { params };
  if (isJwt) {
    config.headers = getJwtHeaders();
  }

  const res = await axios.get(api, config);
  return res.data.citas;
}

export async function confirmarCita(id) {
  const res = await axios.put(
    `${api}/${id}/confirm`,
    {},
    { headers: getJwtHeaders() }
  );
  return res.data.cita;
}

export async function cancelarCita(id) {
  const res = await axios.put(
    `${api}/${id}/cancel`,
    {},
    { headers: getJwtHeaders() }
  );
  return res.data.cita;
}

export async function crearCita(data) {
  const res = await axios.post(api, data);
  return res.data.cita;
}
