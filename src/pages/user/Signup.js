import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import padiImage from "../../assets/images/padi2.png"; // Import gambar padi

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
        <h2 className="text-center mb-4">Sign Up</h2>
        <div className="signup-container p-4" style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)" }}>
          <Row className="align-items-center">
            <Col lg="6" md="6" sm="12">
              <form className="form mb-5" onSubmit={saveUser}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
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
                <button type="submit" className="btn btn-primary mt-4">
                  Sign Up
                </button>
              </form>
              <Link to="/login">Already have an account? Login</Link>
            </Col>
            <Col lg="6" md="6" sm="12">
              <img src={padiImage} alt="Padi" className="img-fluid" />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Signup;
