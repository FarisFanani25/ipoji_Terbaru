import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KeranjangPage = () => {
  const [keranjang, setKeranjang] = useState([]);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    // Fungsi untuk mengambil data keranjang dari server
    const fetchData = async () => {
      try {
        // Ganti URL dengan endpoint yang sesuai untuk mengambil data keranjang
        const response = await axios.get(`http://localhost:8080/keranjang/user/${userId}`);
        setKeranjang(response.data);
      } catch (error) {
        console.error('Terjadi masalah saat mengambil data keranjang:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/keranjang/${id}`);
      // Hapus item keranjang dari state setelah berhasil dihapus dari server
      setKeranjang(keranjang.filter(item => item.id_produk !== id));
    } catch (error) {
      console.error('Terjadi masalah saat menghapus data keranjang:', error);
    }
  };

  return (
    <div className="keranjang-page">
      <h1>Keranjang Belanja</h1>
      <table className="keranjang-table">
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {keranjang.length > 0 ? (
            keranjang.map((item) => (
              <tr key={item.id_produk}>
                <td>{item.nama_produk}</td>
                <td>Rp.{item.harga_produk}</td>
                <td>
                  <button onClick={() => handleDelete(item.id_produk)}>Hapus</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Keranjang belanja masih kosong.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default KeranjangPage;