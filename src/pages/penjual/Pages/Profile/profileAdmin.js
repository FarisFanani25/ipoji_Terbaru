import React from 'react';

const ProfileAdmin = () => {
  // Mengambil data admin dari localStorage atau dari state autentikasi
  const adminNama = localStorage.getItem('admin_nama');
  const adminEmail = localStorage.getItem('admin_email');

  return (
    <div>
      <h2>Admin Profile</h2>
      <p>Nama: {adminNama}</p>
      <p>Email: {adminEmail}</p>
      {/* Informasi profil admin lainnya */}
    </div>
  );
};

export default ProfileAdmin;
