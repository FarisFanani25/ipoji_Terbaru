import React from "react";
import './FooterPenjual.css';
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const FooterPenjual = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer-penjual">
            <Container>
                <Row>
                    <Col lg="4">
                        <div className="logo">
                            <h1 className="text-white">Penjual IPOJI</h1>
                        </div>
                        <p className="footer__text mt-4">
                            Kami menyediakan berbagai macam produk berkualitas dengan harga terjangkau untuk memenuhi kebutuhan Anda. Hubungi kami untuk informasi lebih lanjut.
                        </p>
                    </Col>

                    <Col lg="2" className="d-flex justify-content-end">
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title">Tautan Berguna</h4>
                            <ListGroup>
                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='/penjual'>Dashboard</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='/penjual/anggota'>Anggota</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='/penjual/orders'>Pesanan</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='/penjual/products'>Produk</Link>
                                </ListGroupItem>

                            </ListGroup>
                        </div>
                    </Col>

                    <Col lg="4" className="d-flex justify-content-end">
                        <div className="footer__quick-links">
                            <h4 className="quick__links-title">Kontak Kami</h4>
                            <ListGroup className="footer__contact">
                                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                    <span><i className="ri-map-pin-line"></i></span>
                                    <p>Ngepoh, Metisih, Kecamatan Jiwan, Madiun</p>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                    <span><i className="ri-phone-line"></i></span>
                                    <p>085710283688</p>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                    <span><i className="ri-mail-line"></i></span>
                                    <p>berasin_ipoji@gmail.com</p>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>

                    <Col lg='12'>
                        <p className="footer__copyright">CopyRight {year} developed by Team Mobat-Mabit. All Right Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default FooterPenjual;
