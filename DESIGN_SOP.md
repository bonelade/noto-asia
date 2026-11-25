# Standard Operating Procedure (SOP) Desain UI/UX
# PT Noto Water Envirotech (Noto Asia)

> **Dokumen Standar Desain & Arsitektur Layout (Anti-Card-itis Edition)**  
> **Versi:** 1.0.0  
> **Tanggal:** 25 November 2026  
> **Lingkup:** Seluruh halaman website `noto.asia` (`index.html`, `about.html`, `solutions.html`, `technology.html`, `export-import.html`, `portfolio.html`, `diagnostic.html`, `news.html`, `careers.html`, `contact.html`, dan halaman artikel)  
> **Acuan Brand:** `NOTO BRAND PACKAGE #2.pdf` & `PROJECT_PLAN_NOTO_WATER.md`

---

## 1. Tujuan & Filosofi Desain

### 1.1. Masalah yang Diselesaikan SOP Ini
Audit terhadap seluruh halaman website saat ini menunjukkan dua masalah utama:
1. **Card Overload (*Card-itis*):** Hampir setiap section — mulai dari Hero Matrix, 3 Pilar, Katalog Sistem, Alur Kerja 4-Fase, Logo Partner, Sektor Industri, Timeline Sejarah, Sertifikasi ISO, Daftar Karir, hingga Dossier Ekspor — dibungkus ke dalam kotak card ber-border dan shadow, bahkan sampai **card di dalam card (*nested cards*)**. Akibatnya halaman terasa generik seperti template SaaS, melelahkan secara visual (*box fatigue*), dan menurunkan kewibawaan brand manufaktur B2B.
2. **Inkonsistensi Visual Antar Halaman:** `index.html` menggunakan gaya tajam (*sharp architectural*, `rounded-none`, matte navy), sementara sub-halaman (`about.html`, `solutions.html`, `technology.html`, `portfolio.html`, `export-import.html`, `contact.html`, `careers.html`, `news.html`, `diagnostic.html`) masih mencampur `rounded-2xl`, `rounded-full`, aksen `noto-cyan`, `waterplus-theme.css`, serta struktur navbar/footer yang berbeda-beda.

### 1.2. Prinsip Visual Utama: *Industrial Architectural Editorial*
Desain website PT Noto Water Envirotech harus mencerminkan karakter perusahaan **rekayasa air, manufaktur skid presisi, dan perdagangan global** — setara dengan standar katalog teknis industri Eropa/Jepang (gaya *Swiss Grid* & arsitektural):
- **Struktur dibangun oleh Tipografi, Whitespace, dan Garis Tipis (`1px hairline`)**, bukan kotak-kotak.
- **Matte & Otoritatif (Non-Neon):** Tidak ada glow neon, gradasi norak, atau animasi memantul (*bouncy hover*).
- **Data-First & Scannable:** Insinyur EPC dan tim procurement B2B lebih mempercayai **tabel spesifikasi, matriks perbandingan, dan fotografi fasilitas nyata** dibanding kotak ikon generik.

---

## 2. Aturan Keras Penggunaan Card (*The Anti-Card Policy*)

Setiap desainer, developer, maupun AI agent **WAJIB** mematuhi 5 aturan berikut tanpa pengecualian:

### Aturan 1 — Kuota Card Maksimal (*Card Budget*)
| Parameter | Batas Maksimal |
| :--- | :--- |
| Section berbasis card per halaman | **Maksimal 1 section** per halaman |
| Jumlah card di dalam 1 halaman | **Maksimal 3–6 card** (idealnya 3–4) |
| Section berbasis card berturut-turut | **0 (DILARANG keras menumpuk 2 section card berurutan)** |
| Card di dalam card (*Nested Cards*) | **0 (DILARANG MUTLAK)** |

### Aturan 2 — Uji Kelayakan Card (*The 3-Yes Gate*)
Sebelum membungkus konten menjadi card, ajukan 3 pertanyaan ini. Konten **HANYA** boleh berbentuk card jika minimal **2 jawaban adalah YA**:
1. **Apakah tiap item merupakan objek mandiri yang dapat diklik/difilter/dibuka detailnya?** (contoh: proyek studi kasus dengan foto nyata, atau unit produk dengan tombol RFQ/datasheet).
2. **Apakah tiap item menggabungkan media visual (foto/diagram asli) + judul + metadata singkat** yang butuh bingkai agar tidak bertabrakan dengan item sebelahnya?
3. **Apakah komponen tersebut adalah wadah interaktif tunggal** (contoh: 1 panel kalkulator sizing atau 1 modal RFQ)?

> **Jika kontennya hanya berupa `Ikon + Judul + 1–2 kalimat deskripsi` → DILARANG DIJADIKAN CARD.** Gunakan pola pengganti di Bagian 3.

### Aturan 3 — Zero Nested Cards (*Larangan Kotak dalam Kotak*)
Dilarang menempatkan container ber-background/ber-border di dalam container card lain.
- ❌ **Salah (kondisi saat ini):** Panel gelap Hero berisi 3 kotak kecil (`index.html`); kotak abu-abu `bg-noto-slate rounded-2xl` berisi 3–4 kotak putih `bg-white rounded-xl` (`technology.html`, `solutions.html`, `export-import.html`).
- ✅ **Benar:** Satu permukaan bersih (*single surface*) yang memisahkan item di dalamnya menggunakan **garis horizontal tipis (`divide-y`)** dan jarak ruang (*padding/gap*).

### Aturan 4 — Larangan "Icon-in-a-Box" Berulang
Jangan menaruh ikon FontAwesome di dalam kotak kecil (`w-10 h-10 bg-slate-200 border`) secara berulang di setiap item daftar atau fitur.
- ✅ **Ganti dengan:** Penomoran teknis monospace (`01`, `02`, `03`), garis aksen tipis kiri/atas, label kategori uppercase kecil, atau **fotografi asli** dari folder `assets/img/` dan `assets/brand/`.

### Aturan 5 — Tidak Ada Card Kosong Tanpa Visual untuk Portfolio / Artikel
- Jika *Case Studies* (`portfolio.html`) atau *Insights* (`news.html`) **belum memiliki foto/diagram asli**, tampilkan sebagai **Hairline Editorial List / Technical Dossier Table** — jangan dijadikan grid card penuh teks yang terlihat kosong dan monoton.

---

## 3. Katalog 8 Pola Layout Pengganti Card

Gunakan pola-pola berikut sebagai **standar default** setiap kali merancang section baru atau merefaktor halaman lama.

### Pola A — Hairline Index List (*Ruled Rows*)
**Cocok untuk:** Lowongan Karir (`careers.html`), Daftar Artikel/Whitepaper (`news.html`), Deliverable Lab (`technology.html`), Dokumen Ekspor (`export-import.html`), Daftar Sektor Industri.

```text
-------------------------------------------------------------------------
01   Senior R&D Water Chemist          Bandung Lab · Full-Time    Apply →
     Treatability simulations, spectrometry, high-silica antiscalants.
-------------------------------------------------------------------------
02   Orbital Welding Inspector         West Java · Full-Time      Apply →
     Precision TIG & NDT inspection for SS316L high-pressure RO skids.
-------------------------------------------------------------------------
```

**Implementasi Tailwind Standar:**
```html
<div class="border-t border-slate-200 divide-y divide-slate-200">
  <a href="..." class="group grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-baseline hover:bg-slate-50/80 transition-colors px-2 -mx-2">
    <span class="md:col-span-1 font-mono text-xs text-slate-400">01</span>
    <div class="md:col-span-6">
      <h3 class="text-base font-bold text-noto-navy group-hover:text-noto-ocean transition-colors">
        Senior R&D Water Chemist
      </h3>
      <p class="text-sm text-slate-600 mt-1 leading-relaxed">
        Lead treatability simulations, spectrometry, and high-silica antiscalant formulations.
      </p>
    </div>
    <span class="md:col-span-3 font-mono text-xs text-slate-500">Bandung Lab • Full-Time</span>
    <span class="md:col-span-2 md:text-right text-xs font-bold uppercase tracking-wider text-noto-navy">
      Apply <i class="fas fa-arrow-right text-[10px] ml-1 transition-transform group-hover:translate-x-1"></i>
    </span>
  </a>
</div>
```

---

### Pola B — Editorial Asymmetric Split (*Sticky Left, Ruled Right*)
**Cocok untuk:** 3 Pilar Utama (`index.html`), Hero Capability Overview, Narasi Perusahaan + Milestone (`about.html`), Penjelasan Divisi (`technology.html`, `solutions.html`, `export-import.html`).

```text
+---------------------------+  +----------------------------------------+
| [EYEBROW]                 |  | 01 / R&D & Water Science               |
| Judul Section Besar       |  | Deskripsi padat & link eksplorasi →    |
| & Paragraf Pengantar      |  | -------------------------------------- |
|                           |  | 02 / Precision Skid Fabrication        |
| (Sticky saat scroll       |  | Deskripsi padat & link eksplorasi →    |
|  di desktop)              |  | -------------------------------------- |
|                           |  | 03 / Global Trade & Export             |
|                           |  | Deskripsi padat & link eksplorasi →    |
+---------------------------+  +----------------------------------------+
```

**Kunci:** Tidak ada box/shadow di sisi kanan maupun kiri. Kontras dibangun oleh rasio kolom (`lg:col-span-5` vs `lg:col-span-7`) dan garis pembatas horizontal `divide-y border-t`.

---

### Pola C — Technical Specification Table (*Engineering Datasheet*)
**Cocok untuk:** Spesifikasi Sistem RO / ContBox / DAF (`solutions.html`), Matriks Incoterms 2020 (`export-import.html`), Katalog Bahan Kimia `Noto-Chem™` (`technology.html`), Perbandingan Kapasitas.

```text
PARAMETER           N-RO-IND (BWRO)        N-SWRO-MAR            N-CONT-MBR
-------------------------------------------------------------------------------
Capacity            50 – 5,000 m³/day      100 – 2,500 m³/day    50 – 1,000 m³/day
Target Quality      TDS Rejection > 99.5%  < 180 ppm (WHO)       COD < 30 mg/L
Metallurgy / Build  SS304 / SS316L Skid    Duplex + Danfoss ERD  20ft / 40ft ISO HC
Controls            Siemens S7 PLC / HMI   Siemens S7 + SCADA    Plug & Play PLC
```

**Kenapa Wajib:** Lebih padat informasi, mudah dibandingkan secara horizontal, dan langsung memancarkan kredibilitas manufaktur B2B dibanding 4 kotak kartu yang informasinya terpotong-potong.

---

### Pola D — Borderless Hairline Columns (*Architectural Grid*)
**Cocok untuk:** Key Metrics (`index.html`), Alur Kerja 4-Fase (*Project Protocol*), Sertifikasi ISO (`about.html`), 4 Sektor Industri (`index.html`).

```text
=========================================================================
 01                  | 02                  | 03                  | 04
 Water               | 3D CAD &            | Fabrication &       | Export &
 Characterization    | Simulation          | 100% FAT            | Commissioning
 Deskripsi singkat   | Deskripsi singkat   | Deskripsi singkat   | Deskripsi singkat
=========================================================================
```

**Implementasi Tailwind Standar:**
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-white/15 divide-y sm:divide-y-0 lg:divide-x divide-white/15">
  <div class="py-8 lg:px-8 first:lg:pl-0 last:lg:pr-0 space-y-3">
    <span class="font-mono text-2xl font-bold text-slate-400">01</span>
    <h3 class="text-base font-bold text-white">Water Characterization</h3>
    <p class="text-sm text-slate-300 leading-relaxed font-light">...</p>
  </div>
  <!-- Kolom 02, 03, 04 -->
</div>
```
> **Bedanya dengan card:** Tidak ada kotak mengambang, tidak ada `gap` kosong antar border, tidak ada shadow, menyatu langsung dengan bidang latar section.

---

### Pola E — Interactive Tabbed Showcase / Master-Detail Split
**Cocok untuk:** Katalog Sistem Utama di `index.html` atau `solutions.html`, Showcase Sektor Industri, Profil Layanan.

```text
+------------------------+  +-------------------------------------------+
| [01] Industrial RO   → |  |  [ FOTO / DIAGRAM SKID NYATA ]            |
|  02  Container WWTP    |  |                                           |
|  03  DAF Clarifier     |  |  Noto-RO™ Industrial Reverse Osmosis      |
|  04  Seawater SWRO     |  |  Deskripsi teknis + 3-baris spec table    |
|  05  Ultrafiltration   |  |  [ Configure RFQ → ]                      |
|  06  Noto-Chem™        |  |                                           |
+------------------------+  +-------------------------------------------+
```

**Keunggulan:** Memangkas 6 card besar sekaligus menjadi 1 area fokus berkelas tinggi — pengguna tidak dibombardir dinding teks dan bisa fokus pada satu sistem per klik.

---

### Pola F — Continuous Horizontal / Vertical Timeline
**Cocok untuk:** Sejarah Perusahaan 1995 → 2008 → 2018 → Kini (`about.html`).
- Gunakan 1 garis kontinu (`border-t` di desktop atau `border-l` di mobile) dengan penanda titik kotak kecil (`w-2 h-2 bg-noto-navy`), angka tahun besar `font-mono text-3xl`, judul, dan 1–2 baris teks polos di atas canvas putih/slate. **Tanpa kotak card.**

---

### Pola G — Full-Bleed Media / Split Photography Band
**Cocok untuk:** Pemisah visual antar section teks agar mata pengguna beristirahat (*visual breathing room*).
- Manfaatkan aset resmi yang sudah tersedia di repositori:
  - Video Hero: `assets/video/hero-river.mp4` (poster: `assets/img/hero-river-poster.webp`)
  - Fotografi: `assets/img/hero-water.jpg`, `assets/img/brand-purity.jpg`, `assets/img/filtration-detail.jpg`, `assets/img/water-feature.jpg`, serta foto HD di `assets/brand/` (`page1_img1_X4.jpg`, `page4_img1_X4.jpg`, `page4_img4_X11.jpg`, `page13_img1_X4.jpg`).
- Letakkan foto secara **full-bleed** atau **50/50 split tanpa frame card** (tepi tajam `rounded-none`, rasio konsisten `aspect-[16/10]` atau `aspect-[4/3]`).

---

### Pola H — Seamless Monochrome Partner Strip
**Cocok untuk:** Daftar Authorized Supply Chain (`DuPont™`, `Hydranautics`, `Grundfos`, `Danfoss`, `Siemens`, `Pentair`) di `index.html` dan `export-import.html`.
- Tampilkan dalam 1 baris flex/grid horizontal di atas latar `bg-noto-slate` dengan `border-y border-slate-200`, dipisah oleh jarak lega atau `divide-x divide-slate-200`. **Dilarang membungkus masing-masing logo ke dalam 6 card putih dengan shadow.**

---

## 4. Ritme Halaman & Alternasi Permukaan (*Page Rhythm*)

Agar halaman tetap terstruktur jelas **tanpa card**, gunakan pergantian warna permukaan (*surface alternation*) dan ruang napas vertikal yang konsisten:

### 4.1. Aturan Permukaan (*Surface Cadence*)
Jangan menempatkan dua section dengan warna latar identik berturut-turut tanpa `border-t border-slate-200` yang tegas. Urutan ritme ideal:
1. **Deep Navy (`bg-noto-navy`)** — Hero / High-impact band
2. **Pure White (`bg-white`)** — Konten utama / Editorial / Tabel
3. **Soft Slate (`bg-noto-slate`)** — Band sekunder / Partner strip / Ringkasan
4. **Full-Bleed Image / Split Media** — Pemecah visual (*breather*)
5. **Pure White (`bg-white`)** — Katalog / Case studies
6. **Deep Navy (`bg-noto-navy`)** — CTA / RFQ Band

### 4.2. Contoh Transformasi Homepage (`index.html`): Dari ~25 Cards → 0–1 Section Card

| Section | Kondisi Saat Ini (Terlalu Banyak Card) | Target SOP Baru | Jumlah Card |
| :--- | :--- | :--- | :---: |
| 1. Hero | Kiri teks + Kanan card kaca berisi 3 mini-card (*nested*) | Full-bleed dark hero (video/foto air) + 3 poin kapabilitas berjajar di strip bawah (*hairline strip*) | **0** |
| 2. Metrics | 4 kolom `divide-x` tanpa card | **PERTAHANKAN** — ini sudah sesuai Pola D | **0** |
| 3. 3 Pillars | 3 card besar ber-border + badge pills | **Pola B:** Editorial Split (kiri narasi sticky, kanan 3 baris bernomor `01–03` dengan `divide-y`) | **0** |
| 4. Engineered Systems | 6 card grid identik | **Pola E:** Master-Detail Tabbed Showcase *ATAU* maks. **1 section** 3-card unggulan + link ke tabel katalog penuh | **0 atau 3** |
| 5. 4-Phase Process | 4 kotak dark card (`bg-white/5 border`) | **Pola D:** Borderless Hairline Columns (`border-y divide-x`) di atas `bg-noto-navy` | **0** |
| 6. Partner Supply Chain | 6 kotak card putih dengan shadow | **Pola H:** Seamless Monochrome Logo Strip tanpa kotak | **0** |
| 7. Application Sectors | 4 card abu-abu dengan icon-in-a-box | **Pola A:** Hairline Index List 4 baris (atau 2x2 hairline grid tanpa box & tanpa icon-box) | **0** |
| 8. Heritage & Philosophy | Kiri teks + Kanan dark quote card | **Pola G + Editorial:** Split foto fasilitas/air + pull-quote dengan `border-l-2 border-noto-navy` langsung di canvas | **0** |
| 9. Technical RFQ | Form di dalam kotak putih bershadow di atas navy | **Split Band:** Kiri instruksi & SLA respon di atas navy/slate, kanan form datar presisi tanpa drop-shadow berat | **0** |

**Hasil:** Jumlah kotak card di homepage turun dari **~25+ kotak** menjadi **0–3 kotak saja**, halaman jauh lebih ringan dibaca, elegan, dan langsung terasa seperti perusahaan engineering kelas enterprise.

---

## 5. Standarisasi Design System (*Single Source of Truth*)

Seluruh halaman (Homepage maupun Sub-halaman) **WAJIB** menggunakan satu konfigurasi visual yang seragam. Hapus semua sisa kelas legacy dari `css/waterplus-theme.css` pada halaman korporat B2B.

### 5.1. Palet Warna Resmi (Matte B2B Engineering)

| Token | Hex | Peruntukan Wajib | Larangan |
| :--- | :--- | :--- | :--- |
| `noto-dark` | `#051822` | Top announcement bar, footer background | Jangan untuk teks body di atas gelap |
| `noto-navy` | `#092534` | Heading utama, tombol primer, dark band section, active border | — |
| `noto-ocean` | `#2B6F8B` | Link teknis, hover teks, aksen garis/border sekunder, angka highlight | — |
| `noto-cyan` | `#12AABF` | **Maks. 5% area layar:** status dot kecil, highlight angka kritis di dark mode, active indicator | **DILARANG** dipakai untuk glow, gradient neon, atau background block besar |
| `noto-ice` | `#DCEDFA` | Aksen teks sekunder di atas background `noto-navy` | Jangan dijadikan teks di atas putih (kontras rendah) |
| `noto-slate` | `#F8FAFC` | Background selang-seling section | — |
| `Pure White` | `#FFFFFF` | Canvas utama | — |
| `Hairline Border` | `#E2E8F0` (`slate-200`) / `rgba(255,255,255,0.12)` | Pembatas baris, kolom, dan tabel | Jangan pakai border tebal (`border-2`+) kecuali aksen 1 sisi (`border-l-2` / `border-t-2`) |
| `Status Green` | `#059669` (`emerald-600`) | **Hanya** indikator online, lolos baku mutu/compliance, dan ikon WhatsApp | Jangan dipakai sebagai warna acak untuk kategori/card ke-4 |

### 5.2. Tipografi & Keterbacaan

| Peran | Font Family | Ukuran Standar | Aturan |
| :--- | :--- | :--- | :--- |
| **Display / H1** | `Alte Haas Grotesk`, `Plus Jakarta Sans` | `text-4xl lg:text-6xl` (`36–60px`) | `font-bold`, `tracking-tight`, `leading-[1.08]` |
| **Section Heading / H2** | `Alte Haas Grotesk`, `Plus Jakarta Sans` | `text-2xl sm:text-4xl` (`24–36px`) | `font-bold`, maksimal 2 baris |
| **Subheading / H3** | `Alte Haas Grotesk`, `Plus Jakarta Sans` | `text-lg sm:text-xl` (`18–20px`) | `font-bold` |
| **Body Paragraf** | `Plus Jakarta Sans` | **`text-sm sm:text-base` (`14–16px`)** | **DILARANG pakai `text-xs` (`12px`) untuk paragraf bacaan!** `leading-relaxed`, lebar maksimal `max-w-prose` (`~65ch`) |
| **Eyebrow / Spec / Angka** | `Space Grotesk` (`font-mono`) | `text-[11px]–text-xs` (`11–12px`) untuk label; `text-3xl–5xl` untuk KPI | `uppercase tracking-widest` untuk eyebrow; `tabular-nums` untuk angka tabel |

> **Catatan Teknis:** Font `Alte Haas Grotesk` sudah tersedia secara lokal di `assets/fonts/` dan dideklarasikan via `@font-face` di `css/common.css`. Pastikan `tailwind.config` di semua halaman (termasuk `index.html`) sinkron memuat `heading: ['"Alte Haas Grotesk"', '"Plus Jakarta Sans"', 'sans-serif']`.

### 5.3. Geometri, Radius, Shadow & Motion

| Elemen | Standar Wajib | Dilarang |
| :--- | :--- | :--- |
| **Border Radius** | **`rounded-none` (`0px`)** untuk seluruh section, tombol, input, tabel, gambar, dan card yang diizinkan (opsional `rounded-sm` / `2px` khusus input form). | `rounded-2xl`, `rounded-xl`, `rounded-full` (kecuali indikator titik status `w-1.5 h-1.5` atau avatar). |
| **Shadow** | **`shadow-none`** untuk semua konten statis di halaman. | `shadow-sm`/`shadow-lg`/`shadow-2xl` pada kartu konten biasa. Shadow hanya untuk elemen overlay (Modal RFQ, sticky mobile drawer). |
| **Spacing Section** | `py-20 lg:py-28` antar section utama; container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. | Section sempit yang dipaksa padat oleh banyak kotak. |
| **Hover & Motion** | Perubahan warna border/teks (`transition-colors duration-200`) atau geser panah `group-hover:translate-x-1`. | `hover:-translate-y-4`, `hover:scale-105` pada kartu, animasi pulse berlebihan. |

### 5.4. Konsistensi Komponen Global (Navbar & Footer)
Seluruh halaman **WAJIB** berbagi struktur navigasi yang identik (tidak boleh ada halaman dengan 5 link dan halaman lain 8 link):
- **Top Status Bar (`bg-noto-dark`):** Sertifikasi ISO 9001:2015 + Port Tanjung Priok (IDTPP) di kiri; Email & Telepon di kanan. **Tanpa badge pill rounded-full.**
- **Main Navbar (`h-20`, `bg-white/95 border-b border-slate-200`):**
  - Logo kiri + identitas PT Noto Water Envirotech.
  - 6 Menu utama seragam: `Home`, `Systems & Skids` (`solutions.html`), `R&D Lab` (`technology.html`), `Global Trade` (`export-import.html`), `Case Studies` (`portfolio.html`), `About` (`about.html`).
  - Action kanan: Link teks `Consultation` (WhatsApp) + tombol kotak tajam `Request RFQ` (`bg-noto-navy text-white`).
- **Footer (`bg-noto-dark`):** 4 kolom seragam di **semua** halaman (Identitas Brand, Core Solutions, Company — termasuk tautan ke `Sizing Tool`, `Insights`, `Careers`, serta Contact & Bay).

---

## 6. Rencana Refactor Per Halaman (Audit Codebase Saat Ini)

Panduan langsung saat mengimplementasikan SOP ini ke file HTML yang ada:

| File Halaman | Pelanggaran SOP Saat Ini | Target Redesign Sesuai SOP |
| :--- | :--- | :--- |
| `index.html` | ~25+ card (nested cards di hero, 3 pillar cards, 6 system cards, 4 process cards, 6 logo cards, 4 sector cards, quote card, form card). | Terapkan blueprint Bagian 4.2: ubah ke hairline strips, editorial split, master-detail showcase, dan seamless partner strip. |
| `about.html` | 3 stacked timeline cards (`rounded-2xl`) + 4 ISO certification cards (`rounded-xl`); navbar hanya 5 link; footer 1 baris. | Timeline → **Pola F** (garis kontinu); ISO → **Pola D** (4-kolom `divide-x`); samakan navbar & footer. |
| `solutions.html` | 4 spec pill-boxes + dark feature card + gray container card berisi 4 white nested cards (`OEM Capabilities`); `rounded-2xl`. | Tiap sistem → **Pola B + C** (narasi kiri + tabel spesifikasi 2-kolom kanan); OEM Capabilities → **Pola A** (ruled list) atau **Pola D**; tajamkan semua sudut (`rounded-none`). |
| `technology.html` | 3 section split dengan **nested white cards di dalam gray container cards** + telemetry card berisi 4 mini-cards; ikon dalam kotak `rounded-xl`. | Deliverables & Noto-Chem → **Pola C** (Spec Table) / **Pola A** (Ruled Rows); Telemetry → 1 panel datar dengan grid `divide-x divide-y` tanpa nested boxes. |
| `export-import.html` | Nested cards pada Compliance Dossier & Authorized Brand Portfolio + 4 Incoterms cards (`rounded-xl`). | Compliance Dossier → **Pola A**; Brand Portfolio → **Pola H** (monochrome strip + tabel stok); Incoterms 2020 → **Pola C** (Tabel Perbandingan FOB/CIF/CFR/DDP). |
| `portfolio.html` | 6 text-only `rounded-2xl` cards tanpa gambar, warna badge inkonsisten. | **Pola A (Case Study Dossier Rows)** yang bisa di-expand/filter *ATAU* maksimal 1 grid card jika sudah dilengkapi foto instalasi nyata (`rounded-none`, tanpa shadow berat). |
| `diagnostic.html` | Calculator card berisi dark card berisi 4 metric cards + 1 summary card (**3 lapis nested cards!**). | Jadikan **1 layout split datar**: sisi kiri input parameter (background slate), sisi kanan output engineering sheet (background navy) dengan angka dipisah `divide-x`/`divide-y` tanpa kotak-kotak mini. |
| `careers.html` | 4 lowongan kerja dibungkus 4 `rounded-2xl` gray cards. | **Pola A (Hairline Index List)** seperti direktori posisi terbuka. |
| `news.html` | 3 artikel tanpa gambar dibungkus `rounded-2xl` cards dengan label teks kontras rendah (`text-slate-400`). | **Pola A (Editorial Index)** dengan nomor terbitan, kategori, judul besar, ringkasan, penulis, dan link baca. |
| `contact.html` | 4 stacked contact cards di kiri (`rounded-2xl`) + 1 form card di kanan (`rounded-2xl`). | **Pola B (Split Layout):** Kiri daftar fasilitas & kontak dipisah `divide-y` (tanpa kotak), kanan form RFQ datar dengan batas `border-t-2 border-noto-navy`. |

---

## 7. Design QA Checklist (Wajib Dicek Sebelum Publish / Merge)

Centang seluruh item ini sebelum menyatakan desain atau kode halaman **SELESAI**:

- [ ] **Card Budget Pass:** Maksimal 1 section berbasis card per halaman, dan total tidak lebih dari 3–6 card.
- [ ] **No Back-to-Back Cards:** Tidak ada 2 section card yang muncul berurutan saat scroll.
- [ ] **Zero Nested Cards:** Tidak ada kotak ber-border/ber-background di dalam kotak lain.
- [ ] **No Redundant Icon Boxes:** Tidak ada deretan ikon dalam kotak kecil yang hanya jadi hiasan; diganti angka monospace, garis, atau foto nyata.
- [ ] **Geometry Strictness:** Seluruh container, tombol, dan gambar konsisten menggunakan sudut tajam (`rounded-none` / maks. `2px`), tanpa `rounded-xl`/`rounded-2xl`/`rounded-full` liar.
- [ ] **Shadow Discipline:** `shadow-none` pada seluruh elemen konten statis; shadow hanya untuk modal/drawer.
- [ ] **Matte Brand Palette:** Warna konsisten `#092534`, `#2B6F8B`, `#FFFFFF`, `#F8FAFC`; tidak ada neon glow atau warna acak tanpa fungsi semantik.
- [ ] **Typography & Contrast:** Paragraf body minimal `14px` (`text-sm`), heading menggunakan `Alte Haas Grotesk` / `Plus Jakarta Sans`, data teknis menggunakan `Space Grotesk`.
- [ ] **Unified Shell:** Header/Navbar (6 menu + RFQ CTA) dan Footer (4 kolom) 100% identik dengan halaman lain; tidak memuat `css/waterplus-theme.css` yang konflik.
- [ ] **Squint Test (Tes Menyipitkan Mata):** Saat layar dilihat dari jauh, yang menonjol adalah **hierarki judul, ruang kosong lega, garis tipis presisi, dan foto nyata** — bukan sekumpulan kotak yang berdesakan.
