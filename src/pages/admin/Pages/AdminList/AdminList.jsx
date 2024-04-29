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
  const [id, setId] = useState("");
  const [judulArtikel, setJudulArtikel] = useState("");
  const [deskripsiArtikel, setDeskripsiArtikel] = useState("");
  const [gambarArtikel, setGambarArtikel] = useState("");
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // State untuk form tambah data
  const [newJudulArtikel, setNewJudulArtikel] = useState("");
  const [newDeskripsiArtikel, setNewDeskripsiArtikel] = useState("");
  const [newGambarArtikel, setNewGambarArtikel] = useState("");


  // State untuk form edit data
const [editJudulArtikel, setEditJudulArtikel] = useState("");
const [editDeskripsiArtikel, setEditDeskripsiArtikel] = useState("");
const [editGambarArtikel, setEditGambarArtikel] = useState("");



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

  const showModal = (data) => {
    setId(data.id_artikel);
    setEditJudulArtikel(data.judul_artikel); // Menggunakan setEditJudulArtikel
    setEditDeskripsiArtikel(data.deskripsi_artikel); // Menggunakan setEditDeskripsiArtikel
    setEditGambarArtikel(data.gambar_artikel); // Menggunakan setEditGambarArtikel
    setShow(true);
  };
  

  const closeModal = () => {
    setId("");
    setJudulArtikel("");
    setDeskripsiArtikel("");
    setGambarArtikel("");
    setShow(false);
  };

  const showAddModal = () => {
    setJudulArtikel("");
    setDeskripsiArtikel("");
    setGambarArtikel("");
    setShowAdd(true);
  };


  const closeAddModal = () => {
    setJudulArtikel("");
    setDeskripsiArtikel("");
    setGambarArtikel("");
    setShowAdd(false);
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
  
      console.log('Response:', response.data); // Tambahkan log untuk menampilkan respons
  
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
    formData.append("judul_artikel", editJudulArtikel);
    formData.append("deskripsi_artikel", editDeskripsiArtikel);
    if (editGambarArtikel) {
      formData.append("gambar_artikel", editGambarArtikel);
    }
  
    try {
      const response = await axios.put(`http://localhost:8080/update/artikel/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Response:', response.data);
    
      if (response.data.status === 200) {
        alert(response.data.messages);
        getDataArtikel();
        closeModal();
      } else {
        alert("Data Gagal Diupdate: " + response.data.messages);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Data Gagal Diupdate. Lihat konsol untuk detail.");
    }
};

  

  const showModalDelete = (data) => {
    setId(data.id_artikel);
    setShowDelete(true);
  };

  const closeModalDelete = () => {
    setId("");
    setShowDelete(false);
  };

  const deleteDataArtikel = async () => {
    try {
        const response = await axios.delete(`http://localhost:8080/delete/artikel/${id}`);
        console.log(response); // Cetak seluruh objek respon ke konsol
        alert(response.data.messages);
        getDataArtikel();
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
              Tambah Data Artikel
            </CButton>
          </div>
          <CTable striped>
            
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
        style={{ maxWidth: '1000px', maxHeight: '1000px' }}
      />
    </CTableDataCell>
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
          <Modal.Title>Form Tambah Data Artikel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addDataArtikel}>
            <Form.Group className="mb-3" controlId="formJudulArtikel">
              <Form.Label>Judul Artikel</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewJudulArtikel(e.target.value)}
                value={newJudulArtikel}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDeskripsiArtikel">
              <Form.Label>Deskripsi Artikel</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setNewDeskripsiArtikel(e.target.value)}
                value={newDeskripsiArtikel}
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

      <Modal show={show} onHide={closeModal}>
  <Modal.Header closeButton>
    <Modal.Title>Form Edit Data Artikel</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={updateDataArtikel}>
      <Form.Group className="mb-3" controlId="formEditJudulArtikel">
        <Form.Label>Judul Artikel</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setEditJudulArtikel(e.target.value)}
          value={editJudulArtikel}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEditDeskripsiArtikel">
        <Form.Label>Deskripsi Artikel</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={(e) => setEditDeskripsiArtikel(e.target.value)}
          value={editDeskripsiArtikel}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEditGambarArtikel">
        <Form.Label>Gambar Artikel</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setEditGambarArtikel(e.target.files[0])}
        />
      </Form.Group>
      <Button type='submit' color="primary" className="px-4">
        Update
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
          <Button variant="danger" onClick={deleteDataArtikel}>
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

export default AdminList;
