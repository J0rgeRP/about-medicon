const translations = {
    en: {}, 
    es: {
        // Index
        header_subtitle: "Tu asistente de inventario de medicamentos: bonito, privado y completo.",
        index_section1_title: "Tu Salud, Organizada",
        index_section1_text: "Medicon está diseñado para darte control total sobre tu botiquín y horario de medicación. Gestiona tus medicamentos de forma visual e intuitiva con una experiencia nativa pensada para el rendimiento y la privacidad.",
        features_title: "Características Principales",
        feat1_title: "📦 Inventario Ilimitado",
        feat1_desc: "Registra medicamentos con dosis, color, fechas de compra y caducidad, y si requieren receta.",
        feat2_title: "💊 Registro Detallado",
        feat2_desc: "Registra cada dosis con fecha, hora y motivo para mantener un historial perfecto.",
        feat3_title: "📅 Calendario Interactivo",
        feat3_desc: "Navega por tu historial con bonitas animaciones y opciones avanzadas de filtrado.",
        feat4_title: "🔔 Recordatorios Inteligentes",
        feat4_desc: "Mantente al día con recordatorios que se integran directamente con el calendario nativo de tu teléfono.",
        feat5_title: "📱 Widget Rápido",
        feat5_desc: "Registra tomas en segundos sin siquiera abrir la aplicación.",
        feat6_title: "🎨 Diseño Temático",
        feat6_desc: "Disfruta de una experiencia coherente con modos Día y Noche en suaves tonos pastel.",
        privacy_title: "Privacidad Ante Todo",
        privacy_text: "Medicon respeta tus datos. Es una aplicación <strong>puramente nativa</strong> que requiere <strong>cero permisos</strong>:",
        priv_item1_title: "Sin Internet:",
        priv_item1_desc: "Tus datos nunca salen de tu dispositivo.",
        priv_item2_title: "Base de Datos Local:",
        priv_item2_desc: "Toda la información se almacena segura en una base de datos local.",
        priv_item3_title: "Exportable:",
        priv_item3_desc: "Control total con capacidades de exportación e importación CSV.",
        donate_title: "Apoya el Desarrollo",
        cta_text: "He desarrollado esta aplicación en mi tiempo libre porque creo en la privacidad de los datos de salud. No tiene anuncios, no tiene trackers y es totalmente gratuita. Si te resulta útil y quieres invitarme a un café para que siga manteniéndola, puedes hacerlo aquí:",
        btn_paypal: "Invítame a un café",
        footer_made_by: "Hecho con ❤️ para tu salud.",
        footer_privacy: "Política de Privacidad",
        footer_contact: "Contacto",
        footer_github: "GitHub",

        // Privacy Page
        priv_title: "Política de Privacidad",
        priv_subtitle: "Transparencia y seguridad para tus datos de salud.",
        priv_intro: "Gracias por usar <strong>Medicon</strong>. Estoy comprometido con la protección de tu privacidad. Esta Política de Privacidad explica cómo mi aplicación maneja tu información.",
        priv_section1_title: "Sin Recopilación de Datos",
        priv_section1_text: "Medicon es una aplicación puramente offline. No recopilo, transmito ni almaceno ningún dato personal, información de salud o estadísticas de uso en servidores externos. No utilizo servicios de análisis o seguimiento de terceros.",
        priv_section2_title: "Solo Almacenamiento Local",
        priv_section2_text: "Toda la información que introduces en la aplicación se almacena localmente en tu dispositivo utilizando una base de datos segura Room. Estos datos nunca salen de tu teléfono a menos que elijas explícitamente exportarlos.",
        priv_section3_title: "Cero Permisos Requeridos",
        priv_section3_text: "Para garantizar tu privacidad y seguridad, Medicon no solicita ningún permiso peligroso.",
        perm1: "<strong>Sin Acceso a Internet:</strong> La app no puede conectarse a internet.",
        perm2: "<strong>Sin Rastreo de Ubicación:</strong> No rastreo tu ubicación.",
        perm3: "<strong>Sin Cámara/Micrófono:</strong> No accedo a tus sensores.",
        priv_section4_title: "Control de Datos",
        priv_section4_text: "Tienes control total sobre tus datos. Puedes eliminar toda la información almacenada en cualquier momento borrando los datos de la aplicación en los ajustes de tu dispositivo o desinstalando la aplicación. También puedes exportar tus datos a formato CSV para tus propios registros o copias de seguridad.",
        priv_section5_title: "Contáctame",
        priv_section5_text: "Si tienes alguna pregunta o sugerencia, no dudes en contactarme en:",
        back_home: "← Volver al Inicio"
    }
};

function setLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[lang][key];
        if (translation) el.innerHTML = translation;
    });
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.id === `btn-${lang}`));
}

document.addEventListener('DOMContentLoaded', () => {
    // Populate EN translations from DOM
    document.querySelectorAll('[data-i18n]').forEach(el => translations.en[el.getAttribute('data-i18n')] = el.innerHTML);
    
    // Set Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    
    // Init Language
    const userLang = (navigator.language || 'en').startsWith('es') ? 'es' : 'en';
    setLanguage(userLang);

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
                if(entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => revealObserver.observe(el));
    }
});
