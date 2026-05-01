// skills.ts — Skill card mouse glow + click toast

import { showToast } from './toast';

export function initSkillCards(): void {
  document.querySelectorAll<HTMLElement>('.skill-card').forEach(card => {

    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });

    card.addEventListener('click', () => {
      const skill = card.dataset['skill'] ?? '';
      if (skill) showToast(`⚡ ${skill}`);
    });
  });
}
