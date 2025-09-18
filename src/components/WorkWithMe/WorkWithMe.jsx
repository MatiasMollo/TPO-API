import "./workWithMe.css";
import work from "../../assets/work.jpg";
import React from "react";
import { Typography, Button } from "@mui/material";

const WorkWithMe = () => {
  return (
    <div className="WorkWithMe_container" id="workWithMe">
      <span className="WorkWithMe_content">
        <Typography variant="h2">¡Trabajemos Juntos!</Typography>
        <Typography variant="h5" marginBottom={4}>
          Reservá una cita conmigo, completando los siguientes datos:
        </Typography>

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

          <Button
            variant="contained"
            // type="submit"
            sx={{
              background: "#01819d",
              color: "white",
              width: "max-content",
              marginTop: "1em",
              animation: "none",
            }}
          >
            Trabajemos juntos
          </Button>
        </form>
      </span>
      <span className="WorkWithMe_img">
        <img src={work} alt="" />
      </span>
    </div>
  );
};

export default WorkWithMe;
