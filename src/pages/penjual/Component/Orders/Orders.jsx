import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from "../../../../components/header/HeaderPenjual";
import Footer from "../../../../components/Footer/FooterPenjual";
import Helmet from '../../../../components/Helmet/Helmet';

import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from '@coreui/react';
import './orders.scss'; // Import CSS file

function OrderPage() {
  const [dataOrder, setDataOrder] = useState([]);

  useEffect(() => {
    getDataOrder();
  }, []);

  const getDataOrder = async () => {
    try {
      const response = await axios.get('http://localhost:8080/orders');
      setDataOrder(response.data.data); // Ubah menjadi response.data.data, sesuai struktur respons dari controller
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      // Panggil endpoint untuk mengubah status pesanan
      await axios.patch(`http://localhost:8080/orders/${orderId}/status`, { status });

      // Ambil ulang data pesanan setelah pembaruan
      getDataOrder();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <Helmet title={"home"}>
      <Header />
      <div className="body-flex">
        <div className="flex">
          <div className="col-10 p-5">
            <h2 className="order-title">Daftar Pesanan</h2>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableDataCell>Nama Pelanggan</CTableDataCell>
                  <CTableDataCell>No.Handphone</CTableDataCell>
                  <CTableDataCell>Alamat</CTableDataCell>
                  <CTableDataCell>Metode Pembayaran</CTableDataCell>
                  <CTableDataCell>Item Dibeli</CTableDataCell>
                  <CTableDataCell>Jumlah dibeli</CTableDataCell>
                  <CTableDataCell>Total Harga</CTableDataCell>
                  <CTableDataCell>Status</CTableDataCell>
                  <CTableDataCell>Aksi</CTableDataCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {dataOrder.length > 0 && dataOrder.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{item.phone}</CTableDataCell>
                    <CTableDataCell>{item.address}</CTableDataCell>
                    <CTableDataCell>{item.paymentMethod}</CTableDataCell>
                    <CTableDataCell>
                      <ul>
                        {item.items && JSON.parse(item.items).map((orderItem, i) => (
                          <li key={i}>
                            ID: {orderItem.id}, Nama: {orderItem.title}, Quantity: {orderItem.quantity}, Harga: {orderItem.price}, Total: {orderItem.price * orderItem.quantity}
                          </li>
                        ))}
                      </ul>
                    </CTableDataCell>
                    <CTableDataCell>{item.totalAmount}</CTableDataCell>
                    <CTableDataCell>{item.status}</CTableDataCell>
                    <CTableDataCell>
                      <div className="action-buttons">
                        <CButton
                          className="process-button"
                          onClick={() => updateOrderStatus(item.id, 'Diproses')}
                        >
                          Diproses
                        </CButton>
                        <CButton
                          className="shipped-button"
                          onClick={() => updateOrderStatus(item.id, 'Dikirim')}
                        >
                          Dikirim
                        </CButton>
                        <CButton
                          className="reject-button"
                          onClick={() => updateOrderStatus(item.id, 'Ditolak')}
                        >
                          Ditolak
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
        </div>
      </div>
      <Footer />
    </Helmet>
  );
}

export default OrderPage;
