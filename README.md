# 🎶 OpenMusic API
Proyek ini adalah submission untuk kelas **Belajar Fundamental Aplikasi Back-End** di Dicoding. OpenMusic API dikembangkan secara bertahap melalui tiga versi, dengan setiap versi membawa fitur-fitur baru untuk meningkatkan fungsionalitas dan performa aplikasi. Berikut ini adalah penjelasan mengenai setiap versi dari OpenMusic API.

## 📝 Deskripsi
OpenMusic API adalah aplikasi back-end yang memungkinkan pengguna untuk mengelola data musik dengan melakukan operasi CRUD (Create, Read, Update, Delete) untuk album, lagu, dan playlist. API ini dirancang untuk menangani berbagai permintaan terkait musik, mulai dari menambahkan album dan lagu baru hingga mengelola playlist pribadi yang bisa dikolaborasikan dengan pengguna lain. Aplikasi ini menggunakan PostgreSQL sebagai basis datanya, yang diintegrasikan dengan Amazon RDS dan didukung oleh server-side caching menggunakan Redis untuk performa yang optimal.

## 🚀 Fitur Utama
#### **Versi 1:**
* **Menyimpan Album dan Lagu**: Menambahkan album baru dengan detail seperti nama, tahun rilis, dan artis, serta menambahkan lagu ke dalam album tertentu.
* **Menampilkan Album dan Lagu**: Menampilkan daftar album atau lagu yang tersimpan.
* **Mengubah dan Menghapus Data**: Memperbarui informasi album atau lagu yang sudah ada, dan menghapusnya jika diperlukan.

#### **Versi 2:**
* **Playlist Pribadi:** Pengguna dapat membuat playlist pribadi yang hanya dapat diakses oleh pembuatnya.
* **Manajemen Playlist:** Menambahkan lagu ke dalam playlist, menghapus lagu dari playlist, dan mengelola playlist yang ada.
* **Autentikasi dan Otorisasi:** Mengimplementasikan token-based authentication menggunakan JWT untuk mengamankan API.

#### **Versi 3:**
* **Ekspor Playlist:** Pengguna dapat mengekspor daftar lagu yang berada dalam playlist mereka. Dengan menggunakan RabbitMQ 
* **Upload Gambar:** Menambahkan fitur upload gambar untuk sampul album menggunakan Storage Lokal.
* **Server-Side Caching:** Mengurangi beban pada database dengan menerapkan caching menggunakan Redis untuk permintaan RESTful API.

## 🔧 Tech Stack
* **Backend:** Node.js dengan framework Hapi.
* **Database:** PostgreSQL dengan Amazon RDS.
* **Authentication:** JWT untuk token-based authentication.
* **Storage:** Amazon S3 untuk penyimpanan gambar.
* **Caching:** Redis untuk server-side caching.
* **Dependency Management:** npm, nanoid untuk pembuatan ID unik.
* **Linting:** ESLint dengan Airbnb style guide untuk konsistensi kode.
* **Testing:** Postman untuk pengujian otomatis dan validasi fitur API.
* **Message Broker:** RabbitMQ untuk mendukung fitur ekspor playlist.

## ⚙️ Cara Menjalankan Aplikasi
1. Clone Repository:
    ```sh
    https://github.com/ChristiantoKape/submission_openmusic_api.git
    cd submission_bookshelf_api
    ```
2. Instalasi Dependensi:
    ```sh
    npm install
    ```
3. Konfigurasi Environment:
    ```
    Buat file '.env' di root folder dan masukkan konfigurasi yang dibutuhkan seperti database connection, JWT secret key, konfigurasi redis dan AWS S3
    ```
3. Menjalankan Aplikasi:
    ```sh
    npm run start
    ```
    Aplikasi akan berjalan pada port `9000`.
4. Untuk Pengembangan:
    Jika ingin menggunakan `nodemon` selama pengembangan, jalankan:
    ```sh
    npm run start-dev
    ```

## 📄 Studi Kasus
#### **Versi 1:**
**OpenMusic API versi 1** dikembangkan untuk menangani pengelolaan data album dan lagu. Di tahap awal ini, aplikasi berfungsi untuk menambahkan, menampilkan, memperbarui, dan menghapus album serta lagu.
#### **Versi 2:**
Setelah rilisnya versi 2, **OpenMusic API versi 2** hadir dengan fitur baru untuk mengatasi masalah manajemen daftar lagu. Pengguna kini dapat membuat playlist pribadi yang hanya dapat diakses oleh mereka sendiri. Selain itu, ada fitur kolaborasi playlist yang memungkinkan pengguna lain untuk mengelola playlist bersama.
#### **Versi 3:**
Seiring dengan pertumbuhan pengguna, **OpenMusic API versi 3** diperkenalkan dengan fokus pada performa dan fitur tambahan. Server-side caching diterapkan untuk mengurangi beban database. Selain itu, pengguna dapat mengekspor playlist mereka dan mengunggah gambar sampul album.

### Author
[Christianto Kurniawan Priyono](https://www.linkedin.com/in/chriskape/)

### Rating & Certificate
**Versi 1:**
![versi1](https://i.ibb.co.com/4wrL90H/v1.png)

**Versi 2:**
![versi2](https://i.ibb.co.com/3d9fz0c/v2.png)

**Versi 3:**
![versi3](https://i.ibb.co.com/1YVrtht/v3.png)

[Sertifikat Kompetensi Kelas Belajar Membuat Aplikasi Back-End untuk Pemula](https://www.dicoding.com/certificates/QLZ97EQ89P5D)