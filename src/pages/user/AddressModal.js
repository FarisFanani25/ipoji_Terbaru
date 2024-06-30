import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaEdit, FaTrash, FaPlus, FaTimes, FaSave } from 'react-icons/fa';
import "../../styles/checkout.css";
import Header from "../../components/header/HeaderUser";
import Footer from "../../components/Footer/Footer";
import  Helmet  from '../../components/Helmet/Helmet';


axios.defaults.withCredentials = true;

const AddressModal = ({ showModal, handleCloseModal, handleConfirm, addresses, setPrimaryAddressHandler, updateAddress, deleteAddress, saveAddress, fetchAddresses }) => {
  const [address, setAddress] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [currentEditAddress, setCurrentEditAddress] = useState(null);
  
  useEffect(() => {
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then(response => response.json())
      .then(data => setProvinces(data))
      .catch(error => console.error('Error fetching provinces:', error));
  }, []);

  useEffect(() => {
    if (address.provinceId) {
      const fetchCities = async () => {
        try {
          const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${address.provinceId}.json`);
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };
      fetchCities();
    }
  }, [address.provinceId]);

  useEffect(() => {
    if (address.cityId) {
      const fetchDistricts = async () => {
        try {
          const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${address.cityId}.json`);
          const data = await response.json();
          setDistricts(data);
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      };
      fetchDistricts();
    }
  }, [address.cityId]);

  useEffect(() => {
    if (address.districtId) {
      const fetchSubdistricts = async () => {
        try {
          const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${address.districtId}.json`);
          const data = await response.json();
          setSubdistricts(data);
        } catch (error) {
          console.error('Error fetching subdistricts:', error);
        }
      };
      fetchSubdistricts();
    }
  }, [address.districtId]);

  useEffect(() => {
    if (showEditAddressModal && currentEditAddress) {
      setAddress(currentEditAddress);
    }
  }, [showEditAddressModal, currentEditAddress]);

  const handleProvinceChange = (e) => {
    const selectedProvince = provinces.find(province => province.id === e.target.value);
    setAddress({ ...address, province: selectedProvince.name, provinceId: selectedProvince.id, city: '', cityId: '', district: '', districtId: '', subdistrict: '', subdistrictId: '' });
    setCities([]);
    setDistricts([]);
    setSubdistricts([]);
  };

  const handleCityChange = (e) => {
    const selectedCity = cities.find(city => city.id === e.target.value);
    setAddress({ ...address, city: selectedCity.name, cityId: selectedCity.id, district: '', districtId: '', subdistrict: '', subdistrictId: '' });
    setDistricts([]);
    setSubdistricts([]);
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = districts.find(district => district.id === e.target.value);
    setAddress({ ...address, district: selectedDistrict.name, districtId: selectedDistrict.id, subdistrict: '', subdistrictId: '' });
    setSubdistricts([]);
  };

  const handleSubdistrictChange = (e) => {
    const selectedSubdistrict = subdistricts.find(subdistrict => subdistrict.id === e.target.value);
    setAddress({ ...address, subdistrict: selectedSubdistrict.name, subdistrictId: selectedSubdistrict.id });
  };

  const handleClickOutsideModal = (e) => {
    if (e.target.className === 'modal') {
      handleCloseModal();
    }
  };

  const handleAddAddress = () => {
    setShowAddAddressModal(true);
  };

  const handleAddAddressConfirm = (newAddress) => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      saveAddress(storedUserId, newAddress);
      setShowAddAddressModal(false);
      fetchAddresses(); // Re-fetch addresses after saving
    } else {
      console.error('User ID not found in localStorage');
    }
  };

  const handleAddAddressClose = () => {
    setShowAddAddressModal(false);
  };

  const handleEditAddress = (address) => {
    setCurrentEditAddress(address);
    setShowEditAddressModal(true);
  };

  const handleEditAddressConfirm = (updatedAddress) => {
    updateAddress(updatedAddress.id_addresses, updatedAddress);
    setShowEditAddressModal(false);
    fetchAddresses(); // Re-fetch addresses after updating
  };

  const handleEditAddressClose = () => {
    setShowEditAddressModal(false);
    setCurrentEditAddress(null);
  };

  return (
    <Helmet title={"AddressModal"}>
      <Header/>
    <div>
      {showModal && (
        <div className="modal" style={{ display: 'block' }} onClick={handleClickOutsideModal}>
          <div className="modal-dialog" style={{ boxShadow: '0 80px 160px rgba(0,0,0,0.1)' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pilih Alamat Utama</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                <ul className="address-list">
                  {addresses.map((addr) => (
                    <li key={addr.id_addresses} className="address-item">
                      <p>{addr.full_name}, {addr.detailed_address}, {addr.province}, {addr.city}, {addr.district}, {addr.subdistrict}</p>
                      <div className="address-actions">
                        <button className="btn btn-primary" onClick={() => setPrimaryAddressHandler(addr.id_addresses)}>
                          <FaCheck /> Set as Primary
                        </button>
                        <button className="btn btn-secondary" onClick={() => handleEditAddress(addr)}>
                          <FaEdit /> Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => deleteAddress(addr.id_addresses)}>
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="btn btn-secondary mt-2" onClick={handleAddAddress}>
                  <FaPlus /> Tambah Alamat
                </button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  <FaTimes /> Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddAddressModal && (
        <div className="modal" style={{ display: 'block' }} onClick={handleClickOutsideModal}>
          <div className="modal-dialog" style={{ boxShadow: '0 80px 160px rgba(0,0,0,0.1)' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tambah Alamat</h5>
                <button type="button" className="close" onClick={handleAddAddressClose}>
                  <FaTimes />
                </button>
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
                      value={address.provinceId || ''}
                      onChange={handleProvinceChange}
                    >
                      <option value="">Pilih Provinsi</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">Kota/Kabupaten:</label>
                    <select
                      id="city"
                      className="form-control"
                      value={address.cityId || ''}
                      onChange={handleCityChange}
                    >
                      <option value="">Pilih Kota/Kabupaten</option>
                      {cities.map((city) => (
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
                      value={address.districtId || ''}
                      onChange={handleDistrictChange}
                    >
                      <option value="">Pilih Kecamatan</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subdistrict">Kelurahan/Desa:</label>
                    <select
                      id="subdistrict"
                      className="form-control"
                      value={address.subdistrictId || ''}
                      onChange={handleSubdistrictChange}
                    >
                      <option value="">Pilih Kelurahan/Desa</option>
                      {subdistricts.map((subdistrict) => (
                        <option key={subdistrict.id} value={subdistrict.id}>
                          {subdistrict.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="detailed_address">Alamat Detail:</label>
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
                <button type="button" className="btn btn-secondary" onClick={handleAddAddressClose}>
                  <FaTimes /> Batal
                </button>
                <button type="button" className="btn btn-primary" onClick={() => handleAddAddressConfirm(address)}>
                  <FaSave /> Simpan Alamat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditAddressModal && (
        <div className="modal" style={{ display: 'block' }} onClick={handleClickOutsideModal}>
          <div className="modal-dialog" style={{ boxShadow: '0 80px 160px rgba(0,0,0,0.1)' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Alamat</h5>
                <button type="button" className="close" onClick={handleEditAddressClose}>
                  <FaTimes />
                </button>
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
                      value={address.provinceId || ''}
                      onChange={handleProvinceChange}
                    >
                      <option value="">Pilih Provinsi</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">Kota/Kabupaten:</label>
                    <select
                      id="city"
                      className="form-control"
                      value={address.cityId || ''}
                      onChange={handleCityChange}
                    >
                      <option value="">Pilih Kota/Kabupaten</option>
                      {cities.map((city) => (
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
                      value={address.districtId || ''}
                      onChange={handleDistrictChange}
                    >
                      <option value="">Pilih Kecamatan</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subdistrict">Kelurahan/Desa:</label>
                    <select
                      id="subdistrict"
                      className="form-control"
                      value={address.subdistrictId || ''}
                      onChange={handleSubdistrictChange}
                    >
                      <option value="">Pilih Kelurahan/Desa</option>
                      {subdistricts.map((subdistrict) => (
                        <option key={subdistrict.id} value={subdistrict.id}>
                          {subdistrict.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="detailed_address">Alamat Detail:</label>
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
                <button type="button" className="btn btn-secondary" onClick={handleEditAddressClose}>
                  <FaTimes /> Batal
                </button>
                <button type="button" className="btn btn-primary" onClick={() => handleEditAddressConfirm(address)}>
                  <FaSave /> Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </Helmet>
  );
};

export default AddressModal;