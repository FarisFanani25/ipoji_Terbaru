import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/checkout.css";

const saveAddress = async (address) => {
  try {
    const response = await axios.post('http://localhost:8080/api/address', address);
    console.log('Address saved successfully:', response.data);
  } catch (error) {
    console.error('Error saving address:', error);
  }
};


const AddressModal = ({ showModal, handleCloseModal }) => {
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
    showModal && (
      <div className="modal" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Tambah Alamat</h5>
              <button type="button" className="close" onClick={handleCloseModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="fullName">Nama Lengkap:</label>
                  <input
                    type="text"
                    id="fullName"
                    className="form-control"
                    value={address.fullName || ''}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Nomor Telepon:</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    className="form-control"
                    value={address.phoneNumber || ''}
                    onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
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
                  <label htmlFor="detailedAddress">Alamat:</label>
                  <textarea
                    id="detailedAddress"
                    className="form-control"
                    value={address.detailedAddress || ''}
                    onChange={(e) => setAddress({ ...address, detailedAddress: e.target.value })}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const Checkout = () => {
  const [address, setAddress] = useState('');
  const [productCost, setProductCost] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleAddAddressClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
            <textarea id="address" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <button className="btn btn-secondary mt-2" onClick={handleAddAddressClick}>Tambah Alamat</button>
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
          <div className="col-md-6">
            <div>Rp. {productCost}</div>
            <div>Rp. {totalShippingCost}</div>
            <div>Rp. {totalCost}</div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <button className="btn btn-success">Lanjut Pembayaran</button>
      </div>

      <AddressModal showModal={showModal} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default Checkout;
