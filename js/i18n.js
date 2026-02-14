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
        feat4_title: "👥 Perfiles Ilimitados",
        feat4_desc: "Gestiona los medicamentos de varias personas con perfiles independientes y personalizados.",
        feat5_title: "🔔 Recordatorios Inteligentes",
        feat5_desc: "Mantente al día con recordatorios que se integran directamente con el calendario nativo de tu teléfono.",
        feat6_title: "📱 Widget Rápido",
        feat6_desc: "Registra tomas en segundos sin siquiera abrir la aplicación.",
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

        // Download Page
        download_subtitle: "Descarga la última versión",
        latest_version_label: "Última Versión",
        direct_download: "Descarga Directa",
        direct_download_desc: "Obtén el archivo APK directamente. Ideal para actualizaciones rápidas.",
        btn_download_apk: "Descargar APK",
        or_divider: "O",
        store_download: "Tienda de Apps",
        store_download_desc: "Obtén actualizaciones automáticas vía Huawei AppGallery.",
        btn_appgallery: "Explorar en AppGallery",
        whats_new: "Novedades",
        changelog_1: "Mejoras de rendimiento",
        changelog_2: "Corrección de errores menores",
        back_home: "← Volver al Inicio",
        btn_get_app: "Descargar App",
        btn_appgallery_short: "AppGallery",

        // Modals
        modal_update_title: "¡Actualización Disponible!",
        modal_update_msg: "Hay una nueva versión de Medicon disponible. Te recomendamos actualizar.",
        modal_latest_title: "Estás al día",
        modal_latest_msg: "Ya tienes instalada la última versión de Medicon.",
        modal_btn_close: "Cerrar",
        modal_btn_download: "Descargar Ahora",
        modal_btn_dismiss: "Descartar",

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

export function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[lang][key];
        if (translation) el.innerHTML = translation;
    });
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.id === `btn-${lang}`));

    // Dispatch event for components that need dynamic re-render
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

export function initLanguage() {
    // Populate EN translations from DOM
    document.querySelectorAll('[data-i18n]').forEach(el => translations.en[el.getAttribute('data-i18n')] = el.innerHTML);

    // Init Language
    const userLang = (navigator.language || 'en').startsWith('es') ? 'es' : 'en';
    setLanguage(userLang);
}

export { translations };
