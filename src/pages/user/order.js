import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const PembayaranForm = () => {
    const [formData, setFormData] = useState({
        nama: '',
        notelp: '',
        alamat: '',
        jumlah: '',
        metode_pembayaran: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/pembayaran/process', formData);
            setMessage(response.data.message);
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage('Error: ' + JSON.stringify(error.response.data));
            } else {
                setMessage('Error: Something went wrong');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Halaman Pembayaran</h1>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama" className="form-label">Nama:</label>
                    <input type="text" name="nama" id="nama" className="form-control" value={formData.nama} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">No Telp:</label>
                    <input type="number" name="phone" id="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="alamat" className="form-label">Alamat:</label>
                    <textarea
                        name="alamat"
                        id="address"
                        className="form-control"
                        value={formData.alamat}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="jumlah" className="form-label">Jumlah:</label>
                    <input type="number" name="jumlah" id="items" className="form-control" value={formData.jumlah} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="metode_pembayaran" className="form-label">Metode Pengiriman:</label>
                    <select name="metode_pembayaran" id="paymentMethod" className="form-select" value={formData.metode_pembayaran} onChange={handleChange} required>
                        <option value="">Pilih Metode</option>
                        <option value="Ambil_ditempat">Ambil Ditempat</option>
                        <option value="Antar_penjual">Antar Penjual</option>

                    </select>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Bayar</button>
                </div>
            </form>
        </div>
    );
};

export default PembayaranForm;