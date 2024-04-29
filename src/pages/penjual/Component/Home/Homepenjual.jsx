import React from 'react';
import Chart from '../Chart/Chart';
import ItemLists from '../ItemLists/ItemLists';

import ProgressBar from '../ProgressBar/ProgressBar';
import Sidebar from '../Sidebar/Sidebar';
import TableList from '../Product/Product';
import './Home.scss';

function PenjualHome() {
    return (
        <div className="home">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="home_main">
            
                <div className="bg_color" />

                <div className="home_items">
                    
                    <ItemLists type="orders" />
                    <ItemLists type="products" />
                    <ItemLists type="balance" />
                </div>

                
            </div>
        </div>
    );
}

export default PenjualHome;
