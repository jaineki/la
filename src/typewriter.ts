// typewriter.ts — Typewriter subtitle animation

import { TYPEWRITER_PHRASES } from './data';

export function initTypewriter(): void {
  const el = document.getElementById('subtypeEl');
  if (!el) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick(): void {
    const word = TYPEWRITER_PHRASES[phraseIndex];
    if (!word) return;

    if (!deleting) {
      el.innerHTML = word.slice(0, charIndex + 1) + '<span class="cursor-blink">|</span>';
      charIndex++;
      if (charIndex >= word.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      el.innerHTML = word.slice(0, charIndex - 1) + '<span class="cursor-blink">|</span>';
      charIndex--;
      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % TYPEWRITER_PHRASES.length;
      }
    }

    setTimeout(tick, deleting ? 45 : 80);
  }

  tick();
}
