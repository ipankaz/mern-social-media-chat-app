import React, { useState } from "react";
import "./style.css";
import WebsiteLogo from "../../../Media/profilePic.jpg";
import { NavLink } from 'react-router-dom';
// import { Row } from "react-bootstrap";

/**
 * @author
 * @function NavBar
 **/

const NavBar = (props) => {
  const [navClass, setNavClass] = useState("nav");

  const showMenu = () => {
    if (navClass === "nav") {
      setNavClass("nav show");
    }
  };
  const closeMenu = () => {
    if (navClass === "nav show") {
      setNavClass("nav");
    }
  };

  return (
    <>
    <header className="header">
      <a href="/" className="header_logo">
        GeekGram
      </a>
      <ion-icon
        name="menu-outline"
        class="header_toggle"
        id="nav-toggle"
        onClick={showMenu}
      ></ion-icon>
      <nav className={navClass} id="nav-menu">
        <div className="nav_content bd-grid-1">
          <ion-icon
            name="close-outline"
            class="nav_close"
            id="nav-close"
            onClick={closeMenu}
          ></ion-icon>
          <div className="nav_perfil">
            <div className="nav_img">
              <img src={WebsiteLogo} alt="website logo"></img>
            </div>
            <div>
              <NavLink exact to="/" className="nav_name">
                GeekGram
              </NavLink>
              <span className="nav_profession">Chat Application</span>
            </div>
          </div>
          <div className="nav_menu">
            <ul className="nav_list">
              <li className="nav_item">
                <NavLink exact to="/" className="nav_link active-1">
                  Home
                </NavLink>
              </li>
              <li className="nav_item">
                <NavLink to="/chat" className="nav_link">
                  Chat
                </NavLink>
              </li>
              <li className="nav_item">
                <NavLink to="/search" className="nav_link">
                  Search
                </NavLink>
              </li>
              <li className="nav_item">
                <NavLink to="/myprofile" className="nav_link">
                  My Profile
                </NavLink>
              </li>
              <li className="nav_item">
                <NavLink to="/about" className="nav_link">
                  About
                </NavLink>
              </li>
            </ul>
          </div>
          {/* <div className="nav_social">
            <a href="" className="nav_social-icon">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
            <a href="" className="nav_social-icon">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </div> */}
          <div className="nav_signout">
            <span className="nav_signout-span">Signout</span>
          </div>
        </div>
      </nav>
    </header>
    {/* <Row>{props.children}</Row> */}
  </>
  );
};

export default NavBar;
