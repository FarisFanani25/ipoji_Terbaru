import React, { useState } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';

function ProdukPage() {
  const [showEdit, setShowEdit] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const [nama_produk, setNamaProduk] = useState("");
  const [deskripsi_produk, setDeskripsiProduk] = useState("");
  const [harga_produk, setHargaProduk] = useState("");
  const [berat_produk, setBeratProduk] = useState(null);
  const [gambar_produk, setGambarProduk] = useState(null);
  const [stok_produk, setStokProduk] = useState(null);
  const [oldImage, setOldImage] = useState("");

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
        getDataProduk();
        closeEditModal();
      } else {
        alert("Gagal menyimpan perubahan: " + response.data.message);
      }
    } catch (error) {
      console.error("Error editing data:", error);
      alert("Gagal menyimpan perubahan. Lihat konsol untuk detail.");
    }
  };

  return (
    <div>
      {/* Your existing component structure */}
      <Modal show={showEdit} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data Produk</Modal.Title>
        </Modal.Header>
        <Form onSubmit={editDataProduk}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nama Produk</Form.Label>
              <Form.Control
                type="text"
                name="nama_produk"
                value={nama_produk}
                onChange={(e) => setNamaProduk(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Deskripsi Produk</Form.Label>
              <Form.Control
                type="text"
                name="deskripsi_produk"
                value={deskripsi_produk}
                onChange={(e) => setDeskripsiProduk(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Harga Produk</Form.Label>
              <Form.Control
                type="number"
                name="harga_produk"
                value={harga_produk}
                onChange={(e) => setHargaProduk(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gambar Produk</Form.Label>
              <Form.Control
                type="file"
                name="gambar_produk"
                onChange={handleEditFileChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Berat Produk</Form.Label>
              <Form.Control
                type="number"
                name="berat_produk"
                value={berat_produk}
                onChange={(e) => setBeratProduk(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stok Produk</Form.Label>
              <Form.Control
                type="number"
                name="stok_produk"
                value={stok_produk}
                onChange={(e) => setStokProduk(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default editproduct;
