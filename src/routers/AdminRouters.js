import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminHome from '../pages/admin/Component/Home/Home';
import AdminOrders from '../pages/admin/Component/Orders/Orders';
import AdminAddNew from '../pages/admin/Pages/AddNew/AddNew';
import AdminBlogDetail from '../pages/admin/Pages/BlogDetail/BlogDetail';
import AdminBlogs from '../pages/admin/Pages/Blogs/Blogs';
import AdminDetail from '../pages/admin/Pages/Detail/Detail';
import AdminLogin from '../pages/admin/Pages/Login/Login';
import UserList from '../pages/admin/Pages/UserLists/UserLists';
import AdminList from '../pages/admin/Pages/AdminList/AdminList';
import AdminProducts from '../pages/admin/Component/Product/Product'; // Import komponen Products
import Detail from '../pages/admin/Pages/Detail/Detail';
import AdminRegister from '../pages/admin/Pages/Register/Register';
import AdminProfile from "../pages/admin/Pages/Profile/profileAdmin";
import AdminDelivery from "../pages/admin/Component/Delivery/Delivery";

const userInpDetails = [
  // ... (sebagai contoh, definisikan input pengguna di sini)
];

const productInpDetails = [
  // ... (sebagai contoh, definisikan input produk di sini)
];

const blogInputs = [
  // ... (sebagai contoh, definisikan input blog di sini)
];

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route
        path="/admin/addnew"
        element={<AdminAddNew inputs={userInpDetails} titlee="Add New User" type="USER" />}
      />
      <Route path="/admin/blogdetail" element={<AdminBlogDetail />} />
      <Route path="/admin/blogs" element={<AdminBlogs />} />
      <Route path="/admin/detail" element={<AdminDetail />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/listadmin" element={<AdminList />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/admin/delivery" element={<AdminDelivery />} />
      <Route
        path="/admin/user"
        element={<UserList inputs={userInpDetails} titlee="User List" type="USER" />}
      />
      {/* Nested routes for Products */}
      <Route path="/admin/products" element={<AdminProducts inputs={productInpDetails} titlee="Products" type="PRODUCT" />}>
        <Route index element={<AdminProducts />} /> {/* Contoh komponen untuk menampilkan daftar produk */}
        <Route path=":productId" element={<Detail />} /> {/* Contoh komponen untuk detail produk */}
        <Route path="addnew" element={<AdminAddNew inputs={productInpDetails} titlee="Add New Product" type="PRODUCT" />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
