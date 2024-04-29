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

function PenjualAnggota() {
  const [dataAnggota, setDataAnggota] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false); // Tambahkan state untuk menampilkan form edit
  const [newNamaAnggota, setNewNamaAnggota] = useState("");
  const [newAlamat, setNewAlamat] = useState("");
  const [newNomorHP, setNewNomorHP] = useState("");
  const [newTanggalSetoran, setNewTanggalSetoran] = useState("");
  const [newJumlahSetor, setNewJumlahSetor] = useState("");
  const [editingData, setEditingData] = useState(null); // Tambahkan state untuk data yang sedang diedit

  useEffect(() => {
    getDataAnggota();
  }, []);

  const getDataAnggota = async () => {
    try {
      const response = await axios.get('http://localhost:8080/anggota');
      setDataAnggota(response.data.anggota);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showAddModal = () => {
    setShowAdd(true);
  };

  const closeAddModal = () => {
    setNewNamaAnggota("");
    setNewAlamat("");
    setNewNomorHP("");
    setNewTanggalSetoran("");
    setNewJumlahSetor("");
    setShowAdd(false);
  };

  const addDataAnggota = async (event) => {
    event.preventDefault();
    
    const formData = {
      nama_anggota: newNamaAnggota,
      alamat: newAlamat,
      nomor_hp: newNomorHP,
      tanggal_setoran: newTanggalSetoran,
      jumlah_setor: newJumlahSetor
    };
    
    try {
      const response = await axios.post('http://localhost:8080/create/anggota', formData);
  
      console.log('Response:', response.data); // Tambahkan log untuk menampilkan respons
  
      if (response.data.status === 200 && response.data.messages && response.data.messages.success) {
        alert(response.data.messages.success);
        getDataAnggota();
        closeAddModal();
      } else {
        alert("Data Gagal Ditambahkan: " + response.data.messages.error);
      }
      
    } catch (error) {
        console.error("Error adding data:", error);
        console.log("Error response:", error.response);
        console.log("Error request:", error.request);
      
        if (error.response && error.response.data && error.response.data.error) {
          console.error("Server Error:", error.response.data.error);
          alert("Data Gagal Ditambahkan. Server error. Lihat konsol untuk detail.");
        } else if (error.request) {
          console.error("No Response from Server:", error.request);
          alert("Data Gagal Ditambahkan. Tidak ada respons dari server. Lihat konsol untuk detail.");
        } else {
          console.error("Axios Error:", error);
          alert("Data Gagal Ditambahkan. Lihat konsol untuk detail.");
        }      
      }
  };

  const handleEdit = (item) => {
    setEditingData(item); // Menetapkan data yang sedang diedit
    setShowEdit(true); // Menampilkan modal edit
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete/anggota/${id}`);
      console.log("Delete response:", response.data); // Tambahkan log untuk menampilkan respons

      if (response.data.status === 200 && response.data.messages && response.data.messages.success) {
        alert(response.data.messages.success);
        getDataAnggota(); // Perbarui daftar anggota setelah penghapusan
      } else {
        alert("Gagal menghapus data: " + response.data.messages.error);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      // Logika penanganan kesalahan
    }
  };

  const editDataAnggota = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/edit/anggota/${editingData.id}`, editingData);

      console.log('Response:', response.data); // Tambahkan log untuk menampilkan respons

      if (response.data.status === 200 && response.data.messages && response.data.messages.success) {
        alert(response.data.messages.success);
        getDataAnggota();
        closeEditModal();
      } else {
        alert("Gagal menyimpan perubahan: " + response.data.messages.error);
      }
    } catch (error) {
      console.error("Error editing data:", error);
      // Logika penanganan kesalahan
    }
  };

  const closeEditModal = () => {
    setEditingData(null);
    setShowEdit(false);
  };

  return (
    <div className='body-flex'>
      <div className="flex">
        <div className='col-10 p-5'>
          <div className="text-center mb-3">
            <CButton color="primary" onClick={showAddModal}>
              Tambah Data Anggota
            </CButton>
          </div>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableDataCell>Nama Anggota</CTableDataCell>
                <CTableDataCell>Alamat</CTableDataCell>
                <CTableDataCell>Nomor HP</CTableDataCell>
                <CTableDataCell>Tanggal Setoran</CTableDataCell>
                <CTableDataCell>Jumlah Setoran</CTableDataCell>
                <CTableDataCell>Aksi</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataAnggota && dataAnggota.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{item.nama_anggota}</CTableDataCell>
                  <CTableDataCell>{item.alamat}</CTableDataCell>
                  <CTableDataCell>{item.nomor_hp}</CTableDataCell>
                  <CTableDataCell>{item.tanggal_setoran}</CTableDataCell>
                  <CTableDataCell>{item.jumlah_setor}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="info" onClick={() => handleEdit(item)}>Edit</CButton>
                    <CButton color="danger" onClick={() => handleDelete(item.id)}>Hapus</CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </div>
      </div>
      <Modal show={showAdd} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Form Tambah Data Anggota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addDataAnggota}>
            <Form.Group className="mb-3" controlId="formNamaAnggota">
              <Form.Label>Nama Anggota</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewNamaAnggota(e.target.value)}
                value={newNamaAnggota}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAlamat">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewAlamat(e.target.value)}
                value={newAlamat}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNomorHP">
              <Form.Label>Nomor HP</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewNomorHP(e.target.value)}
                value={newNomorHP}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTanggalSetoran">
              <Form.Label>Tanggal Setoran</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setNewTanggalSetoran(e.target.value)}
                value={newTanggalSetoran}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formJumlahSetoran">
              <Form.Label>Jumlah Setoran</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setNewJumlahSetor(e.target.value)}
                value={newJumlahSetor}
              />
            </Form.Group>
            <Button type='submit' color="primary" className="px-4">
              Tambahkan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Modal untuk form edit */}
      <Modal show={showEdit} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Form Edit Data Anggota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingData && (
            <Form onSubmit={editDataAnggota}>
              <Form.Group className="mb-3" controlId="formNamaAnggota">
                <Form.Label>Nama Anggota</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setEditingData({...editingData, nama_anggota: e.target.value})}
                  value={editingData.nama_anggota}
                />
              </Form.Group>
              {/* Lanjutkan dengan form untuk bidang lainnya */}
              <Button type='submit' color="primary" className="px-4">
                Simpan Perubahan
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PenjualAnggota;
