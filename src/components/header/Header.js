import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import { motion } from "framer-motion";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/rice.png"; // Ensure this path is correct
import userIcon from "../../assets/images/user-icon.png";

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>IPOJI</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                <li><NavLink to="/">BERANDA</NavLink></li>
                <li><NavLink to="/catalog">KATALOG</NavLink></li>
                <li><NavLink to="/order">PESANAN</NavLink></li>
                <li><NavLink to="/opportunity">TENTANG KAMI</NavLink></li>
              </ul>
            </div>

            <div className="nav__icons">
              <span className="cart__icon">
                <NavLink to="/cardcoba">
                  <i className="ri-shopping-bag-line"></i>
                </NavLink>
              </span>

              <NavLink to="/user" className="user__icon">
                <motion.img
                  whileTap={{ scale: 1 }}
                  src={userIcon}
                  alt="User Icon"
                  style={{ width: "30px", height: "30px" }}
                />
              </NavLink>

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
