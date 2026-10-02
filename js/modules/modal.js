/**
 * Gerenciamento de Modais (Spotlight e Widescreen Dashboard)
 */
import { SESSIONS_DATA, SYMPLA_URLS } from '../data/evento-2026.js';
import { switchTimelineDay } from './timeline.js';

function openSessionModal(index) {
      const data = SESSIONS_DATA[index];
      if (!data) return;

      const topBarLeft = document.getElementById('modalTopLeft');
      let logoHtml = '';
      if (data.poloLogo) {
        logoHtml = `<a href="${data.poloUrl}" target="_blank" rel="noopener" class="session-inst-logo-link" title="${data.poloLogoAlt}"><img src="${data.poloLogo}" alt="${data.poloLogoAlt}" class="modal-inst-logo"></a>`;
        if (data.partnerLogo) {
          logoHtml += `<a href="${data.partnerUrl || data.poloUrl}" target="_blank" rel="noopener" class="session-inst-logo-link" title="${data.partnerLogoAlt}"><img src="${data.partnerLogo}" alt="${data.partnerLogoAlt}" class="modal-inst-logo"></a>`;
        }
      } else {
        logoHtml = `<a href="${data.poloUrl}" target="_blank" rel="noopener" class="session-inst-logo-link" title="Acessar portal da instituição"><div class="modal-polo-badge" style="background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.2); color: #fff;">${data.poloLogoPlaceholder}</div></a>`;
      }
      topBarLeft.innerHTML = `
        <span class="modal-polo-badge">${data.poloBadge}</span>
        <div style="display:inline-flex; align-items:center; gap:8px;">${logoHtml}</div>
      `;

      const colLeft = document.getElementById('modalColLeft');
      colLeft.innerHTML = `
        <div>
          <h2 class="modal-topic-title" id="modalTopicTitle">${data.title}</h2>
        </div>

        <div class="modal-meta-list">
          <div class="modal-meta-item">
            <span class="modal-meta-label">📅 Data</span>
            <span class="modal-meta-val">${data.date}</span>
          </div>
          <div class="modal-meta-item">
            <span class="modal-meta-label">⏰ Horário</span>
            <span class="modal-meta-val">${data.dayTime}</span>
          </div>
          <div class="modal-meta-item full">
            <span class="modal-meta-label">📍 Local</span>
            <span class="modal-meta-val">${data.venue} <br><small style="color:var(--muted); font-size:11.5px;">${data.venueAddress}</small></span>
          </div>
          <div class="modal-meta-item full">
            <span class="modal-meta-label">🎓 Certificação</span>
            <span class="modal-meta-val" style="color:var(--ciano);">${data.cert}</span>
          </div>
        </div>

        <div class="modal-description">
          ${data.description}
        </div>

        <div class="modal-left-actions">
          <a href="${data.symplaUrl}" target="_blank" rel="noopener" class="btn-primary" style="width: 100%; justify-content: center; padding: 11px 18px; font-size: 13.5px; text-decoration: none;">
            <span>Inscrever-se no Sympla</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
          <button type="button" class="btn-secondary" style="width: 100%; justify-content: center; padding: 8px 16px; font-size: 12.5px;" onclick="closeSessionModal()">
            Fechar Detalhes
          </button>
        </div>
      `;

      let speakersHtml = '';
      data.speakers.forEach(sp => {
        let avatarHtml = '';
        if (sp.avatar) {
          const fitStyle = sp.avatar.includes('willian-pelissari') ? 'style="object-fit: contain; padding: 2px;"' : '';
          avatarHtml = `<img src="${sp.avatar}" alt="${sp.name}" class="modal-speaker-avatar" ${fitStyle}>`;
        } else {
          avatarHtml = `<div class="modal-speaker-avatar-placeholder">${sp.initials}</div>`;
        }
        speakersHtml += `
          <div class="modal-speaker-card">
            <div class="modal-speaker-top">
              ${avatarHtml}
              <div class="modal-speaker-info">
                <h4>${sp.name}</h4>
                <p>${sp.role}</p>
                <span class="speaker-tag">${sp.tag}</span>
              </div>
            </div>
            <div class="modal-speaker-bio">
              ${sp.bio}
            </div>
          </div>
        `;
      });

      const colRight = document.getElementById('modalColRight');
      colRight.innerHTML = `
        <div class="modal-right-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <span>Especialistas Confirmados (${data.speakers.length})</span>
        </div>
        <div class="modal-speakers-grid">
          ${speakersHtml}
        </div>
      `;

      const modal = document.getElementById('sessionModalOverlay');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeSessionModal(e) {
      if (e && e.target && !e.target.classList.contains('session-modal-overlay') && !e.target.closest('.modal-close-btn') && !e.target.closest('.btn-secondary')) {
        return;
      }
      const modal = document.getElementById('sessionModalOverlay');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    

    function openSubscriptionFor(poloKey) {
      const url = SYMPLA_URLS[poloKey] || 'https://www.sympla.com.br/';
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    function selectSessionFromModal(poloKey) {
      openSubscriptionFor(poloKey);
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSessionModal();
      }
    });

    // Inicialização: modo 'all' (linha contínua) por padrão e renderização de status dos cards
    document.addEventListener('DOMContentLoaded', () => {
      switchTimelineDay('all');
      updateSessionStatusBadges();
    });
  
