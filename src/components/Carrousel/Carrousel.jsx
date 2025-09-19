import React from "react";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carrousel.css";

const Carousel = ({ items }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <Card
          sx={{
            maxWidth: 345,
            backgroundColor: "#e0f9ff",
            textAlign: "left",
          }}
          key={index}
        >
          <CardMedia
            sx={{ height: 140 }}
            image={item.imagen}
            title="imagen paciente"
          />
          <CardContent key={index} sx={{ padding: 2, height: 180 }}>
            <Typography gutterBottom variant="h5" component="div">
              {item.nombre}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.opinion}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Slider>
  );
};

export default Carousel;
