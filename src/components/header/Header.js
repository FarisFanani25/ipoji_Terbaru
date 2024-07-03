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
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        if (headerRef.current) {
          headerRef.current.classList.add("sticky-header");
        }
      } else {
        if (headerRef.current) {
          headerRef.current.classList.remove("sticky-header");
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
      menuRef.current.classList.toggle("active-menu");
    }
  };
  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav-wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>IPOJI</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef}>
              <ul className="menu">
                <li><NavLink to="/admin">DASHBOARD</NavLink></li>
                <li><NavLink to="/admin/user">PENGGUNA</NavLink></li>
                <li><NavLink to="/admin/listadmin">ARTIKEL</NavLink></li>
                <li><NavLink to="/admin/products">PRODUK</NavLink></li>
              </ul>
            </div>

            <div className="nav-icons">

              <div className="user-icon" onClick={togglePopup}>
                <motion.img
                  whileTap={{ scale: 1 }}
                  src={userIcon}
                  alt="User Icon"
                  className="user-icon-img"
                />
              </div>

              {showPopup && (
                <motion.div
                  className="popup"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <button onClick={() => alert('Logged out!')}>Log Out</button>
                </motion.div>
              )}

              <div className="mobile-menu">
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
