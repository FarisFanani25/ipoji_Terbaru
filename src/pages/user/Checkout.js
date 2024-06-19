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
      const fetchCities = async () => {
        try {
          const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${address.province}.json`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error('Error fetching cities:', error);
          // Tambahkan penanganan error yang lebih baik di sini
        }
      };
      fetchCities();
    }
  }, [address.province]);
  
  useEffect(() => {
    if (address.city) {
      const fetchDistricts = async () => {
        try {
          const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${address.city}.json`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setDistricts(data);
        } catch (error) {
          console.error('Error fetching districts:', error);
          // Tambahkan penanganan error yang lebih baik di sini
        }
      };
      fetchDistricts();
    }
  }, [address.city]);
  
  useEffect(() => {
    if (address.district) {
      const fetchSubdistricts = async () => {
        try {
          const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${address.district}.json`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setSubdistricts(data);
        } catch (error) {
          console.error('Error fetching subdistricts:', error);
          // Tambahkan penanganan error yang lebih baik di sini
        }
      };
      fetchSubdistricts();
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
    const storedUserId = localStorage.getItem('user_id');
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
      const response = await axios.post('http://localhost:8080/address', 
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
    try {
      const storedUserId = localStorage.getItem('user_id');
      if (storedUserId) {
        const response = await axios.put(`http://localhost:8080/address/${addressId}`, 
          { ...updatedAddress, user_id: storedUserId },
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('Address updated:', response.data);
        fetchAddresses(storedUserId, setAddresses); // Re-fetch addresses after updating
      }
    } catch (error) {
      console.error('There was an error updating the address!', error.response || error.message);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const storedUserId = localStorage.getItem('user_id');
      if (storedUserId) {
        const response = await axios.delete(`http://localhost:8080/address/${addressId}`, 
          { data: { user_id: storedUserId } },
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('Address deleted:', response.data);
        fetchAddresses(storedUserId, setAddresses); // Re-fetch addresses after deletion
      }
    } catch (error) {
      console.error('There was an error deleting the address!', error.response || error.message);
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
                <button onClick={() => updateAddress(addr.id, addr)}>Edit</button>
                <button onClick={() => deleteAddress(addr.id)}>Delete</button>
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
