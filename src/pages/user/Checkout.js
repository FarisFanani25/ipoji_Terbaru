import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/checkout.css";
import AddressModal from './AddressModal'; // Ensure the path is correct
import Header from "../../components/header/HeaderUser";
import Footer from "../../components/Footer/Footer";
import  Helmet  from '../../components/Helmet/Helmet';

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

const Checkout = ({ productCost }) => {
  const [primaryAddress, setPrimaryAddress] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  const totalShippingCost = 0;
  const totalCost = productCost + totalShippingCost;

  return (
    <Helmet title={"Checkout"}>
        <Header />
    <div className="container">
      <h1 className="mt-5">Checkout</h1>
      <div className="primary-address">
        <h3>Alamat Utama</h3>
        {primaryAddress && (
          <div>
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
      <div className="mt-5">
        <h2>Ringkasan Biaya</h2>
        <div className="row">
          <div className="col-md-6">
            <div>Biaya Produk:</div>
            <div>Biaya Pengiriman:</div>
            <div>Total Biaya:</div>
          </div>
          <div className="col-md-6 text-right">
            <div>{productCost}</div>
            <div>{totalShippingCost}</div>
            <div>{totalCost}</div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <button className="btn btn-success">Lanjut Pembayaran</button>
      </div>
    </div>

    <Footer/>

        </Helmet>
  );
};

export default Checkout;