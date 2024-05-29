import React, { useState } from 'react';
import '../../styles/checkout.css';

function Checkout() {
    const [cart] = useState([
        { product: { name: 'Product 1', selling_price: 100 }, product_qty: 2 },
        { product: { name: 'Product 2', selling_price: 150 }, product_qty: 1 }
    ]);
    const [buyerInfo, setBuyerInfo] = useState({
        fullName: '',
        phone: '',
        city: '',
        district: '',
        village: '',
        address1: '',
        address2: '',
        shippingMethod: 'ambilDitoko'
    });
    let totalCartPrice = 0;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBuyerInfo({
            ...buyerInfo,
            [name]: value
        });
    };

    const handleCheckout = () => {
        // Handle the checkout process here
        console.log('Checkout info:', buyerInfo);
    };

    return (
        <div className="py-4">
            <div className="container">
                {cart.length > 0 ? (
                    <div className="row">
                        <div className="col-md-7">
                            <div className="card">
                                <div className="card-header buyer-info-header">
                                    <h4>Informasi Pembeli</h4>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label>Nama Lengkap</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            className="form-control"
                                            value={buyerInfo.fullName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Nomor Telepon</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            className="form-control"
                                            value={buyerInfo.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Kota</label>
                                        <select
                                            name="city"
                                            className="form-control"
                                            value={buyerInfo.city}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Pilih Kota</option>
                                            <option value="city1">City 1</option>
                                            <option value="city2">City 2</option>
                                            {/* Add more city options here */}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label>Kecamatan</label>
                                        <select
                                            name="district"
                                            className="form-control"
                                            value={buyerInfo.district}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Pilih Kecamatan</option>
                                            <option value="district1">District 1</option>
                                            <option value="district2">District 2</option>
                                            {/* Add more district options here */}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label>Desa/Kelurahan</label>
                                        <select
                                            name="village"
                                            className="form-control"
                                            value={buyerInfo.village}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Pilih Desa/Kelurahan</option>
                                            <option value="village1">Village 1</option>
                                            <option value="village2">Village 2</option>
                                            {/* Add more village options here */}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label>Alamat Lengkap</label>
                                        <input
                                            type="text"
                                            name="address1"
                                            className="form-control"
                                            value={buyerInfo.address1}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Alamat Lengkap 2 (Opsional)</label>
                                        <input
                                            type="text"
                                            name="address2"
                                            className="form-control"
                                            value={buyerInfo.address2}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Metode Pengiriman</label>
                                        <select
                                            name="shippingMethod"
                                            className="form-control"
                                            value={buyerInfo.shippingMethod}
                                            onChange={handleInputChange}
                                        >
                                            <option value="ambilDitoko">Ambil di Toko</option>
                                            <option value="diantarPenjual">Diantar Penjual</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <p className="text-danger">Hanya Menerima Pembayaran Tunai</p>
                                    </div>
                                    <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="cost-summary">
                                <div className="card-body">
                                    <h5 className="card-title">Ringkasan Biaya</h5>
                                    <table className="table table-bordered rounded-table">
                                        <thead>
                                            <tr>
                                                <th width="50%">Produk</th>
                                                <th>Harga</th>
                                                <th>Jumlah</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((item, idx) => {
                                                totalCartPrice += item.product.selling_price * item.product_qty;
                                                return (
                                                    <tr key={idx}>
                                                        <td>{item.product.name}</td>
                                                        <td>{item.product.selling_price}</td>
                                                        <td>{item.product_qty}</td>
                                                        <td>{item.product.selling_price * item.product_qty}</td>
                                                    </tr>
                                                );
                                            })}
                                            <tr>
                                                <td colSpan="2" className="text-end fw-bold">Total Produk</td>
                                                <td colSpan="2" className="text-end fw-bold">{totalCartPrice}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className="text-end fw-bold">Biaya Pengiriman</td>
                                                <td colSpan="2" className="text-end fw-bold">Gratis</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className="text-end fw-bold">Total Keseluruhan</td>
                                                <td colSpan="2" className="text-end fw-bold">{totalCartPrice}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="card card-body py-5 text-center shadow-sm">
                            <h4>Keranjang Belanja Anda Kosong. Anda berada di Halaman Checkout.</h4>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Checkout;
