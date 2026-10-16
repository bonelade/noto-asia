/**
 * PT Noto Water Envirotech - Common JavaScript (js/main.js)
 * Handles Shared Navbar, Sticky Header, Mobile Menu, and Floating WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFloatingWhatsApp();
  initPdfTableTools();
});

/* ----------------------------------------------------
 * 1. NAVBAR & MOBILE MENU
 * ---------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Headless to Sticky navbar state updater
  const updateNavbarState = () => {
    if (!navbar) return;
    const isMobileMenuOpen = mobileMenu && !mobileMenu.classList.contains('hidden');
    if (window.scrollY > 30 || isMobileMenuOpen) {
      navbar.classList.add('navbar-scrolled');
      navbar.classList.remove('navbar-headless');
    } else {
      navbar.classList.add('navbar-headless');
      navbar.classList.remove('navbar-scrolled');
    }
  };

  // Run immediately on page load/render
  updateNavbarState();
  window.addEventListener('scroll', updateNavbarState, { passive: true });

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = `
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        `;
      } else {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.innerHTML = `
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        `;
      }
      updateNavbarState();
    });

    // Close mobile dropdown when any navigation link inside it is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = `
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        `;
        updateNavbarState();
      });
    });
  }
}

/* ----------------------------------------------------
 * 2. FLOATING WHATSAPP TEASER
 * ---------------------------------------------------- */
function initFloatingWhatsApp() {
  const teaser = document.getElementById('wa-teaser');
  const closeBtn = document.getElementById('wa-teaser-close');

  if (!teaser) return;

  // Do not pop up again if user already dismissed it during this browsing session
  try {
    if (sessionStorage.getItem('wa_teaser_dismissed') === 'true') return;
  } catch (e) {
    // If storage is blocked/restricted, continue gracefully
  }

  setTimeout(() => {
    try {
      if (sessionStorage.getItem('wa_teaser_dismissed') === 'true') return;
    } catch (e) {}
    teaser.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    teaser.classList.add('opacity-100', 'translate-y-0');
  }, 3500);

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      try {
        sessionStorage.setItem('wa_teaser_dismissed', 'true');
      } catch (e) {}
      teaser.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    });
  }
}

/* ----------------------------------------------------
 * 3. ADOBE ACROBAT READER & PDF REVIEWER TOOLS
 * ---------------------------------------------------- */
function initPdfTableTools() {
  // Print buttons (both .btn-print-table and .adobe-btn-print)
  document.querySelectorAll('.btn-print-table, .adobe-btn-print').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });

  // Fullscreen / maximize buttons
  document.querySelectorAll('.btn-fullscreen-table, .adobe-btn-fullscreen').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const frame = btn.closest('.adobe-reader-frame, .pdf-viewer-frame');
      if (!frame) return;

      const isFull = frame.classList.toggle('is-fullscreen');
      const icon = btn.querySelector('i');
      if (icon) {
        if (isFull) {
          icon.classList.remove('fa-expand');
          icon.classList.add('fa-compress');
          btn.title = 'Kecilkan Tampilan (Esc)';
        } else {
          icon.classList.remove('fa-compress');
          icon.classList.add('fa-expand');
          btn.title = 'Buka Layar Penuh';
        }
      }
    });
  });

  // Sidebar Drawer Toggle (Thumbnails & Reviewer Notes)
  document.querySelectorAll('.adobe-btn-sidebar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const frame = btn.closest('.adobe-reader-frame, .pdf-viewer-frame');
      if (!frame) return;
      const sidebar = frame.querySelector('.adobe-sidebar');
      if (sidebar) {
        sidebar.classList.toggle('is-collapsed');
        btn.classList.toggle('active');
      }
    });
  });

  // Zoom Controls & Interactive Features per Reader Frame
  document.querySelectorAll('.adobe-reader-frame, .pdf-viewer-frame').forEach(frame => {
    let currentZoom = 100;
    const zoomBadge = frame.querySelector('.adobe-zoom-badge');
    const sheet = frame.querySelector('.adobe-paper-sheet, .pdf-paper-sheet');

    const updateZoom = (newZoom) => {
      currentZoom = Math.min(Math.max(newZoom, 70), 160);
      if (sheet) {
        sheet.style.transform = `scale(${currentZoom / 100})`;
      }
      if (zoomBadge) {
        zoomBadge.textContent = `${currentZoom}%`;
      }
    };

    const zoomInBtn = frame.querySelector('.adobe-btn-zoomin');
    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateZoom(currentZoom + 15);
      });
    }

    const zoomOutBtn = frame.querySelector('.adobe-btn-zoomout');
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateZoom(currentZoom - 15);
      });
    }

    const fitBtn = frame.querySelector('.adobe-btn-fitwidth');
    if (fitBtn) {
      fitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateZoom(100);
      });
    }

    // Reviewer Highlighter Marker Toggle
    const reviewerBtn = frame.querySelector('.adobe-btn-reviewer');
    const stickyNote = frame.querySelector('.adobe-sticky-note');
    const toggleHighlights = () => {
      const rows = frame.querySelectorAll('.adobe-table-rigid tr, .pdf-table-rigid tr');
      const isCurrentlyHighlighted = frame.dataset.highlighted === 'true';
      if (isCurrentlyHighlighted) {
        rows.forEach(r => r.classList.remove('adobe-highlighted'));
        frame.dataset.highlighted = 'false';
        if (reviewerBtn) reviewerBtn.classList.remove('active');
      } else {
        rows.forEach((r, idx) => {
          if (!r.classList.contains('row-section') && r.closest('tbody') && (idx % 2 === 1)) {
            r.classList.add('adobe-highlighted');
          }
        });
        frame.dataset.highlighted = 'true';
        if (reviewerBtn) reviewerBtn.classList.add('active');
      }
    };

    if (reviewerBtn) {
      reviewerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleHighlights();
      });
    }
    if (stickyNote) {
      stickyNote.addEventListener('click', (e) => {
        e.preventDefault();
        toggleHighlights();
      });
    }

    // Hand tool toggle
    const handBtn = frame.querySelector('.adobe-btn-hand');
    const selectBtn = frame.querySelector('.adobe-btn-select');
    const workspace = frame.querySelector('.adobe-workspace');
    if (handBtn && workspace) {
      handBtn.addEventListener('click', (e) => {
        e.preventDefault();
        workspace.classList.add('is-hand-mode');
        handBtn.classList.add('active');
        if (selectBtn) selectBtn.classList.remove('active');
      });
    }
    if (selectBtn && workspace) {
      selectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        workspace.classList.remove('is-hand-mode');
        selectBtn.classList.add('active');
        if (handBtn) handBtn.classList.remove('active');
      });
    }
  });

  // ESC key to exit fullscreen table view
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeFullscreen = document.querySelector('.adobe-reader-frame.is-fullscreen, .pdf-viewer-frame.is-fullscreen');
      if (activeFullscreen) {
        activeFullscreen.classList.remove('is-fullscreen');
        const icon = activeFullscreen.querySelector('.btn-fullscreen-table i, .adobe-btn-fullscreen i');
        if (icon) {
          icon.classList.remove('fa-compress');
          icon.classList.add('fa-expand');
        }
      }
    }
  });
}
