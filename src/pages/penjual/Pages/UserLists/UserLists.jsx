import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";

function UserPage() {
    // State untuk menyimpan data user, ID, email, password, nama, dan status modal
    const [data_login, setDataLogin] = useState([]);
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [show, setShow] = useState(false);

// menghapus data
  const [showDelete, setShowDelete] = useState(false);
  const showModalDelete = (data) => {
    setId(data.id);
    setEmail(data.email);
    setPassword(data.password);
    setName(data.name);
    setShowDelete(true);
  }
  const closeModalDelete = () => {
    setId("");
    setEmail("");
    setPassword("");
    setName("");
    setShowDelete(false);
  }
  const DeleteDataUser = async (event) => {
    event.preventDefault();
    try {
      const deleteData = await axios.delete(
        `http://localhost:8080/delete/user/${id}`);
      alert(deleteData.data.messages)
      window.location.reload();
    } catch (error) {
      alert("Data Gagal dihapus")
    }
  };

    // Fungsi untuk mengambil data user dari API
    const GetDataLogin = async () => {
        try {
            const getData = await axios.get('http://localhost:8080/user/');
            setDataLogin(getData.data.data);
            console.log(getData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fungsi untuk mengirim permintaan update data user ke API
    const UpdateDataUser = async (event) => {
        event.preventDefault();
        try {
            const putData = await axios.put(
                `http://localhost:8080/update/user/${id}`,
                {
                    email: email,
                    password: password,
                    name: name
                }
            );
            // Menampilkan pesan setelah berhasil atau gagal melakukan update
            alert(putData.data.messages);
            // Me-refresh halaman setelah update berhasil
            window.location.reload();
        } catch (error) {
            // Menampilkan pesan kesalahan jika update gagal
            alert("Data Gagal diubah");
        }
    };

    // Fungsi untuk menampilkan modal edit data user
    const showModal = (data) => {
        // Mengisi state dengan data user yang akan di-edit
        setId(data.id);
        setEmail(data.email);
        setPassword(data.password);
        setName(data.name);
        setShow(true);
    }

    // Fungsi untuk menutup modal
    const closeModal = () => {
        // Mengosongkan state setelah modal ditutup
        setId("");
        setEmail("");
        setPassword("");
        setName("");
        setShow(false);
    }

    // Mengambil data user setelah komponen dipasang
    useEffect(() => {
        GetDataLogin();
    }, []);

    // Render tampilan komponen
    return (
        <div className='body-flex'>
            <div className="flex">
                <div className='col-10 p-5'>
                    {/* Modal untuk update data user */}
                    <Modal show={show} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Update Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* Form untuk mengisi data user yang akan di-update */}
                            <Form onSubmit={UpdateDataUser}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                </Form.Group>
                                {/* Tombol untuk mengirim data update */}
                                <Button type='submit' color="primary" className="px-4">
                                    Update
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            {/* Tombol untuk menutup modal */}
                            <Button variant="secondary" onClick={closeModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal DELETE */}
          <Modal show={showDelete} onHide={closeModalDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Apakah Anda yakin menghapus data ini?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Detail Data</h5>
                    <div className="row">
                      <p className="col-4 card-text">
                        Email
                      </p>
                      <p className="col-6 card-text">
                        : {email}
                      </p>
                    </div>
                    <div className="row">
                      <p className="col-4 card-text">
                        Password
                      </p>
                      <p className="col-6 card-text">
                        : {password}
                      </p>
                    </div>
                    <div className="row">
                      <p className="col-4 card-text">
                        Nama
                      </p>
                      <p className="col-6 card-text">
                        : {name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type='submit' color="primary" className="px-4"
                onClick={DeleteDataUser}>
                Hapus Data
              </Button>
              <Button variant="danger" onClick={closeModalDelete}>
                Batal
              </Button>
            </Modal.Footer>
          </Modal>

                    {/* Tampilan data user dalam tabel */}
                    <h1 className="py-1">
                        Data User
                    </h1>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Tabel User</strong>
                        </CCardHeader>
                        <CCardBody>
                            <p className="text-medium-emphasis small">
                                Tabel ini menampilkan seluruh data user yang masih aktif
                            </p>
                            <div className="py-3">
                                {/* Tombol untuk menambah data user
                                <CButton className="btn btn-success text-white me-2" href="form">
                                    Tambah Data
                                </CButton> */}
                            </div>
                            {/* Tabel untuk menampilkan data user */}
                            <CTable striped>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Password</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {/* Mapping data user untuk ditampilkan dalam tabel */}
                                    {data_login.map((item, index) => {
                                        return (
                                            <CTableRow key={index}>
                                                <CTableDataCell>{item.email}</CTableDataCell>
                                                <CTableDataCell>{item.password}</CTableDataCell>
                                                <CTableDataCell>{item.name}</CTableDataCell>
                                                {/* Tombol untuk mengedit dan menghapus data user */}
                                                <CTableDataCell>
                                                    <CButton
                                                        className='btn btn-primary text-white me-2'
                                                        onClick={() => showModal(item)}
                                                    >
                                                        Edit
                                                    </CButton>
                                                    <CButton className='btn btn-danger text-white'
                                                     onClick={() => showModalDelete(item)}>
                                                        Hapus
                                                    </CButton>
                                                </CTableDataCell>
                                            </CTableRow>
                                        )
                                    })}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
