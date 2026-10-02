/**
 * Entrypoint Principal da Landing Page da Semana do Futuro 2026
 */
import { SESSIONS_DATA, POLO_TITLES, SYMPLA_URLS, TOTAL_SESSIONS } from '../data/evento-2026.js';
import { toggleMobileNav } from '../modules/navigation.js';
import { switchTimelineDay, navigateDayStep, updateSessionStatusBadges, updateDeckControls } from '../modules/timeline.js';
import { openSessionModal, closeSessionModal, openSubscriptionFor, selectSessionFromModal } from '../modules/modal.js';

// Expor no window para total compatibilidade com os handlers inline do HTML (onclick)
window.SESSIONS_DATA = SESSIONS_DATA;
window.POLO_TITLES = POLO_TITLES;
window.SYMPLA_URLS = SYMPLA_URLS;
window.TOTAL_SESSIONS = TOTAL_SESSIONS;

window.toggleMobileNav = toggleMobileNav;
window.switchTimelineDay = switchTimelineDay;
window.navigateDayStep = navigateDayStep;
window.updateSessionStatusBadges = updateSessionStatusBadges;
window.updateDeckControls = updateDeckControls;

window.openSessionModal = openSessionModal;
window.closeSessionModal = closeSessionModal;
window.openSubscriptionFor = openSubscriptionFor;
window.selectSessionFromModal = selectSessionFromModal;

// Inicialização automática ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
  if (typeof updateSessionStatusBadges === 'function') {
    updateSessionStatusBadges();
  }
  if (typeof updateDeckControls === 'function') {
    updateDeckControls();
  }
});
