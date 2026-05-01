// nav.ts — Hamburger menu, scroll-to-top, smooth anchor scrolling

export function initNav(hamburger: HTMLElement, menuPanel: HTMLElement): void {
  hamburger.addEventListener('click', () => {
    menuPanel.classList.toggle('open');
  });

  // Close menu when a link is clicked
  menuPanel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menuPanel.classList.remove('open'));
  });

  // Close on outside click
  document.addEventListener('click', (e: MouseEvent) => {
    if (!menuPanel.contains(e.target as Node) && !hamburger.contains(e.target as Node)) {
      menuPanel.classList.remove('open');
    }
  });
}

export function initScrollTop(): void {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

export function initRevealObserver(): void {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animationPlayState = 'running';
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}
