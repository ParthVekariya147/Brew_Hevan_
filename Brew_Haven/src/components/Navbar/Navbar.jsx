import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import images from "../../constants/images";
import "./Navbar.css";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken"); 

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    setToggleMenu(false); 
    navigate("/login"); 
  };

  const handleSignUp = () => {
    setToggleMenu(false); 
    navigate("/register"); 
  };

  const handleMobileNavClick = (path) => {
    setToggleMenu(false); 
    navigate(path); 
  };

  return (
    <nav className="app__navbar"> 

      <div className="app__navbar-logo">
        <Link to="/">
          <img src={images.gericht} alt="Brew Haven Logo" />
        </Link>
      </div>

      <ul className="app__navbar-links">
        <li className="p__opensans">
          <Link to="/">Home</Link>
        </li>

        <li className="p__opensans">
          <Link to="/book-table">Booking</Link>
        </li>


        <li className="p__opensans">
          <Link to="/menu">Menu</Link>
        </li>

        <li className="p__opensans">
          <Link to="/gallery">Gallery</Link>
        </li>


        <li className="p__opensans">
          <Link to="/chef">Chef</Link>
        </li>

        <li className="p__opensans">
          <Link to="/laurels">Laurels</Link>
        </li>

        <li className="p__opensans">
          <Link to="/find-us">Find Us</Link>
        </li>

        <li className="p__opensans">
          <Link to="/about-us">About Us</Link>
        </li>

        <li className="p__opensans">
          <Link to="/contact-us">Contact Us</Link>
        </li>

     
      </ul>

      <div className="app__navbar-login">
        {token ? (
          <span
            className="p__opensans"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        ) : (
          <span
            className="p__opensans"
            onClick={handleSignUp}
            style={{ cursor: "pointer" }}
          >
            SignUp
          </span>
        )}
      </div>

 
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu
          color="#fff"
          fontSize={27}
          onClick={() => setToggleMenu(true)}
          aria-label="Open menu"
        />

        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu
              fontSize={27}
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
              aria-label="Close menu"
            />
            <ul className="app__navbar-smallscreen_links">

              <li className="p__opensans" onClick={() => handleMobileNavClick("/")}>
                Home
              </li>

              <li className="p__opensans" onClick={() => handleMobileNavClick("/book-table")}>
                Booking
              </li>


              <li className="p__opensans" onClick={() => handleMobileNavClick("/gallery")}>
                Gallery
              </li>

              <li className="p__opensans" onClick={() => handleMobileNavClick("/find-us")}>
                Find Us
              </li>

              <li className="p__opensans" onClick={() => handleMobileNavClick("/about-us")}>
                About Us
              </li>

              <li className="p__opensans" onClick={() => handleMobileNavClick("/contact-us")}>
                Contact Us
              </li>


              <li className="p__opensans" onClick={token ? handleLogout : handleSignUp}>
                {token ? "Logout" : "SignUp"}
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
