import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/checkout.css";
import AddressModal from './AddressModal'; // Ensure the path is correct
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../../components/header/HeaderUser";
import Footer from "../../components/Footer/Footer";
import Helmet from '../../components/Helmet/Helmet';

axios.defaults.withCredentials = true;
 
const fetchPrimaryAddress = async (userId, setPrimaryAddress) => {
  try {
    const response = await axios.get(`http://localhost:8080/address/primary/${userId}`);
    setPrimaryAddress(response.data || {});
  } catch (error) {
    console.error('There was an error fetching the primary address!', error);
    setPrimaryAddress({});
  }
};

const fetchAddresses = async (userId, setAddresses) => {
  if (userId) {
    try {
      const response = await axios.get(`http://localhost:8080/address/user/${userId}`);
      console.log(response.data); // Log the addresses to verify their structure
      setAddresses(response.data || []);
    } catch (error) {
      console.error('There was an error fetching the addresses!', error);
      setAddresses([]);
    }
  } else {
    console.error('userId is not defined');
    setAddresses([]);
  }
};

const Checkout = () => {
  const [primaryAddress, setPrimaryAddress] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('self-pickup');
  const location = useLocation(); // Use useLocation to access state
  const { selectedItems, total } = location.state || { selectedItems: [], total: 0 }; // Destructure selectedItems and total from location.state
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      fetchPrimaryAddress(storedUserId, setPrimaryAddress);
      fetchAddresses(storedUserId, setAddresses);
    } else {
      console.error('User ID not found in localStorage');
    }
  }, []);

  const handleAddAddressClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = (newAddress) => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      saveAddress(storedUserId, newAddress);
      setShowModal(false);
    } else {
      console.error('User ID not found in localStorage');
    }
  };

  const saveAddress = async (userId, newAddress) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/address/create',
        { ...newAddress, user_id: userId },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Address saved:', response.data);
      fetchAddresses(userId, setAddresses); // Re-fetch addresses after saving
    } catch (error) {
      console.error('There was an error saving the address!', error.response || error.message);
    }
  };

  const updateAddress = async (addressId, updatedAddress) => {
    console.log('Updating address with ID:', addressId); // Add this log
    try {
      const storedUserId = localStorage.getItem('user_id');
      if (storedUserId) {
        const response = await axios.put(`http://localhost:8080/address/update/${addressId}`, 
          { ...updatedAddress, user_id: storedUserId },
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('Address updated:', response.data);
        fetchAddresses(storedUserId, setAddresses);
      }
    } catch (error) {
      console.error('There was an error updating the address!', error.response || error.message);
    }
  };
  
  const deleteAddress = async (addressId) => {
    console.log('Deleting address with ID:', addressId);
    try {
      const storedUserId = localStorage.getItem('user_id');
      if (storedUserId) {
        const response = await axios.delete(`http://localhost:8080/address/delete/${addressId}`, 
          { data: { user_id: storedUserId } },
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('Address deleted:', response.data);
        fetchAddresses(storedUserId, setAddresses);
      }
    } catch (error) {
      console.error('There was an error deleting the address!', error.response || error.message);
    }
  };

  const setPrimaryAddressHandler = async (addressId) => {
    console.log('Setting primary address with ID:', addressId);
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      try {
        const response = await axios.put(`http://localhost:8080/address/set-primary/${storedUserId}/${addressId}`);
        console.log('Primary address set:', response.data);
        fetchPrimaryAddress(storedUserId, setPrimaryAddress);
        fetchAddresses(storedUserId, setAddresses);
      } catch (error) {
        console.error('There was an error setting the primary address!', error.response || error.message);
      }
    } else {
      console.error('User ID not found in localStorage');
    }
  };

  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  // Update the shippingCost logic to handle the conditions correctly
  let shippingCost = 0;
  if (deliveryOption === 'delivery') {
    if (total < 100000) {
      shippingCost = 20000;
    } else {
      shippingCost = 0;
    }
  }

  const totalCost = total + shippingCost;

  const handleCheckout = async () => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId && primaryAddress.id_addresses) {
      try {
        const orderData = {
          user_id: storedUserId,
          address_id: primaryAddress.id_addresses,
          total_cost: totalCost,
          items: selectedItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity
          }))
        };

        const response = await axios.post('http://localhost:8080/orders', orderData, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        console.log('Order created:', response.data);
        navigate('/order-success'); // Redirect ke halaman sukses setelah order berhasil
      } catch (error) {
        console.error('There was an error creating the order!', error.response || error.message);
      }
    } else {
      console.error('User ID or primary address not found');
    }
  };

  return (
    <Helmet title={"checkout"}>
      <Header />
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        <div className="primary-address checkout-section">
          <h3 className="checkout-subtitle">Alamat Utama</h3>
          {primaryAddress && (
            <div>
              <p>Hanya Melayani Area Madiun</p>
              <p>{primaryAddress.full_name}, {primaryAddress.detailed_address}, {primaryAddress.province}, {primaryAddress.city}, {primaryAddress.district}, {primaryAddress.subdistrict}</p>
              <button className="btn btn-secondary" onClick={handleAddAddressClick}>Ubah Alamat</button>
            </div>
          )}
        </div>
        <div className="modal-container">
          {showModal && (
            <AddressModal
              showModal={showModal}
              handleCloseModal={handleCloseModal}
              handleConfirm={handleConfirm}
              addresses={addresses}
              setPrimaryAddressHandler={setPrimaryAddressHandler}
              updateAddress={updateAddress}
              deleteAddress={deleteAddress}
              saveAddress={saveAddress}
              fetchAddresses={() => fetchAddresses(localStorage.getItem('user_id'), setAddresses)}
            />
          )}
        </div>
        <div className="checkout-items checkout-section">
          <h3 className="checkout-subtitle">Produk yang Dipilih</h3>
          {selectedItems.map(item => (
            <div key={item.id} className="checkout-item">
              <img
                src={`http://localhost:8080/gambar/${item.gambar_produk}`}
                alt={item.gambar_produk}
                style={{ width: '100px', height: '100px', marginRight: '20px' }}
              />
              <div className="checkout-item-info">
                <h5>{item.nama_produk}</h5>
                <p>Rp. {item.harga_produk}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="delivery-options checkout-section">
          <h3 className="checkout-subtitle">Pilihan Pengiriman</h3>
          <div className="delivery-option">
            <input
              type="radio"
              id="self-pickup"
              name="deliveryOption"
              value="self-pickup"
              checked={deliveryOption === 'self-pickup'}
              onChange={handleDeliveryOptionChange}
            />
            <label htmlFor="self-pickup">Ambil Sendiri</label>
          </div>
          <div className="delivery-option">
            <input
              type="radio"
              id="delivery"
              name="deliveryOption"
              value="delivery"
              checked={deliveryOption === 'delivery'}
              onChange={handleDeliveryOptionChange}
            />
            <label htmlFor="delivery">Diantar</label>
          </div>
        </div>
        <div className="payment-summary checkout-section">
          <h3 className="checkout-subtitle">Ringkasan Pembayaran</h3>
          <p>Total Harga Barang: Rp. {total}</p>
          <p>Biaya Pengiriman: Rp. {shippingCost}</p>
          <p>Total Pembayaran: Rp. {totalCost}</p>
          <button className="btn btn-success" onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
      <Footer />
    </Helmet>
  );
};

export default Checkout;
