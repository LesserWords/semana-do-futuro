/**
 * Controle de Navegação e Menu Mobile
 */

export function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  const btn = document.getElementById('mobileNavBtn');
  if (!nav) return;
  const isOpen = nav.classList.toggle('open');
  if (btn) {
    btn.setAttribute('aria-expanded', isOpen);
    btn.innerHTML = isOpen
      ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>'
      : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
  }
}
