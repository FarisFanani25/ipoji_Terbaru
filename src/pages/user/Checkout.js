import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/checkout.css";

const AddressModal = ({ showModal, handleCloseModal, handleConfirm }) => {
  const [address, setAddress] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);

  useEffect(() => {
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then(response => response.json())
      .then(data => setProvinces(data))
      .catch(error => console.error('Error fetching provinces:', error));
  }, []);

  useEffect(() => {
    if (address.province) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${address.province}.json`)
        .then(response => response.json())
        .then(data => setCities(data))
        .catch(error => console.error('Error fetching cities:', error));
    }
  }, [address.province]);

  useEffect(() => {
    if (address.city) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${address.city}.json`)
        .then(response => response.json())
        .then(data => setDistricts(data))
        .catch(error => console.error('Error fetching districts:', error));
    }
  }, [address.city]);

  useEffect(() => {
    if (address.district) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${address.district}.json`)
        .then(response => response.json())
        .then(data => setSubdistricts(data))
        .catch(error => console.error('Error fetching subdistricts:', error));
    }
  }, [address.district]);

  return (
    <div>
      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tambah Alamat</h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="full_name">Nama Lengkap:</label>
                    <input
                      type="text"
                      id="full_name"
                      className="form-control"
                      value={address.full_name || ''}
                      onChange={(e) => setAddress({ ...address, full_name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone_number">Nomor Telepon:</label>
                    <input
                      type="text"
                      id="phone_number"
                      className="form-control"
                      value={address.phone_number || ''}
                      onChange={(e) => setAddress({ ...address, phone_number: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="province">Provinsi:</label>
                    <select
                      id="province"
                      className="form-control"
                      value={address.province || ''}
                      onChange={(e) => setAddress({ ...address, province: e.target.value })}
                    >
                      <option value="">Pilih Provinsi</option>
                      {provinces.map(province => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">Kabupaten:</label>
                    <select
                      id="city"
                      className="form-control"
                      value={address.city || ''}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    >
                      <option value="">Pilih Kabupaten</option>
                      {cities.map(city => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="district">Kecamatan:</label>
                    <select
                      id="district"
                      className="form-control"
                      value={address.district || ''}
                      onChange={(e) => setAddress({ ...address, district: e.target.value })}
                    >
                      <option value="">Pilih Kecamatan</option>
                      {districts.map(district => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subdistrict">Kelurahan:</label>
                    <select
                      id="subdistrict"
                      className="form-control"
                      value={address.subdistrict || ''}
                      onChange={(e) => setAddress({ ...address, subdistrict: e.target.value })}
                    >
                      <option value="">Pilih Kelurahan</option>
                      {subdistricts.map(subdistrict => (
                        <option key={subdistrict.id} value={subdistrict.id}>
                          {subdistrict.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="detailed_address">Alamat:</label>
                    <textarea
                      id="detailed_address"
                      className="form-control"
                      value={address.detailed_address || ''}
                      onChange={(e) => setAddress({ ...address, detailed_address: e.target.value })}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Batal
                </button>
                <button type="button" className="btn btn-primary" onClick={() => handleConfirm(address)}>
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const fetchAddresses = async (userId, setAddresses) => {
  if (userId) {
    console.log(`Fetching addresses for userId: ${userId}`);
    try {
      const response = await axios.get(`http://localhost:8080/address/${userId}`);
      console.log('Addresses fetched:', response.data);
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
  const [address, setAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
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

  const handleConfirm = async (newAddress) => {
    console.log('Saving address:', newAddress);
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      await saveAddress(storedUserId, newAddress);
      setShowModal(false);
      fetchAddresses(storedUserId, setAddresses); // Re-fetch addresses after adding a new one
    }
  };

  const saveAddress = async (userId, newAddress) => {
    try {
      console.log('POST URL:', 'http://localhost:8080/address');
      console.log('POST data:', { ...newAddress, user_id: userId }); // Include user_id
      await axios.post('http://localhost:8080/address', { ...newAddress, user_id: userId });
    } catch (error) {
      console.error('There was an error saving the address!', error);
    }
  };

  const updateAddress = async (addressId, updatedAddress) => {
    try {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        console.log('PUT URL:', `http://localhost:8080/address/${addressId}`);
        console.log('PUT data:', updatedAddress);
        await axios.put(`http://localhost:8080/address/${addressId}`, { ...updatedAddress, user_id: storedUserId });
      }
    } catch (error) {
      console.error('There was an error updating the address!', error);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        console.log('DELETE URL:', `http://localhost:8080/address/${addressId}`);
        await axios.delete(`http://localhost:8080/address/${addressId}`, { data: { user_id: storedUserId } });
        fetchAddresses(storedUserId, setAddresses); // Re-fetch addresses after deletion
      }
    } catch (error) {
     
      console.error('There was an error deleting the address!', error);
    }
  };

  const totalShippingCost = 0; // Update this if you have shipping costs
  const totalCost = productCost + totalShippingCost;

  return (
    <div className="container">
      <h1 className="mt-5">Checkout</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="address">Alamat Pengiriman:</label>
            <input
              type="text"
              id="address"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary mt-2" onClick={handleAddAddressClick}>
            Tambah Alamat
          </button>
        </div>
        <div className="col-md-12 mt-3">
          <h3>Alamat yang Tersedia</h3>
          <ul>
            {addresses.map((addr, index) => (
              <li key={index}>
                {addr.full_name}, {addr.detailed_address}, {addr.city}, {addr.province}
              </li>
            ))}
          </ul>
        </div>
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
      {showModal && (
        <AddressModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Checkout;
