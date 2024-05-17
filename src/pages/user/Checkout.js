import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/checkout.css";

const Checkout = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState(1000);
  const [shippingCost, setShippingCost] = useState([]);
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [shippingOption, setShippingOption] = useState('');
  const [productCost, setProductCost] = useState(0); // Dummy value for product cost

  useEffect(() => {
    // Kosongkan useEffect untuk menonaktifkan pengambilan API
  }, []);

  const handleProvinceChange = async (e) => {
    // Biarkan implementasi fungsi ini seperti semula
  };

  const handleDestinationChange = (e) => {
    // Biarkan implementasi fungsi ini seperti semula
  };

  const handleWeightChange = (e) => {
    // Biarkan implementasi fungsi ini seperti semula
  };

  const handleCalculateShippingCost = async () => {
    // Biarkan implementasi fungsi ini seperti semula
  };

  const handleShippingOptionChange = (e) => {
    setShippingOption(e.target.value);
  };

  if (error) {
    console.error("API Error:", error); // Log the error for debugging
    return <div>Error: {error.message}</div>;
  }

  const totalShippingCost = shippingCost.length > 0 ? shippingCost[0].cost[0].value : 0;
  const totalCost = productCost + totalShippingCost;

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-form">
        <div className="form-group">
          <label htmlFor="province" className="form-label">Provinsi Asal:</label>
          <select id="province" className="form-select" onChange={handleProvinceChange}>
            <option value="">Pilih Provinsi Asal</option>
            {provinces.map(province => (
              <option key={province.province_id} value={province.province_id}>{province.province}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="city" className="form-label">Kota Tujuan:</label>
          <select id="city" className="form-select" onChange={handleDestinationChange}>
            <option value="">Pilih Kota Tujuan</option>
            {cities.map(city => (
              <option key={city.city_id} value={city.city_id}>{city.city_name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="postalCode" className="form-label">Kode Pos:</label>
          <input type="text" id="postalCode" className="form-input" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="address" className="form-label">Alamat Pengiriman:</label>
          <textarea id="address" className="form-textarea" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="weight" className="form-label">Berat (grams):</label>
          <input type="number" id="weight" className="form-input" value={weight} onChange={handleWeightChange} />
        </div>
        <div className="form-group">
          <label htmlFor="shippingOption" className="form-label">Opsi Pengiriman:</label>
          <select id="shippingOption" className="form-select" onChange={handleShippingOptionChange}>
            <option value="">Pilih Opsi Pengiriman</option>
            <option value="jne">JNE</option>
            <option value="tiki">Tiki</option>
            <option value="pos">Pos Indonesia</option>
          </select>
        </div>
        <button className="form-button" onClick={handleCalculateShippingCost}>Hitung Biaya Pengiriman</button>
      </div>
      <div className="checkout-results">
        <h2 className="results-title">Biaya Pengiriman</h2>
        <ul className="results-list">
          {shippingCost.map((cost, index) => (
            <li key={index} className="result-item">{cost.service} - {cost.description} : Rp. {cost.cost[0].value}</li>
          ))}
        </ul>
      </div>
      <div className="checkout-summary">
        <h2 className="summary-title">Ringkasan Biaya</h2>
        <div className="summary-item">
          <span>Biaya Produk:</span>
          <span>Rp. {productCost}</span>
        </div>
        <div className="summary-item">
          <span>Biaya Pengiriman:</span>
          <span>Rp. {totalShippingCost}</span>
        </div>
        <div className="summary-total">
          <span>Total Biaya:</span>
          <span>Rp. {totalCost}</span>
        </div>
        <button className="summary-button">Lanjut Pembayaran</button>
      </div>
    </div>
  );
};

export default Checkout;
