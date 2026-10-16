import urllib.request
import re
import os
from pathlib import Path
from urllib.parse import urljoin, urlparse

BASE_URL = "https://www.waterplus.com/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
}

ROOT_DIR = Path(__file__).resolve().parent

def fetch_url(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.read()
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def download_file(url, local_path):
    if local_path.exists() and local_path.stat().st_size > 0:
        return True
    data = fetch_url(url)
    if data:
        local_path.parent.mkdir(parents=True, exist_ok=True)
        with open(local_path, "wb") as f:
            f.write(data)
        print(f"Downloaded: {url} -> {local_path.name} ({len(data)} bytes)")
        return True
    return False

def main():
    print("Fetching HTML from", BASE_URL)
    raw_html = fetch_url(BASE_URL)
    if not raw_html:
        print("Failed to fetch homepage HTML")
        return

    html_text = raw_html.decode("utf-8", errors="ignore")

    # Find stylesheets
    css_urls = re.findall(r'<link[^>]+rel=["\']stylesheet["\'][^>]+href=["\']([^"\']+)["\']', html_text)
    css_urls += re.findall(r'<link[^>]+href=["\']([^"\']+)["\'][^>]+rel=["\']stylesheet["\']', html_text)

    # Find scripts
    js_urls = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', html_text)

    # Find images
    img_urls = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html_text)
    img_urls += re.findall(r'href=["\']([^"\']+\.(?:ico|png|jpg|jpeg))["\']', html_text)

    # Extra known fonts
    extra_urls = [
        "https://www.waterplus.com/css/css-minify.css?ver=1016",
        "https://www.waterplus.com/css/style-minify.css?ver=1016",
        "https://www.waterplus.com/css/menu.css",
        "https://www.waterplus.com/font/fontawesome/css/font-awesome.min.css",
        "https://www.waterplus.com/font/fontawesome/fonts/fontawesome-webfont.woff2?v=4.7.0",
        "https://www.waterplus.com/font/bariol/bariol_light.otf",
        "https://www.waterplus.com/font/bariol/bariol_regular.otf",
        "https://www.waterplus.com/js/script.js",
        "https://www.waterplus.com/img/icon/favicon.ico",
        "https://www.waterplus.com/img/logo-waterplus.jpg",
    ]

    all_downloads = set(css_urls + js_urls + img_urls + extra_urls)
    url_map = {}

    for u in all_downloads:
        clean_u = u.split("?")[0]
        full_url = urljoin(BASE_URL, u)
        
        # Categorize
        parsed = urlparse(clean_u)
        path_part = parsed.path.lstrip("/")
        if not path_part:
            continue
            
        ext = os.path.splitext(path_part)[1].lower()
        filename = os.path.basename(path_part)
        
        if ext in [".css"]:
            local_file = ROOT_DIR / "css" / filename
            local_rel = f"css/{filename}"
        elif ext in [".js"]:
            local_file = ROOT_DIR / "js" / filename
            local_rel = f"js/{filename}"
        elif ext in [".woff", ".woff2", ".ttf", ".otf", ".eot"]:
            local_file = ROOT_DIR / "font" / filename
            local_rel = f"font/{filename}"
        elif ext in [".png", ".jpg", ".jpeg", ".ico", ".svg", ".gif", ".webp"]:
            local_file = ROOT_DIR / "img" / filename
            local_rel = f"img/{filename}"
        else:
            continue

        if download_file(full_url, local_file):
            url_map[u] = local_rel
            url_map[full_url] = local_rel

    # Rewrite HTML to local references
    reconstructed_html = html_text
    for remote, local in url_map.items():
        reconstructed_html = reconstructed_html.replace(remote, local)

    # Save reconstructed index.html
    out_html = ROOT_DIR / "index.html"
    with open(out_html, "w", encoding="utf-8") as f:
        f.write(reconstructed_html)
    print(f"\nSaved reconstructed index.html ({len(reconstructed_html)} chars)")

if __name__ == "__main__":
    main()
