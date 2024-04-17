import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import TableChartIcon from '@mui/icons-material/TableChart';
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ColorContext } from '../../ColorContext/darkContext';
import './Sidebar.scss';

function Sidebar() {
    // color state management using react context
    const { darkMode, dispatch } = useContext(ColorContext);

    return (
        <div className={`sidebar ${darkMode ? 'dark' : 'light'}`}>
                    <h3 className="text_none">Admin IPOJI</h3>
            

            <div className="links">
                <ul>
                    <li className="spann">Main</li>
                    <NavLink to="/admin" activeClassName="active-link" style={{ textDecoration: 'none' }}>
                        <li>
                            <DashboardIcon className="icon" /> Dashboard
                        </li>
                    </NavLink>

                    <li className="spann">Lists</li>
                    <NavLink to="/admin/user" activeClassName="active-link" style={{ textDecoration: 'none' }}>
                        <li>
                            <PersonIcon className="icon" /> Daftar Pengguna
                        </li>
                    </NavLink>

                    <NavLink to="/admin/listadmin" activeClassName="active-link" style={{ textDecoration: 'none' }}>
                        <li>
                            <SupervisorAccountIcon className="icon" /> Daftar Artikel
                        </li>
                    </NavLink>

                    <NavLink to="/admin/products" activeClassName="active-link" style={{ textDecoration: 'none' }}>
                        <li>
                            <TableChartIcon className="icon" /> Daftar Produk
                        </li>
                    </NavLink>

                    <NavLink to="/admin/orders" activeClassName="active-link" style={{ textDecoration: 'none' }}>
                        <li>
                            <CreditCardIcon className="icon" /> Daftar Pesanan
                        </li>
                    </NavLink>

                    <NavLink to="/admin/delivery" activeClassName="active-link" style={{ textDecoration: 'none' }}>
                        <li>
                            <DeliveryDiningIcon className="icon" /> Pengiriman
                        </li>
                    </NavLink>

                    <li className="spann">Settings</li>
                    <NavLink to="/admin/profile" activeClassName="active-link" style={{ textDecoration: 'none' }}>
                        <li>
                            <AccountCircleIcon className="icon" /> Profil
                        </li>
                    </NavLink>

                    <NavLink to="/admin/settings" activeClassName="active-link" style={{ textDecoration: 'none' }}>
                        <li>
                            <SettingsRoundedIcon className="icon" /> Pengaturan
                        </li>
                    </NavLink>

                    <NavLink to="/admin/logout" activeClassName="active-link" style={{ textDecoration: 'none' }}>
                        <li>
                            <LogoutIcon className="icon" /> Keluar
                        </li>
                    </NavLink>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
