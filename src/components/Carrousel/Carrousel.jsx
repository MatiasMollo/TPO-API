import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carrousel.css";
import { useEffect, useState } from "react";

const Carousel = ({ items }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!items || items.length === 0) {
      setLoading(false);
      return;
    }

    const imagePromises = items.map(
      (item) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = item.imagen;
          img.onload = resolve;
          img.onerror = resolve;
        })
    );

    const minDelay = new Promise((resolve) => setTimeout(resolve, 1500));
    Promise.all([...imagePromises, minDelay]).then(() => {
      setLoading(false);
    });
  }, [items]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
        }}
      >
        <CircularProgress
          sx={{ color: "rgb(1, 129, 157)" }}
          variant="indeterminate"
        />
      </Box>
    );
  }

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
            component="img" // 👈 mejor usar src en vez de image
            sx={{ height: 140 }}
            src={item.imagen}
            alt="imagen paciente"
          />
          <CardContent sx={{ padding: 2, height: 110 }}>
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
