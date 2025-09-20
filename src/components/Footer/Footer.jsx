import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "left",
        backgroundColor: "#213547",
        color: "white",
        padding: 4,
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        <Box>
          <Typography>Calle de Cuello, 184</Typography>
          <Typography>📍 C.P. 28949 Madrid, España</Typography>
        </Box>

        <Box>
          <Typography>📩 Healthy-Dent@hotmail.com</Typography>
          <Typography>📞 912 345 678</Typography>
          <Typography display="block">
            © Hecho por Avilan Carlos, Mollo Matias y Pou Iara.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
