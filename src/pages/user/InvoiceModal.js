import React, { useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

const InvoiceModal = ({ show, onHide, selectedItems, totalCost, primaryAddress, deliveryOption }) => {
  const invoiceRef = useRef();
  const today = new Date();
  const navigate = useNavigate();

  // Calculate the due date (one week from today)
  const dueDate = new Date(today);
  dueDate.setDate(today.getDate() + 7);

  // Format the dates
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options); // Format in Indonesian locale
  };

  const handleDownloadInvoice = async () => {
    const canvas = await html2canvas(invoiceRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('invoice.pdf');
  };

  const handleClose = () => {
    onHide();
    navigate('/home'); // Navigasi ke halaman home atau dashboard
  };

  useEffect(() => {
    if (show) {
      handleDownloadInvoice();
    }
  }, [show]);

  const shippingCost = deliveryOption === 'delivery' ? (totalCost < 100000 ? 20000 : 0) : 0;
  const total = totalCost + shippingCost;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div ref={invoiceRef} style={{ padding: '20px', fontSize: '10px', lineHeight: '1.2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '14px', margin: '0' }}>IPOJI</h2>
              <p style={{ fontSize: '10px', margin: '0' }}>Ngepoh, Metesih, Kec. Jiwan, Kabupaten Madiun, Jawa Timur</p>
              <p style={{ fontSize: '10px', margin: '0' }}>Kode Pos 63161</p>
            </div>
            <div>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ fontSize: '8px', margin: '0', paddingRight: '8px', textAlign: 'left' }}>Tanggal Pembelian</td>
                    <td style={{ fontSize: '8px', margin: '0', textAlign: 'right' }}>{formatDate(today)}</td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td style={{ fontSize: '8px', margin: '0', paddingRight: '8px', textAlign: 'left' }}>Tempo Pembayaran</td>
                    <td style={{ fontSize: '8px', margin: '0', textAlign: 'right' }}>{formatDate(dueDate)}</td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td style={{ fontSize: '8px', margin: '0', paddingRight: '8px', textAlign: 'left' }}>Total Tagihan</td>
                    <td style={{ fontSize: '8px', margin: '0', textAlign: 'right' }}>Rp. {total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ borderBottom: '1px solid #000', marginBottom: '20px' }}></div>
          <div>
            <h3 style={{ fontSize: '12px', margin: '0' }}>Kepada:</h3>
            <p style={{ fontSize: '10px', margin: '0' }}>{primaryAddress.full_name}</p>
            <p style={{ fontSize: '10px', margin: '0' }}>{primaryAddress.detailed_address}</p>
            <p style={{ fontSize: '10px', margin: '0' }}>{primaryAddress.province}, {primaryAddress.city}, {primaryAddress.district}, {primaryAddress.subdistrict}</p>
          </div>
          <div style={{ borderBottom: '1px solid #000', marginBottom: '20px', marginTop: '20px' }}></div>
          <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse', fontSize: '10px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #000', paddingLeft: '10px' }}>Produk</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #000' }}>Jumlah</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #000' }}>Harga</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #000' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => (
                <tr key={index}>
                  <td style={{ paddingLeft: '10px' }}>{item.nama_produk}</td>
                  <td>{item.quantity}</td>
                  <td>Rp. {item.harga_produk}</td>
                  <td>Rp. {item.quantity * item.harga_produk}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h3 style={{ fontSize: '12px', margin: '0' }}>Metode Pengiriman:</h3>
            <p style={{ fontSize: '10px', margin: '0' }}>{deliveryOption === 'self-pickup' ? 'Ambil Sendiri' : 'Diantar'}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <table style={{ width: 'auto' }}>
              <tbody>
                <tr>
                  <td style={{ fontSize: '10px', margin: '0', paddingRight: '10px', textAlign: 'left' }}>Total</td>
                  <td style={{ fontSize: '10px', margin: '0', textAlign: 'right' }}>Rp. {totalCost}</td>
                </tr>
                <tr>
                  <td style={{ fontSize: '10px', margin: '0', paddingRight: '10px', textAlign: 'left' }}>Biaya Pengiriman</td>
                  <td style={{ fontSize: '10px', margin: '0', textAlign: 'right' }}>Rp. {shippingCost}</td>
                </tr>
                <tr>
                  <td style={{ fontSize: '10px', margin: '0', paddingRight: '10px', textAlign: 'left' }}>Total Seluruh</td>
                  <td style={{ fontSize: '10px', margin: '0', textAlign: 'right' }}>Rp. {total}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ borderBottom: '1px solid #000', marginBottom: '20px' }}></div>
          <div>
            <p style={{ fontSize: '10px', margin: '0' }}>Terima kasih telah berbelanja di toko kami!</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
  <Button variant="secondary" onClick={handleClose} style={{ fontSize: '12px', padding: '10px 20px' }}>
    Keluar
  </Button>
  <Button variant="primary" onClick={handleDownloadInvoice} style={{ fontSize: '12px', padding: '10px 20px' }}>
    Download Bukti
  </Button>
</Modal.Footer>

    </Modal>
  );
};

export default InvoiceModal;
