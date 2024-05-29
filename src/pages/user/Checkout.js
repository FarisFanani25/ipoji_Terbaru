import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState(1000);
  const [shippingCost, setShippingCost] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch list of provinces
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/province');
        if (response.data.rajaongkir) {
          setProvinces(response.data.rajaongkir.results);
        } else {
          throw new Error('No provinces data found');
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = async (e) => {
    const selectedProvince = e.target.value;
    setOrigin(selectedProvince);
    try {
      const response = await axios.get(`http://localhost:8080/api/city?province=${selectedProvince}`);
      if (response.data.rajaongkir) {
        setCities(response.data.rajaongkir.results);
      } else {
        throw new Error('No cities data found');
      }
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
      const response = await axios.post('http://localhost:8080/api/cost', {
        origin: origin,
        destination: destination,
        weight: weight,
        courier: 'jne'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'key': '77f24e2edd49b1e23c318f8170fa7456' // Kunci API
        }
      });
      if (response.data.rajaongkir) {
        setShippingCost(response.data.rajaongkir.results[0].costs);
      } else {
        throw new Error('No shipping cost data found');
      }
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    console.error("API Error:", error); // Log the error for debugging
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>RajaOngkir API Example</h1>
      <div>
        <label htmlFor="province">Origin Province:</label>
        <select id="province" onChange={handleProvinceChange}>
          <option value="">Select Origin Province</option>
          {provinces.map(province => (
            <option key={province.province_id} value={province.province_id}>{province.province}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="city">Destination City:</label>
        <select id="city" onChange={handleDestinationChange}>
          <option value="">Select Destination City</option>
          {cities.map(city => (
            <option key={city.city_id} value={city.city_id}>{city.city_name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="weight">Weight (grams):</label>
        <input type="number" id="weight" value={weight} onChange={handleWeightChange} />
      </div>
      <button onClick={handleCalculateShippingCost}>Calculate Shipping Cost</button>
      <div>
        <h2>Shipping Cost</h2>
        <ul>
          {shippingCost.map((cost, index) => (
            <li key={index}>{cost.service} - {cost.description} : Rp. {cost.cost[0].value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Checkout;
