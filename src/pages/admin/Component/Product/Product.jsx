import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/Footer/FooterAdmin";
import Helmet from '../../../../components/Helmet/Helmet';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from '@coreui/react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import "./Productpage.css";

function ProdukPage() {
  const [dataProduk, setDataProduk] = useState([]);
  const [id, setId] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const [nama_produk, setNamaProduk] = useState("");
  const [deskripsi_produk, setDeskripsiProduk] = useState("");
  const [harga_produk, setHargaProduk] = useState("");
  const [berat_produk, setBeratProduk] = useState(null);
  const [gambar_produk, setGambarProduk] = useState(null);
  const [stok_produk, setStokProduk] = useState(null);
  const [oldImage, setOldImage] = useState("");

  useEffect(() => {
    getDataProduk();
  }, []);

  const getDataProduk = async () => {
    try {
      const response = await axios.get('http://localhost:8080/produk');
      setDataProduk(response.data.produk);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showModalDelete = (data) => {
    setId(data.id_produk);
    setShowDelete(true);
  };

  const closeModalDelete = () => {
    setId("");
    setShowDelete(false);
  };

  const deleteDataProduk = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete/produk/${id}`);
      alert(response.data.messages);
      getDataProduk();
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Data Gagal Dihapus. Lihat konsol untuk detail.");
    } finally {
      closeModalDelete();
    }
  };

  const showEditModal = (data) => {
    setEditingData(data);
    setNamaProduk(data.nama_produk);
    setDeskripsiProduk(data.deskripsi_produk);
    setHargaProduk(data.harga_produk);
    setBeratProduk(data.berat_produk);
    setStokProduk(data.stok_produk);
    setOldImage(data.gambar_produk);
    setShowEdit(true);
  };

  const closeEditModal = () => {
    setEditingData(null);
    setShowEdit(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingData({ ...editingData, [name]: value });
  };

  const handleEditFileChange = (e) => {
    setGambarProduk(e.target.files[0]);
  };

  const editDataProduk = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nama_produk", nama_produk);
    formData.append("deskripsi_produk", deskripsi_produk);
    formData.append("harga_produk", harga_produk);
    formData.append("gambar_produk", gambar_produk || oldImage);
    formData.append("berat_produk", berat_produk);
    formData.append("stok_produk", stok_produk);

    try {
      const response = await axios.post(`http://localhost:8080/update/produk/${editingData.id_produk}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 'success') {
        alert(response.data.message);
        await getDataProduk();  // Fetch the updated data
        closeEditModal();  // Close the modal
      } else {
        alert("Gagal menyimpan perubahan: " + response.data.message);
      }
    } catch (error) {
      console.error("Error editing data:", error);
      alert("Gagal menyimpan perubahan. Lihat konsol untuk detail.");
    }
  };

  return (
    <Helmet title={"home"}>
      <Header />
      <div className='body-flex'>
        <div className="flex">
          <div className='col-10 p-5'>
            <div className="d-flex justify-content-between mb-3">
              <h2>Daftar Produk</h2>
            </div>
            <CTable striped bordered hover>
              <CTableHead>
                <CTableRow>
                  <CTableDataCell>Nama Produk</CTableDataCell>
                  <CTableDataCell>Deskripsi Produk</CTableDataCell>
                  <CTableDataCell>Harga Produk</CTableDataCell>
                  <CTableDataCell>Gambar Produk</CTableDataCell>
                  <CTableDataCell>Berat</CTableDataCell>
                  <CTableDataCell>Stok</CTableDataCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {dataProduk.map((data) => (
                  <CTableRow key={data.id_produk}>
                    <CTableDataCell>{data.nama_produk}</CTableDataCell>
                    <CTableDataCell>{data.deskripsi_produk}</CTableDataCell>
                    <CTableDataCell>{data.harga_produk}</CTableDataCell>
                    <CTableDataCell>
                      <img src={`http://localhost:8080/gambar/${data.gambar_produk}`} alt={data.nama_produk} style={{ height: "50px", width: "50px" }} />
                    </CTableDataCell>
                    <CTableDataCell>{data.berat_produk}</CTableDataCell>
                    <CTableDataCell>{data.stok_produk}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
        </div>
      </div>
      <Footer />
    </Helmet>
  );
}

export default ProdukPage;
