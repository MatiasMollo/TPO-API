import "../../assets/css/fonts.css";
import "./home.css";
import imgDoctor from "../../assets/img-doctor.jpg";
import React from "react";

const Home = () => {
  return (
    <div style={{ display: "flex" }} className="home_container" id="home">
      <span className="home_img">
        <img src={imgDoctor} alt="" />
      </span>
      <span className="home_description">
        <h1>Dr. Pedro Sánchez</h1>
        <h3>Dentista</h3>
        <p>{`¡Hola! 
Soy odontólogo egresado de la UBA, con más de 15 años de experiencia mejorando sonrisas. 
Realizo aparatos, blanqueamientos y limpiezas profesionales para que su sonrisa luzca más sana, estética y radiante.`}</p>
        <p>
          ¿Querés saber más de mí? <a href="">Descargá mi CV</a>
        </p>
        <button style={{ backgroundColor: "#01819d", color: "white" }}>
          Trabajemos juntos
        </button>{" "}
      </span>
    </div>
  );
};

export default Home;
