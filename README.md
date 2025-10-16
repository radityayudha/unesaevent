# UnesaEvent

UnesaEvent adalah website sederhana untuk menampilkan informasi acara / event, kalender acara, detail acara, dan kontak.  

## 🎯 Tujuan

- Menyajikan daftar acara (event) yang akan berlangsung  
- Menampilkan detail setiap acara  
- Menyediakan halaman kontak dan tentang  
- Menampilkan kalender acara sebagai tampilan visual  

## 📁 Struktur Project

/ ← direktori root
│ README.md
│ calendar.html
│ event-detail.html
│ index.html
│ kontak.html
│ tentang.html
│ script.js
│ header.html
│ footer.html
│ cek.css
│ header-style.css
└── image/ ← asset gambar


Penjelasan file penting:

- `index.html` — halaman utama  
- `calendar.html` — menampilkan kalender (event dalam bentuk tanggal)  
- `event-detail.html` — halaman detail untuk tiap acara  
- `kontak.html` — halaman kontak  
- `tentang.html` — halaman “tentang / about”  
- `script.js` — logic JavaScript (misalnya manipulasi DOM, interaksi)  
- `cek.css`, `header-style.css` — file CSS styling  
- `header.html`, `footer.html` — potongan kode header / footer untuk konsistensi tampilan  

## 🛠 Teknologi

- HTML / CSS / JavaScript  
- Layout statis (tanpa backend / database)  
- (Opsional) kamu bisa menambahkan framework atau library bila perlu di masa depan  

## 🚀 Cara Jalankan

1. Clone repo ini  
   ```bash
   git clone https://github.com/radityayudha/unesaevent.git
   
2. Masukkan Direktori Project
   cd unesaevent

3. Buka salah satu file HTML di browser (misalnya index.html)
   /path/to/unesaevent/index.html

✨ Fitur / Rencana Pengembangan

- Beberapa fitur yang bisa kamu tambahkan:
- Form “Tambah Event” (admin)
- Halaman login / autentikasi
- Penyimpanan data event menggunakan JSON / backend (Node.js, PHP, dsb)
- Filter event berdasarkan kategori / tanggal
- Responsif / tampilan mobile
- Efek animasi / transisi
- Notifikasi / reminder

📂 Contribution

Jika kamu ingin berkontribusi:
1. Fork repository
2. Buat branch baru (git checkout -b fitur-baru)
3. Lakukan perubahan / perbaikan
4. Commit dengan pesan yang jelas
5. Push ke branch-mu
6. Buat Pull Request
