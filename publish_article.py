#!/usr/bin/env python3
"""
NOTO Water - Daily SEO Article Publisher Utility
PT Noto Water Envirotech Bandung

Kegunaan:
Membantu pembuatan artikel baru secara otomatis:
1. Meng-generate file HTML artikel dari template dengan metadata SEO & JSON-LD
2. Menambahkan card artikel baru di news.html
3. Mendaftarkan URL artikel baru ke sitemap.xml

Contoh Penggunaan:
python publish_article.py --title "Cara Merawat Filter Air Sumur Rumah" --category "edukasi" --read-time "4 Min Baca" --excerpt "Tips mudah mencuci tabung media filter air sumur bor secara berkala agar air tetap jernih."
"""

import os
import re
import sys
import argparse
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_FILE = os.path.join(BASE_DIR, "article-template.html")
NEWS_FILE = os.path.join(BASE_DIR, "news.html")
SITEMAP_FILE = os.path.join(BASE_DIR, "sitemap.xml")

CATEGORY_MAP = {
    "regulasi": {"label": "Regulasi Permenkes", "badge_class": "badge-cat-regulasi", "color": "text-cyan-200 border-cyan-400/30"},
    "edukasi": {"label": "Edukasi Air", "badge_class": "badge-cat-edukasi", "color": "text-emerald-200 border-emerald-400/30"},
    "industri": {"label": "Industri & F&B", "badge_class": "badge-cat-industri", "color": "text-amber-200 border-amber-400/30"},
    "ipal": {"label": "IPAL & Lingkungan", "badge_class": "badge-cat-ipal", "color": "text-purple-200 border-purple-400/30"}
}

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text).strip('-')
    return text

def publish_article(title, category, excerpt, read_time="5 Min Baca", image="assets/img/hero-water.jpg"):
    if not os.path.exists(TEMPLATE_FILE):
        print(f"[ERROR] Template tidak ditemukan di: {TEMPLATE_FILE}")
        return False

    cat_info = CATEGORY_MAP.get(category.lower(), CATEGORY_MAP["edukasi"])
    slug = slugify(title)
    filename = f"article-{slug}.html"
    target_file = os.path.join(BASE_DIR, filename)

    if os.path.exists(target_file):
        print(f"[WARNING] File {filename} sudah ada. Silakan gunakan judul berbeda atau hapus file lama.")
        return False

    today_iso = datetime.now().strftime("%Y-%m-%d")
    today_formatted = datetime.now().strftime("%d %b %Y")
    now_iso = datetime.now().strftime("%Y-%m-%dT%H:%M:%S+07:00")

    # 1. Baca template
    with open(TEMPLATE_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # 2. Ganti placeholder
    replacements = {
        "[JUDUL ARTIKEL DISINI - MAKS 65 KARAKTER]": title,
        "[DESKRIPSI ARTIKEL DISINI - Rangkuman menarik antara 130-155 karakter dengan kata kunci utama untuk Google Search Snippet].": excerpt,
        "[NAMA-FILE-INI.html]": filename,
        "[JUDUL ARTIKEL UNTUK SOSIAL MEDIA]": title,
        "[RINGKASAN SINGKAT ARTIKEL UNTUK SOSIAL MEDIA]": excerpt,
        "[KATEGORI: Regulasi / Edukasi Air / Industri & F&B / IPAL & Lingkungan]": cat_info["label"],
        "[JUDUL ARTIKEL]": title,
        "[DESKRIPSI ARTIKEL]": excerpt,
        "[JUDUL LENGKAP ARTIKEL UNTUK SCHEMA GOOGLE]": title,
        "[DESKRIPSI ARTIKEL UNTUK SCHEMA GOOGLE]": excerpt,
        "2026-10-02T08:00:00+07:00": now_iso,
        "[JUDUL SINGKAT BREADCRUMB]": title[:30] + ("..." if len(title) > 30 else ""),
        "[KATEGORI ARTIKEL]": cat_info["label"],
        "badge-cat-edukasi": cat_info["badge_class"],
        "[TULIS JUDUL UTAMA ARTIKEL SECARA LENGKAP & MENARIK DI SINI]": title,
        "[TANGGAL TERBIT]": today_formatted,
        "[X] Menit Waktu Baca": read_time,
        "[DESKRIPSI GAMBAR UTAMA]": title,
        "assets/img/hero-water.jpg": image,
    }

    for k, v in replacements.items():
        content = content.replace(k, v)

    with open(target_file, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"[OK] File artikel berhasil dibuat: {filename}")

    # 3. Update news.html (Tambahkan card di atas artikel grid)
    if os.path.exists(NEWS_FILE):
        with open(NEWS_FILE, "r", encoding="utf-8") as f:
            news_html = f.read()

        card_snippet = f"""            <!-- Article: {title} -->
            <article class="article-item article-card bg-white rounded-2xl overflow-hidden flex flex-col justify-between" data-category="{category}">
              <div>
                <div class="article-img-wrapper h-48 overflow-hidden relative bg-slate-800">
                  <img src="{image}" alt="{title}" class="w-full h-full object-cover">
                  <span class="badge-cat {cat_info['badge_class']} absolute top-3 left-3 bg-white/90 backdrop-blur-sm shadow-sm">
                    {cat_info['label']}
                  </span>
                </div>
                <div class="p-5 space-y-2">
                  <div class="flex items-center gap-2 text-[11px] text-slate-400">
                    <time datetime="{today_iso}">{today_formatted}</time>
                    <span>•</span>
                    <span>{read_time}</span>
                  </div>
                  <h3 class="article-title text-base font-bold text-noto-navy leading-snug">
                    <a href="{filename}">
                      {title}
                    </a>
                  </h3>
                  <p class="article-excerpt text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {excerpt}
                  </p>
                </div>
              </div>
              <div class="p-5 pt-0">
                <a href="{filename}" class="text-xs font-bold text-noto-cyan hover:text-noto-ocean flex items-center gap-1">
                  <span>Baca Selengkapnya</span>
                  <i class="fas fa-chevron-right text-[10px]"></i>
                </a>
              </div>
            </article>

"""
            
        target_marker = '<div id="articles-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6">\n'
        if target_marker in news_html:
            news_html = news_html.replace(target_marker, target_marker + card_snippet)
            with open(NEWS_FILE, "w", encoding="utf-8") as f:
                f.write(news_html)
            print(f"[OK] Card artikel baru disisipkan ke news.html")
        else:
            print("[INFO] Marker #articles-grid di news.html tidak cocok persis, card dapat ditambahkan manual.")

    # 4. Update sitemap.xml
    if os.path.exists(SITEMAP_FILE):
        with open(SITEMAP_FILE, "r", encoding="utf-8") as f:
            sitemap_content = f.read()

        sitemap_entry = f"""  <url>
    <loc>https://noto.asia/{filename}</loc>
    <lastmod>{today_iso}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>"""

        if "</urlset>" in sitemap_content:
            sitemap_content = sitemap_content.replace("</urlset>", sitemap_entry)
            with open(SITEMAP_FILE, "w", encoding="utf-8") as f:
                f.write(sitemap_content)
            print(f"[OK] Entri baru ditambahkan ke sitemap.xml")

    print(f"\n[SUKSES] Artikel '{title}' siap dipublikasikan!")
    print(f"URL: http://localhost:3000/{filename}")
    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="NOTO Water SEO Article Publisher")
    parser.add_argument("--title", required=True, help="Judul artikel")
    parser.add_argument("--category", choices=["regulasi", "edukasi", "industri", "ipal"], default="edukasi", help="Kategori artikel")
    parser.add_argument("--excerpt", required=True, help="Ringkasan singkat artikel")
    parser.add_argument("--read-time", default="5 Min Baca", help="Estimasi waktu baca")
    parser.add_argument("--image", default="assets/img/hero-water.jpg", help="Path gambar ilustrasi")

    args = parser.parse_args()
    publish_article(args.title, args.category, args.excerpt, args.read_time, args.image)
