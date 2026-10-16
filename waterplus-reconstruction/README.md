# Waterplus.com Front-End Reconstruction

Hasil rekonstruksi lengkap dan mandiri (*standalone & offline-ready*) dari tampilan front-end situs [waterplus.com](https://www.waterplus.com/), dihasilkan melalui proses reverse engineering komprehensif menggunakan **REA**.

---

## Struktur Folder

```
waterplus-reconstruction/
├── index.html              # Halaman utama dengan semua aset terhubung secara lokal
├── css/
│   ├── css-minify.css      # Layout grid & global utility styles
│   ├── style-minify.css    # Responsive breakpoints, media queries, detail styling
│   ├── menu.css            # Mega-menu, header bar, dan dropdown behavior
│   └── font-awesome.min.css# Ikon antarmuka (Font Awesome 4.7.0)
├── js/
│   ├── script.js           # Fungsi interaktif (cari(), convertToRupiah(), load modal)
│   ├── jquery.min.js       # Pustaka jQuery untuk manipulasi DOM & animasi
│   └── analytics.js        # Script tracking
├── font/
│   ├── bariol/
│   │   ├── bariol_light.otf
│   │   └── bariol_regular.otf
│   └── fontawesome/
│       └── fonts/
│           └── fontawesome-webfont.woff2
├── img/                    # 70+ asset gambar asli (produk, kategori, logo, background)
└── fetch_assets.py         # Skrip automasi sinkronisasi & ekstraksi aset
```

---

## Cara Menjalankan / Preview

Proyek ini telah dikonfigurasi sepenuhnya mandiri tanpa ketergantungan CDN eksternal:

### Opsi 1: Buka Langsung di Browser
Klik dua kali file `index.html` atau buka melalui browser pilihan Anda.

### Opsi 2: Menggunakan Local Web Server
Buka terminal di folder ini dan jalankan:
```bash
python -m http.server 8080
```
Lalu akses di browser: [http://localhost:8080](http://localhost:8080)

---

## Komponen & Fitur Kunci yang Berhasil Direkonstruksi

1. **Header & Mega-Menu Navigasi:**
   * Logo brand Waterplus+
   * Dropdown multi-tingkat (Kategori: Pompa, Filter Air, Dapur, Kamar Mandi)
   * Bar pencarian dinamis yang dapat memanjang (`cari()` & `notsearch()`)
2. **Carousel & Hero Banner:**
   * Slider responsif dengan navigasi panah dan dot indicators
3. **Katalog Produk & Kategori Multi-Kolom:**
   * Desktop: 6 Kolom
   * Tablet: 4 Kolom
   * Mobile: 2 Kolom
4. **Mobile Sticky Action Bar (`#tombol`):**
   * Floating bar di bagian bawah layar smartphone untuk aksi cepat "Beli Sekarang" & "Tambah Keranjang"
5. **Tipografi & Aset Visual Lengkap:**
   * Font resmi **Bariol** (Light & Regular)
   * Semua thumbnail produk beresolusi tajam
