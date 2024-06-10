// // App.js
// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// const Alamat = () => {
//   const [provinces, setProvinces] = useState([]);
//   const [regencies, setRegencies] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [villages, setVillages] = useState([]);
//   const [selectedProvince, setSelectedProvince] = useState('');
//   const [selectedRegency, setSelectedRegency] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');

//   useEffect(() => {
//     const fetchProvinces = async () => {
//       const response = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
//       const data = await response.json();
//       setProvinces(data);
//     };
//     fetchProvinces();
//   }, []);

//   useEffect(() => {
//     const fetchRegencies = async () => {
//       if (selectedProvince) {
//         const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`);
//         const data = await response.json();
//         setRegencies(data);
//       }
//     };
//     fetchRegencies();
//   }, [selectedProvince]);

//   useEffect(() => {
//     const fetchDistricts = async () => {
//       if (selectedRegency) {
//         const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`);
//         const data = await response.json();
//         setDistricts(data);
//       }
//     };
//     fetchDistricts();
//   }, [selectedRegency]);

//   useEffect(() => {
//     const fetchVillages = async () => {
//       if (selectedDistrict) {
//         const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`);
//         const data = await response.json();
//         setVillages(data);
//       }
//     };
//     fetchVillages();
//   }, [selectedDistrict]);

//   return (
//     <div className="container">
//       <header className="my-4">
//         <h1 className="text-center">Daftar Wilayah Indonesia</h1>
//       </header>
//       <main>
//         <form>
//           <div className="form-group">
//             <label htmlFor="provinsi">Provinsi:</label>
//             <select
//               id="provinsi"
//               className="form-control"
//               value={selectedProvince}
//               onChange={e => setSelectedProvince(e.target.value)}
//             >
//               <option value="">Pilih Provinsi</option>
//               {provinces.map(prov => (
//                 <option key={prov.id} value={prov.id}>{prov.name}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="kabupaten">Kabupaten/Kota:</label>
//             <select
//               id="kabupaten"
//               className="form-control"
//               value={selectedRegency}
//               onChange={e => setSelectedRegency(e.target.value)}
//               disabled={!selectedProvince}
//             >
//               <option value="">Pilih Kabupaten/Kota</option>
//               {regencies.map(kab => (
//                 <option key={kab.id} value={kab.id}>{kab.name}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="kecamatan">Kecamatan:</label>
//             <select
//               id="kecamatan"
//               className="form-control"
//               value={selectedDistrict}
//               onChange={e => setSelectedDistrict(e.target.value)}
//               disabled={!selectedRegency}
//             >
//               <option value="">Pilih Kecamatan</option>
//               {districts.map(kec => (
//                 <option key={kec.id} value={kec.id}>{kec.name}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="kelurahan">Kelurahan:</label>
//             <select
//               id="kelurahan"
//               className="form-control"
//               disabled={!selectedDistrict}
//             >
//               <option value="">Pilih Kelurahan</option>
//               {villages.map(kel => (
//                 <option key={kel.id} value={kel.id}>{kel.name}</option>
//               ))}
//             </select>
//           </div>
//         </form>
//       </main>
//       <footer className="text-center my-4">
//         <p>© 2024 Daftar Wilayah Indonesia</p>
//       </footer>
//     </div>
//   );
// };

// export default Alamat;
