import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/user/Home';
import Shop from '../pages/user/Shop';
import Cart from '../pages/user/Cart';
import ProductDetails from '../pages/user/ProductDetails';
import Checkout from '../pages/user/Checkout';
import Login from '../pages/user/Login';
import Login2 from '../pages/user/Login2';
import Loginpenjual from '../pages/user/Loginpenjual';
import Signup from '../pages/user/Signup';
import Signupcopy from '../pages/user/Signup copy';
import Payment from '../pages/user/payment';
import ArtikelDetails from '../pages/user/ArtikelDetails';
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
  
const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to='Signup' />} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/shop/:id' element={<ProductDetails/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/login2' element={<Login2/>}/>
            <Route path='/loginpenjual' element={<Loginpenjual/>}/>
            <Route path='/signtoko' element={<Signupcopy/>}/>

          
            <Route path='/detail/:id' element={<ProductDetails/>}/>
            <Route path='/detailartikel/:id' element={<ArtikelDetails/>} />
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

export default Routers;