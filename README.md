# ♻️ Nama_Proyek – Sustainable Environment Web App

## 🧭 Deskripsi Proyek

**Nama_Proyek** adalah aplikasi berbasis website yang berfokus pada edukasi dan klasifikasi sampah organik & anorganik. Dilengkapi dengan halaman beranda yang informatif, pemindai sampah berbasis kamera dan AI, serta kumpulan artikel seputar lingkungan.

---

## 🖼️ Fitur Utama

- 🏠 Beranda informatif
- 📷 Pemindai sampah organik/anorganik menggunakan kamera atau upload gambar  
- 📰 Kumpulan artikel dan detail pembahasan seputar lingkungan  
- 📚 Koleksi artikel yang dapat disimpan pengguna  
- 🎯 Antarmuka sederhana dan berbahasa Indonesia, mudah digunakan oleh siapa saja  
- 📱 Responsif dan dapat diakses di desktop maupun mobile

---

## 🏗️ Struktur Folder Penting
```
KKP-PROJECT
├── FEBE
│   ├── backend
│   │   └── src
│   │       ├── article.js
│   │       ├── handler.js
│   │       ├── routes.js
│   │       └── server.js
│   │
│   └── frontend
│       └── src
│           ├── scripts
│           │   ├── data/
│           │   ├── pages/
│           │   ├── routes/
│           │   ├── utils/
│           │   ├── config.js
│           │   ├── index.js
│           │   └── template.js
│           │
│           ├── styles/
│           └── index.html
│
├── ML
│   ├── dataset/
│   ├── models/
│   ├── notebook/
│   └── src/
│
├── public
│   ├── images/
│   └── models/
│
├── package.json
├── webpack-common.js
├── webpack-dev.js
└── webpack-prod.js
```

---

## 🛠️ Teknologi yang Digunakan

- **Frontend:** HTML, CSS, JavaScript, Webpack
- **Backend:** Node.js, Hapi.js, Postman
- **Machine Learning:** TensorFlow, Python, Jupyter Notebook
- **Lainnya:** RESTful API, Local Storage, IndexedDB API, View Transition API

---

## 🚀 Instalasi dan Menjalankan Aplikasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/MFadhliAlHafizh/kkp-project.git
   cd kkp-project

2. **Install Dependency Proyek**
   Pastikan Anda sudah menginstall Node.js.
   ```bash
   npm install

3. **Jalankan Frontend & Backend Bersamaan (Development)**
   ```bash
   npm run start-dev

4. **Jalankan Frontend Untuk Produksi (Production)**
   ```bash
   npm run build


## 📦 Instalasi Machine Learning
```
pip install -r requirements.txt
npm install
npm install onnxruntime-web
npm run start
```

---

## 📁 Dataset
https://www.kaggle.com/datasets/techsash/waste-classification-data

Rincian Dataset:
- Total gambar: 25.000++ 
- Format: .jpg
- Data telah di-convert ke format .tfrecord secara mandiri untuk efisiensi training TensorFlow.

---

## 🧪 Model AI

Model klasifikasi gambar dibangun menggunakan:
✅ CNN berbasis MobileNet
✅ Dataset organik vs anorganik
✅ Konversi model: .h5 → .tflite → .tfjs untuk digunakan di web

---

## 🧠 Kesimpulan
Proyek ini menunjukkan bahwa teknologi machine learning dapat diintegrasikan ke dalam aplikasi web untuk meningkatkan kesadaran masyarakat akan pentingnya memilah sampah dan menjaga lingkungan.

---

## 👨‍💻 Kontributor
### M. Aziz Chusaini
Mahasiswa Universitas Indraprasta PGRI, fokus di bidang Data Science dengan spesialisasi di Machine Learning.

🔗 [GitHub](https://github.com/MAzizChusaini)

🔗 [LinkedIn](https://www.linkedin.com/in/m-aziz-chusaini-56187331a/)

### Muhammad Fadhli Al Hafizh
Mahasiswa Universitas Indraprasta PGRI, fokus di bidang Front-End & Back-End Developer

🔗 [GitHub](https://github.com/MFadhliAlHafizh)

🔗 [LinkedIn](https://www.linkedin.com/in/mfadhlialhafizh)


### Andi Hariyanto
Mahasiswa Universitas Indraprasta PGRI, fokus di bidang Front-End & Back-End Developer

🔗 [GitHub](https://github.com/Andyy-Code-Hub)

🔗 [LinkedIn](www.linkedin.com/in/andi-hariyanto-0b3289236 )

### Raffi Arya Putra Prabowo
Mahasiswa Universitas Indraprasta PGRI, fokus di bidang Machine Learning dan Web Development

🔗 [GitHub](https://github.com/Medolsky)

🔗 [LinkedIn](https://www.linkedin.com/in/raffi-arya-putra-prabowo-649663231/)
