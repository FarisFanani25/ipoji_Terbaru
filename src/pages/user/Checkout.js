import React from 'react';
import "../../styles/checkout.css";

const Checkout = () => {
  const productCost = 13440; // Dummy value for product cost
  const discount = 100; // Dummy value for discount
  const shippingCost = 20500; // Dummy value for shipping cost
  const totalCost = productCost + shippingCost - discount;

  return (
    <div className="container">
      <div className="checkout">
        <div className="checkout-header  mt-20">
          <h2>Alamat Pengiriman</h2>
          <div className="address">
            <p>Fernando Djaka Satria Putra (+62) 85710283688</p>
            <p>Perumnas Griya Mapan Kaligunting, RT.15/RW.1, Kaligunting, Mejayan (Blok C.1), KAB. MADIUN - MEJAYAN, JAWA TIMUR, ID 63153</p>
          </div>
        </div>

        <div className="checkout-body">
          <h2>Produk Dipesan</h2>
          <div className="product">
            <img src="https://via.placeholder.com/100" alt="Product" />
            <div className="product-details">
              <p>SKETCHBOOK A5 ISI 100 HALAMAN / BUKU SKETSA/ BUKU GAMBAR</p>
              <p>Variasi: kupu kupu, cream</p>
              <p>Rp13.440</p>
            </div>
          </div>
        </div>

        <div className="checkout-footer">
          <div className="shipping">
            <h2>Opsi Pengiriman</h2>
            <p>Hemat - Rp20.500</p>
          </div>
          <div className="summary">
            <h2>Ringkasan Belanja</h2>
            <div className="summary-item">
              <span>Biaya Produk</span>
              <span>Rp{productCost}</span>
            </div>
            <div className="summary-item">
              <span>Biaya Pengiriman</span>
              <span>Rp{shippingCost}</span>
            </div>
            <div className="summary-item">
              <span>Diskon</span>
              <span>-Rp{discount}</span>
            </div>
            <div className="summary-item total">
              <span>Total Biaya</span>
              <span>Rp{totalCost}</span>
            </div>
          </div>
        </div>

        <button className="btn btn-primary">Lanjut Pembayaran</button>
      </div>
    </div>
  );
};

export default Checkout;
