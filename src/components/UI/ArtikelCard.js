import React from "react";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

const ArtikelCard = ({ imageSrc, title, description, id_artikel }) => {
    const truncatedDescription = truncateText(description, 100); // Adjust the maxLength as needed

    return (
        <Link to={`/detailartikel/${id_artikel}`} className="artikel-card">
            <div className="article__item-container">
                <motion.img 
                    whileHover={{ scale: 1.1 }} 
                    src={`http://localhost:8080/gambar/${imageSrc}`} 
                    alt={title} 
                    className="article__image"
                />
                <div className="article__details">
                    <div className="article__title">{title}</div>
                    <div className="article__description">{truncatedDescription}</div>
                    <Link to={`/detailartikel/${id_artikel}`} className="read-more-link">
                        Baca selengkapnya
                    </Link>
                </div>
            </div>
        </Link>
    );
};

export default ArtikelCard;
