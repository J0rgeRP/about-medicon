export function closeModal() {
    const modal = document.getElementById('version-modal');
    if (modal) modal.classList.add('hidden');
}

export function initUI() {
    // Set Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

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
            const isVisibleDeeply = rect.top < (window.innerHeight * 0.7) && rect.bottom > 0;
            floatBtn.classList.toggle('hidden', isVisibleDeeply);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
    } else if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) scrollIndicator.classList.add('hidden');
            else scrollIndicator.classList.remove('hidden');
        }, { passive: true });
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
        }, { threshold: 0.15 });

        revealElements.forEach(el => revealObserver.observe(el));
    }
}
