import "./header.css";
import { useEffect, useState } from "react";
import diente from "../../assets/diente.png";
import user from "../../assets/user.png";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollNav, setScrollNav] = useState(false);

  const links = [
    { name: "home", path: "home" },
    { name: "about", path: "about" },
    { name: "projects", path: "projects" },
    { name: "contact", path: "contact" },
  ];

  // Scroll hacia arriba
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cambiar estilo del header al scrollear
  const changeNav = () => {
    if (window.scrollY >= 80) setScrollNav(true);
    else setScrollNav(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
    return () => window.removeEventListener("scroll", changeNav);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no_scroll", showMenu);
  }, [showMenu]);

  return (
    <header className={scrollNav ? "scroll_header" : ""}>
      <nav>
        <span className="nav_icon">
          <img src={diente} alt="imagen diente" />
          <a href="#home" className="nav_logo" onClick={scrollTop}>
            Dr Sanchez
          </a>
        </span>
        <span className="nav_icon ">
          <img src={user} alt="login icon" className="user_icon" />
        </span>
      </nav>
    </header>
  );
};

export default Header;
