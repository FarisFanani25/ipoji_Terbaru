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
      await axios.patch(`http://localhost:8080/updateStatus/${orderId}`, { status });
  
      // Ambil ulang data pesanan setelah pembaruan
      getDataOrder();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  

  return (
    <div className="body-flex">
      <div className="flex">
        <div className="col-10 p-5">
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableDataCell>Nama Pelanggan</CTableDataCell>
                <CTableDataCell>Phone</CTableDataCell>
                <CTableDataCell>Alamat</CTableDataCell>
                <CTableDataCell>Metode Pembayaran</CTableDataCell>
                <CTableDataCell>Total Harga</CTableDataCell>
                <CTableDataCell>Tanggal Pesan</CTableDataCell>
                <CTableDataCell>Item yang Dibeli</CTableDataCell>
                <CTableDataCell>Status</CTableDataCell>
                <CTableDataCell>Actions</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataOrder &&
                dataOrder.length > 0 &&
                dataOrder.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{item.phone}</CTableDataCell>
                    <CTableDataCell>{item.address}</CTableDataCell>
                    <CTableDataCell>{item.paymentMethod}</CTableDataCell>
                    <CTableDataCell>{item.totalAmount}</CTableDataCell>
                    <CTableDataCell>{item.created_at}</CTableDataCell>
                    <CTableDataCell>
                      <ul>
                        {item.items &&
                          JSON.parse(item.items).map((orderItem, i) => (
                            <li key={i}>
                              ID: {orderItem.id}, Nama: {orderItem.title}, Quantity: {orderItem.quantity}, Harga: {orderItem.price}, Total: {orderItem.price * orderItem.quantity}
                            </li>
                          ))}
                      </ul>
                    </CTableDataCell>
                    <CTableDataCell>{item.status}</CTableDataCell>
                    <CTableDataCell>
                      <div className="action-buttons">
                        <CButton
                          className="accept-button"
                          onClick={() => updateOrderStatus(item.id, 'Accepted')}
                        >
                          Accept
                        </CButton>
                        <CButton
                          className="reject-button"
                          onClick={() => updateOrderStatus(item.id, 'Rejected')}
                        >
                          Reject
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
  );
}

export default OrderPage;
