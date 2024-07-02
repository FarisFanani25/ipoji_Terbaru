import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./HeaderUser.css";
import { motion } from "framer-motion";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/rice.png"; // Ensure this path is correct
import userIcon from "../../assets/images/user-icon.png";

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const notificationRef = useRef(null);
  const userPopupRef = useRef(null);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [notifications, setNotifications] = useState([]);

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

  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotificationPopup(false);
    }

    if (userPopupRef.current && !userPopupRef.current.contains(event.target)) {
      setShowUserPopup(false);
    }
  };

  useEffect(() => {
    if (showNotificationPopup || showUserPopup) {
      document.addEventListener("click", handleClickOutside, true);
    } else {
      document.removeEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showNotificationPopup, showUserPopup]);

  const menuToggle = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("user-active__menu");
    }
  };

  const toggleUserPopup = () => setShowUserPopup(!showUserPopup);

  const toggleNotificationPopup = () => setShowNotificationPopup(!showNotificationPopup);

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

              <span className="user-cart__icon" onClick={toggleNotificationPopup}>
                <i className="ri-notification-line"></i>
              </span>

              {showNotificationPopup && (
                <motion.div
                  className="notification-popup"
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

              <div className="user-user__icon" onClick={toggleUserPopup}>
                <motion.img
                  whileTap={{ scale: 1 }}
                  src={userIcon}
                  alt="User Icon"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>

              {showUserPopup && (
                <motion.div
                  className="user-popup"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  ref={userPopupRef}
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