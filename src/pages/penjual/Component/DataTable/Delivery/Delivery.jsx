import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react';

function DeliveryPage() {
  const [dataDelivery, setDataDelivery] = useState([]);

  useEffect(() => {
    getDataDelivery();
  }, []);

  const getDataDelivery = async () => {
    try {
      const response = await axios.get('http://localhost:8080/delivery');
      setDataDelivery(response.data.data);
    } catch (error) {
      console.error('Error fetching delivery data:', error);
    }
  };

  const updateDeliveryStatus = async (id, statusField, newStatus) => {
    try {
      // Panggil endpoint untuk mengubah status pengiriman
      await axios.patch(`http://localhost:8080/updateDeliveryStatus/${id}`, {
        [statusField]: newStatus,
      });

      // Ambil ulang data pengiriman setelah pembaruan
      getDataDelivery();
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  return (
    <div className="body-flex">
      <div className="flex">
        <div className="col-10 p-5">
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableDataCell>ID Pengiriman</CTableDataCell>
                <CTableDataCell>Nama Pelanggan</CTableDataCell>
                <CTableDataCell>Alamat Pengiriman</CTableDataCell>
                <CTableDataCell>Nomor Handphone</CTableDataCell>
                <CTableDataCell>Item yang Dikirim</CTableDataCell>
                <CTableDataCell>Status Pembayaran</CTableDataCell>
                <CTableDataCell>Status Pemrosesan</CTableDataCell>
                <CTableDataCell>Status Pengiriman</CTableDataCell>
                <CTableDataCell>Status Selesai</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataDelivery &&
                dataDelivery.length > 0 &&
                dataDelivery.map((delivery, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{delivery.id_delivery}</CTableDataCell>
                    <CTableDataCell>{delivery.nama_pembeli}</CTableDataCell>
                    <CTableDataCell>{delivery.alamat}</CTableDataCell>
                    <CTableDataCell>{delivery.nomor_handphone}</CTableDataCell>
                    <CTableDataCell>
                      <ul>
                        {delivery.items &&
                          JSON.parse(delivery.items).map((deliveryItems, i) => (
                            <li key={i}>
                              ID: {deliveryItems.id}, Nama: {deliveryItems.title}, Quantity: {deliveryItems.quantity}, Harga: {deliveryItems.price}, Total: {deliveryItems.price * deliveryItems.quantity}
                            </li>
                          ))}
                      </ul>
                    </CTableDataCell>
                    <CTableDataCell>{delivery.status_pembayaran || 'success'}</CTableDataCell>
                    <CTableDataCell>{delivery.status_pemrosesan || 'Belum Dimasukkan'}</CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="secondary">
                        {String(delivery.status_pengiriman)} {delivery.status_pengiriman}
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem onClick={() => updateDeliveryStatus(delivery.id_delivery, 'status_pengiriman', 'Dalam Perjalanan')}>
                            Dalam Perjalanan
                          </CDropdownItem>
                          <CDropdownItem onClick={() => updateDeliveryStatus(delivery.id_delivery, 'status_pengiriman', 'Terkirim')}>
                            Terkirim
                          </CDropdownItem>
                          {/* Tambahkan opsi lain sesuai kebutuhan */}
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="secondary">
                        {String(delivery.status_pengiriman)}{delivery.status_selesai}
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem onClick={() => updateDeliveryStatus(delivery.id_delivery, 'status_selesai', 'Selesai')}>
                            Selesai
                          </CDropdownItem>
                          <CDropdownItem onClick={() => updateDeliveryStatus(delivery.id_delivery, 'status_selesai', 'Belum Selesai')}>
                            Belum Selesai
                          </CDropdownItem>
                          {/* Tambahkan opsi lain sesuai kebutuhan */}
                        </CDropdownMenu>
                      </CDropdown>
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

export default DeliveryPage;
