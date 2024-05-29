import React, { useState, useEffect } from "react";
import ArtikelCard from "./ArtikelCard";
import axios from "axios";

const ArtikelList = () => {
    const [articles, setArticles] = useState([]);

    const fetchArtikel = async () => {
        try {
            const response = await axios.get('http://localhost:8080/artikel');
            
            if (response.data && Array.isArray(response.data.artikel)) {
                setArticles(response.data.artikel);
            } else {
                console.error("Data yang diterima bukan array:", response.data);
            }
        } catch (error) {
            console.error("Gagal mengambil data artikel:", error);
        }
    };

    useEffect(() => {
        fetchArtikel();
    }, []);

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '100vh', // Mengatur tinggi agar konten berada di tengah
            backgroundColor: '#ffffff' // Warna background putih
        }}>
            {articles.map((article, index) => (
                <ArtikelCard
                    key={index}
                    id_artikel={article.id_artikel} 
                    imageSrc={article.gambar_artikel}
                    title={article.judul_artikel}
                    description={article.deskripsi_artikel}
                />
            ))}
        </div>
    );
};

export default ArtikelList;
