import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from '@coreui/react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";


function PenjualProducts() {
  const [dataProduk, setDataProduk] = useState([]);
  const [id, setId] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [deskripsiProduk, setDeskripsiProduk] = useState("");
  const [hargaProduk, setHargaProduk] = useState("");
  const [gambarProduk, setGambarProduk] = useState("");
  const [BeratProduk, setBeratProduk] = useState("");
  const [StokProduk, setStokProduk] = useState("");
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // State untuk form tambah data
  const [newNamaProduk, setNewNamaProduk] = useState("");
  const [newDeskripsiProduk, setNewDeskripsiProduk] = useState("");
  const [newHargaProduk, setNewHargaProduk] = useState("");
  const [newGambarProduk, setNewGambarProduk] = useState("");
  const [newBeratProduk, setNewBeratProduk] = useState("");
  const [newStokProduk, setNewStokProduk] = useState("");

  // State untuk form tambah data
  


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

  const showModal = (data) => {
    setId(data.id_produk);
    setNamaProduk(data.nama_produk);
    setDeskripsiProduk(data.deskripsi_produk);
    setHargaProduk(data.harga_produk);
    setGambarProduk(data.gambar_produk);
    setBeratProduk(data.berat_produk);
    setStokProduk(data.stok_produk);
    setShow(true);
  };

  const closeModal = () => {
    setId("");
    setNamaProduk("");
    setDeskripsiProduk("");
    setHargaProduk("");
    setGambarProduk("");
    setBeratProduk("");
    setStokProduk("");
    setShow(false);
  };

  const showAddModal = () => {
    setNewNamaProduk("");
    setNewDeskripsiProduk("");
    setNewHargaProduk("");
    setNewGambarProduk("");
    setBeratProduk("");
    setStokProduk("");
    setShowAdd(true);
  };


  const closeAddModal = () => {
    setNewNamaProduk("");
    setNewDeskripsiProduk("");
    setNewHargaProduk("");
    setNewGambarProduk("");
    setBeratProduk("");
    setStokProduk("");
    setShowAdd(false);
  };

  const addDataProduk = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("nama_produk", newNamaProduk);
    formData.append("deskripsi_produk", newDeskripsiProduk);
    formData.append("harga_produk", newHargaProduk);
    formData.append("gambar_produk", newGambarProduk);
    formData.append("berat_produk", newBeratProduk);
    formData.append("stok_produk", newStokProduk);
  
    try {
      const response = await axios.post('http://localhost:8080/api/produk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Response:', response.data); // Tambahkan log untuk menampilkan respons
  
      if (response.data.status === 200) {
        alert(response.data.messages.success);
        getDataProduk();
        closeAddModal();
      } else {
        alert("Data Gagal Ditambahkan: " + response.data.messages.error);
      }
    } catch (error) {
      console.error("Error adding data:", error);
      alert("Data Gagal Ditambahkan. Lihat konsol untuk detail.");
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
        console.log(response); // Cetak seluruh objek respon ke konsol
        alert(response.data.messages);
        getDataProduk();
    } catch (error) {
        console.error("Error deleting data:", error);
        alert("Data Gagal Dihapus. Lihat konsol untuk detail.");
    } finally {
        closeModalDelete();
    }
};



  return (
    
    <div className='body-flex'>
      <div className="flex">
        <div className='col-10 p-5'>
          {/* Tombol Tambah */}
          <div className="text-center mb-3">
            <CButton color="primary" onClick={showAddModal}>
              Tambah Data Produk
            </CButton>
          </div>
          <CTable striped>
            
            <CTableHead>
              <CTableRow>
                <CTableDataCell>Nama Produk</CTableDataCell>
                <CTableDataCell>Deskripsi Produk</CTableDataCell>
                <CTableDataCell>Harga Produk</CTableDataCell>
                <CTableDataCell>Gambar Produk</CTableDataCell>
                <CTableDataCell>Berat</CTableDataCell>
                <CTableDataCell>Stok</CTableDataCell>
                <CTableDataCell>Action</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataProduk.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{item.nama_produk}</CTableDataCell>
                  <CTableDataCell>{item.deskripsi_produk}</CTableDataCell>
                  <CTableDataCell>{item.harga_produk}</CTableDataCell>
                  <CTableDataCell>
                    <img
                      src={`http://localhost:8080/gambar/${item.gambar_produk}`}
                      alt={item.nama_produk}
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  </CTableDataCell>
                  <CTableDataCell>{item.berat_produk}</CTableDataCell>
                  <CTableDataCell>{item.stok_produk}</CTableDataCell>
                  <CTableDataCell>
                     <CButton
                      className='btn btn-primary text-white me-2'
                      onClick={() => showModal(item)}
                    >
                      Edit
                    </CButton> 
                    <CButton
                      className='btn btn-danger text-white'
                      onClick={() => showModalDelete(item)}
                    >
                      Hapus
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
              <CTableRow>
                <CTableDataCell colSpan="5" className="text-center">
                 
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </div>
      </div>

      <Modal show={showAdd} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Form Tambah Data Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addDataProduk}>
            <Form.Group className="mb-3" controlId="formNamaProduk">
              <Form.Label>Nama Produk</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewNamaProduk(e.target.value)}
                value={newNamaProduk}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDeskripsiProduk">
              <Form.Label>Deskripsi Produk</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setNewDeskripsiProduk(e.target.value)}
                value={newDeskripsiProduk}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHargaProduk">
              <Form.Label>Harga Produk</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewHargaProduk(e.target.value)}
                value={newHargaProduk}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGambarProduk">
              <Form.Label>Gambar Produk</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setNewGambarProduk(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBeratProduk">
              <Form.Label>Berat Produk</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewBeratProduk(e.target.value)}
                value={newBeratProduk}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStokProduk">
              <Form.Label>Stok Produk</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewStokProduk(e.target.value)}
                value={newStokProduk}
              />
            </Form.Group>
            <Button type='submit' color="primary" className="px-4">
              Tambahkan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={closeModalDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Penghapusan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin menghapus data ini?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteDataProduk}>
            Hapus
          </Button>
          <Button variant="secondary" onClick={closeModalDelete}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PenjualProducts;
