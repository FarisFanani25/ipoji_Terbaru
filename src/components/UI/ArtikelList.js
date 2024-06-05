import React, { useEffect, useState } from "react";
import ArtikelCard from "./ArtikelCard";
import axios from "axios";
import "./artikelList.css"; // Ensure to create and link this stylesheet

const ArtikelList = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/artikel');
            setArticles(response.data.artikel);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    return (
        <div className="artikel-list">
            {articles.map((article) => (
                <div key={article.id_artikel} className="artikel-column">
                    <ArtikelCard
                        imageSrc={article.gambar_artikel}
                        title={article.judul_artikel}
                        description={article.deskripsi_artikel}
                        id_artikel={article.id_artikel}
                    />
                </div>
            ))}
        </div>
    );
};

export default ArtikelList;
