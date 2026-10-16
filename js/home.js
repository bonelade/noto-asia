/**
 * PT Noto Water Envirotech - Home Page Logic (js/home.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroVideo();
  initCounters();
  initLabTabs();
});

/* ----------------------------------------------------
 * LAB PARAMETER TABS (Permenkes 2/2023 & Permen LHK P.68/2016)
 * ---------------------------------------------------- */
function initLabTabs() {
  const tabs = [
    { id: 'minum', btn: document.getElementById('tab-btn-minum'), content: document.getElementById('lab-content-minum') },
    { id: 'bersih', btn: document.getElementById('tab-btn-bersih'), content: document.getElementById('lab-content-bersih') },
    { id: 'limbah', btn: document.getElementById('tab-btn-limbah'), content: document.getElementById('lab-content-limbah') },
  ];

  if (!tabs[0].btn || !tabs[0].content) return;

  function setBtnState(btn, isActive) {
    if (!btn) return;
    const icon = btn.querySelector('i');
    const title = btn.querySelector('.tab-title');
    const sub = btn.querySelector('.tab-sub');

    if (isActive) {
      btn.className = 'flex items-center gap-3 px-5 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 bg-noto-navy text-white shadow-sm';
      if (icon) {
        icon.classList.remove('text-slate-500', 'text-slate-600', 'text-noto-cyan', 'text-noto-navy');
        icon.classList.add('text-white');
      }
      if (title) {
        title.className = 'tab-title leading-tight font-bold text-white text-sm';
      }
      if (sub) {
        sub.className = 'tab-sub text-[11px] text-white font-normal mt-0.5';
      }
    } else {
      btn.className = 'flex items-center gap-3 px-5 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 text-slate-600 hover:text-noto-navy hover:bg-slate-200/60';
      if (icon) {
        icon.classList.remove('text-white', 'text-noto-cyan', 'text-noto-navy');
        icon.classList.add('text-slate-500');
      }
      if (title) {
        title.className = 'tab-title leading-tight font-bold text-slate-800 text-sm';
      }
      if (sub) {
        sub.className = 'tab-sub text-[11px] text-slate-500 font-normal mt-0.5';
      }
    }
  }

  function switchTab(activeId) {
    tabs.forEach(tab => {
      if (!tab.btn || !tab.content) return;
      const isActive = tab.id === activeId;
      if (isActive) {
        tab.content.classList.remove('hidden');
      } else {
        tab.content.classList.add('hidden');
      }
      setBtnState(tab.btn, isActive);
    });
  }

  tabs.forEach(tab => {
    if (tab.btn) {
      tab.btn.addEventListener('click', () => switchTab(tab.id));
    }
  });
}

/* ----------------------------------------------------
 * 0. HERO VIDEO AUTOPLAY SAFEGUARD
 * ---------------------------------------------------- */
function initHeroVideo() {
  const video = document.getElementById('hero-river-video');
  if (!video) return;

  // Ensure muted is explicitly set for strict browser autoplay policies
  video.muted = true;
  video.defaultMuted = true;

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // If autoplay is prevented by battery-saving or strict browser policy,
      // the lightweight poster image remains cleanly in place.
    });
  }
}

/* ----------------------------------------------------
 * 1. ANIMATED STAT COUNTERS
 * ---------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter-value');
  let started = false;

  const countUp = () => {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const stepValue = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
          counter.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
          clearInterval(timer);
        } else {
          counter.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
        }
      }, stepTime);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        countUp();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats-section');
  if (statsSection) observer.observe(statsSection);
}

