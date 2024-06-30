import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/Footer/FooterAdmin";
import Helmet from '../../../../components/Helmet/Helmet';
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
      await axios.patch(`http://localhost:8080/updateDeliveryStatus/${id}`, {
        [statusField]: newStatus,
      });

      getDataDelivery();
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  return (
    <Helmet title={"home"}>
      <Header />
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
                  <CTableDataCell>Status Pemrosesan</CTableDataCell>
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
                      <CTableDataCell>
                        <CButton color="success" onClick={() => updateDeliveryStatus(delivery.id_delivery, 'status_pemrosesan', 'Setujui')}>
                          Setujui
                        </CButton>
                        <CButton color="danger" onClick={() => updateDeliveryStatus(delivery.id_delivery, 'status_pemrosesan', 'Tidak Disetujui')} className="ms-2">
                          Tidak Disetujui
                        </CButton>
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

export default DeliveryPage;
