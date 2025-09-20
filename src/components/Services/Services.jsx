import React, { useState } from "react";
import imgPaciente from "../../assets/services.jpg";
import ServiceItem from "./ServiceItem";
import { Typography, Grid, Box } from "@mui/material";
import servicesData from "../../assets/data/servicesData.js";

const Services = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <Grid
      container
      id="services"
      minHeight={{ xs: 0, md: "calc(100vh + 68px)" }}
      sx={{
        boxSizing: "border-box",
      }}
      alignItems="center"
      spacing={2}
      overflow={"hidden"}
      backgroundColor="#e0f9ff"
      paddingBlock={{ xs: 4, md: 0 }}
    >
      <Grid item size={{ xs: 12, md: 6 }} overflow={"hidden"}>
        <Box
          component="img"
          src={imgPaciente}
          alt="Retrato Dr Sanchez"
          sx={{
            backgroundSize: "cover",
            width: "100%",
            height: "calc(100vh - 6em)",
            objectFit: "cover",
          }}
          display={{ xs: "none", md: "block" }}
        />
      </Grid>
      <Grid
        item
        size={{ xs: 12, md: 6 }}
        sx={{ paddingLeft: "4em", textAlign: "left" }}
        paddingRight={7}
      >
        <Typography variant="h2" gutterBottom>
          Mis servicios
        </Typography>
        {servicesData.map((service, index) => (
          <ServiceItem
            key={index}
            title={service.title}
            description={service.description}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Services;
