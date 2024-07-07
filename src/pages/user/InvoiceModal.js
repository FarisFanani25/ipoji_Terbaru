import React, { useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const InvoiceModal = ({ show, onHide, selectedItems, totalCost, primaryAddress }) => {
  const invoiceRef = useRef();

  const handleDownloadInvoice = async () => {
    const canvas = await html2canvas(invoiceRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('invoice.pdf');
  };

  useEffect(() => {
    if (show) {
      handleDownloadInvoice();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div ref={invoiceRef} style={{ padding: '20px' }}>
          <h1>Invoice</h1>
          <h3>Alamat Pengiriman:</h3>
          <p>{primaryAddress.full_name}</p>
          <p>{primaryAddress.detailed_address}</p>
          <p>{primaryAddress.province}, {primaryAddress.city}, {primaryAddress.district}, {primaryAddress.subdistrict}</p>
          <h3>Produk yang Dibeli:</h3>
          {selectedItems.map((item, index) => (
            <div key={index}>
              <p>{item.nama_produk} - {item.quantity} x Rp. {item.harga_produk}</p>
            </div>
          ))}
          <h3>Total Biaya:</h3>
          <p>Rp. {totalCost}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDownloadInvoice}>
          Download Invoice
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InvoiceModal;
