import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { cartActions } from '../../shop/shop-cart/cartSlice';
import axios from 'axios';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cart');
      dispatch(cartActions.setCartItems(response.data));
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
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
    // Implement your logic for calculating total price
  };

  return (
    <Container>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <Row key={item.id} className="mb-3">
              <Col sm="2">
                <img src={item.image} alt={item.title} className="img-fluid" />
              </Col>
              <Col sm="3">
                <p>{item.title}</p>
              </Col>
              <Col sm="2">
                <p>Harga: Rp.{item.price}</p>
              </Col>
              <Col sm="2">
                <Button color="info" onClick={() => handleDecrement(item.id)}>-</Button>{' '}
                <span>{item.quantity}</span>{' '}
                <Button color="info" onClick={() => handleIncrement(item.id)}>+</Button>{' '}
              </Col>
              <Col sm="3">
                <Button color="danger" onClick={() => handleRemove(item.id)}>Remove</Button>
              </Col>
            </Row>
          ))}
          <Row>
            <Col sm="12">
              <p>Total: Rp.{getTotalPrice()}</p>
              <Link to="/Checkout">
                <Button color="primary">Proceed to Checkout</Button>
              </Link>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Cart;
