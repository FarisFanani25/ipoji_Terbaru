import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { cartActions } from '../../shop/shop-cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = (productId) => {
    dispatch(cartActions.addToCart(productId)); // Panggil action Redux untuk menambahkan produk ke keranjang
  };

  const handleIncrement = (id) => {
    // Implement your logic for incrementing item quantity
  };

  const handleDecrement = (id) => {
    // Implement your logic for decrementing item quantity
  };

  const handleRemove = (id) => {
    // Implement your logic for removing item from cart
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });
    return totalPrice.toFixed(2); // Menggunakan toFixed(2) untuk membulatkan harga menjadi 2 desimal
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Keranjang</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="border rounded p-3 mb-3">
              <Row>
                <Col sm="12">
                  <h5>{item.productName}</h5>
                </Col>
                <Col sm="6">
                  <img src={item.Image} alt={item.productName} className="img-fluid" />
                </Col>
                <Col sm="4">
                  <p className="text-right">Harga: Rp.{typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</p>
                  <div className="d-flex justify-content-end">
                    <Button color="info" size="sm" className="mr-2" onClick={() => handleDecrement(item.id)}>-</Button>
                    <span>{item.quantity}</span>
                    <Button color="info" size="sm" className="ml-2" onClick={() => handleIncrement(item.id)}>+</Button>
                  </div>
                </Col>
                <Col sm="2">
                  <Button color="danger" className="w-100" onClick={() => handleRemove(item.id)}>Remove</Button>
                </Col>
              </Row>
            </div>
          ))}
          <Row className="mt-5">
            <Col sm="6">
              <p style={{ color: 'black', fontSize: '18px', fontWeight: 'bold' }}>Total: Rp.{getTotalPrice()}</p>
            </Col>
            <Col sm="6" className="d-flex justify-content-end align-items-end">
              <Link to="/Checkout">
                <Button color="primary">Checkout</Button>
              </Link>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Cart;
