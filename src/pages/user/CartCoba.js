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