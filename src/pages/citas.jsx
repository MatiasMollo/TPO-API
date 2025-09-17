import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

// Repositorio temmporal hasta conectar DB
const citasIniciales = [
  {
    paciente: "María González",
    fecha: "14/1/2024",
    hora: "09:00",
    especialidad: "Cardiología",
    estado: "Sin confirmar",
    contacto: "+34 666 123 456",
    email: "maria.gonzalez@email.com",
    notas: "Primera consulta",
  },
  {
    paciente: "Carlos Rodríguez",
    fecha: "14/1/2024",
    hora: "10:30",
    especialidad: "Dermatología",
    estado: "Confirmada",
    contacto: "+34 677 987 654",
    email: "carlos.rodriguez@email.com",
    notas: "Revisión lunar",
  },
];

export default function Citas() {
  const [citas, setCitas] = useState(citasIniciales);

  const confirmarCita = (index) => {
    const nuevasCitas = [...citas];
    nuevasCitas[index].estado = "Confirmada";
    setCitas(nuevasCitas);
  };

  return (
    <div className="col-12 p-4 col-xl-10 col-xxl-8 mx-auto">
      <div className="d-flex justify-content-between align-items-center mb-2 mt-5">
        <div>
          <h1 className=" mb-1 text-start">Gestión de Citas Médicas</h1>
          <p className="text-secondary mb-0 text-start">
            Gestiona las citas médicas de tus pacientes de forma eficiente
          </p>
        </div>
        <div className="text-secondary">
          <span className="small">
            <CalendarDateRangeIcon width={20}></CalendarDateRangeIcon>
            {new Date().toDateString()}
          </span>
        </div>
      </div>

      <div className="card shadow mb-4 p-2">
        <div className="card-body">
          <h6 className="text-secondary mb-3 text-start">Filtros</h6>
          <div className="row">
            <div className="col-md-4 my-1">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Nombre del paciente..."
              />
            </div>
            <div className="col-md-4 my-1">
              <select className="form-select form-select-sm">
                <option>Todos los estados</option>
                <option>Sin confirmar</option>
                <option>Confirmada</option>
                <option>Realizada</option>
              </select>
            </div>
            <div className="col-md-4 my-1">
              <select className="form-select form-select-sm">
                <option>Todas las especialidades</option>
                <option>Cardiología</option>
                <option>Dermatología</option>
                {/* ...más especialidades */}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow p-2">
        <div className="card-body overflow-scroll">
          <h6 className="mb-3"> Citas Médicas ({citas.length})</h6>
          <table className="table table-sm table-hover align-middle">
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Especialidad</th>
                <th>Estado</th>
                <th>Contacto</th>
                <th>Notas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita, idx) => (
                <tr className="small" key={idx}>
                  <td>{cita.paciente}</td>
                  <td>{cita.fecha}</td>
                  <td>{cita.hora}</td>
                  <td>{cita.especialidad}</td>
                  <td>
                    {cita.estado === "Sin confirmar" && (
                      <span className="badge bg-secondary">Sin confirmar</span>
                    )}
                    {cita.estado === "Confirmada" && (
                      <span className="badge bg-primary">Confirmada</span>
                    )}
                    {cita.estado === "Realizada" && (
                      <span className="badge bg-success">Realizada</span>
                    )}
                  </td>
                  <td>
                    {cita.contacto}
                    <br />
                    <span className="text-secondary small">{cita.email}</span>
                  </td>
                  <td>{cita.notas}</td>
                  <td>
                    {cita.estado === "Sin confirmar" && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => confirmarCita(idx)}
                      >
                        Confirmar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
