// chat.ts — Main AI chat + support chat logic

import { API_BASE_URL } from './data';
import type { ChatApiResponse } from './types';

// ─── Shared helpers ────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m] ?? m));
}

async function fetchAI(query: string): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/chat?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: ChatApiResponse = await res.json();
  return data.response ?? data.reply ?? "I couldn't process that request.";
}

// ─── MAIN CHAT ─────────────────────────────────────────────────

export function initMainChat(): void {
  const container = document.getElementById('chatMessagesContainer') as HTMLElement | null;
  const input     = document.getElementById('chatInputField') as HTMLInputElement | null;
  const sendBtn   = document.getElementById('sendChatBtn') as HTMLButtonElement | null;
  if (!container || !input || !sendBtn) return;

  let typingEl: HTMLElement | null = null;

  function appendBubble(text: string, isUser: boolean): HTMLElement {
    const div = document.createElement('div');
    div.className = isUser ? 'bubble user-bubble' : 'bubble ai-bubble';
    div.textContent = text;
    container.appendChild(div);
    div.scrollIntoView({ behavior: 'smooth', block: 'end' });
    return div;
  }

  function showTyping(): void {
    typingEl?.remove();
    typingEl = document.createElement('div');
    typingEl.className = 'bubble ai-bubble';
    typingEl.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    container.appendChild(typingEl);
    typingEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  function removeTyping(): void {
    typingEl?.remove();
    typingEl = null;
  }

  async function send(): Promise<void> {
    const msg = input.value.trim();
    if (!msg) return;

    input.disabled = true;
    sendBtn.disabled = true;
    appendBubble(msg, true);
    input.value = '';
    showTyping();

    try {
      const reply = await fetchAI(msg);
      removeTyping();
      appendBubble(reply, false);
    } catch {
      removeTyping();
      appendBubble('⚠️ Cannot connect to AI service. Make sure the backend is running.', false);
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  sendBtn.addEventListener('click', e => { e.stopPropagation(); void send(); });
  input.addEventListener('keypress', e => { if (e.key === 'Enter') { e.preventDefault(); void send(); } });
}

// ─── SUPPORT CHAT ──────────────────────────────────────────────

export function initSupportChat(): void {
  const messagesEl = document.getElementById('supportMessages') as HTMLElement | null;
  const inputEl    = document.getElementById('supportInput') as HTMLInputElement | null;
  const sendEl     = document.getElementById('supportSend') as HTMLButtonElement | null;
  const btnEl      = document.getElementById('supportBtn') as HTMLElement | null;
  const boxEl      = document.getElementById('supportBox') as HTMLElement | null;

  if (!messagesEl || !inputEl || !sendEl || !btnEl || !boxEl) return;

  // Toggle open/close
  btnEl.addEventListener('click', () => boxEl.classList.toggle('open'));

  function addMsg(text: string, fromUser: boolean): void {
    const wrap = document.createElement('div');
    wrap.style.cssText = `margin:3px 0;text-align:${fromUser ? 'right' : 'left'}`;
    const span = document.createElement('span');
    span.style.cssText = `
      background:${fromUser ? '#0084ff' : '#1a1f2e'};
      padding:8px 12px; border-radius:10px;
      display:inline-block; word-break:break-word;
      max-width:85%; font-size:.82rem;
    `;
    span.textContent = text;
    wrap.appendChild(span);
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function sendSupport(): Promise<void> {
    const msg = inputEl.value.trim();
    if (!msg) return;

    addMsg(msg, true);
    inputEl.value = '';

    // Typing indicator
    const typingWrap = document.createElement('div');
    typingWrap.style.cssText = 'margin:3px 0;text-align:left';
    typingWrap.innerHTML = '<span style="background:#1a1f2e;padding:8px 12px;border-radius:10px;display:inline-block;font-size:.8rem;"><em>Typing...</em></span>';
    messagesEl.appendChild(typingWrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
      const reply = await fetchAI(msg);
      typingWrap.remove();
      addMsg(reply, false);
    } catch {
      typingWrap.remove();
      addMsg('⚠️ Connection lost. Please try again later.', false);
    }
  }

  sendEl.addEventListener('click', () => { void sendSupport(); });
  inputEl.addEventListener('keypress', e => { if (e.key === 'Enter') void sendSupport(); });
}

// ─── Health check ──────────────────────────────────────────────

export async function checkBackend(): Promise<void> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (res.ok) {
      console.log('✅ Backend connected');
    } else {
      console.warn('⚠️ Backend responded but no health endpoint');
    }
  } catch {
    console.error('❌ Backend not reachable. Run: node server.js');
  }
}
