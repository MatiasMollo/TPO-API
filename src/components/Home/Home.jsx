import "../../assets/css/fonts.css";
import "./home.css";
import imgDoctor from "../../assets/img-doctor.jpg";
import React from "react";
import { Button, Typography } from "@mui/material";

const Home = () => {
  return (
    <div style={{ display: "flex" }} className="home_container" id="home">
      <span className="home_img">
        <img src={imgDoctor} alt="" />
      </span>
      <span className="home_description">
        <Typography variant="h1" sx={{ marginLeft: "-0.05em" }}>
          Dr. Pedro Sánchez
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: "550", textTransform: "uppercase" }}
          gutterBottom
        >
          Dentista
        </Typography>

        <p>{`¡Hola! 
Soy odontólogo egresado de la UBA, con más de 15 años de experiencia mejorando sonrisas. 
Realizo aparatos, blanqueamientos y limpiezas profesionales para que su sonrisa luzca más sana, estética y radiante.`}</p>
        <p>
          ¿Querés saber más de mí? <a href="">Descargá mi CV</a>
        </p>
        <Button
          variant="outlined"
          onClick={() =>
            document
              .getElementById("workWithMe")
              .scrollIntoView({ behavior: "smooth" })
          }
          sx={{ borderColor: "#01819d", color: "#01819d" }}
        >
          Trabajemos juntos
        </Button>
      </span>
    </div>
  );
};

export default Home;
