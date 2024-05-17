import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/keranjang'); // Mengambil data keranjang dari backend
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleIncrement = (id) => {
    // Implement logic for incrementing item quantity
  };

  const handleDecrement = (id) => {
    // Implement logic for decrementing item quantity
  };

  const handleRemove = (id) => {
    // Implement logic for removing item from cart
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.quantity * item.harga_produk;
    });
    return totalPrice.toFixed(2);
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Keranjang</h1>
      
        <>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Nama Produk</th>
                <th>Gambar Produk</th>
                <th>Harga Produk</th>
                <th>Jumlah Produk</th>
                <th>Action</th>
              </tr> 
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id_keranjang}>
                  <td>{item.nama_produk}</td>
                  <td><img src={item.gambar_produk} alt={item.nama_produk} className="img-fluid" /></td>
                  <td>Rp.{item.harga_produk.toFixed(2)}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <Button color="info" size="sm" className="mr-2" onClick={() => handleDecrement(item.id_produk)}>-</Button>
                      <span>{item.quantity}</span>
                      <Button color="info" size="sm" className="ml-2" onClick={() => handleIncrement(item.id_produk)}>+</Button>
                    </div>
                  </td>
                  <td>
                    <Button color="danger" onClick={() => handleRemove(item.id_produk)}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="mt-5 d-flex justify-content-between align-items-center">
            <p style={{ color: 'black', fontSize: '18px', fontWeight: 'bold' }}>Total: Rp.{getTotalPrice()}</p>
            <Link to="/Checkout">
              <Button color="primary">Checkout</Button>
            </Link>
          </div>
        </>
    </Container>
  );
};

export default Cart;
