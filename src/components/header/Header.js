import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import { motion } from "framer-motion";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/rice.png"; // Ensure this path is correct
import userIcon from "../../assets/images/user-icon.png";

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  const stickyHeaderFunc = () => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        if (headerRef.current) {
          headerRef.current.classList.add("user-sticky__header");
        }
      } else {
        if (headerRef.current) {
          headerRef.current.classList.remove("user-sticky__header");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  };

  useEffect(() => {
    const cleanup = stickyHeaderFunc();
    return () => cleanup();
  }, []);

  const menuToggle = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("user-active__menu");
    }
  };
  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <header className="user-header" ref={headerRef}>
      <Container>
        <Row>
          <div className="user-nav__wrapper">
            <div className="user-logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>IPOJI</h1>
              </div>
            </div>

            <div className="user-navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="user-menu">
                <li><NavLink to="/">BERANDA</NavLink></li>
                <li><NavLink to="/shop">KATALOG</NavLink></li>
                <li><NavLink to="/PesananSaya">PESANAN</NavLink></li>
                <li><NavLink to="/TentangKami">TENTANG KAMI</NavLink></li>
              </ul>
            </div>

            <div className="user-nav__icons">
              <span className="user-cart__icon">
                <NavLink to="/cardcoba">
                  <i className="ri-shopping-bag-line"></i>
                </NavLink>
              </span>

              <span className="user-cart__icon">
                <NavLink to="/notifikasi">
                <i className="ri-notification-line"></i>
                </NavLink>
              </span>

              <div className="user-user__icon" onClick={togglePopup}>
                <motion.img
                  whileTap={{ scale: 1 }}
                  src={userIcon}
                  alt="User Icon"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>

              {showPopup && (
                <motion.div
                  className="user-popup"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <button onClick={() => alert('Logged out!')}>Log Out</button>
                </motion.div>
              )}

              <div className="user-mobile__menu">
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
