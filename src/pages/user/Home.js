import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Helmet from "../../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assets/images/beras.png";
import thumbIcon from "../../assets/images/thumb-icon.png";
import qualityIcon from "../../assets/images/quality-icon.png";
import easyIcon from "../../assets/images/easy-icon.png";
import Services from "../../services/Services";
import ArtikelList from "../../components/UI/ArtikelList";
import "../../styles/home.css";
import axios from "axios";
import testimonialImg1 from "../../assets/images/testimonial1.jpg";
import testimonialImg2 from "../../assets/images/testimonial2.jpg";
import testimonialImg3 from "../../assets/images/testimonial3.jpg";
import serviceData from "../../assets/data/serviceData";
import Header from "../../components/header/HeaderUser";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const carouselRef = useRef(null);

  const [testimonials] = useState([
    testimonialImg1,
    testimonialImg2,
    testimonialImg3,
  ]);
  const testimonialCarouselRef = useRef(null);

  useEffect(() => {
    getDataProduk();
  }, []);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const newPosition = (scrollLeft + clientWidth) % scrollWidth;
        carouselRef.current.scrollTo({
          left: newPosition,
          behavior: "smooth",
        });
      }
    }, 3000); // Adjust timing as needed

    return () => clearInterval(scrollInterval);
  }, [products]);

  const getDataProduk = async () => {
    try {
      const response = await axios.get("http://localhost:8080/produk");
      setProducts(response.data.produk);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const scrollTestimonials = (direction) => {
    if (testimonialCarouselRef.current) {
      const { scrollLeft, clientWidth } = testimonialCarouselRef.current;
      const newPosition =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      testimonialCarouselRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (testimonialCarouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          testimonialCarouselRef.current;
        const newPosition = (scrollLeft + clientWidth) % scrollWidth;
        testimonialCarouselRef.current.scrollTo({
          left: newPosition,
          behavior: "smooth",
        });
      }
    }, 3000); // Adjust timing as needed

    return () => clearInterval(scrollInterval);
  }, []);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const newPosition =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  const Services = () => {
    return (
      <Container>
        <Row>
          {serviceData.map((service, index) => (
            <Col lg="3" md="4" sm="6" key={index} className="mb-4">
              <div
                className="service-card"
                style={{ backgroundColor: service.bg }}
              >
                <i className={service.icon + " service-icon"}></i>
                <div>
                  <h5 className="service-title">{service.title}</h5>
                  <p className="service-subtitle">{service.subtitle}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    );
  };

  return (
    <Helmet title={"Home"}>
      <Header />
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">IPOJI 2024</p>
                <h2>Beras Sehat Pilihan Kita</h2>
                <p>
                  Beras sehat adalah jenis beras yang telah melalui proses
                  pengolahan yang minimal atau tanpa menggunakan bahan kimia
                  sintetis seperti pestisida atau pupuk buatan, sehingga menjaga
                  kualitas alami dan kebersihan beras. Biasanya beras sehat
                  dihasilkan dari pertanian organik yang ramah lingkungan, tanpa
                  penggunaan pestisida dan pupuk kimia, serta melalui praktik
                  pertanian yang berkelanjutan. Beras sehat sering dianggap
                  lebih nutrisi dan lebih baik untuk kesehatan karena tidak
                  terkontaminasi oleh residu kimia dan memiliki kandungan
                  nutrisi yang lebih tinggi.
                </p>

                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__button"
                >
                  <Link to="/shop">SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="Beras" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Row>
        <Col md="12">
          <div className="info-header">
            <h2 className="section-title">LIHAT LEBIH LENGKAP DI KATALOG</h2>
            <div className="info-buttons">
              <button className="info-button">SAYA MAU</button>
              <button className="info-button">PELAJARI DULU</button>
            </div>
          </div>
        </Col>
      </Row>
      <section className="info-section">
        <Container>
          <Row>
            <Col md="12">
              <h2 className="section-title">
                Alasan Anda Sebaiknya Beli Beras Organik di IPOJI
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="info-item">
              <img
                src={thumbIcon}
                alt="Rasa Lebih Enak"
                className="info-icon"
              />
              <h3>Rasa Lebih Enak</h3>
              <p>
                Beras Organik Eka Farm memiliki rasa yang pulen sehingga enak
                untuk dikonsumsi
              </p>
            </Col>
            <Col md="4" className="info-item">
              <img
                src={qualityIcon}
                alt="Kontrol Kualitas"
                className="info-icon"
              />
              <h3>Kontrol Kualitas</h3>
              <p>
                Kami selalu melakukan kontrol kualitas untuk memastikan produk
                yang sampai di tangan Anda betul-betul organik dan sesuai SNI
                agar bermanfaat bagi kesehatan Anda sekeluarga
              </p>
            </Col>
            <Col md="4" className="info-item">
              <img src={easyIcon} alt="Mudah Didapat" className="info-icon" />
              <h3>Mudah Didapat</h3>
              <p>
                IPOJI memiliki jaringan outlet dan mitra usaha di seluruh
                Indonesia
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Row>
        <Col md="12">
          <div className="info-header">
            <h2 className="section-title">
              ANDA INGIN BELI BERAS ORGANIK IPOJI?
            </h2>
            <div className="info-buttons">
              <button className="info-button1">CEK KATALOG</button>
            </div>
          </div>
        </Col>
      </Row>

      <section className="product-section">
        <h3 className="section_title">Produk IPOJI</h3>
        <div className="product-carousel-container">
          <button
            className="carousel-control left"
            onClick={() => scrollCarousel("left")}
          >
            &lt;
          </button>
          <div className="product-carousel" ref={carouselRef}>
            {products.map((produk) => (
              <div key={produk.id_produk} className="product-item">
                <div className="product-card">
                  <img
                    src={`http://localhost:8080/gambar/${produk.gambar_produk}`}
                    alt={produk.nama_produk}
                    className="w-100"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control right"
            onClick={() => scrollCarousel("right")}
          >
            &gt;
          </button>
        </div>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-title">Layanan Kami</h2>
            </Col>
            <Services />
          </Row>
        </Container>
      </section>

      <section className="product-section">
        <h3 className="section_title">Testimoni</h3>
        <div className="product-carousel-container">
          <button
            className="carousel-control left"
            onClick={() => scrollTestimonials("left")}
          >
            &lt;
          </button>
          <div className="product-carousel" ref={testimonialCarouselRef}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="product-item">
                <div className="testimonial-card">
                  <img src={testimonial} alt={`Testimonial ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control right"
            onClick={() => scrollTestimonials("right")}
          >
            &gt;
          </button>
        </div>
      </section>

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Artikel Terbaru</h2>
            </Col>
            <ArtikelList />
          </Row>
        </Container>
      </section>

      <Footer />
    </Helmet>
  );
};

export default Home;
