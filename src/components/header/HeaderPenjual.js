import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./HeaderPenjual.css";
import { motion } from "framer-motion";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/rice.png"; // Ensure this path is correct
import userIcon from "../../assets/images/user-icon.png";

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const notificationRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [notifications, setNotifications] = useState([]);

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

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setShowNotificationPopup(false);
    }
  };

  useEffect(() => {
    if (showNotificationPopup) {
      document.addEventListener("click", handleClickOutside, true);
    } else {
      document.removeEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showNotificationPopup]);

  const menuToggle = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("active-menu-penjual");
    }
  };

  const togglePopup = () => setShowPopup(!showPopup);
  const toggleNotificationPopup = () => setShowNotificationPopup(!showNotificationPopup);

  return (
    <header className="header-penjual" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav-wrapper-penjual">
            <div className="logo-penjual">
              <img src={logo} alt="logo" />
              <div>
                <h1>IPOJI</h1>
              </div>
            </div>

            <div className="navigation-penjual" ref={menuRef}>
              <ul className="menu-penjual">
                <li><NavLink to="/penjual">DASHBOARD</NavLink></li>
                <li><NavLink to="/penjual/products">PRODUK</NavLink></li>
                <li><NavLink to="/penjual/anggota">ANGGOTA</NavLink></li>
                <li><NavLink to="/penjual/orders">PESANAN</NavLink></li>
              </ul>
            </div>

            <div className="nav-icons-penjual">
              <div className="user-icon-penjual" onClick={togglePopup}>
                <motion.img
                  whileTap={{ scale: 1 }}
                  src={userIcon}
                  alt="User Icon"
                  className="user-icon-img-penjual"
                />
              </div>

              {showPopup && (
                <motion.div
                  className="popup-penjual"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <button onClick={() => alert('Logged out!')}>Log Out</button>
                </motion.div>
              )}

              <span className="notification-icon-penjual" onClick={toggleNotificationPopup}>
                <i className="ri-notification-line"></i>
              </span>

              {showNotificationPopup && (
                <motion.div
                  className="notification-popup-penjual"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  ref={notificationRef}
                >
                  {notifications.length === 0 ? (
                    <p>Tidak ada notifikasi</p>
                  ) : (
                    <ul>
                      {notifications.map((notification, index) => (
                        <li key={index}>{notification}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}

              <div className="mobile-menu-penjual">
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
