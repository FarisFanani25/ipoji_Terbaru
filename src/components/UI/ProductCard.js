import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "../../styles/product-card.css";

const ProductCard = ({ item }) => {
  const { id_produk, nama_produk, harga_produk, gambar_produk, stok_produk } = item;
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStyle, setAnimationStyle] = useState({});
  const [showNotif, setShowNotif] = useState(false);

  const handleClick = async (event) => {
    event.stopPropagation();
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert('Please log in first.');
      return;
    }

    if (stok_produk <= 0) {
      setShowNotif(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/cartcoba/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          product_id: id_produk,
          quantity: 1,
        }),
      });

      if (response.ok) {
        animateProductToCart(event);
        alert('Product added to cart!');
      } else {
        alert('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch');
    }
  };

  const animateProductToCart = (event) => {
    const cartIcon = document.querySelector('.cart-icon');
    const productImage = event.target.closest('.product__item').querySelector('.product__img img');
    const productImageRect = productImage.getBoundingClientRect();
    const cartIconRect = cartIcon.getBoundingClientRect();

    const animationStyle = {
      left: productImageRect.left,
      top: productImageRect.top,
      width: productImageRect.width,
      height: productImageRect.height,
      transform: `translate(${cartIconRect.left - productImageRect.left}px, ${cartIconRect.top - productImageRect.top}px) scale(0.1)`,
      opacity: 0,
    };

    setAnimationStyle(animationStyle);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="product__container">
      <div className="product__item">
        <div className="product__img">
          <img src={`http://localhost:8080/gambar/${gambar_produk}`} alt={nama_produk} className="img-fluid" />
        </div>

        <div className="product__content">
          <h5 className="mb-3">
            <Link to={`/detail/${id_produk}`} className="text-decoration-none">{nama_produk}</Link>
          </h5>
          <p className="product__price mb-3">Rp. {harga_produk}</p>
          {stok_produk > 0 ? (
            <button className="addToCart__btn" onClick={handleClick}>
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" /> Tambah ke Keranjang
            </button>
          ) : (
            <p className="text-danger fw-bold mb-0">Produk tidak tersedia</p>
          )}
        </div>
      </div>
      {isAnimating && (
        <div className="floating-cart-animation" style={animationStyle}>
          <img src={`http://localhost:8080/gambar/${gambar_produk}`} alt={nama_produk} className="img-fluid" />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
