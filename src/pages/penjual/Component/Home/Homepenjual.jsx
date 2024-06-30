import React from 'react';
import ItemLists from '../ItemLists/ItemLists';
import Sidebar from '../Sidebar/Sidebar';
import './Home.scss';
import Header from "../../../../components/header/HeaderPenjual";
import Footer from "../../../../components/Footer/FooterPenjual";
import  Helmet  from '../../../../components/Helmet/Helmet';

function PenjualHome() {
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
                    
                    <ItemLists type="orders" />
                    <ItemLists type="products" />
                    <ItemLists type="balance" />
                </div>

                
            </div>
        </div>
        <Footer/>

</Helmet>
    );
}

export default PenjualHome;
