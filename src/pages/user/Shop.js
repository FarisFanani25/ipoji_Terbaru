import React, { useState, useEffect } from "react";
import Helmet from "../../components/Helmet/Helmet";
import CommonSection from "../../components/UI/CommonSection";
import { Container, Row, Col, Button } from "reactstrap";
import ProductCard from "../../components/UI/ProductCard";
import ReactPaginate from "react-paginate";
import axios from 'axios';

import "../../styles/produk.css";
import "../../styles/pagination.css";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [products, setProducts] = useState([]);
  const [addedProduct, setAddedProduct] = useState(null);

  useEffect(() => {
    getDataProduk();
  }, []);

  const getDataProduk = async () => {
    try {
      const response = await axios.get('http://localhost:8080/produk');
      setProducts(response.data.produk);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPageNumber(0); // Reset page number when search term changes
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post('http://localhost:8080/cart/add', { productId });
      setAddedProduct(productId);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
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
      <CommonSection title="Product" />

      <section>
        <Container>
          <Row>
            <Col>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
          <Row>
            {displayPage.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id_produk} className="mb-4">
                <ProductCard item={item}>
                  <Button color="primary" onClick={() => handleAddToCart(item.id_produk)}>Add to Cart</Button>
                </ProductCard>
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
      
      {/* Animasi gambar produk melayang ke ikon keranjang */}
      {addedProduct && (
        <img
          src={`gambar-produk/${addedProduct}.jpg`} // Ubah sesuai dengan alamat gambar produk
          alt="Added to Cart"
          className="product-animation"
        />
      )}
    </Helmet>
  );
};

export default Shop;
