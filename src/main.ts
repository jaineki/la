// main.ts — Entry point: assembles all modules

import { injectStyles }   from './styles';
import {
  buildBackground,
  buildLoader,
  buildCursor,
  buildToast,
  buildScrollTop,
  buildMusicWidget,
  buildNav,
  buildFloatButtons,
  buildMain,
}                          from './dom';
import { initStarfield }  from './starfield';
import { initTypewriter } from './typewriter';
import { initCounters }   from './counter';
import { initCursor }     from './cursor';
import { initSkillCards } from './skills';
import { initMusic }      from './music';
import { initMainChat, initSupportChat, checkBackend } from './chat';
import { initNav, initScrollTop, initRevealObserver }  from './nav';

// ── 1. Inject styles ─────────────────────────────────────────
injectStyles();

// ── 2. Build background layers ────────────────────────────────
buildBackground();

// ── 3. Loader ─────────────────────────────────────────────────
const loader = buildLoader();
document.body.appendChild(loader);

window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('done'), 2000);
});

// ── 4. Cursor ─────────────────────────────────────────────────
buildCursor();
initCursor();

// ── 5. Toast ──────────────────────────────────────────────────
document.body.appendChild(buildToast());

// ── 6. Scroll-to-top button ───────────────────────────────────
document.body.appendChild(buildScrollTop());
initScrollTop();

// ── 7. Music widget ───────────────────────────────────────────
const { widget, audio, toggleBtn } = buildMusicWidget();
document.body.appendChild(audio);
document.body.appendChild(widget);
initMusic(audio, toggleBtn, widget);

// ── 8. Navigation (hamburger + menu panel) ────────────────────
const { hamburger, menuPanel } = buildNav();
document.body.appendChild(hamburger);
document.body.appendChild(menuPanel);
initNav(hamburger, menuPanel);

// ── 9. Float buttons (WhatsApp + Support) ────────────────────
const { whatsapp, supportBtn, supportBox } = buildFloatButtons();
document.body.appendChild(whatsapp);
document.body.appendChild(supportBtn);
document.body.appendChild(supportBox);

// ── 10. Main content ─────────────────────────────────────────
const appRoot = document.getElementById('app')!;
appRoot.appendChild(buildMain());

// ── 11. Interactive modules ───────────────────────────────────
initStarfield();
initTypewriter();
initCounters(2200);
initSkillCards();
initMainChat();
initSupportChat();
initRevealObserver();

// ── 12. Backend health check (dev only) ───────────────────────
setTimeout(() => void checkBackend(), 1000);
