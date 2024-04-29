import React, { useState } from 'react';
import { Container, Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import axios from 'axios';

const Payment = () => {
  const [file, setFile] = useState(null);
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // State untuk menampilkan modal

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please upload a file.');
      return;
    }

    setIsLoading(true);
    setIsProcessing(true); // Menampilkan modal

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('note', note);

      const response = await axios.post('http://localhost:8080/api/upload-payment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading payment:', error);
      setMessage('Error uploading payment. Please try again.');
    } finally {
      setIsLoading(false);
      setIsProcessing(false); // Menutup modal setelah proses selesai
    }
  };

  return (
    <Container>
      <h1>Bukti Pembayaran</h1>
      <p>Kirim ke rekening ini: ......</p>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="file">Upload File</Label>
          <Input 
            type="file" 
            name="file" 
            id="file" 
            onChange={handleChangeFile} 
            required 
          />
        </FormGroup>

        <FormGroup>
          <Label for="note">Tambahkan Catatan</Label>
          <Input 
            type="textarea" 
            name="note" 
            id="note" 
            onChange={handleChangeNote} 
            value={note} 
          />
        </FormGroup>

        {message && <p>{message}</p>}
        
        <Button color="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload'}
        </Button>
      </Form>

      {/* Modal untuk menampilkan pesan transaksi sedang diproses */}
      <Modal isOpen={isProcessing}>
        <ModalHeader>Processing Transaction</ModalHeader>
        <ModalBody>
          Transaction is being processed. Please wait...
        </ModalBody>
      </Modal>
    </Container>
  );
};


export default Payment;

