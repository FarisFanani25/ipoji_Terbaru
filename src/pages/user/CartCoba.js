<<<<<<< HEAD
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const KeranjangPage = () => {
//   const [keranjang, setKeranjang] = useState([]);
//   const userId = localStorage.getItem('user_id');

//   useEffect(() => {
//     // Fungsi untuk mengambil data keranjang dari server
//     const fetchData = async () => {
//       try {
//         // Ganti URL dengan endpoint yang sesuai untuk mengambil data keranjang
//         const response = await axios.et(`http://localhost:8080/keranjang/user/${userId}`);
//         setKeranjang(response.data);g
//       } catch (error) {
//         console.error('Terjadi masalah saat mengambil data keranjang:', error);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   const handleDelete = async (id) => {
//     try { 
//       await axios.delete(`http://localhost:8080/keranjang/${id}`);
//       // Hapus item keranjang dari state setelah berhasil dihapus dari server
//       setKeranjang(keranjang.filter(item => item.id_produk !== id));
//     } catch (error) {
//       console.error('Terjadi masalah saat menghapus data keranjang:', error);
//     }
//   };

//   return (
//     <div className="keranjang-page">
//       <h1>Keranjang Belanja</h1>
//       <table className="keranjang-table">
//         <thead>
//           <tr>
//             <th>Nama Produk</th>
//             <th>Harga</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {keranjang.length > 0 ? (
//             keranjang.map((item) => (
//               <tr key={item.id_produk}>
//                 <td>{item.nama_produk}</td>
//                 <td>Rp.{item.harga_produk}</td>
//                 <td>
//                   <button onClick={() => handleDelete(item.id_produk)}>Hapus</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3">Keranjang belanja masih kosong.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default KeranjangPage;
=======
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Card.css'

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/cartcoba/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.harga_produk * item.quantity, 0);
    setTotal(total);
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Are you sure you want to remove this item?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/cartcoba/removeItem/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      const updatedItems = cartItems.filter(item => item.id !== id);
      setCartItems(updatedItems);
      setSelectedItems(selectedItems.filter(item => item.id !== id));
      calculateTotal(updatedItems);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    try {
      const response = await fetch(`http://localhost:8080/cartcoba/updateQuantity/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item quantity');
      }

      const updatedItems = cartItems.map(item => item.id === id ? { ...item, quantity } : item);
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const handleSelectItem = (item) => {
    const isSelected = selectedItems.some(selectedItem => selectedItem.id === item.id);
    if (isSelected) {
      const updatedSelectedItems = selectedItems.filter(selectedItem => selectedItem.id !== item.id);
      setSelectedItems(updatedSelectedItems);
      calculateTotal(updatedSelectedItems);
    } else {
      const updatedSelectedItems = [...selectedItems, item];
      setSelectedItems(updatedSelectedItems);
      calculateTotal(updatedSelectedItems);
    }
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    alert('Checkout successful!');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      <div className="row">
        <div className="col-12">
          <div className="list-group">
            {cartItems.map(item => (
              <div
                className={`list-group-item d-flex justify-content-between align-items-center ${selectedItems.some(selectedItem => selectedItem.id === item.id) ? 'selected' : ''}`}
                key={item.id}
                onClick={() => handleSelectItem(item)}
              >
                <div className="d-flex align-items-center">
                  <div>
                    <h5 className="mb-1">{item.nama_produk}</h5>
                    <p className="mb-1">Rp. {item.harga_produk}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    className="form-control mr-2"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    style={{ width: '80px' }}
                  />
                  <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); handleRemove(item.id); }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 text-right">
          <h3>Total: Rp. {total}</h3>
          <button className="btn btn-primary mt-3 mb-4" onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
>>>>>>> 877ef5e140bc7d3f72de35229d7751d5b27bc1b1
