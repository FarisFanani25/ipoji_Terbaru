import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = () => {
    const [cities, setCities] = useState([]);
    const [shippingCosts, setShippingCosts] = useState([]);
    const [formData, setFormData] = useState({
        kota_asal: '',
        kota_tujuan: '',
        kurir: '',
        berat: ''
    });

    useEffect(() => {
        // Load list of cities when component mounts
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await axios.get('/api/ongkir/getKota');
            setCities(response.data.rajaongkir.results);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/ongkir/cekOngkir', formData);
            setShippingCosts(response.data.rajaongkir.results);
        } catch (error) {
            console.error('Error calculating shipping costs:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="kota_asal">Kota Asal:</label>
                    <select
                        id="kota_asal"
                        className="form-control"
                        value={formData.kota_asal}
                        onChange={(e) => setFormData({ ...formData, kota_asal: e.target.value })}
                        required
                    >
                        <option value="">Pilih Kota Asal</option>
                        {cities.map((city) => (
                            <option key={city.city_id} value={city.city_id}>
                                {city.city_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="kota_tujuan">Kota Tujuan:</label>
                    <select
                        id="kota_tujuan"
                        className="form-control"
                        value={formData.kota_tujuan}
                        onChange={(e) => setFormData({ ...formData, kota_tujuan: e.target.value })}
                        required
                    >
                        <option value="">Pilih Kota Tujuan</option>
                        {cities.map((city) => (
                            <option key={city.city_id} value={city.city_id}>
                                {city.city_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="kurir">Kurir:</label>
                    <select
                        id="kurir"
                        className="form-control"
                        value={formData.kurir}
                        onChange={(e) => setFormData({ ...formData, kurir: e.target.value })}
                        required
                    >
                        <option value="">Pilih Kurir</option>
                        <option value="jne">JNE</option>
                        <option value="pos">POS Indonesia</option>
                        <option value="tiki">TIKI</option>
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="berat">Berat (kg):</label>
                    <input
                        type="number"
                        id="berat"
                        className="form-control"
                        value={formData.berat}
                        onChange={(e) => setFormData({ ...formData, berat: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Cek Ongkir
                </button>
            </form>
            {/* Display shipping costs */}
            <div className="mt-4">
                <h4>Biaya Pengiriman:</h4>
                <ul>
                    {shippingCosts.map((cost) => (
                        <li key={cost.service}>
                            <strong>{cost.service}</strong>: {cost.cost[0].value} - {cost.cost[0].etd} hari
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Checkout;
