import {compareVersions, getQueryParam} from './utils.js';
import {translations} from './i18n.js';
import {changelogData} from './changelog-data.js';
import {closeModal} from './ui.js';

const LATEST_VERSION = changelogData[changelogData.length - 1].version;

function renderChangelog(lang) {
  const container = document.getElementById('changelog-container');
  if (!container) {
    return;
  }

  container.innerHTML = '';

  [...changelogData].reverse().forEach(item => {
    const changes = item.changes[lang] || item.changes['en']; // Fallback to EN

    const versionBlock = document.createElement('div');
    versionBlock.className = 'version-block';

    const versionHeader = document.createElement('div');
    versionHeader.className = 'version-header';
    versionHeader.innerHTML = `
            <span class="version-number">v${item.version}</span>
            <span class="version-date">${item.date}</span>
        `;

    const changeList = document.createElement('ul');
    changeList.className = 'change-list';

    changes.forEach(change => {
      const li = document.createElement('li');
      li.textContent = change;
      changeList.appendChild(li);
    });

    versionBlock.appendChild(versionHeader);
    versionBlock.appendChild(changeList);
    container.appendChild(versionBlock);
  });
}

export function initDownloadPage() {
  if (!window.location.pathname.includes('download.html')) {
    return;
  }

  // Listen for language changes
  window.addEventListener('languageChanged', (e) => {
    // e.detail is { lang: ... }
    renderChangelog(e.detail.lang);
  });

  // Render initially
  const currentLang = document.documentElement.lang || 'en';
  renderChangelog(currentLang);

  const userVersion = getQueryParam('version');
  const modal = document.getElementById('version-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalMsg = document.getElementById('modal-message');
  const modalIcon = document.getElementById('modal-icon');

  // Update displayed version
  const versionDisplay = document.getElementById('web-version-display');
  if (versionDisplay) {
    versionDisplay.textContent = LATEST_VERSION;
  }

  // Update APK link
  const downloadApkBtn = document.getElementById('download-apk-btn');
  const apkFilename = `medicon-v${LATEST_VERSION}.apk`;
  if (downloadApkBtn) {
    downloadApkBtn.href = apkFilename;
  }

  if (userVersion && modal) {
    const modalActionBtn = document.getElementById('modal-action-btn');
    const modalCancelBtn = document.getElementById('modal-cancel-btn');

    const comparison = compareVersions(LATEST_VERSION, userVersion);
    let showModal = false;

    // Get current lang for messages (simple check)
    const isEs = document.documentElement.lang === 'es' || (navigator.language
        || 'en').startsWith('es');

    if (comparison > 0) {
      // Update Available
      modalTitle.textContent = isEs ? translations.es.modal_update_title
          : "Update Available!";
      modalMsg.textContent = isEs ? translations.es.modal_update_msg
          : "A new version of Medicon is available. We recommend updating.";
      modalIcon.textContent = "🚀";

      // Setup Download Action
      if (modalActionBtn) {
        modalActionBtn.setAttribute('data-i18n', 'modal_btn_download');
        modalActionBtn.textContent = isEs ? translations.es.modal_btn_download
            : "Download Now";
        modalActionBtn.onclick = () => {
          window.location.href = apkFilename;
          closeModal();
        };
      }
      if (modalCancelBtn) {
        modalCancelBtn.classList.remove('hidden');
        modalCancelBtn.setAttribute('data-i18n', 'modal_btn_dismiss');
        modalCancelBtn.textContent = isEs ? translations.es.modal_btn_dismiss
            : "Dismiss";
      }

      showModal = true;
    } else {
      // Up to date
      modalTitle.textContent = isEs ? translations.es.modal_latest_title
          : "You are up to date";
      modalMsg.textContent = isEs ? translations.es.modal_latest_msg
          : "You already have the latest version of Medicon.";
      modalIcon.textContent = "✨";

      if (modalActionBtn) {
        modalActionBtn.setAttribute('data-i18n', 'modal_btn_close');
        modalActionBtn.textContent = isEs ? translations.es.modal_btn_close
            : "OK";
        modalActionBtn.onclick = () => {
          closeModal();
        };
      }
      if (modalCancelBtn) {
        modalCancelBtn.classList.add('hidden');
      }

      showModal = true;
    }

    if (showModal) {
      modal.classList.remove('hidden');
    }
  }
}
