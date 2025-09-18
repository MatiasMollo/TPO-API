import React from "react";
import "./services.css";
import "../../assets/css/fonts.css";
import { Typography } from "@mui/material";

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
            marginBottom: 2,
          }}
          gutterBottom
        >
          <span className="service-item">{isOpen ? "-" : "+"}</span>
          {title}
        </Typography>
      </div>
      <div className={`service_description-wrapper ${isOpen ? "open" : ""}`}>
        <p className="service_description">{description}</p>
      </div>
    </div>
  );
};

export default ServiceItem;
