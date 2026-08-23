export function closeModal() {
  const modal = document.getElementById('version-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

export function injectFooter() {
  const footer = document.querySelector('footer');
  if (!footer) {
    return;
  }

  footer.innerHTML = `
        <div class="footer-grid">
            <div class="footer-brand">
                <a class="footer-brand-top" href="index.html">
                    <img src="ic_launcher.png" alt="Medicon logo">Medicon
                </a>
                <p data-i18n="footer_tagline">Your health, organized — privately.</p>
            </div>
            <div class="footer-col">
                <h4 data-i18n="footer_explore">Explore</h4>
                <a href="index.html#features-card" data-i18n="nav_features">Features</a>
                <a href="index.html#showcase" data-i18n="nav_screenshots">Screenshots</a>
                <a href="index.html#faq" data-i18n="nav_faq">FAQ</a>
                <a href="download.html" data-i18n="btn_get_app">Get App</a>
            </div>
            <div class="footer-col">
                <h4 data-i18n="footer_project">Project</h4>
                <a href="privacy.html" data-i18n="footer_privacy">Privacy Policy</a>
                <a href="mailto:j0rgerp.developer@gmail.com" data-i18n="footer_contact">Contact</a>
                <a href="https://github.com/J0rgeRP" target="_blank" rel="noopener noreferrer"
                   data-i18n="footer_github">GitHub</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>© <span id="year"></span> Medicon. <span data-i18n="footer_made_by">Made with ❤️ for your health.</span>
            </p>
        </div>
    `;
}

function initNav() {
  const siteNav = document.getElementById('site-nav');
  if (!siteNav) {
    return;
  }

  const onScroll = () => {
    siteNav.classList.toggle('scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, {passive: true});
  onScroll();

  const toggle = document.getElementById('nav-toggle');
  if (!toggle) {
    return;
  }

  toggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  siteNav.querySelectorAll('.nav-mobile a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    });
  });
}

export function initUI() {
  // Set Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  initNav();

  // Landing Page Logic (Scroll Indicator, FAB, Reveal)
  const scrollIndicator = document.getElementById('scroll-indicator');
  const floatBtn = document.getElementById('floating-donate');
  const donateSection = document.getElementById('donate-section');

  if (scrollIndicator && floatBtn && donateSection) {
    const handleScroll = () => {
      // 1. Arrow indicator
      if (window.scrollY > 50) {
        scrollIndicator.classList.add('hidden');
      } else {
        scrollIndicator.classList.remove('hidden');
      }

      // 2. FAB visibility
      const rect = donateSection.getBoundingClientRect();
      const isVisibleDeeply = rect.top < (window.innerHeight * 0.7)
          && rect.bottom > 0;
      floatBtn.classList.toggle('hidden', isVisibleDeeply);
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    handleScroll(); // Initial check
  } else if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        scrollIndicator.classList.add('hidden');
      } else {
        scrollIndicator.classList.remove('hidden');
      }
    }, {passive: true});
  }

  // Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {threshold: 0.15});

    revealElements.forEach(el => revealObserver.observe(el));
  }
}
