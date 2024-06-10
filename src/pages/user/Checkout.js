import React, { useState } from 'react';
import EditAddressPopup from './EditAlamat';
import "../../styles/checkout.css";


const Checkout = () => {
<<<<<<< HEAD
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [origin, setOrigin] = useState('ID-JK'); 
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState(1000);
  const [shippingCost, setShippingCost] = useState([]);
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [shippingOption, setShippingOption] = useState('');
  const [productCost, setProductCost] = useState(0); 
  const [showModal, setShowModal] = useState(false); // State for Modal Visibility
=======
  const productCost = 13440; // Dummy value for product cost
  const discount = 100; // Dummy value for discount
  const shippingCost = 20500; // Dummy value for shipping cost
  const totalCost = productCost + shippingCost - discount;
>>>>>>> bb113fec78225b50c50f6b9977f9d9c5615df531

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [address, setAddress] = useState('Fernando Djaka Satria Putra (+62) 85710283688\nPerumnas Griya Mapan Kaligunting, RT.15/RW.1, Kaligunting, Mejayan (Blok C.1), KAB. MADIUN - MEJAYAN, JAWA TIMUR, ID 63153');

<<<<<<< HEAD
  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
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
        origin: origin,
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

  const handleAddAddressClick = () => {
    setShowModal(true); // Show Modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close Modal
  };

  const handleSaveAddress = () => {
    // Save the new address logic here
    setShowModal(false);
  };

  if (error) {
    console.error("API Error:", error);
    return <div>Error: {error.message}</div>;
  }

  const totalShippingCost = shippingCost.length > 0 ? shippingCost[0].cost[0].value : 0;
  const totalCost = productCost + totalShippingCost;
=======
  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);
  const saveAddress = (newAddress) => setAddress(newAddress);
>>>>>>> bb113fec78225b50c50f6b9977f9d9c5615df531

  return (
    <div className="container">
      <div className="checkout">
        <div className="checkout-header mt-20">
          <h2>Alamat Pengiriman</h2>
          <div className="address">
            <p>{address}</p>
            <button className="btn btn-secondary" onClick={openPopup}>Ubah</button>
          </div>
          <button className="btn btn-secondary mt-2" onClick={handleAddAddressClick}>Tambah Alamat</button>
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
<<<<<<< HEAD
      <div className="mt-5">
        <button className="btn btn-success">Lanjut Pembayaran</button>
      </div>

      {/* Modal for Adding Address */}
      {showModal && (
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
                  <option key={province.province_id} value={province.province_id}>
                    {province.province}
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
                  <option key={city.city_id} value={city.city_id}>
                    {city.city_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="district">Kecamatan:</label>
              <input
                type="text"
                id="district"
                className="form-control"
                value={address.district || ''}
                onChange={(e) => setAddress({ ...address, district: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subdistrict">Kelurahan:</label>
              <input
                type="text"
                id="subdistrict"
                className="form-control"
                value={address.subdistrict || ''}
                onChange={(e) => setAddress({ ...address, subdistrict: e.target.value })}
              />
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
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
            Batal
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSaveAddress}>
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
)}

=======

      <EditAddressPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onSave={saveAddress}
        initialAddress={address}
      />
>>>>>>> bb113fec78225b50c50f6b9977f9d9c5615df531
    </div>
  );
};

export default Checkout;
