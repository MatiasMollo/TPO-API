import imgDoctor from "../../assets/img-doctor.jpg";
import { Button, Typography, Grid, Box } from "@mui/material";

const Home = () => {
  return (
    <Grid
      container
      id="home"
      sx={{ height: { md: "calc(100vh + 68px)", sx: "auto" } }}
      alignItems="center"
      spacing={2}
      overflow={"hidden"}
    >
      <Grid item size={{ xs: 12, md: 6 }}>
        <Box
          component="img"
          src={imgDoctor}
          alt="Retrato Dr Sanchez"
          sx={{
            width: "100%",
            backgroundSize: "cover",
          }}
        />
      </Grid>
      <Grid
        item
        size={{ xs: 12, md: 6 }}
        sx={{ paddingLeft: "4em", textAlign: "left" }}
        paddingRight={7}
        paddingBlock={{ xs: 4, md: 0 }}
      >
        <Typography
          variant="h1"
          sx={{ marginLeft: "-0.05em", lineHeight: 0.9, mb: 1.5 }}
        >
          Dr. Pedro Sánchez
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: "550", textTransform: "uppercase" }}
          gutterBottom
        >
          Dentista
        </Typography>
        <Box gap={2}>
          <Typography>
            ¡Hola! Soy odontólogo egresado de la UBA, con más de 15 años de
            experiencia mejorando sonrisas. Realizo aparatos, blanqueamientos y
            limpiezas profesionales para que su sonrisa luzca más sana, estética
            y radiante.
          </Typography>
          <Typography>
            ¿Querés saber más de mí?
            {/* TODO: que descargue el CV */}{" "}
            <Typography variant="button">Descargá mi CV</Typography>
          </Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={() =>
            document
              .getElementById("workWithMe")
              .scrollIntoView({ behavior: "smooth" })
          }
          sx={{ borderColor: "#01819d", color: "#01819d", marginTop: 3 }}
        >
          Trabajemos juntos
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
