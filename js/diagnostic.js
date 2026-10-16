/**
 * PT Noto Water Envirotech - Diagnostic Page Logic (js/diagnostic.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  initDiagnosticWizard();
  initBeforeAfterSlider();
});

function initDiagnosticWizard() {
  const form = {
    property: 'residential',
    issue: 'iron',
    capacity: 'small'
  };

  const propertyBtns = document.querySelectorAll('[data-wizard-group="property"]');
  const issueBtns = document.querySelectorAll('[data-wizard-group="issue"]');
  const capacityBtns = document.querySelectorAll('[data-wizard-group="capacity"]');

  function bindOptions(btns, key) {
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('selected', 'border-noto-cyan', 'bg-sky-50', 'bg-noto-ice/40', 'ring-2', 'ring-noto-cyan/20');
          b.classList.add('border-slate-200', 'bg-white');
        });
        btn.classList.add('selected', 'border-noto-cyan', 'bg-sky-50', 'ring-2', 'ring-noto-cyan/20');
        btn.classList.remove('border-slate-200', 'bg-white', 'bg-noto-ice/40');

        form[key] = btn.getAttribute('data-value');
        computeRecommendation();
      });
    });
  }

  bindOptions(propertyBtns, 'property');
  bindOptions(issueBtns, 'issue');
  bindOptions(capacityBtns, 'capacity');

  function computeRecommendation() {
    const resultTitle = document.getElementById('diag-result-title');
    const resultTech = document.getElementById('diag-result-tech');
    const resultDesc = document.getElementById('diag-result-desc');
    const resultSpecs = document.getElementById('diag-result-specs');
    const waBtn = document.getElementById('diag-wa-btn');

    if (!resultTitle || !resultTech || !resultDesc || !resultSpecs || !waBtn) return;

    let title = '';
    let tech = '';
    let desc = '';
    let specs = [];

    if (form.issue === 'iron') {
      title = 'Sistem Demangan & Deironizer Manganese Greensand';
      tech = 'Multimedia FRP Tank + Manganese Greensand + Activated Carbon Plus';
      desc = 'Solusi khusus untuk air sumur bor di wilayah Bandung dan sekitarnya yang berbau karat, menguning setelah diendapkan, atau merusak sanitasi.';
      specs = [
        'Menghilangkan kadar Besi (Fe) & Mangan (Mn) hingga 99%',
        'Menghilangkan bau karat & air kuning seketika',
        'Sistem Backwash mudah (Manual/Automatic Valve)',
        'Media tahan lama hingga 18-24 bulan'
      ];
    } else if (form.issue === 'hard') {
      title = 'Sistem Water Softener Anti-Kapur (Ion Exchange)';
      tech = 'Cation Resin Softener + Brine Regenerator Tank';
      desc = 'Ideal untuk mengatasi air yang meninggalkan bercak putih di kran/shower, merusak water heater, dan menyumbat pipa air panas/boiler.';
      specs = [
        'Menurunkan kesadahan air (Hardness/CaCO3) hingga 0 ppm',
        'Melindungi pipa, water heater, & mesin espresso hotel/cafe',
        'Pengisian garam regenerasi otomatis & efisien',
        'Menghasilkan air lembut yang hemat sabun/deterjen'
      ];
    } else if (form.issue === 'cloudy') {
      title = 'Sistem Ultrafiltration (UF) & Multi-Stage Filtration';
      tech = 'Sediment Sand Filter + Carbon Block + Hollow Fiber UF 0.01 Micron';
      desc = 'Menyaring air keruh, endapan lumpur, lumut, mikroorganisme, dan kotoran halus tanpa membuang mineral alami.';
      specs = [
        'Penyaringan mikro hingga 0.01 mikron',
        'Air jernih kristal tanpa bahan kimia berbahaya',
        'Kapasitas stabil dan hemat energi listrik',
        'Masa pakai membran panjang dengan sistem flush'
      ];
    } else if (form.issue === 'drinking') {
      title = 'Sistem Commercial / Industrial Reverse Osmosis (RO)';
      tech = 'Multi-Pretreatment + High-Rejection RO Membrane + Post Carbon + UV';
      desc = 'Menghasilkan air murni steril siap minum dengan TDS rendah, bebas bakteri, virus, logam berat, dan kontaminan berbahaya.';
      specs = [
        'Kadar TDS turun drastis < 15 ppm (Steril Siap Minum)',
        'Membran RO bersertifikasi internasional (Dow Filmtec / Toray)',
        'Dilengkapi UV Sterilizer & Digital TDS Monitoring',
        'Standar Higienis Permenkes RI No. 2 Tahun 2023'
      ];
    } else if (form.issue === 'wwtp') {
      title = 'Sistem Pengolahan Air Limbah Terpadu (WWTP / IPAL & Water Recycle)';
      tech = 'Equalization + DAF / Clarifier + Aerobic/Anaerobic Biofilter + Final Polish';
      desc = 'Sistem rekayasa IPAL untuk pabrik, hotel, dan rumah sakit agar memenuhi standar baku mutu lingkungan KLHK dengan opsi daur ulang air.';
      specs = [
        'Penurunan COD, BOD, TSS, & Minyak Lemak > 90%',
        'Memenuhi Baku Mutu PP No. 22 Tahun 2021',
        'Dukungan perizinan & uji laboratorium berkala',
        'Opsi daur ulang air untuk flushing dan pendingin'
      ];
    }

    const propertyLabels = {
      residential: 'Rumah Tinggal / Villa',
      hospitality: 'Hotel / Cafe / Resto / Laundry',
      industrial: 'Pabrik / Kawasan Industri',
      medical: 'Rumah Sakit / Fasilitas Medis'
    };

    const issueLabels = {
      iron: 'Air Bau Besi / Kuning / Karat (Fe & Mn)',
      hard: 'Air Berkapur / Kerak Putih (Kesadahan Tinggi)',
      cloudy: 'Air Keruh / Lumpur & Sedimen Halus',
      drinking: 'Kebutuhan Air Siap Minum (Steril TDS Rendah)',
      wwtp: 'Pengolahan Air Limbah (WWTP / IPAL & Efluen)'
    };

    const capacityLabels = {
      small: 'Kapasitas 1.000 - 3.000 Liter / hari',
      medium: 'Kapasitas 5.000 - 20.000 Liter / hari',
      large: 'Kapasitas Besar > 50.000 Liter / hari'
    };

    const propText = propertyLabels[form.property] || form.property;
    const issueText = issueLabels[form.issue] || form.issue;
    const capText = capacityLabels[form.capacity] || form.capacity;

    resultTitle.textContent = title;
    resultTech.textContent = tech;
    resultDesc.textContent = `${desc} Sangat direkomendasikan untuk sektor ${propText} dengan estimasi kebutuhan ${capText}.`;

    resultSpecs.innerHTML = specs.map(s => `
      <li class="flex items-center text-xs sm:text-sm text-slate-700">
        <svg class="w-4 h-4 text-noto-cyan mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <span>${s}</span>
      </li>
    `).join('');

    const waText = encodeURIComponent(
      `Halo PT Noto Water Envirotech,\n\n` +
      `Saya telah mencoba Kalkulator Diagnosa Air di website dan mendapatkan rekomendasi sistem filtrasi:\n\n` +
      `• Rekomendasi Sistem: *${title}*\n` +
      `• Teknologi Utama: ${tech}\n` +
      `• Sektor / Properti: ${propText}\n` +
      `• Kendala Air Baku: ${issueText}\n` +
      `• Estimasi Kebutuhan: ${capText}\n\n` +
      `Mohon informasi penawaran teknis dan jadwal survey pengujian sampel air ke lokasi kami. Terima kasih.`
    );
    waBtn.href = `https://wa.me/6282120988201?text=${waText}`;
  }

  computeRecommendation();
}

function initBeforeAfterSlider() {
  const container = document.getElementById('ba-container');
  const slider = document.getElementById('ba-slider');
  const beforeDiv = document.getElementById('ba-before');
  const handle = document.getElementById('ba-handle');

  if (!container || !slider || !beforeDiv || !handle) return;

  function updateSlider(val) {
    const clamped = Math.max(2, Math.min(98, parseFloat(val)));
    beforeDiv.style.width = clamped + '%';
    handle.style.left = clamped + '%';
  }

  slider.addEventListener('input', (e) => {
    updateSlider(e.target.value);
  });

  let isDown = false;
  function handleMove(e) {
    if (!isDown) return;
    const rect = container.getBoundingClientRect();
    const pageX = (e.touches && e.touches[0]) ? e.touches[0].pageX : e.pageX;
    let x = pageX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 2) percentage = 2;
    if (percentage > 98) percentage = 98;
    slider.value = percentage;
    updateSlider(percentage);
  }

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    handleMove(e);
  });
  window.addEventListener('mouseup', () => isDown = false);
  window.addEventListener('mousemove', handleMove);

  container.addEventListener('touchstart', (e) => {
    isDown = true;
    handleMove(e);
  }, { passive: true });
  window.addEventListener('touchend', () => isDown = false);
  window.addEventListener('touchcancel', () => isDown = false);
  window.addEventListener('touchmove', (e) => {
    if (isDown) {
      if (e.cancelable) e.preventDefault();
      handleMove(e);
    }
  }, { passive: false });
}
