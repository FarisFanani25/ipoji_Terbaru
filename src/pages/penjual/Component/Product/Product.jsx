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
//import "./Productpage.css";

function PenjualProducts() {
  const [dataProduk, setDataProduk] = useState([]);
  const [id, setId] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const [newNamaProduk, setNewNamaProduk] = useState("");
  const [newDeskripsiProduk, setNewDeskripsiProduk] = useState("");
  const [newHargaProduk, setNewHargaProduk] = useState("");
  const [newGambarProduk, setNewGambarProduk] = useState("");
  const [newBeratProduk, setNewBeratProduk] = useState("");
  const [newStokProduk, setNewStokProduk] = useState("");

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

  const showAddModal = () => {
    setShowAdd(true);
  };

  const closeAddModal = () => {
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
    <div className='body-flex'>
    <div className="flex">
      <div className='col-10 p-5'>
        <div className="d-flex justify-content-between mb-3">
          <h2>Daftar Produk</h2>
          <CButton color="primary" onClick={showAddModal}>
            Tambah Data Produk
          </CButton>
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
              <CTableDataCell>Action</CTableDataCell>
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
                <CTableDataCell>
                  <CButton color="primary" onClick={() => showEditModal(data)}>Edit</CButton>{' '}
                  <CButton color="danger" onClick={() => showModalDelete(data)}>Delete</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </div>

      <Modal show={showAdd} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data Produk</Modal.Title>
        </Modal.Header>
        <Form onSubmit={addDataProduk}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nama Produk</Form.Label>
              <Form.Control
                type="text"
                name="nama_produk"
                value={newNamaProduk}
                onChange={(e) => setNewNamaProduk(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Deskripsi Produk</Form.Label>
              <Form.Control
                type="text"
                name="deskripsi_produk"
                value={newDeskripsiProduk}
                onChange={(e) => setNewDeskripsiProduk(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Harga Produk</Form.Label>
              <Form.Control
                type="number"
                name="harga_produk"
                value={newHargaProduk}
                onChange={(e) => setNewHargaProduk(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gambar Produk</Form.Label>
              <Form.Control
                type="file"
                name="gambar_produk"
                onChange={(e) => setNewGambarProduk(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Berat Produk</Form.Label>
              <Form.Control
                type="number"
                name="berat_produk"
                value={newBeratProduk}
                onChange={(e) => setNewBeratProduk(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stok Produk</Form.Label>
              <Form.Control
                type="number"
                name="stok_produk"
                value={newStokProduk}
                onChange={(e) => setNewStokProduk(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeAddModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

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
              {oldImage && (
                <div className="mt-2">
                  <img
                    src={`http://localhost:8080/gambar/${oldImage}`}
                    alt="Old Product"
                    style={{ height: "50px", width: "50px" }}
                  />
                </div>
              )}
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

      <Modal show={showDelete} onHide={closeModalDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Data Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah anda yakin ingin menghapus data ini?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteDataProduk}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PenjualProducts;
