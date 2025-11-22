import axios from "axios";

export function login(inputs) {
  return axios.post("http://localhost:3000/api/auth/login", inputs);
}
