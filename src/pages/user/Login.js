import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import padiImage from "../../assets/images/gambar1.jpg"; // Import gambar padi

const Login = () => {
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const email = loginNameRef.current.value;
      const password = loginPasswordRef.current.value;

      const response = await axios.post('http://localhost:8080/login', { email, password });

      if (response.data && response.data.token) {
        // Simpan token ke localStorage
        localStorage.setItem('token', response.data.token);
        // Simpan data pengguna ke localStorage (jika diperlukan)
        localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('user_name', response.data.user_name);
        localStorage.setItem('user_email', response.data.user_email);

        console.log('Login Successful', response.data);
        
        // Tampilkan alert berhasil
        window.alert('Welcome!');

        // Redirect ke halaman home atau dashboard
        navigate("/home");
      } else {
        setErrorMessage('Login Gagal. Email atau password salah.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('Terjadi Error. Mohon Ulangi Kembali.');
    }
  };

  // Implement logout function
  const logout = () => {
    navigate('/login');
  };

  return (
    <section>
      <div className="container">
        <div className="signup-container p-4 shadow" style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)" }}>
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <img src={padiImage} alt="Padi" className="img-fluid" style={{ maxWidth: '90%', height: 'auto', marginBottom: '20px', borderRadius: '15px' }} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 text-left">
              <form className="form mb-5" onSubmit={submitHandler}>
                <h2 className="mb-5" style={{ fontWeight: 500 }}>Login</h2>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    required
                    ref={loginNameRef}
                  />
                </div>
                <div className="form-group mt-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    ref={loginPasswordRef}
                  />
                </div>
                <button
                  type="submit"
                  className="btn mt-4"
                  style={{
                    backgroundColor: 'navy',
                    color: 'white',
                    padding: '10px 20px',
                    fontSize: '0.9rem'
                  }}
                >
                  Login
                </button>
                {errorMessage && (
                  <p style={{ color: 'red' }}>{errorMessage}</p>
                )}
              </form>
              <Link to="/signup">
                Tidak Memiliki Akun? Daftar disini
              </Link>
              <br />
              {/* <button type="button" className="btn btn-danger" onClick={logout}>
                Logout
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
