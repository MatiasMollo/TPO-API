import React, { useState } from "react";
import "./services.css";
import "../../assets/css/fonts.css";
import imgPaciente from "../../assets/services.jpg";
import ServiceItem from "./ServiceItem";
import { Typography } from "@mui/material";

const Services = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const servicesData = [
    {
      title: "Carillas dentales",
      description:
        "Tratamiento estético para mejorar la apariencia de los dientes.",
    },
    {
      title: "Aparatos dentales",
      description: "Alineación y corrección de dientes mediante ortodoncia.",
    },
    {
      title: "Blanqueamiento dental",
      description:
        "Procedimiento para aclarar el color natural de los dientes.",
    },
    {
      title: "Limpieza profesional",
      description:
        "Eliminación de placa y sarro para mantener dientes y encías saludables.",
    },
    {
      title: "Implantes dentales",
      description:
        "Sustitución de dientes perdidos mediante piezas artificiales fijas.",
    },
    {
      title: "Tratamiento de caries",
      description:
        "Eliminación de caries y restauración de piezas dañadas con resinas estéticas.",
    },
  ];

  return (
    <div className="services-container" id="services">
      <span className="services-image">
        <img src={imgPaciente} alt="" />
      </span>
      <span className="services_content">
        <Typography variant="h2">Mis servicios</Typography>
        <div className="services_list">
          {servicesData.map((service, index) => (
            <ServiceItem
              key={index}
              title={service.title}
              description={service.description}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </span>
    </div>
  );
};

export default Services;
