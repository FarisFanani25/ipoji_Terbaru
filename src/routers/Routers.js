import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// User Components
import Home from '../pages/user/Home';
import Shop from '../pages/user/Shop';
import Cart from '../pages/user/Cart';
import ProductDetails from '../pages/user/ProductDetails';
import Checkout from '../pages/user/Checkout';
import Login from '../pages/user/Login';
import Signup from '../pages/user/Signup';
import Payment from '../pages/user/payment';
import ArtikelDetails from '../pages/user/ArtikelDetails';


// Admin Components
import AdminHome from '../pages/admin/Component/Home/Home';
import AdminOrders from '../pages/admin/Component/Orders/Orders';
import AdminAddNew from '../pages/admin/Pages/AddNew/AddNew';
import AdminBlogDetail from '../pages/admin/Pages/BlogDetail/BlogDetail';
import AdminBlogs from '../pages/admin/Pages/Blogs/Blogs';
import AdminDetail from '../pages/admin/Pages/Detail/Detail';
import AdminLogin from '../pages/admin/Pages/Login/Login';
import UserList from '../pages/admin/Pages/UserLists/UserLists';
import AdminList from '../pages/admin/Pages/AdminList/AdminList';
import AdminProducts from '../pages/admin/Component/Product/Product';
import Detail from '../pages/admin/Pages/Detail/Detail';
import AdminRegister from '../pages/admin/Pages/Register/Register';
import AdminProfile from "../pages/admin/Pages/Profile/profileAdmin";
import AdminDelivery from "../pages/admin/Component/Delivery/Delivery";

// Seller (Penjual) Components
import PenjualHome from '../pages/penjual/Component/Home/Homepenjual';
import PenjualOrders from '../pages/penjual/Component/Orders/Orders';
import PenjualAddNew from '../pages/penjual/Pages/AddNew/AddNew';
import PenjualLogin from '../pages/penjual/Pages/Login/Login';
import PenjualUserList from '../pages/penjual/Pages/UserLists/UserLists';
import PenjualRegister from '../pages/penjual/Pages/Register/Register';
import PenjualProfile from "../pages/penjual/Pages/Profile/profileAdmin";
import PenjualDelivery from "../pages/penjual/Component/Delivery/Delivery";
import PenjualProducts from '../pages/penjual/Component/Product/Product';
import PenjualAnggota from '../pages/penjual/Component/Anggota/anggota';


const userInpDetails = []; // Placeholder for user input details
const productInpDetails = []; // Placeholder for product input details
const blogInputs = []; // Placeholder for blog inputs

const Routers = () => {
    return (
        <Routes>
            {/* User Routes */}
            <Route path="/" element={<Navigate to='Signup' />} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/shop/:id' element={<ProductDetails/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/detail/:id' element={<ProductDetails/>}/>
            <Route path='/detailartikel/:id' element={<ArtikelDetails/>} />
            <Route path='/payment' element={<Payment/>} />
            
            {/* Admin Routes */}
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
            <Route path="/admin/products" element={<AdminProducts inputs={productInpDetails} titlee="Products" type="PRODUCT" />}>
                <Route index element={<AdminProducts />} />
                <Route path=":productId" element={<Detail />} />
                <Route path="addnew" element={<AdminAddNew inputs={productInpDetails} titlee="Add New Product" type="PRODUCT" />} />
            </Route>

            {/* Seller (Penjual) Routes */}
            <Route path="/penjual" element={<PenjualHome />} />
            <Route path="/penjual/orders" element={<PenjualOrders />} />
            <Route
                path="/penjual/addnew"
                element={<PenjualAddNew inputs={userInpDetails} titlee="Add New User" type="USER" />}
            />
            <Route path="/penjual/login" element={<PenjualLogin />} />
            <Route path="/penjual/register" element={<PenjualRegister />} />
            <Route path="/penjual/profile" element={<PenjualProfile />} />
            <Route path="/penjual/delivery" element={<PenjualDelivery />} />
            <Route path="/penjual/anggota" element={<PenjualAnggota />} />

            <Route
                path="/penjual/user"
                element={<PenjualUserList inputs={userInpDetails} titlee="User List" type="USER" />}
            />
            <Route path="/penjual/products" element={<PenjualProducts inputs={productInpDetails} titlee="Products" type="PRODUCT" />}>
                <Route index element={<PenjualProducts />} />
                <Route path=":productId" element={<Detail />} />
                <Route path="addnew" element={<PenjualAddNew inputs={productInpDetails} titlee="Add New Product" type="PRODUCT" />} />
            </Route>
        </Routes>
    );
};

export default Routers;
