import React from "react";
import location from "../../assets/location.jpg";
import Carousel from "../Carrousel/Carrousel";
import "./location.css";
import { Typography } from "@mui/material";

const Location = () => {
  const usuarios = [
    {
      nombre: "María López",
      imagen: "/resources/image/pacientes/MariaLopez.jpg",
      opinion: "Excelente servicio, rápido y muy atento.",
      puntuacion: 5.0,
    },
    {
      nombre: "Julián Torres",
      imagen: "/resources/image/pacientes/JulianTorrez.jpg",
      opinion: "Muy buena experiencia, lo recomendaría sin dudas.",
      puntuacion: 4.8,
    },
    {
      nombre: "Carla Fernández",
      imagen: "/resources/image/pacientes/CarlaFernandez.jpg",
      opinion: "Todo salió perfecto, superó mis expectativas.",
      puntuacion: 4.9,
    },
    {
      nombre: "Andrés Gómez",
      imagen: "/resources/image/pacientes/AndresGomez.jpg",
      opinion: "Gran atención al detalle, quedé muy conforme.",
      puntuacion: 4.7,
    },
    {
      nombre: "Lucía Ramírez",
      imagen: "/resources/image/pacientes/LuciaRamirez.jpg",
      opinion: "Muy buena calidad y rapidez en la entrega.",
      puntuacion: 4.6,
    },
    {
      nombre: "Diego Martínez",
      imagen: "/resources/image/pacientes/DiegoMartinez.jpg",
      opinion: "Excelente trato, volvería a elegirlos.",
      puntuacion: 4.9,
    },
  ];

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
          <Carousel items={usuarios} />
        </div>
      </div>
    </>
  );
};

export default Location;
