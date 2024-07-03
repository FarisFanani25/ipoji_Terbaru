import React from 'react';
import Chart from '../Chart/Chart';
import ItemLists from '../ItemLists/ItemLists';

import ProgressBar from '../ProgressBar/ProgressBar';
import Sidebar from '../Sidebar/Sidebar';
import TableList from '../Product/Product';
import './Home.scss';
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/Footer/FooterAdmin";
import  Helmet  from '../../../../components/Helmet/Helmet';


function Home() {
    return (
        <Helmet title={"home"}>
        <Header />
        <div className="home">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="home_main">
            
                <div className="bg_color" />

                <div className="home_items">
                    <ItemLists type="user" />
                    <ItemLists type="orders" />
                    <ItemLists type="products" />

                </div>

                
            </div>
        </div>
        <Footer/>

        </Helmet>
    );
}

export default Home;
