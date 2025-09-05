import React from "react";
import location from "../../assets/location.jpg";
import Carousel from "../Carrousel/Carrousel";
import "./location.css";

const Location = () => {
  const items = [
    { title: "Servicio 1", description: "Descripción del servicio 1" },
    { title: "Servicio 2", description: "Descripción del servicio 2" },
    { title: "Servicio 3", description: "Descripción del servicio 3" },
    { title: "Servicio 2", description: "Descripción del servicio 2" },
  ];

  return (
    <>
      <div className="location_container">
        <div className="location_content">
          <span>
            <img src={location} alt="Consultorio Dental Health." />
          </span>
          <span>
            <h2>DentalHealth</h2>
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
            <h3>
              <i></i>Barracas 3200, CABA
            </h3>
          </span>
        </div>
        <div className="carrousel">
          <h2>Algunos de mis clientes</h2>
          <Carousel items={items} />
        </div>
      </div>
    </>
  );
};

export default Location;
