import axios from "axios";

const api = "http://localhost:3000/api/citas";

function authHeader() {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getCitas(params = {}) {
  const res = await axios.get(api, { params });
  return res.data.citas;
}

export async function confirmarCita(id) {
  const res = await axios.put(
    `${api}/${id}/confirm`,
    {},
    { headers: authHeader() }
  );
  return res.data.cita;
}

export async function cancelarCita(id) {
  const res = await axios.put(
    `${api}/${id}/cancel`,
    {},
    { headers: authHeader() }
  );
  return res.data.cita;
}

export async function crearCita(data) {
  const res = await axios.post(api, data);
  return res.data.cita;
}
