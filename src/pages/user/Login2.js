import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import padiImage from "../../assets/images/admin.jpg"; // Import gambar padi

const Login2 = () => {
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
  
    try {
      const email = loginNameRef.current.value;
      const password = loginPasswordRef.current.value;
  
      const response = await axios.post('http://localhost:8080/loginadmin', { email, password });

  
      if (response.data && response.data.token) {
        // Simpan token ke localStorage
        localStorage.setItem('token', response.data.token);
        // Simpan data pengguna ke localStorage (jika diperlukan)
        localStorage.setItem('admin_id', response.data.admin_id);
        localStorage.setItem('admin_name', response.data.admin_name);
        localStorage.setItem('admin_email', response.data.admin_email);
  
        console.log('Login Successfull', response.data);
        
        // Tampilkan alert berhasil
        window.alert('Welcome!');
    
        // Redirect ke halaman home atau dashboard
        navigate("/admin");
      } else {
        setErrorMessage('Login failed. Email or password is incorrect.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };
  

  // Implement logout function
  const logout = () => {
    navigate('/login');
  };

  return (
    <section className="common-section">
      <div className="container">
        <h2 className="text-center mb-4">Login Admin</h2>
        <div className="signup-container p-4 shadow">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    required
                    ref={loginNameRef}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    ref={loginPasswordRef}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                {errorMessage && (
                  <p style={{ color: 'red' }}>{errorMessage}</p>
                )}
              </form>
              <br />
              <button type="button" className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <img src={padiImage} alt="Padi" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login2;
