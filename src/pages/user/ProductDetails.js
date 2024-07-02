import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Helmet from '../../components/Helmet/Helmet';
import CommonSection from '../../components/UI/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../shop/shop-cart/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../../styles/product-details.css';
import Header from "../../components/header/HeaderUser";
import Footer from "../../components/Footer/Footer";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/produk/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  const addItemToCart = async () => {
    try {
      const response = await axios.post('http://localhost:8080/add-to-cart', {
        id,
        title: product?.nama_produk,
        price: product?.harga_produk,
        image01: product?.gambar_produk,
        quantity: 1,
      });
      console.log('Response:', response.data); // You can handle the response accordingly
      dispatch(cartActions.addItem(response.data)); // Assuming response.data contains the updated cart item
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  const { nama_produk, harga_produk, deskripsi_produk, stok_produk, berat_produk, gambar_produk } = product;

  return (
    <Helmet title='Product-details'>
      <Header />
      <CommonSection title={nama_produk} />
      <section className="product-details-section">
        <Container>
          <Row>
            <Col lg='6'>
              <div className='product__main-img'>
                <img 
                  src={`http://localhost:8080/gambar/${gambar_produk}`} 
                  alt={nama_produk} 
                  className='img-fluid' 
                  style={{ maxWidth: '100%', maxHeight: '400px' }}
                />
              </div>
            </Col>

            <Col lg='6'>
              <div className='single__product-content'>
                <h2 className='product__title'>{nama_produk}</h2>
                <p className='product__price'>Rp. {harga_produk}</p>
                <table className='table product__details-table'>
                  <tbody>
                    <tr>
                      <th>Detail Produk</th>
                      <td>{deskripsi_produk}</td>
                    </tr>
                    <tr>
                      <th>Stok</th>
                      <td>{stok_produk}</td>
                    </tr>
                    <tr>
                      <th>Berat</th>
                      <td>{berat_produk} kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </Helmet>
  );
};

export default ProductDetails;
