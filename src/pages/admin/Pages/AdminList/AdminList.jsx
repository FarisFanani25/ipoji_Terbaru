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

function AdminList() {
  const [dataArtikel, setDataArtikel] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentArtikel, setCurrentArtikel] = useState({
    id_artikel: '',
    judul_artikel: '',
    deskripsi_artikel: '',
    gambar_artikel: '',
  });

  // State untuk form tambah data
  const [newJudulArtikel, setNewJudulArtikel] = useState("");
  const [newDeskripsiArtikel, setNewDeskripsiArtikel] = useState("");
  const [newGambarArtikel, setNewGambarArtikel] = useState("");

  useEffect(() => {
    getDataArtikel();
  }, []);

  const getDataArtikel = async () => {
    try {
      const response = await axios.get('http://localhost:8080/artikel');
      setDataArtikel(response.data.artikel);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openAddModal = () => {
    setNewJudulArtikel("");
    setNewDeskripsiArtikel("");
    setNewGambarArtikel("");
    setShowAdd(true);
  };

  const closeAddModal = () => {
    setNewJudulArtikel("");
    setNewDeskripsiArtikel("");
    setNewGambarArtikel("");
    setShowAdd(false);
  };

  const openEditModal = (data) => {
    setCurrentArtikel(data);
    setShowEdit(true);
  };

  const closeEditModal = () => {
    setCurrentArtikel({
      id_artikel: '',
      judul_artikel: '',
      deskripsi_artikel: '',
      gambar_artikel: '',
    });
    setShowEdit(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentArtikel((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditFileChange = (e) => {
    setCurrentArtikel((prevData) => ({
      ...prevData,
      gambar_artikel: e.target.files[0],
    }));
  };

  const addDataArtikel = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("judul_artikel", newJudulArtikel);
    formData.append("deskripsi_artikel", newDeskripsiArtikel);
    formData.append("gambar_artikel", newGambarArtikel);

    try {
      const response = await axios.post('http://localhost:8080/api/artikel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 200) {
        alert(response.data.messages.success);
        getDataArtikel();
        closeAddModal();
      } else {
        alert("Data Gagal Ditambahkan: " + response.data.messages.error);
      }
    } catch (error) {
      console.error("Error adding data:", error);
      alert("Data Gagal Ditambahkan. Lihat konsol untuk detail.");
    }
  };

  const updateDataArtikel = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("judul_artikel", currentArtikel.judul_artikel);
    formData.append("deskripsi_artikel", currentArtikel.deskripsi_artikel);
    if (currentArtikel.gambar_artikel) {
      formData.append("gambar_artikel", currentArtikel.gambar_artikel);
    }

    try {
      const response = await axios.post(`http://localhost:8080/update/artikel/${currentArtikel.id_artikel}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 200) {
        alert(response.data.messages);
        getDataArtikel();
        closeEditModal();
      } else {
        alert("Data Gagal Diupdate: " + response.data.messages);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Data Gagal Diupdate. Lihat konsol untuk detail.");
    }
  };

  const openDeleteModal = (data) => {
    setCurrentArtikel(data);
    setShowDelete(true);
  };

  const closeDeleteModal = () => {
    setCurrentArtikel({
      id_artikel: '',
      judul_artikel: '',
      deskripsi_artikel: '',
      gambar_artikel: '',
    });
    setShowDelete(false);
  };

  const deleteDataArtikel = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete/artikel/${currentArtikel.id_artikel}`);
      alert(response.data.messages);
      getDataArtikel();
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Data Gagal Dihapus. Lihat konsol untuk detail.");
    }
  };

  return (
    <div className='body-flex'>
      <div className="flex">
        <div className='col-10 p-5'>
        <div className="d-flex justify-content-between mb-3">
          <h2>Daftar Artikel</h2>
          <CButton color="primary" onClick={openAddModal}>
            Tambah Data Artikel
          </CButton>
          </div>
        <CTable striped bordered hover>
            <CTableHead>
              <CTableRow>
                <CTableDataCell>Judul</CTableDataCell>
                <CTableDataCell>Deskripsi Artikel</CTableDataCell>
                <CTableDataCell>Gambar Artikel</CTableDataCell>
                <CTableDataCell>Action</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataArtikel.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{item.judul_artikel ?? '-'}</CTableDataCell>
                  <CTableDataCell>{item.deskripsi_artikel ?? '-'}</CTableDataCell>
                  <CTableDataCell>
                    <img
                      src={`http://localhost:8080/gambar/${item.gambar_artikel}`}
                      alt={item.gambar_artikel || "Gambar Artikel"}
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      className='btn btn-primary text-white me-2'
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </CButton>
                    <CButton
                      className='btn btn-danger text-white'
                      onClick={() => openDeleteModal(item)}
                    >
                      Hapus
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </div>
      </div>

      {/* Modal Tambah Artikel */}
      <Modal show={showAdd} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Form Tambah Data Artikel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addDataArtikel}>
            <Form.Group className="mb-3" controlId="formJudulArtikel">
              <Form.Label>Judul Artikel</Form.Label>
              <Form.Control
                type="text"
                value={newJudulArtikel}
                onChange={(e) => setNewJudulArtikel(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDeskripsiArtikel">
              <Form.Label>Deskripsi Artikel</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newDeskripsiArtikel}
                onChange={(e) => setNewDeskripsiArtikel(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGambarArtikel">
              <Form.Label>Gambar Artikel</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setNewGambarArtikel(e.target.files[0])}
              />
            </Form.Group>
            <Button type='submit' color="primary" className="px-4">
              Tambahkan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Edit Artikel */}
      <Modal show={showEdit} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data Artikel</Modal.Title>
        </Modal.Header>
        <Form onSubmit={updateDataArtikel}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formEditJudulArtikel">
              <Form.Label>Judul Artikel</Form.Label>
              <Form.Control
                type="text"
                name="judul_artikel"
                value={currentArtikel.judul_artikel}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEditDeskripsiArtikel">
              <Form.Label>Deskripsi Artikel</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="deskripsi_artikel"
                value={currentArtikel.deskripsi_artikel}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEditGambarArtikel">
              <Form.Label>Gambar Artikel</Form.Label>
              <Form.Control
                type="file"
                name="gambar_artikel"
                onChange={handleEditFileChange}
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

      {/* Modal Hapus Artikel */}
      <Modal show={showDelete} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Penghapusan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin menghapus data ini?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteDataArtikel}>
            Hapus
          </Button>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminList;
