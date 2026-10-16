/**
 * PT Noto Water Envirotech - News & Articles Logic (js/news.js)
 * Real-time SEO category filtering, live article search, and reading progress
 */

document.addEventListener('DOMContentLoaded', () => {
  initNewsFilters();
  initReadingProgressBar();
  initShareArticle();
});

/* ----------------------------------------------------
 * 1. CATEGORY & LIVE SEARCH FILTERING
 * ---------------------------------------------------- */
function initNewsFilters() {
  const categoryPills = document.querySelectorAll('.news-category-pill');
  const searchInput = document.getElementById('news-search-input');
  const articleCards = document.querySelectorAll('.article-item');
  const emptyState = document.getElementById('news-empty-state');
  const activeCountEl = document.getElementById('article-count-display');

  if (!articleCards.length) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function applyFilter() {
    let visibleCount = 0;

    articleCards.forEach(card => {
      const cardCats = (card.getAttribute('data-category') || '').trim().split(/\s+/);
      const title = (card.querySelector('.article-title')?.textContent || '').toLowerCase();
      const excerpt = (card.querySelector('.article-excerpt')?.textContent || '').toLowerCase();

      const matchesCategory = activeCategory === 'all' || cardCats.includes(activeCategory);
      const matchesSearch = !searchQuery || title.includes(searchQuery) || excerpt.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.classList.add('hidden');
      }
    });

    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.classList.remove('hidden');
      } else {
        emptyState.classList.add('hidden');
      }
    }

    if (activeCountEl) {
      activeCountEl.textContent = `Menampilkan ${visibleCount} artikel`;
    }
  }

  // Category Pill Click
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => {
        p.classList.remove('active', 'bg-noto-cyan', 'text-white', 'shadow-md');
        p.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });

      pill.classList.add('active', 'bg-noto-cyan', 'text-white', 'shadow-md');
      pill.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      activeCategory = pill.getAttribute('data-category') || 'all';
      applyFilter();
    });
  });

  // Live Search Input with debounce
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyFilter();
      }, 150);
    });
  }
}

/* ----------------------------------------------------
 * 2. ARTICLE READING PROGRESS BAR
 * ---------------------------------------------------- */
function initReadingProgressBar() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const percentage = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      progressBar.style.width = percentage + '%';
    }
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* ----------------------------------------------------
 * 3. SHARE ARTICLE HELPER
 * ---------------------------------------------------- */
function initShareArticle() {
  const shareBtn = document.getElementById('share-article-btn');
  const toast = document.getElementById('share-toast');

  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const title = document.title;
      const url = window.location.href;

      if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
        try {
          await navigator.share({ title, url });
          return;
        } catch (e) {}
      }

      try {
        await navigator.clipboard.writeText(url);
        if (toast) {
          toast.classList.remove('hidden');
          setTimeout(() => toast.classList.add('hidden'), 3000);
        } else {
          alert('Tautan artikel berhasil disalin!');
        }
      } catch (err) {
        const temp = document.createElement('input');
        temp.value = url;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        if (toast) {
          toast.classList.remove('hidden');
          setTimeout(() => toast.classList.add('hidden'), 3000);
        } else {
          alert('Tautan artikel berhasil disalin!');
        }
      }
    });
  }
}
