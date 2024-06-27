// src/components/PesananSaya.js
import React, { useState } from 'react';
import '../../styles/PesananSaya.css';
import whatsappIcon from '../../assets/images/wa.jpg';  // Pastikan Anda memiliki ikon ini di direktori Anda

const Diproses = () => {
    return (
        <div>
            <h2>Pesanan Diproses</h2>
            {/* Tambahkan daftar pesanan yang sedang diproses di sini */}
        </div>
    );
};

const Dibatalkan = () => {
    return (
        <div>
            <h2>Pesanan Dibatalkan</h2>
            {/* Tambahkan daftar pesanan yang dibatalkan di sini */}
        </div>
    );
};

const Selesai = () => {
    return (
        <div>
            <h2>Pesanan Selesai</h2>
            {/* Tambahkan daftar pesanan yang telah selesai di sini */}
        </div>
    );
};

const PesananSaya = () => {
    const [activeTab, setActiveTab] = useState('Diproses');

    return (
        <div className="pesanan-saya-container">
            <h1>Pesanan Saya</h1>
            <div className="tabs">
                <button
                    className={activeTab === 'Diproses' ? 'active' : ''}
                    onClick={() => setActiveTab('Diproses')}
                >
                    Diproses
                </button>
                <button
                    className={activeTab === 'Dibatalkan' ? 'active' : ''}
                    onClick={() => setActiveTab('Dibatalkan')}
                >
                    Dibatalkan
                </button>
                <button
                    className={activeTab === 'Selesai' ? 'active' : ''}
                    onClick={() => setActiveTab('Selesai')}
                >
                    Selesai
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'Diproses' && <Diproses />}
                {activeTab === 'Dibatalkan' && <Dibatalkan />}
                {activeTab === 'Selesai' && <Selesai />}
            </div>
            <div className="whatsapp-container">
                <a href="https://wa.me/1234567890" className="whatsapp-link" target="_blank" rel="noopener noreferrer">
                    <img src={whatsappIcon} alt="WhatsApp Icon" className="whatsapp-icon" />
                    <span className="whatsapp-text">Hubungi Kami Disini</span>
                </a>
            </div>
        </div>
    );
};

export default PesananSaya;
