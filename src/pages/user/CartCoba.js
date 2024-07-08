import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Header from "../../components/header/HeaderUser";
import Footer from "../../components/Footer/Footer";
import Helmet from '../../components/Helmet/Helmet';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/cartcoba/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    calculateTotal(selectedItems); // Hitung total dari selectedItems
  }, [selectedItems]);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.harga_produk * item.quantity, 0);
    setTotal(total);
  };

  const toggleModal = (item) => {
    setModal(!modal);
    setItemToRemove(item);
  };

  const handleRemove = async () => {
    if (!itemToRemove) return;

    try {
      const response = await fetch(`http://localhost:8080/cartcoba/removeItem/${itemToRemove.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      const updatedItems = cartItems.filter(item => item.id !== itemToRemove.id);
      setCartItems(updatedItems);
      setSelectedItems(selectedItems.filter(item => item.id !== itemToRemove.id));
      calculateTotal(updatedItems);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
    } finally {
      setModal(false);
      setItemToRemove(null);
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    try {
      const response = await fetch(`http://localhost:8080/cartcoba/updateQuantity/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item quantity');
      }

      const updatedItems = cartItems.map(item => item.id === id ? { ...item, quantity } : item);
      setCartItems(updatedItems);
      setSelectedItems(selectedItems.map(item => item.id === id ? { ...item, quantity } : item));
      calculateTotal(updatedItems);
      toast.success('Quantity updated');
    } catch (error) {
      console.error('Error updating item quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const handleSelectItem = (item) => {
    const isSelected = selectedItems.some(selectedItem => selectedItem.id === item.id);
    if (isSelected) {
      const updatedSelectedItems = selectedItems.filter(selectedItem => selectedItem.id !== item.id);
      setSelectedItems(updatedSelectedItems);
      calculateTotal(updatedSelectedItems);
    } else {
      const updatedSelectedItems = [...selectedItems, item];
      setSelectedItems(updatedSelectedItems);
      calculateTotal(updatedSelectedItems);
    }
  };

  const handleCheckout = () => {
    const outOfStockItems = selectedItems.filter(item => item.quantity === 0);

    if (outOfStockItems.length > 0) {
      toast.error('Some items are out of stock and cannot be checked out.');
      return;
    }

    navigate('/checkout', { state: { selectedItems, total } });
  };

  return (
    <Helmet title={"Cart"}>
      <Header />
      <div className="container mt-5 cart-container">
        <h2 className="text-center mb-4 cart-title">Keranjang</h2>
        <div className="row">
          <div className="col-12">
            <div className="list-group cart-list">
              {cartItems.map(item => (
                <div
                  className={`list-group-item d-flex justify-content-between align-items-center cart-item ${selectedItems.some(selectedItem => selectedItem.id === item.id) ? 'selected' : ''}`}
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={`http://localhost:8080/gambar/${item.gambar_produk}`}
                      alt={item.gambar_produk}
                      className="cart-item-image"
                    />
                    <div>
                      <h5 className="mb-1 cart-item-name">{item.nama_produk}</h5>
                      <p className="mb-1 cart-item-price">Rp. {item.harga_produk}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="number"
                      className="form-control mr-2 cart-item-quantity"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                    <button className="btn btn-danger cart-item-remove" onClick={(e) => { e.stopPropagation(); toggleModal(item); }}>Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-right">
            <h3 className="cart-total">Total: Rp. {total}</h3>
            <button className="btn btn-primary mt-3 mb-4 cart-checkout" onClick={handleCheckout}>Beli Sekarang</button>
          </div>
        </div>
        {/* Toast Container */}
        <ToastContainer />
        {/* Modal for remove confirmation */}
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Konfirmasi Penghapusan</ModalHeader>
          <ModalBody>
          Apakah Anda yakin ingin menghapus item ini dari keranjang?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleRemove}>Hapus</Button>
            <Button color="secondary" onClick={toggleModal}>Batal</Button>
          </ModalFooter>
        </Modal>
      </div>
      <Footer />
    </Helmet>
  );
};

export default Cart;
