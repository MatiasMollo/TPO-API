import React from "react";
import location from "../../assets/location.jpg";
import Carousel from "../Carrousel/Carrousel";
import "./location.css";
import { Typography } from "@mui/material";
import opiniones from "../../assets/data/opinionesData";

const Location = () => {
  return (
    <>
      <div className="location_container" id="location">
        <div className="location_content">
          <span>
            <img src={location} alt="Consultorio Dental Health." />
          </span>
          <span>
            <Typography variant="h2">DentalHealth</Typography>
            <p>
              Mi espacio, dedicado al cuidado de la salud bucal y la estética
              dental. Cuento con tecnología de última generación y un enfoque
              personalizado para cada paciente.{" "}
            </p>
            <p>
              El objetivo es brindar tratamientos de calidad, combinando
              experiencia profesional, calidez humana y soluciones innovadoras
              para lograr sonrisas sanas y atractivas.
            </p>
            <Typography variant="h5" marginTop={2}>
              <i>📍</i> Barracas 3200, CABA
            </Typography>
          </span>
        </div>
        <div className="carrousel m-auto w-75">
          <Typography variant="h2" gutterBottom textAlign={"start"}>
            Algunos de mis clientes
          </Typography>
          <Carousel items={opiniones} />
        </div>
      </div>
    </>
  );
};

export default Location;
