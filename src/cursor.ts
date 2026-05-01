// cursor.ts — Custom cursor tracking

export function initCursor(): void {
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  if (!cursor || !trail) return;

  let mx = 0;
  let my = 0;

  document.addEventListener('mousemove', (e: MouseEvent) => {
    mx = e.clientX;
    my = e.clientY;

    cursor.style.left = `${mx}px`;
    cursor.style.top  = `${my}px`;

    setTimeout(() => {
      trail.style.left = `${mx}px`;
      trail.style.top  = `${my}px`;
    }, 80);
  });
}
