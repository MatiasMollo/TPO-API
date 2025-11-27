import axios from "axios";

export function login(inputs) {
  return axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, inputs);
}
