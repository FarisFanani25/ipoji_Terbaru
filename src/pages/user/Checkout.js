import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import CommonSection from '../../components/UI/CommonSection';
import Helmet from '../../components/Helmet/Helmet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../styles/checkout.css';

const Checkout = () => {
  const [enterName, setEnterName] = useState('');
  const [enterNumber, setEnterNumber] = useState('');
  const [enterAddress, setEnterAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const navigate = useNavigate(); // Initialize useNavigate

  const cartItems = useSelector((state) => state.cart.cartItems);
  // Inisialisasi cartTotalAmount dengan nilai 0 jika tidak ada item di keranjang belanja
  const cartTotalAmount = useSelector((state) => {
    if (state.cart.cartItems.length === 0) {
      return 0;
    } else {
      // Hitung totalAmount jika ada item di keranjang belanja
      return state.cart.totalAmount;
    }
  });

  const cartTotalAmountString = typeof cartTotalAmount === 'number' ? cartTotalAmount.toFixed(2) : cartTotalAmount;
  const shippingCost = 0;
  const totalAmount = 123.45; // Contoh nilai numerik
  const formattedTotal = totalAmount.toFixed(2); // Memanggil metode toFixed untuk memformat angka dengan dua angka di belakang koma
  console.log(formattedTotal); // Output: "123.45"
  
  const submitHandler = async (e) => {
    e.preventDefault();

    const itemsInCart = cartItems.map((item) => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      const response = await axios.post('http://localhost:8080/api/order', {
        name: enterName,
        phone: enterNumber,
        address: enterAddress,
        paymentMethod,
        items: JSON.stringify(itemsInCart),
        totalAmount: totalAmount.toFixed(2),
      });

      console.log('Respon API:', response.data);

      if (response.data.status === 201) {
        navigate('/payment'); // Navigate to /payment after successful order
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {cartItems.length > 0 && (
                <Row className="mt-4">
                  <Col lg="12">
                    <h4>Items in Your Cart:</h4>
                    <ul>
                      {cartItems.map((item) => (
                        <li key={item.id}>
                          <div className="checkout__product-item">
                            <img
                              src={`http://localhost:8080/gambar/${item.image01}`}
                              alt={item.title}
                              className="checkout__product-image"
                            />
                            <div className="checkout__product-details">
                              <div className="product-details-right">
                                <h5>{item.title}</h5>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: Rp.{(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              )}

              <div className="checkout__bill mt-4">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal : <span>Rp. {cartTotalAmountString}</span>

                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3 ">
                  Ongkos Kirim : <span>Rp. {shippingCost.toFixed(2)}</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between ">
                    Total : <span>Rp. {totalAmount.toFixed(2)}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col lg="12">
              <h6>Shipping Address:</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    onChange={(e) => setEnterName(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Enter your phone number"
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your address"
                    required
                    onChange={(e) => setEnterAddress(e.target.value)}
                  />
                </div>

                <button type="submit" className="addTOCart__btn">
                  Lanjut Ke Pembayaran
                </button>
              </form>
              
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;

