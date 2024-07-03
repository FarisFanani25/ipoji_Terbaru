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


                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
