# 📱 Sistema de Gestión de Citas Médicas – Frontend

Este proyecto es la aplicación web del sistema de gestión de citas médicas.  
Está desarrollado con **React** y consume la API provista por el backend.

---

## 🚀 Funcionalidades

### 👤 Pacientes
- Solicitan un turno completando:
  - Nombre
  - Email
  - Obra social
  - Motivo
  - Fecha 
  - Hora 
- Reciben un email confirmando la solicitud (procesado por el backend).
- El paciente se registra automáticamente la primera vez que solicita un turno.

### 🧑‍⚕️ Médicos (Panel Admin)
- Ver lista de citas pendientes
- Confirmar una cita: el cliente recibe email
- Cancelar una cita: el cliente recibe email
- Gestionar obras sociales:
  - Agregar nuevas
  - Eliminar existentes

---

## 📦 Requisitos

- Node.js (>=16 recomendado)
- npm
- El backend corriendo localmente o en un servidor accesible
- Especificar la URL del backend (API) en el archivo .env (ejemplo en .env.example)

---

## 🔧 Instalación

### 1️⃣ Clonar repositorio
```bash
git clone https://github.com/MatiasMollo/TPO-API
cd TPO-API
npm i
npm run dev
