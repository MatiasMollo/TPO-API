import axios from "axios";
import { getJwtHeaders } from "../utils";

const API = `${import.meta.env.VITE_API_URL}/obraSocial`;

export function getObrasSociales() {
  return axios.get(API);
}

export function crearObraSocial(nombre) {
  return axios.post(
    API,
    { nombre },
    {
      headers: getJwtHeaders(),
    }
  );
}

export function editarObraSocial(id, nombre) {
  return axios.put(
    `${API}/${id}`,
    { nombre },
    {
      headers: getJwtHeaders(),
    }
  );
}

export function eliminarObraSocial(id) {
  return axios.delete(`${API}/${id}`, {
    headers: getJwtHeaders(),
  });
}
