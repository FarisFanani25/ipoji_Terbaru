import React, { useState } from 'react';
import "../../styles/EditAlamat.css";
import Header from "../../components/header/HeaderUser";
import Footer from "../../components/Footer/Footer";
import  Helmet  from '../../components/Helmet/Helmet';

const EditAddressPopup = ({ isOpen, onClose, onSave, initialAddress }) => {
  const [address, setAddress] = useState(initialAddress);

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSave = () => {    
    onSave(address);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Helmet title={"EditAlamat"}>
        <Header />
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>Edit Address</h2>
        <textarea
          value={address}
          onChange={handleChange}
          rows="10"
          cols="100"
        />
        <div className="popup-buttons">
          <button onClick={onClose} className="popup-button cancel">Cancel</button>
          <button onClick={handleSave} className="popup-button save">Save</button>
        </div>
      </div>
    </div>
    <Footer/>

        </Helmet>
  );
};

export default EditAddressPopup;
