export function getJwtHeaders() {
  const token = document.cookie
    .split("; ")
    .find((c) => c.startsWith("authToken="))
    ?.split("=")[1];

  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function usuarioLogueado() {
  return getJwtHeaders().Authorization ? true : false;
}

export function matarSesion(navigate) {
  document.cookie = `authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict`;
  navigate("/");
}
