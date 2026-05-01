// dom.ts — Builds the entire DOM tree programmatically

import {
  SKILLS, PROJECTS, SOCIALS, STATS,
  WHATSAPP_NUMBER, MUSIC_SRC, AVATAR_SRC,
} from './data';

// ─── small util ───────────────────────────────────────────────
function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  ...children: (HTMLElement | string)[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else node.setAttribute(k, v);
  }
  children.forEach(c => {
    if (typeof c === 'string') node.insertAdjacentHTML('beforeend', c);
    else node.appendChild(c);
  });
  return node;
}

// ─── BACKGROUND LAYERS ────────────────────────────────────────
export function buildBackground(): void {
  const canvas = el('canvas', { id: 'starfield' });
  const gridBg = el('div', { id: 'grid-bg' });
  const scanlines = el('div', { id: 'scanlines' });
  const orb1 = el('div', { class: 'orb orb-1' });
  const orb2 = el('div', { class: 'orb orb-2' });
  const orb3 = el('div', { class: 'orb orb-3' });
  [canvas, gridBg, scanlines, orb1, orb2, orb3].forEach(n => document.body.prepend(n));
}

// ─── LOADER ───────────────────────────────────────────────────
export function buildLoader(): HTMLElement {
  const loader = el('div', { id: 'loader' });
  loader.innerHTML = `
    <div class="loader-logo">SELOV</div>
    <div class="loader-text">LOADING...</div>
    <div class="loader-bar-wrap"><div class="loader-bar"></div></div>
  `;
  return loader;
}

// ─── CURSOR ───────────────────────────────────────────────────
export function buildCursor(): void {
  document.body.appendChild(el('div', { id: 'cursor' }));
  document.body.appendChild(el('div', { id: 'cursor-trail' }));
}

// ─── TOAST ────────────────────────────────────────────────────
export function buildToast(): HTMLElement {
  return el('div', { class: 'toast', id: 'toast' });
}

// ─── SCROLL TOP ───────────────────────────────────────────────
export function buildScrollTop(): HTMLButtonElement {
  const btn = el('button', { id: 'scrollTop', 'aria-label': 'Scroll to top' });
  btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  return btn;
}

// ─── MUSIC WIDGET ─────────────────────────────────────────────
export function buildMusicWidget(): { widget: HTMLElement; audio: HTMLAudioElement; toggleBtn: HTMLButtonElement } {
  const audio = el('audio', { id: 'bgMusic', loop: '', preload: 'auto' });
  audio.innerHTML = `<source src="${MUSIC_SRC}" type="audio/mpeg">`;

  const widget = el('div', { class: 'music-widget paused', id: 'musicWidget' });
  widget.innerHTML = `
    <div class="music-visualizer">
      <div class="viz-bar"></div><div class="viz-bar"></div>
      <div class="viz-bar"></div><div class="viz-bar"></div>
      <div class="viz-bar"></div>
    </div>
    <div class="track-name">SELOV</div>
  `;
  const toggleBtn = el('button', { class: 'music-btn', id: 'toggleMusicBtn' });
  toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
  widget.appendChild(toggleBtn);

  return { widget, audio, toggleBtn };
}

// ─── HAMBURGER + MENU ─────────────────────────────────────────
export function buildNav(): { hamburger: HTMLElement; menuPanel: HTMLElement } {
  const hamburger = el('div', { class: 'hamburger', id: 'hamburger' });
  hamburger.innerHTML = '<span></span><span></span><span></span>';

  const menuPanel = el('div', { class: 'menu-panel', id: 'menuPanel' });
  menuPanel.innerHTML = `
    <a href="#skills">Skills</a>
    <a href="#projects">Projects</a>
    <a href="#connect">Connect</a>
    <a href="#chat">AI Chat</a>
  `;
  return { hamburger, menuPanel };
}

// ─── FLOAT BUTTONS ────────────────────────────────────────────
export function buildFloatButtons(): { whatsapp: HTMLElement; supportBtn: HTMLElement; supportBox: HTMLElement } {
  const whatsapp = el('a', {
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    target: '_blank',
    class: 'whatsapp-btn',
    'aria-label': 'WhatsApp',
  });
  whatsapp.innerHTML = '<i class="fab fa-whatsapp"></i>';

  const supportBtn = el('div', { class: 'support-btn', id: 'supportBtn', role: 'button', tabindex: '0' });
  supportBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';

  const supportBox = el('div', { class: 'support-box', id: 'supportBox' });
  supportBox.innerHTML = `
    <div class="support-header">AI Support</div>
    <div class="support-messages" id="supportMessages"></div>
    <div class="support-input">
      <input type="text" id="supportInput" placeholder="Type a message..." autocomplete="off">
      <button id="supportSend"><i class="fas fa-paper-plane"></i></button>
    </div>
  `;

  return { whatsapp, supportBtn, supportBox };
}

// ─── HERO SECTION ─────────────────────────────────────────────
function buildHero(): HTMLElement {
  const hero = el('div', { class: 'hero-section' });
  hero.innerHTML = `
    <div class="avatar-wrapper">
      <div class="orbit-dot"></div>
      <div class="avatar-spin-ring"></div>
      <div class="avatar-inner">
        <img src="${AVATAR_SRC}" alt="Jay Bohol Animated Avatar" loading="lazy">
      </div>
    </div>
    <div class="name-block">
      <div class="name-glow" data-text="JAY BOHOL">SELOV ASX</div>
      <div class="subtitle-type" id="subtypeEl"></div>
    </div>
    <div class="verify-line">
      <i class="fas fa-check-circle verify-badge"></i>
      <span style="font-size:.7rem;font-weight:600;letter-spacing:1px;">VERIFIED BUILDER</span>
    </div>
    <div class="tagline">✝ GOD IS GOOD · NOTHING IS IMPOSSIBLE</div>
  `;
  return hero;
}

// ─── STATS ────────────────────────────────────────────────────
function buildStats(): HTMLElement {
  const row = el('div', { class: 'stats-row reveal' });
  STATS.forEach((s, i) => {
    const pill = el('div', { class: 'stat-pill' });
    pill.style.animationDelay = `${(i + 1) * 0.15}s`;
    pill.innerHTML = `
      <div>
        <div class="stat-number" data-count="${s.count}">0</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `;
    row.appendChild(pill);
  });
  return row;
}

// ─── SECTION TITLE ────────────────────────────────────────────
function buildSectionTitle(num: string, label: string, id?: string): HTMLElement {
  const wrap = el('div', { class: 'section-title reveal', ...(id ? { id } : {}) });
  wrap.innerHTML = `
    <span class="section-num">${num}</span>
    <h2>// ${label}</h2>
    <div class="section-line"></div>
  `;
  return wrap;
}

// ─── SKILLS GRID ──────────────────────────────────────────────
function buildSkillGrid(): HTMLElement {
  const grid = el('div', { class: 'skill-grid' });
  SKILLS.forEach((skill, i) => {
    const card = el('div', { class: 'skill-card', 'data-skill': skill.name });
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <i class="${skill.icon}"></i>
      <span>${skill.name}</span>
      <div class="skill-bar-wrap">
        <div class="skill-bar" style="width:${skill.level}%; animation-delay:${i * 0.08 + 0.3}s"></div>
      </div>
    `;
    grid.appendChild(card);
  });
  return grid;
}

// ─── PROJECT CARDS ────────────────────────────────────────────
function buildProjectCards(): HTMLElement {
  const grid = el('div', { class: 'card-grid' });
  PROJECTS.forEach((p, i) => {
    const card = el('a', { href: p.href, target: '_blank', class: 'neo-card', rel: 'noopener noreferrer' });
    card.style.animationDelay = `${(i + 1) * 0.12}s`;
    card.innerHTML = `
      ${p.badge ? `<div class="card-badge">${p.badge}</div>` : ''}
      <i class="${p.icon}"></i>
      <h3>${p.title}</h3>
      <span class="card-sub">${p.sub}</span>
    `;
    grid.appendChild(card);
  });
  return grid;
}

// ─── SOCIAL CARDS ─────────────────────────────────────────────
function buildSocialCards(): HTMLElement {
  const grid = el('div', { class: 'card-grid' });
  SOCIALS.forEach((s, i) => {
    const card = el('a', { href: s.href, target: '_blank', class: 'neo-card', rel: 'noopener noreferrer' });
    card.style.animationDelay = `${(i + 1) * 0.12}s`;
    card.innerHTML = `
      <i class="${s.icon}" style="color:${s.iconColor}"></i>
      <h3>${s.name}</h3>
      <span class="card-sub">${s.handle}</span>
    `;
    grid.appendChild(card);
  });
  return grid;
}

// ─── CHAT SECTION ─────────────────────────────────────────────
function buildChat(): HTMLElement {
  const wrap = el('div', { class: 'chat-glass', id: 'chatSection' });
  wrap.innerHTML = `
    <div class="chat-header">
      <div class="chat-dot d1"></div>
      <div class="chat-dot d2"></div>
      <div class="chat-dot d3"></div>
      <span class="chat-title">SELOV AI</span>
      <div class="chat-status">
        <div class="status-pulse"></div>
        <span>active</span>
      </div>
    </div>
    <div class="chat-messages-area" id="chatMessagesContainer"></div>
    <div class="chat-input-area">
      <input type="text" id="chatInputField" placeholder="Ask me anything..." autocomplete="off">
      <button class="send-btn" id="sendChatBtn"><i class="fas fa-paper-plane"></i></button>
    </div>
  `;
  return wrap;
}

// ─── FOOTER ───────────────────────────────────────────────────
function buildFooter(): HTMLElement {
  const footer = el('footer');
  footer.textContent = '© 2026 SELOV ASX — FAITH + CODE + GRIND';
  return footer;
}

// ─── ASSEMBLE MAIN ────────────────────────────────────────────
export function buildMain(): HTMLElement {
  const main = el('main', { class: 'container' });

  main.appendChild(buildHero());
  main.appendChild(buildStats());

  // Skills
  main.appendChild(buildSectionTitle('01', 'SKILL_SET', 'skills'));
  main.appendChild(buildSkillGrid());

  // Projects
  main.appendChild(buildSectionTitle('02', 'PROJECTS', 'projects'));
  main.appendChild(buildProjectCards());

  // Connect
  main.appendChild(buildSectionTitle('03', 'CONNECT', 'connect'));
  main.appendChild(buildSocialCards());

  // Chat
  main.appendChild(buildSectionTitle('04', 'AI ASSISTANT', 'chat'));
  main.appendChild(buildChat());

  main.appendChild(buildFooter());
  return main;
}
