/**
 * Noto Asia x Waterplus Interactive Navigation & Search
 * File: js/waterplus-nav.js
 */

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('wp-search-input');
  const searchToggle = document.getElementById('wp-search-toggle');
  const mobileMenuBtn = document.getElementById('wp-mobile-toggle');
  const mobileMenu = document.getElementById('wp-mobile-drawer');

  // 1. Expandable Search Bar (Waterplus Style)
  if (searchToggle && searchInput) {
    searchToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (searchInput.classList.contains('active')) {
        if (searchInput.value.trim().length > 0) {
          executeSearch(searchInput.value.trim());
        } else {
          searchInput.classList.remove('active');
        }
      } else {
        searchInput.classList.add('active');
        searchInput.focus();
      }
    });

    searchInput.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    searchInput.addEventListener('input', function () {
      executeSearch(this.value.trim().toLowerCase());
    });

    document.addEventListener('click', function () {
      if (searchInput.value.trim() === '') {
        searchInput.classList.remove('active');
      }
    });
  }

  // 2. Live Search Filter across Product Cards & Categories
  function executeSearch(query) {
    const productCards = document.querySelectorAll('.wp-product-card');
    const catCards = document.querySelectorAll('.wp-cat-card');

    if (!query) {
      productCards.forEach(card => card.style.display = '');
      catCards.forEach(card => card.style.display = '');
      return;
    }

    productCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? '' : 'none';
    });

    catCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? '' : 'none';
    });
  }

  // 3. Mobile Menu Drawer
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 4. Currency Formatter (Waterplus Helper)
  window.formatRupiah = function (angka) {
    const rev = angka.toString().split('').reverse().join('');
    let rupiah = '';
    for (let i = 0; i < rev.length; i++) {
      if (i % 3 === 0 && i !== 0) rupiah += '.';
      rupiah += rev[i];
    }
    return 'Rp ' + rupiah.split('').reverse().join('');
  };
});
