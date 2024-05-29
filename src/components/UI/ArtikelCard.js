import React from "react";
import { motion } from 'framer-motion';
import { Col } from "reactstrap";
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
        <>
            <Col lg='12' style={{ marginBottom: '20px' }}>
                <Link to={`/detailartikel/${id_artikel}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="article__item-container" style={{ 
                        display: 'flex', 
                        height: 'auto', 
                        width: '100%', 
                        borderRadius: '8px', 
                        overflow: 'hidden',
                        backgroundColor: '#ffffff',
                        position: 'relative'
                    }}>
                        <motion.img 
                            whileHover={{ scale: 1.1 }} 
                            src={`http://localhost:8080/gambar/${imageSrc}`} 
                            alt={title} 
                            style={{ 
                                width: '300px', 
                                height: '100%', 
                                objectFit: 'cover', 
                                marginRight: '20px' 
                            }} 
                        />
                        <div className="article__details" style={{ 
                            padding: '20px', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'center', 
                            width: '100%'
                        }}>
                            <div className="article__title" style={{ 
                                marginBottom: '10px', 
                                fontSize: '1.5rem', 
                                fontWeight: 'bold' 
                            }}>{title}</div>
                            <div className="article__description" style={{ 
                                fontSize: '1rem', 
                                color: '#333' 
                            }}>
                                {truncatedDescription}
                                <Link to={`/detailartikel/${id_artikel}`} style={{ color: 'blue', textDecoration: 'none' }}>
                                    {" "}Baca selengkapnya
                                </Link>
                            </div>
                        </div>
                    </div>
                </Link>
            </Col>
            <div style={{
                width: '100%',
                borderBottom: '1px solid #ddd',
                margin: '20px 0'
            }}></div>
        </>
    );
};

export default ArtikelCard;
