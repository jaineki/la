// counter.ts — Animated stat number counters

export function initCounters(delayMs = 2200): void {
  setTimeout(() => {
    document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
      const target = parseInt(el.dataset['count'] ?? '0', 10);
      let current = 0;
      const step = Math.ceil(target / 40);

      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = String(current);
        if (current >= target) clearInterval(timer);
      }, 30);
    });
  }, delayMs);
}
