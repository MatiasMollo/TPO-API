import React from "react";
import { Box, Container, Typography } from "@mui/material";
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

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
          <Typography>Riobamba 972</Typography>
          <Typography>
            <MapPinIcon width="15" /> 11 1576-4937 CABA, Buenos Aires
          </Typography>
        </Box>

        <Box>
          <Typography>
            <EnvelopeIcon width="15" /> Healthy-Dent@hotmail.com
          </Typography>
          <Typography>
            <PhoneIcon width="15" /> 11 1576-4937
          </Typography>
          <Typography display="block">
            © Hecho por Avilan Carlos, Mollo Matias y Pou Iara.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
