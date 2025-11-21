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
  FormControlLabel,
  Checkbox,
  Card,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login successful:", response.data);
      localStorage.setItem("authToken", response.data.token);
      navigate("/citas");
    } catch (err) {

      if (err.response.data.error) setError(err.response.data.error);
      else if (err.response.data.message) setError(err.response.data.message);
      else
        setError(
          "Ocurrió un error a la hora de realizar el login. Por favor, reintente más tarde."
        );
        
    } finally {
      setLoading(false);
    }
  }

  return (
    <Grid container sx={{ minHeight: "100vh", overflow: "hidden" }}>
      <Grid item size={{ xs: 0, md: 7, xl: 8 }} sx={{ height: "100%" }}>
        <Box
          component="img"
          src="/resources/image/home/clients.jpg"
          alt="Imagen de clientes"
          sx={{
            width: "100%",
            minHeight: "105vh",
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

          {error && (
            <Alert
              severity="error"
              sx={{
                width: "90%",
                margin: "1em 0em",
              }}
            >
              {error}
            </Alert>
          )}

          <form>
            <TextField
              fullWidth
              margin="normal"
              id="documento"
              label="Número de documento"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              margin="normal"
              id="password"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
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
              <Button
                onClick={handleLoginSubmit}
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: "#01819d",
                  mt: 2,
                  px: 4,
                  py: 1,
                  display: "block",
                }}
              >
                {loading ? "Cargando..." : "Ingresar"}
              </Button>
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
