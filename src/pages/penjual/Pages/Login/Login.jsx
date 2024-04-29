import React, { useRef, useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import logo from "../../Images/LOGO.png";
import { useNavigate } from 'react-router-dom';
import "./login.css";
import axios from 'axios';
import { useAuth } from '../../../../hooks/AuthContext';  // Import useAuth untuk mengatur state autentikasi

function LoginAdmin() {
  const { dispatch } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const response = await axios.post('http://localhost:8080/admin/login', { email, password });

      if (response.data.status === 'success') {
        // Simpan data session di localStorage atau gunakan cara sesuai kebutuhan aplikasi Anda
        localStorage.setItem('admin_id', response.data.admin_id);
        localStorage.setItem('admin_nama', response.data.admin_nama);
        localStorage.setItem('admin_email', response.data.admin_email);

        console.log('Login Successfull', response.data);

        // Show success alert
        window.alert('Welcome!');

        // Redirect ke dashboard admin setelah login sukses
        navigate("/admin");
      } else {
        setErrorMessage('Login failed. Email or password is incorrect.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred during login. Please try again.');
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

            <h3>Sign In as Admin</h3>

            <MDBInput label='Email address' id='form1' type='email' ref={emailRef} />
            <MDBInput label='Password' id='form2' type='password' ref={passwordRef} />

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn onClick={submitHandler} className="mb-4 w-100 gradient-custom-2">Sign in</MDBBtn>
              <a className="text-muted" href="#!">Forgot password?</a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account yet?</p>
              <MDBBtn onClick={() => navigate('/admin/register')} outline className='mx-2' color='danger'>
                Sign up
              </MDBBtn>
            </div>
            {errorMessage && (
              <p style={{ color: 'red' }}>{errorMessage}</p>
            )}
          </div>
        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
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

export default LoginAdmin;
