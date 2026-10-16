/**
 * PT Noto Water Envirotech - Solutions Page Logic (js/solutions.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  initSolutionTabs();
});

function initSolutionTabs() {
  const tabBtns = document.querySelectorAll('.solution-tab-btn');
  const cards = document.querySelectorAll('.solution-card');

  if (!tabBtns.length || !cards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active', 'bg-noto-cyan', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });

      btn.classList.add('active', 'bg-noto-cyan', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      const category = btn.getAttribute('data-category');

      cards.forEach(card => {
        const cardCategories = (card.getAttribute('data-category') || '').trim().split(/\s+/);
        if (category === 'all' || cardCategories.includes(category)) {
          card.style.display = 'flex';
          card.classList.remove('hidden');
        } else {
          card.style.display = 'none';
          card.classList.add('hidden');
        }
      });
    });
  });
}
