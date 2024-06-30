import React, { useState, useEffect } from "react";
import { useParams } from 'react-router'; // Ubah dari 'react-router-dom' menjadi 'react-router'
import axios from "axios";
import Helmet from '../../components/Helmet/Helmet'; // Jika Anda ingin menambahkan judul halaman
import Header from "../../components/header/HeaderUser";
import Footer from "../../components/Footer/Footer";

const ArtikelDetails = () => {
    const [article, setArticle] = useState(null);
    const { id } = useParams(); // Ambil ID dari URL

    useEffect(() => {
        const fetchArtikelDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/artikel/${id}`);
                if (response.data) {
                    setArticle(response.data);
                } else {
                    console.error("Data artikel tidak ditemukan");
                }
            } catch (error) {
                console.error("Gagal mengambil detail artikel:", error);
            }
        };

        fetchArtikelDetail();
    }, [id]);

    if (!article) {
        return <div>Loading...</div>;
    }


    return (
        <Helmet title={"ArtikelDetails"}>
            <Header/>
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Judul Artikel */}
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                {article.judul_artikel}
            </h1>

            {/* Gambar Artikel */}
            <div style={{ 
                marginTop: '20px', 
                marginBottom: '40px',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <img 
                    src={`http://localhost:8080/gambar/${article.gambar_artikel}`} 
                    alt={article.judul_artikel}
                    style={{ width: '100%', maxHeight: '50vh', objectFit: 'cover' }}
                />
            </div>

            {/* Deskripsi Artikel */}
            <div style={{ fontSize: '1.2rem', lineHeight: '1.6', fontFamily: 'Arial, sans-serif' }}>
                {article.deskripsi_artikel}
            </div>
        </div>
        <Footer/>
        </Helmet>
    );
};

export default ArtikelDetails;
