import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import logo from '../../Images/LOGO.png';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Gunakan useNavigate

function RegisterAdmin() {
  const [nama, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Inisialisasi useNavigate

  const saveAdmin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/admin/register', {
        nama: nama,
        email: email,
        password: password,
      });

      // Handle successful response
      console.log('Data Inserted', response.data);

      // Show success alert
      window.alert('Admin registration successful!');

      // Redirect to "/admin/login" after successful registration
      navigate('/admin/login');
    } catch (error) {
      // Handle error
      console.error('Error inserting data', error);
    }
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img src={logo} style={{ width: '185px' }} alt="logo" />
            </div>

            <h3>Sign Up as Admin</h3>

            <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' value={nama} onChange={(e) => setName(e.target.value)} />
            <MDBInput wrapperClass='mb-4' label='Email address' id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <MDBInput wrapperClass='mb-4' label='Password' id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn onClick={saveAdmin} className="mb-4 w-100 gradient-custom-2">Sign Up</MDBBtn>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
            </div>
          </div>
        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">Hello, <br /> Admin</h4>
              <h4 className="mb-4">Have a nice day!</h4>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default RegisterAdmin;
