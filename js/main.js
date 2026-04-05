import {initLanguage, setLanguage} from './i18n.js';
import {closeModal, initUI, injectFooter} from './ui.js';
import {initDownloadPage} from './download.js';

// Global exports for HTML inline usage (e.g. onclick="setLanguage(...)")
window.setLanguage = setLanguage;
window.closeModal = closeModal;

document.addEventListener('DOMContentLoaded', () => {
  injectFooter();
  initLanguage();
  initUI();
  initDownloadPage();
});
