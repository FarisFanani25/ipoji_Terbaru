import React from 'react';
import '../../styles/TentangKami.css';
import image1 from '../../assets/images/image1.jpg';
import image2 from '../../assets/images/image2.jpg';
import whatsappIcon from '../../assets/images/wa.jpg';  // Pastikan Anda memiliki ikon ini di direktori Anda
import Header from "../../components/header/HeaderUser";
import Footer from "../../components/Footer/Footer";
import  Helmet  from '../../components/Helmet/Helmet';

const TentangKami = () => {
    return (
        <Helmet title={"Home"}>
        <Header />
        <div className="tentang-kami-container">
            <h1>Tentang Kami</h1>
            <div className="tentang-kami-content">
                <div className="content-block">
                    <div className="text">
                        <h2>Sejarah Beras Sehat</h2>
                        <p>
                            Sejarah beras sehat dimulai dari kesadaran akan pentingnya pola makan yang sehat dan alami. Beras sehat adalah beras yang diproduksi tanpa menggunakan pestisida dan bahan kimia berbahaya lainnya. Proses penanaman, perawatan, dan pemanenan beras sehat dilakukan dengan metode organik yang menjaga kualitas tanah dan lingkungan.
                        </p>
                    </div>
                    <div className="image">
                        <img src={image1} alt="Proses penanaman beras sehat" />
                    </div>
                </div>
                <div className="content-block reverse">
                    <div className="image">
                        <img src={image2} alt="Panen beras sehat" />
                    </div>
                    <div className="text">
                        <h2>Keberlanjutan Lingkungan</h2>
                        <p>
                            Beras sehat tidak hanya baik untuk kesehatan tubuh, tetapi juga mendukung keberlanjutan lingkungan. Metode pertanian organik yang digunakan dalam produksi beras sehat membantu menjaga keseimbangan ekosistem dan meningkatkan kesuburan tanah.
                        </p>
                    </div>
                </div>
                <div className="content-block">
                    <div className="text">
                        <h2>Komitmen Kami</h2>
                        <p>
                            Kami berkomitmen untuk menyediakan beras sehat yang berkualitas tinggi kepada konsumen. Setiap butir beras yang kami hasilkan adalah hasil dari dedikasi dan kerja keras para petani yang peduli dengan kesehatan dan kelestarian alam.
                        </p>
                    </div>
                    <div className="image">
                        <img src={image1} alt="Proses penanaman beras sehat" />
                    </div>
                </div>
            </div>
            <div className="whatsapp-container">
                <a href="https://wa.me/085710283688" className="whatsapp-link" target="_blank" rel="noopener noreferrer">
                    <img src={whatsappIcon} alt="WhatsApp Icon" className="whatsapp-icon" />
                    <span className="whatsapp-text">Hubungi Kami Disini</span>
                </a>
            </div>
        </div>

        <Footer/>

        </Helmet>
    );
};

export default TentangKami;
