import React, { useState, useEffect } from "react";
import Helmet from "../../components/Helmet/Helmet";
import CommonSection from "../../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "../../components/UI/ProductCard";
import ReactPaginate from "react-paginate";
import axios from 'axios';

import "../../styles/produk.css";
import "../../styles/pagination.css";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [products, setProducts] = useState([]);

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

  const handleAddToCart = async (productId) => {
    try {
      // Kirim permintaan POST untuk menambahkan produk ke keranjang
      const response = await axios.post('http://localhost:8080/cart/add', {
        id_produk: productId,
        jumlah: 1, // Atur jumlah produk yang ditambahkan ke 1, atau sesuai kebutuhan
        harga_total: products.find(product => product.id_produk === productId).harga,
        id_user: 1 // Ganti dengan ID pengguna yang sesuai jika Anda memiliki sistem autentikasi
      });
      
      // Tampilkan pesan sukses jika produk berhasil ditambahkan ke keranjang
      alert('Product added to cart successfully!');
    } catch (error) {
      // Tangani kesalahan jika terjadi
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again later.');
    }
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
                <ProductCard item={item} onAddToCart={handleAddToCart} />
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
    </Helmet>
  );
};

export default Shop;