import Carousel from "../Carrousel/Carrousel";
import { Typography, Grid, Box } from "@mui/material";
import opiniones from "../../data/opinionesData";

const Location = () => {
  return (
    <>
      <Grid
        container
        alignItems="center"
        spacing={2}
        overflow={"hidden"}
        id="location"
      >
        <Box
          component="iframe"
          src="//www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6568.51371145146!2d-58.40394642229004!3d-34.59766589999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccba45ed22631%3A0xc5de50623b724b21!2sHealthy%20Dent!5e0!3m2!1ses!2sar!4v1758402457198!5m2!1ses!2sar"
          sx={{
            width: { xs: "100%", md: "49.4%" },
            border: 0,
            minHeight: "400px",
            backgroundColor: "transparent",
            padding: { md: "1em 0 0 1em", xs: 0 },
            marginRight: { md: "-1em", xs: 0 },
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <Grid
          item
          size={{ xs: 12, md: 6 }}
          sx={{ paddingInline: "4em", textAlign: "left" }}
        >
          <Typography variant="h2">Healthy Dent</Typography>
          <Typography>
            Mi espacio, dedicado al cuidado de la salud bucal y la estética
            dental. Cuento con tecnología de última generación y un enfoque
            personalizado para cada paciente.
          </Typography>
          <Typography gutterBottom>
            El objetivo es brindar tratamientos de calidad, combinando
            experiencia profesional, calidez humana y soluciones innovadoras
            para lograr sonrisas sanas y atractivas.
          </Typography>
          <Typography variant="button" marginTop={2}>
            <i>📍</i> Riobamba 972, CABA
          </Typography>
        </Grid>
      </Grid>
      <Grid
        sx={{
          margin: "auto",
          width: "80%",
          paddingBottom: "4em",
          paddingTop: "4em",
          paddingInline: "4em",
          boxSizing: "border-box",
          display: "block",
        }}
        className="carrousel"
      >
        <Typography variant="h4" gutterBottom textAlign={"start"}>
          Algunos de mis pacientes
        </Typography>
        <Carousel items={opiniones} />
      </Grid>
    </>
  );
};

export default Location;
