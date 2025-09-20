import Home from "../components/Home/Home";
import Services from "../components/Services/Services";
import Location from "../components/Location/Location";
import WorkWithMe from "../components/WorkWithMe/WorkWithMe";
import Footer from "../components/Footer/Footer";
import { Box } from "@mui/material";

export default function Index() {
  return (
    <>
      <Box component="main">
        <Home />
        <Services />
        <Location />
        <WorkWithMe />
      </Box>
      <Footer></Footer>
    </>
  );
}
