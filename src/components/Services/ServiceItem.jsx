import React from "react";
import "./services.css";
import "../../assets/css/fonts.css";

const ServiceItem = ({ title, description, isOpen, onToggle }) => {
  return (
    <div className="service_item">
      <div
        className="service_header"
        onClick={onToggle}
        style={{ cursor: "pointer" }}
      >
        <h3>
          <span className="service-item">{isOpen ? "-" : "+"}</span>
          {title}
        </h3>
      </div>
      <div className={`service_description-wrapper ${isOpen ? "open" : ""}`}>
        <p className="service_description">{description}</p>
      </div>
    </div>
  );
};

export default ServiceItem;
