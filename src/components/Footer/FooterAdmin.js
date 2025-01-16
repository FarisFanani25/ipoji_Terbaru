import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "./FooterAdmin.css";

const FooterAdmin = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="custom-footer">
      <Container>
        <Row>
          <Col lg="5">
            <div className="custom-logo">
              <h1 className="text-white">IPOJI</h1>
            </div>
            <p className="custom-footer-text mt-4">
              Tempatnya beras sehat berkualitas untuk keluarga Anda! Kami bangga
              menyajikan beras pilihan yang kaya akan nutrisi, bebas dari bahan
              kimia berbahaya, dan diolah dengan standar tertinggi untuk
              memastikan kelezatan dan kualitasnya.
            </p>
          </Col>

          <Col lg="2" className="d-flex justify-content-end">
            <div className="custom-footer-quick-links">
              <h4 className="custom-quick-links-title">Useful Links</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="/home">Home</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="4" className="d-flex justify-content-end">
            <div className="custom-footer-quick-links custom-contact">
              <h4 className="custom-quick-links-title">Contact</h4>
              <ListGroup className="custom-footer-contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  <p>Ngepoh, Metisih, Kecamatan Jiwan, Madiun</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-line"></i>
                  </span>
                  <p>085710283688</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  <p>berasin_ipoji@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="12">
            <p className="custom-footer-copyright">
              CopyRight {year} developed by Team Mobat-Mabit. All Right Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterAdmin;
