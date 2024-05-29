import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import padiImage from "../../assets/images/gambar1.jpg"; // Import gambar padi

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/register', {
        name: name,
        email: email,
        password: password
      });

      // Handle successful response
      console.log('Data Inserted', response.data);

      // Show success alert
      window.alert('Registration successful!');

      // Redirect after successful registration
      navigate("/login");
    } catch (error) {
      // Handle error
      if (error.response.status === 409) {
        setError('Email sudah pernah digunakan');
      } else {
        console.error('Error inserting data', error);
      }
    }
  };

  return (
    <section>
      
      <Container>
        <div className="signup-container p-4" style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)" }}>
          <Row className="align-items-center">
          <Col lg="6" md="6" sm="12">
              <img src={padiImage} alt="Padi" className="img-fluid" style={{ maxWidth: '90%', height: 'auto', marginBottom: '20px', borderRadius: '15px' }} />
            </Col>
            <Col lg="6" md="6" sm="12" className="text-left">
              <form className="form mb-5" onSubmit={saveUser}>
                <h2 className="mb-5" style={{ fontWeight: 500 }}>Daftar Akun</h2>
                <h4 className="mb-5" style={{ fontWeight: 300, fontSize: '1rem' }}>Tingkatkan Kesehatan Anda, Mulai dengan Pilihan Beras Sehat</h4>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error && <p className="text-danger">{error}</p>}
                </div>
                <div className="form-group mt-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  Daftar
                </button>
              </form>
              <Link to="/login">Sudah memiliki akun? Klik Disini</Link>
            </Col>
            
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Signup;
