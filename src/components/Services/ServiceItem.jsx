import { Typography } from "@mui/material";
import "./services.css";

const ServiceItem = ({ title, description, isOpen, onToggle }) => {
  return (
    <div className="service_item">
      <div
        className="service_header"
        onClick={onToggle}
        style={{ cursor: "pointer" }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: 1,
          }}
          gutterBottom
        >
          <Typography
            sx={{
              color: "#01819d",
              fontWeight: "bold",
              paddingRight: "0.5em",
              display: "inline-block",
              fontSize: "1em",
            }}
          >
            {isOpen ? "-" : "+"}
          </Typography>
          {title}
        </Typography>
      </div>
      <div className={`service_description-wrapper ${isOpen ? "open" : ""}`}>
        <Typography
          borderBottom={"2.5px solid #01819d"}
          mb={4}
          sx={{ width: { xs: "100%", md: "50%" } }}
        >
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default ServiceItem;
