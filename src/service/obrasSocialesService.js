import axios from "axios";
import { getJwtHeaders } from "../utils";

const API = "http://localhost:3000/api/obraSocial";

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
