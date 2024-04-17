import React from "react";
import './footer.css';
import { Container, Row, Col, ListGroup, ListGroupItem, List } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = () => {

    const year = new Date().getFullYear()
    return (
    <footer className="footer">
        <Container>
            <Row>
                <Col lg="4">
                <div className="logo">
                            <div>
                                <h1 className="text-white">IPOJI</h1>
                            </div>
                        </div>
                        <p className="footer__text mt-4">
                                blablabalbalbalbalbalbalbwdbjsdbahevfhevcb
                                csdchvedcwecfw
                                ecfwjhevfwefoi
                            </p>
                </Col>
                
                <Col lg="3">
                    <div className="footer__quick-links">
                        <h4 className="quick__links-title">Top Categories</h4>
                        <ListGroup>
                            <ListGroupItem className="ps-0 border-0">
                                <Link to='#'>beras sehat</Link>
                            </ListGroupItem>

                            <ListGroupItem className="ps-0 border-0">
                                <Link to='#'>pupuk</Link>
                            </ListGroupItem>

                            <ListGroupItem className="ps-0 border-0">
                                <Link to='#'>beras premium</Link>
                            </ListGroupItem>

                            <ListGroupItem className="ps-0 border-0">
                                <Link to='#'>beras original</Link>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </Col>

                <Col lg="2">
                <div className="footer__quick-links">
                        <h4 className="quick__links-title">UseFul Links</h4>
                        <ListGroup>
                            <ListGroupItem className="ps-0 border-0">
                                <Link to='/shop'>Shop</Link>
                            </ListGroupItem>

                            <ListGroupItem className="ps-0 border-0">
                                <Link to='/cart'>Cart</Link>
                            </ListGroupItem>

                            <ListGroupItem className="ps-0 border-0">
                                <Link to='/login'>Login</Link>
                            </ListGroupItem>

                            <ListGroupItem className="ps-0 border-0">
                                <Link to='#'>Privacy Policy</Link>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </Col>

                <Col lg="3">
                <div className="footer__quick-links">
                        <h4 className="quick__links-title">Contact</h4>
                        <ListGroup className="footer__contact">
                            <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                <span><i class="ri-map-pin-line"></i></span>
                                <p>ds.kaligunting kec.mejayan</p>
                            </ListGroupItem>

                            <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                <span><i class="ri-phone-line"></i></span>
                                <p>085710283688</p>
                            </ListGroupItem>

                            <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                <span><i class="ri-mail-line"></i></span>
                                <p>djakafernando01@gmail.com</p>
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

export default Footer;
