import axios from "axios";

const API = "http://localhost:3000/api/obraSocial";

export function getObrasSociales() {
  return axios.get(API);
}

export function crearObraSocial(nombre) {
  return axios.post(API, { nombre }, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
  });
}

export function editarObraSocial(id, nombre) {
  return axios.put(`${API}/${id}`, { nombre }, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
  });
}

export function eliminarObraSocial(id) {
  return axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
  });
}
