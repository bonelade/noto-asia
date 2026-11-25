/**
 * PT Noto Water Envirotech — Shared UI Controller
 * Handles unified mobile navigation, RFQ modal, Escape key handling, and form submission.
 */
(function () {
  // Mobile Drawer Controller
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', !isHidden);
      mobileMenuBtn.setAttribute('aria-expanded', String(isHidden));
      if (menuIcon) {
        menuIcon.classList.toggle('fa-bars', !isHidden);
        menuIcon.classList.toggle('fa-times', isHidden);
      }
    });

    mobileMenu.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        if (menuIcon) {
          menuIcon.classList.remove('fa-times');
          menuIcon.classList.add('fa-bars');
        }
      });
    });
  }

  // RFQ Modal Controller (exposed globally)
  window.openRfqModal = function (systemName) {
    const modal = document.getElementById('rfqModal');
    const modalSystem = document.getElementById('modalSystem');
    const successMsg = document.getElementById('modalRfqSuccess');
    if (modalSystem) {
      modalSystem.value = systemName || 'Comprehensive Water Engineering';
    }
    if (successMsg) {
      successMsg.classList.add('hidden');
    }
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeRfqModal = function () {
    const modal = document.getElementById('rfqModal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  window.handleModalRfqSubmit = function (e) {
    e.preventDefault();
    const successMsg = document.getElementById('modalRfqSuccess');
    if (successMsg) {
      successMsg.classList.remove('hidden');
    }
    e.target.reset();
    setTimeout(() => {
      window.closeRfqModal();
    }, 1800);
  };

  window.handleInlineRfqSubmit = function (e, alertId) {
    e.preventDefault();
    const alertBox = document.getElementById(alertId || 'rfqSuccessAlert');
    if (alertBox) {
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    e.target.reset();
  };

  // Backdrop click & Escape key for RFQ modal
  window.addEventListener('click', (e) => {
    const modal = document.getElementById('rfqModal');
    if (modal && e.target === modal) {
      window.closeRfqModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeRfqModal();
    }
  });
})();
