import { compareVersions, getQueryParam } from './utils.js';
import { translations } from './i18n.js';
import { changelogData } from './changelog-data.js';

const LATEST_VERSION = "1.3.0";

function renderChangelog(lang) {
    const container = document.getElementById('changelog-container');
    if (!container) return;

    container.innerHTML = '';

    changelogData.forEach(item => {
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
    if (!window.location.pathname.includes('download.html')) return;

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
    if (versionDisplay) versionDisplay.textContent = LATEST_VERSION;

    if (userVersion && modal) {
        const comparison = compareVersions(LATEST_VERSION, userVersion);
        let showModal = false;

        // Get current lang for messages (simple check)
        const isEs = document.documentElement.lang === 'es' || (navigator.language || 'en').startsWith('es');

        if (comparison > 0) {
            // Update Available
            modalTitle.textContent = isEs ? translations.es.modal_update_title : "Update Available!";
            modalMsg.textContent = isEs ? translations.es.modal_update_msg : "A new version of Medicon is available. We recommend updating.";
            modalIcon.textContent = "🚀";
            showModal = true;
        } else {
            // Up to date
            modalTitle.textContent = isEs ? translations.es.modal_latest_title : "You are up to date";
            modalMsg.textContent = isEs ? translations.es.modal_latest_msg : "You already have the latest version of Medicon.";
            modalIcon.textContent = "✨";
            showModal = true;
        }

        if (showModal) {
            modal.classList.remove('hidden');
        }
    }
}
