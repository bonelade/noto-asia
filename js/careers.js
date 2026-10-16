/**
 * PT Noto Water Envirotech - Careers & Recruitment Script (js/careers.js)
 * Interactive logic for Business Development recruitment, form handling, and WhatsApp fast-track
 */

document.addEventListener('DOMContentLoaded', () => {
  initCareersForm();
  initAccordions();
  initFileDropzone();
  initShareJob();
});

/* ----------------------------------------------------
 * 1. RECRUITMENT ACCORDION
 * ---------------------------------------------------- */
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-toggle');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const targetId = header.getAttribute('data-target');
      const content = document.getElementById(targetId);
      const icon = header.querySelector('.accordion-icon');

      if (!content) return;

      const isHidden = content.classList.contains('hidden');

      if (isHidden) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
      }
    });
  });
}

/* ----------------------------------------------------
 * 2. FILE DROPZONE HANDLING
 * ---------------------------------------------------- */
function initFileDropzone() {
  const dropzone = document.getElementById('cv-dropzone');
  const fileInput = document.getElementById('cv-file');
  const filePreview = document.getElementById('file-preview');
  const fileName = document.getElementById('file-name');
  const fileSize = document.getElementById('file-size');
  const removeFileBtn = document.getElementById('remove-file-btn');
  const dropzonePrompt = document.getElementById('dropzone-prompt');

  if (!dropzone || !fileInput) return;

  // Click to trigger native file chooser dialog
  dropzone.addEventListener('click', (e) => {
    if (e.target.closest('#remove-file-btn')) return;
    fileInput.click();
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
      handleSelectedFile(files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleSelectedFile(e.target.files[0]);
    }
  });

  function handleSelectedFile(file) {
    if (!file) return;
    
    // Validate format
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const extension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!validExtensions.includes(extension)) {
      alert('Format file tidak didukung. Mohon unggah dokumen berekstensi PDF, DOC, atau DOCX.');
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal adalah 5 MB.');
      return;
    }

    if (fileName) fileName.textContent = file.name;
    if (fileSize) fileSize.textContent = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

    if (dropzonePrompt) dropzonePrompt.classList.add('hidden');
    if (filePreview) filePreview.classList.remove('hidden');
  }

  if (removeFileBtn) {
    removeFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.value = '';
      if (dropzonePrompt) dropzonePrompt.classList.remove('hidden');
      if (filePreview) filePreview.classList.add('hidden');
    });
  }
}

/* ----------------------------------------------------
 * 3. APPLICATION FORM & WHATSAPP FAST TRACK
 * ---------------------------------------------------- */
function initCareersForm() {
  const form = document.getElementById('bd-application-form');
  const successModal = document.getElementById('application-success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalCandidateName = document.getElementById('modal-candidate-name');
  const modalRefId = document.getElementById('modal-ref-id');
  const waFastTrackBtn = document.getElementById('wa-fast-track-apply');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('applicant-name').value.trim();
      const phone = document.getElementById('applicant-phone').value.trim();
      const email = document.getElementById('applicant-email').value.trim();
      const experience = document.getElementById('applicant-experience').value;
      const linkedin = document.getElementById('applicant-linkedin').value.trim();
      const strategyBrief = document.getElementById('applicant-strategy').value.trim();
      const expectedSalary = document.getElementById('applicant-salary').value.trim();

      // Collect checked competencies
      const checkedBoxes = Array.from(document.querySelectorAll('input[name="competencies"]:checked'))
        .map(cb => cb.value);

      if (!fullName || !phone || !email || !experience) {
        alert('Mohon lengkapi nama, nomor WhatsApp, email, dan pengalaman kerja Anda.');
        return;
      }

      // Generate random reference ID
      const randomId = 'NOTO-BD-' + Math.floor(100000 + Math.random() * 900000);

      if (modalCandidateName) modalCandidateName.textContent = fullName;
      if (modalRefId) modalRefId.textContent = randomId;

      // Check uploaded file status
      const cvInput = document.getElementById('cv-file');
      const cvName = cvInput && cvInput.files && cvInput.files[0] ? cvInput.files[0].name : '';

      // Setup WA Fast-track link inside modal
      const waMessage = encodeURIComponent(
        `Halo HRD PT Noto Water Envirotech,\n\n` +
        `Saya telah mengirimkan aplikasi lamaran untuk posisi *Business Development (Strategic Marketing & Hunting-to-Closing)* melalui website.\n\n` +
        `• No. Ref: ${randomId}\n` +
        `• Nama: ${fullName}\n` +
        `• Pengalaman B2B: ${experience}\n` +
        `• Email: ${email}\n` +
        `• Berkas CV: ${cvName ? cvName + ' (siap saya lampirkan di chat ini)' : 'Akan saya lampirkan langsung di chat ini'}\n` +
        `• LinkedIn/Portofolio: ${linkedin || '-'}\n` +
        `• Keahlian Utama: ${checkedBoxes.join(', ') || 'Strategic Marketing & Closing'}\n` +
        `• Ekspektasi Gaji: ${expectedSalary || 'Dapat Didiskusikan'}\n\n` +
        `Terima kasih. Saya siap untuk tahapan seleksi selanjutnya!`
      );

      const modalWaBtn = document.getElementById('modal-wa-confirm-btn');
      if (modalWaBtn) {
        modalWaBtn.href = `https://wa.me/6282120988201?text=${waMessage}`;
      }

      if (successModal) {
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
      }

      form.reset();
      const filePreview = document.getElementById('file-preview');
      const dropzonePrompt = document.getElementById('dropzone-prompt');
      if (filePreview) filePreview.classList.add('hidden');
      if (dropzonePrompt) dropzonePrompt.classList.remove('hidden');
    });
  }

  // Quick Apply via WhatsApp directly from sidebar
  if (waFastTrackBtn) {
    waFastTrackBtn.addEventListener('click', (e) => {
      const nameInput = document.getElementById('applicant-name');
      const name = nameInput ? nameInput.value.trim() : '';

      let text = `Halo Tim HRD PT Noto Water Envirotech, saya ingin melamar langsung untuk posisi *Business Development (Strategic Marketing & Hunting-to-Closing)*.`;
      if (name) {
        text += ` Nama saya ${name}.`;
      }
      text += ` Mohon arahan untuk proses pengiriman CV & jadwal interview. Terima kasih.`;

      waFastTrackBtn.href = `https://wa.me/6282120988201?text=${encodeURIComponent(text)}`;
    });
  }

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.add('hidden');
      successModal.classList.remove('flex');
    });
  }
}

/* ----------------------------------------------------
 * 4. SHARE JOB / COPY LINK
 * ---------------------------------------------------- */
function initShareJob() {
  const shareBtn = document.getElementById('share-job-btn');
  const toast = document.getElementById('share-toast');

  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const url = window.location.href;
      const shareData = {
        title: 'Lowongan Kerja Business Development - PT Noto Water Envirotech Bandung',
        text: 'Bergabunglah bersama PT Noto Water Envirotech (NOTO) sebagai Business Development. Lamar di sini:',
        url: url
      };

      if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
        try {
          await navigator.share(shareData);
          return;
        } catch (err) {
          // Fallback to clipboard if share dialog was cancelled or unsupported
        }
      }

      try {
        await navigator.clipboard.writeText(url);
        if (toast) {
          toast.classList.remove('hidden');
          setTimeout(() => {
            toast.classList.add('hidden');
          }, 3000);
        } else {
          alert('Tautan lowongan telah disalin ke clipboard!');
        }
      } catch (err) {
        // Fallback for older browsers
        const temp = document.createElement('input');
        temp.value = url;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        if (toast) {
          toast.classList.remove('hidden');
          setTimeout(() => {
            toast.classList.add('hidden');
          }, 3000);
        } else {
          alert('Tautan lowongan telah disalin ke clipboard!');
        }
      }
    });
  }
}
