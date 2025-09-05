import "./workWithMe.css";
import work from "../../assets/work.jpg";
import React from "react";

const WorkWithMe = () => {
  return (
    <div className="WorkWithMe_container">
      <span className="WorkWithMe_content">
        <h2>¡Trabajemos Juntos!</h2>
        <p>Reservá una cita conmigo, completando los siguientes datos:</p>

        <form action="" method="post">
          <input type="text" name="" id="" placeholder="Nombre y apellido" />
          <input type="text" name="" id="" placeholder="Telefono" />
          <input type="text" name="" id="" placeholder="E-mail" />

          <label htmlFor="obra-social">Obra social</label>
          <select name="obra-social" id="paises">
            <option value="">OSDE</option>
            <option value="">AMFFA</option>
            <option value="">PAMI</option>
          </select>

          <textarea
            name=""
            id=""
            placeholder="¿Cuál es tu motivo de consulta?"
          ></textarea>

          <button type="submit">Enviar</button>
        </form>
      </span>
      <span className="WorkWithMe_img">
        <img src={work} alt="" />
      </span>
    </div>
  );
};

export default WorkWithMe;
