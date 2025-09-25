import { InformationCircleIcon } from "@heroicons/react/24/outline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Card,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Grid
      container
      sx={{ minHeight: "100vh", overflow: "hidden" }} 
    >
      <Grid item size={{ xs: 0, md: 7, xl: 8 }} sx={{ height: "100%" }}>
        <Box
          component="img"
          src="/resources/image/home/clients.jpg"
          alt="Imagen de clientes"
          sx={{
            width: "100%",
            minHeight: "100vh", 
            objectFit: "cover",
            display: "block",
          }}
        />
      </Grid>
      <Grid
        item
        spacing={2}
        size={{ xs: 12, md: 5, xl: 4 }}
        sx={{
          bgcolor: "white",
          boxShadow: 3,
          p: 4,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        justifyContent={{ xs: "start", md: "center" }}
      >
        <Box
          maxWidth={"400px"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          p={{ xs: 1, md: 0 }}
        >
          <Typography variant="h2" marginTop={5}>
            ¡Bienvenido!
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Por favor, completá tus datos para ingresar
          </Typography>
          <form>
            <TextField
              fullWidth
              margin="normal"
              id="documento"
              label="Número de documento"
              variant="outlined"
            />

            <TextField
              fullWidth
              margin="normal"
              id="password"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="toggle password visibility"
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          margin: 0,
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                      {showPassword ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </button>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={<Checkbox id="recordar" />}
              label="Recordar el número de documento"
            />

            <Box display="flex" justifyContent="center" mt={2}>
              <Link to="/citas" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#01819d",
                    mt: 2,
                    px: 4,
                    py: 1,
                    display: "block",
                  }}
                >
                  Ingresar
                </Button>
              </Link>
            </Box>
          </form>
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 4,
              p: 2,
              bgcolor: "grey.50",
            }}
          >
            <Box ml={2}>
              <InformationCircleIcon width="24" className="text-primary" />
              <Typography variant="body2" fontWeight="bold">
                No compartas tus claves.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nunca te solicitaremos esta información por redes sociales,
                teléfono o email.
              </Typography>
            </Box>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}
