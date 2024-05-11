import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { cartActions } from '../../shop/shop-cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = (productId) => {
    dispatch(cartActions.addToCart(productId));
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
    return totalPrice.toFixed(2);
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
              <h5>{item.productName}</h5>
              <Row className="align-items-center">
                <Col sm="3">
                  <img src={item.Image} alt={item.productName} className="img-fluid" />
                </Col>
                <Col sm="3">
                  <p>Harga Satuan: Rp.{item.price.toFixed(2)}</p>
                </Col>
                <Col sm="3">
                  <div className="d-flex justify-content-center align-items-center">
                    <Button color="info" size="sm" className="mr-2" onClick={() => handleDecrement(item.id)}>-</Button>
                    <span>{item.quantity}</span>
                    <Button color="info" size="sm" className="ml-2" onClick={() => handleIncrement(item.id)}>+</Button>
                  </div>
                </Col>
                <Col sm="3">
                  <p>Subtotal: Rp.{(item.quantity * item.price).toFixed(2)}</p>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col sm="12">
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
