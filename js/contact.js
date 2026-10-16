/**
 * PT Noto Water Envirotech - Contact Page Logic (js/contact.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initFaqAccordion();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const phone = document.getElementById('cf-phone').value.trim();
    const service = document.getElementById('cf-service').value;
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !phone) {
      alert('Mohon lengkapi nama dan nomor telepon/WhatsApp Anda.');
      return;
    }

    const waText = encodeURIComponent(
      `Halo PT Noto Water Envirotech,\n\nNama: ${name}\nNomor Telepon/WA: ${phone}\nLayanan yang diminati: ${service}\nPesan / Kebutuhan:\n${message}\n\nMohon informasi penawaran dan jadwal survey ke lokasi saya. Terima kasih.`
    );

    const waUrl = `https://wa.me/6282120988201?text=${waText}`;

    if (alertBox) {
      alertBox.classList.remove('hidden');
      alertBox.textContent = 'Terima kasih! Pesan Anda sedang dialihkan ke WhatsApp Konsultan NOTO...';
    }

    // Open WhatsApp synchronously within user gesture to avoid popup blocker
    const win = window.open(waUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = waUrl;
    }

    form.reset();
    setTimeout(() => {
      if (alertBox) alertBox.classList.add('hidden');
    }, 4000);
  });
}

function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-btn');

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');

      faqButtons.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherBtn.nextElementSibling) otherBtn.nextElementSibling.classList.add('hidden');
          const otherIcon = otherBtn.querySelector('.faq-icon');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (expanded) {
        btn.setAttribute('aria-expanded', 'false');
        if (answer) answer.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}
