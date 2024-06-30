import React, { useState, useEffect } from "react";
import Helmet from "../../components/Helmet/Helmet";
import CommonSection from "../../components/UI/CommonSection";
import { Container, Row, Col, Button, InputGroup, InputGroupText, Input } from "reactstrap";
import ProductCard from "../../components/UI/ProductCard";
import ReactPaginate from "react-paginate";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../components/header/HeaderUser";
import Footer from "../../components/Footer/Footer";

import "../../styles/produk.css";
import "../../styles/pagination.css";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getDataProduk();
    checkLoginStatus();
  }, []);

  const getDataProduk = async () => {
    try {
      const response = await axios.get('http://localhost:8080/produk');
      setProducts(response.data.produk);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkLoginStatus = () => {
    const userId = localStorage.getItem('user_id');
    setIsLoggedIn(!!userId);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPageNumber(0); // Reset page number when search term changes
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      toast.error("Please log in to add items to the cart.");
      return;
    }
    setCartItems([...cartItems, product]);
    toast.success("Item added to cart!");
  };

  const searchedProduct = products.filter((item) => {
    if (searchTerm === "") {
      return item;
    }
    if (item.nama_produk.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return null;
    }
  });

  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(visitedPage, visitedPage + productPerPage);

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Helmet title="Product">
      <Header />
      <CommonSection title="Product" />

      <section className="product-section">
        <Container>
          <Row>
            <Col className="product-search">
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <InputGroupText>
                  <Button color="primary">Search</Button>
                </InputGroupText>
              </InputGroup>
            </Col>
          </Row>
          <br />
          <Row>
            {displayPage.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id_produk} className="mb-4">
                <ProductCard item={item} onAddToCart={() => handleAddToCart(item)} className="product-card" />
              </Col>
            ))}
          </Row>
          <Row>
            <Col>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                containerClassName="paginationBttns"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <div className="cart-icon">
        <i className="fa fa-shopping-cart"></i>
        {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
      </div>

      <ToastContainer />
      <Footer />
    </Helmet>
  );
};

export default Shop;
