import React from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../../assets/data/products";

import Helmet from "../../components/Helmet/Helmet";
import "../../styles/home.css";

import { Container, Row, Col } from "reactstrap";
import heroImg from '../../assets/images/beras.png';

import Services from "../../services/Services";
import ProductsList from "../../components/UI/ProductsList";
import { useEffect, useState } from "react";
import ArtikelList from "../../components/UI/ArtikelList";

const Home = ( ) => {


    return (
    <Helmet title={"Home"}>
        <section className="hero__section">
            <Container>
                <Row>
                    <Col lg='6' md='6'>
                        <div className="hero__content">
                            <p className="hero__subtitle">IPOJI 2024</p>
                            <h2>Beras Sehat Pilihan Kita</h2>
                            <p>Beras sehat adalah jenis beras yang telah melalui proses pengolahan
                            yang minimal atau tanpa menggunakan bahan kimia sintetis seperti pestisida atau pupuk buatan,
                            sehingga menjaga kualitas alami dan kebersihan beras. Biasanya beras sehat dihasilkan dari pertanian 
                            organik yang ramah lingkungan, tanpa penggunaan pestisida dan pupuk kimia,
                            serta melalui praktik pertanian yang berkelanjutan.Beras sehat sering dianggap lebih nutrisi dan lebih
                            baik untuk kesehatan karena tidak terkontaminasi oleh residu kimia dan memiliki kandungan nutrisi yang lebih tinggi.</p>

                            <motion.button whileTap={{scale: 1.2}} className="buy__button"><Link to='/shop'>SHOP NOW</Link></motion.button>
                        </div>
                    </Col>

                    <Col lg="6" md="6" >
                        <div className="hero__img">
                            <img src={heroImg} alt=""/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        <Services />
            <section>
            <Container>
                <Row>
                    <Col lg='12' className="text-center">
                        <h1 className="section__title">Seputar Beras Sehat</h1>
                        <div className="section__separator">
                                <div className="section__separator-line"></div>
                                <div className="section__separator-dots"></div>
                                <div className="section__separator-line"></div>
                            </div>
                    </Col>
                    <ArtikelList/>
                </Row>
            </Container>
        </section>
    </Helmet>
    );
};

export default Home;
