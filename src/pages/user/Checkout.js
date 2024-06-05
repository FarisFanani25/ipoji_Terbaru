import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/checkout.css";

const Checkout = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [origin, setOrigin] = useState('ID-JK'); // Tetapkan kota asal secara langsung
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState(1000);
  const [shippingCost, setShippingCost] = useState([]);
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [shippingOption, setShippingOption] = useState('');
  const [productCost, setProductCost] = useState(0); // Dummy value for product cost

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const result = await axios.get('http://localhost:8080/provinces');
        setProvinces(result.data.rajaongkir.results);
      } catch (error) {
        setError(error);
      }
    };
  
    fetchProvinces();
  }, []);

  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    // setOrigin(provinceId); // Tidak perlu lagi setOrigin di sini
  
    try {
      const result = await axios.get(`http://localhost:8080/cities/${provinceId}`);
      setCities(result.data.rajaongkir.results);
    } catch (error) {
      setError(error);
    }
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleCalculateShippingCost = async () => {
    try {
      const result = await axios.post('http://localhost:8080/shipping-cost', {
        origin: origin, // Gunakan kota asal yang sudah ditetapkan
        destination: destination,
        weight: weight,
        courier: shippingOption
      });
      setShippingCost(result.data.rajaongkir.results);
    } catch (error) {
      setError(error);
    }
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
    <div className="container">
      <h1 className="mt-5">Checkout</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="province">Provinsi Asal:</label>
            <select id="province" className="form-control" onChange={handleProvinceChange}>
              <option value="">Pilih Provinsi Asal</option>
              {provinces.map(province => (
                <option key={province.province_id} value={province.province_id}>{province.province}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="city">Kota Tujuan:</label>
            <select id="city" className="form-control" onChange={handleDestinationChange}>
              <option value="">Pilih Kota Tujuan</option>
              {cities.map(city => (
                <option key={city.city_id} value={city.city_id}>{city.city_name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Kode Pos:</label>
            <input type="text" id="postalCode" className="form-control" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Alamat Pengiriman:</label>
            <textarea id="address" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="weight">Berat (grams):</label>
            <input type="number" id="weight" className="form-control" value={weight} onChange={handleWeightChange} />
          </div>
          <div className="form-group">
            <label htmlFor="shippingOption">Opsi Pengiriman:</label>
            <select id="shippingOption" className="form-control" onChange={handleShippingOptionChange}>
              <option value="">Pilih Opsi Pengiriman</option>
              <option value="jne">JNE</option>
              <option value="tiki">Tiki</option>
              <option value="pos">Pos Indonesia</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleCalculateShippingCost}>Hitung Biaya Pengiriman</button>
        </div>
      </div>
      <div className="mt-5">
        <h2>Biaya Pengiriman</h2>
        <ul className="list-group">
          {shippingCost.map((cost, index) => (
            <li key={index} className="list-group-item">{cost.service} - {cost.description} : Rp. {cost.cost[0].value}</li>
          ))}
        </ul>
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
    </div>
  );
};

export default Checkout;
