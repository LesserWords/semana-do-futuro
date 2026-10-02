/**
 * Lógica da Timeline e Navegação em Deck / Dias do Circuito
 */
import { SESSIONS_DATA, POLO_TITLES, TOTAL_SESSIONS } from '../data/evento-2026.js';

function switchTimelineDay(idx, pillElement) {
      const container = document.getElementById('timelineContainer');
      if (!container) return;
      const items = container.querySelectorAll('.timeline-item');
      const pills = document.querySelectorAll('.circuit-day-pill');
      const deckNavBar = document.getElementById('deckNavBar');

      pills.forEach(p => p.classList.remove('active'));

      if (idx === 'all') {
        if (pillElement) {
          pillElement.classList.add('active');
        } else {
          const allPill = document.querySelector('.view-all-pill');
          if (allPill) allPill.classList.add('active');
        }
        container.classList.remove('tab-mode');
        items.forEach(it => it.classList.remove('active-session'));
        if (deckNavBar) deckNavBar.style.display = 'none';
        return;
      }

      container.classList.add('tab-mode');
      if (deckNavBar) deckNavBar.style.display = 'flex';

      currentTimelineDay = parseInt(idx, 10);
      const dayPills = Array.from(pills).filter(p => !p.classList.contains('view-all-pill'));
      if (pillElement) {
        pillElement.classList.add('active');
      } else if (dayPills[currentTimelineDay]) {
        dayPills[currentTimelineDay].classList.add('active');
      }

      items.forEach((it, i) => {
        if (i === currentTimelineDay) {
          it.classList.add('active-session');
        } else {
          it.classList.remove('active-session');
        }
      });

      updateDeckControls();
    }

    function navigateDayStep(step) {
      let nextIdx = currentTimelineDay + step;
      if (nextIdx < 0) nextIdx = 0;
      if (nextIdx >= TOTAL_SESSIONS) nextIdx = TOTAL_SESSIONS - 1;
      const dayPills = Array.from(document.querySelectorAll('.circuit-day-pill')).filter(p => !p.classList.contains('view-all-pill'));
      switchTimelineDay(nextIdx, dayPills[nextIdx]);
    }

    function updateSessionStatusBadges() {
      const urlParams = new URLSearchParams(window.location.search);
      const simParam = urlParams.get('data'); // Permite testar datas via ?data=YYYY-MM-DD
      const now = simParam ? new Date(simParam + 'T12:00:00') : new Date();

      // Normaliza para meia-noite da data atual local
      const todayMs = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

      document.querySelectorAll('.session-card').forEach(card => {
        const badge = card.querySelector('.session-status-badge');
        if (!badge) return;
        const dateStr = badge.getAttribute('data-session-date');
        if (!dateStr) return;

        const [y, m, d] = dateStr.split('-').map(Number);
        const sessionMs = new Date(y, m - 1, d).getTime();
        const diffDays = Math.round((sessionMs - todayMs) / (1000 * 60 * 60 * 24));

        badge.className = 'session-status-badge';
        if (diffDays < 0) {
          badge.classList.add('status-concluido');
          badge.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Concluído</span>';
        } else if (diffDays === 0) {
          badge.classList.add('status-hoje');
          badge.innerHTML = '<span class="status-pulse-dot"></span> <span>Hoje</span>';
        } else if (diffDays === 1) {
          badge.classList.add('status-amanha');
          badge.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> <span>Amanhã</span>';
        } else {
          badge.classList.add('status-programado');
          badge.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> <span>Em breve</span>';
        }
      });
    }

    function updateDeckControls() {
      const currentLabel = document.getElementById('deckCurrentPolo');
      if (currentLabel) {
        currentLabel.textContent = POLO_TITLES[currentTimelineDay] || '';
      }
      const prevBtn = document.getElementById('prevDayBtn');
      const nextBtn = document.getElementById('nextDayBtn');
      if (prevBtn) prevBtn.disabled = (currentTimelineDay === 0);
      if (nextBtn) nextBtn.disabled = (currentTimelineDay === TOTAL_SESSIONS - 1);

      const dots = document.querySelectorAll('.deck-dot');
      dots.forEach((d, i) => {
        if (i === currentTimelineDay) {
          d.classList.add('active');
        } else {
          d.classList.remove('active');
        }
      });
    }

    
