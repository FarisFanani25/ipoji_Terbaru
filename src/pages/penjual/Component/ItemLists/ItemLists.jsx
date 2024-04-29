import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import TableChartIcon from '@mui/icons-material/TableChart';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './itemlists.scss';

function ItemLists({ type }) {
    const [count, setCount] = useState(0);

    // Gunakan useEffect untuk mengambil data total users dari server
    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/total-users');
                const data = response.data;

                if (data.status === 'success') {
                    setCount(data.total_users);
                }
            } catch (error) {
                console.error('Error fetching total users:', error);
            }
        };

        fetchTotalUsers();
    }, []);

    let data;

    switch (type) {
        case 'user':
            data = {
                title: 'USERS',
                isMoney: false,
                count: count,
                icon: (
                    <PermIdentityIcon
                        style={{
                            color: '#FF74B1',
                            backgroundColor: '#FFD6EC',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all users',
                linkto: '/admin/user',
            };
            break;

        case 'orders':
            data = {
                title: 'ORDERS',
                isMoney: false,
                count: 34,

                icon: (
                    <LocalGroceryStoreOutlinedIcon
                        style={{
                            color: '#AC7088',
                            backgroundColor: '#FFF38C',
                        }}
                        className="icon"
                    />
                ),
                link: 'View all orders',
                linkto: '/admin/orders',
            };
            break;
        case 'products':
            data = {
                title: 'PRODUCTS',
                isMoney: true,
                count: 107,
                icon: (
                    <TableChartIcon
                        style={{
                            color: '#367E18',
                            backgroundColor: '#A7FFE4',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all products',
                linkto: '/admin/products',
            };
            break;
        case 'balance':
            data = {
                title: 'DELIVERY',
                count: 444,
                isMoney: true,
                icon: (
                    <DeliveryDiningIcon
                        style={{
                            color: '#AC7088',
                            backgroundColor: '#B1B2FF',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all details',
                linkto: '/',
            };
            break;
        default:
            break;
    }

    return (
        <div className="item_listss">
            <div className="name">
                <p>{data.title}</p>
            </div>

            <div className="counts">
                {data.isMoney }
                {data.count}
            </div>

            <div className="see_item">
                <Link to={data.linkto}>
                    <p>{data.link}</p>
                </Link>
                {data.icon}
            </div>
        </div>
    );
}

export default ItemLists;
