// Morocco Tourism - Vanilla JS Header, Footer, and Cookie consent engine (English / Français)
import { translations } from './translations.js';

// Retrieve active language preference safely from storage, defaulting to English
export function getNavLanguage() {
  return localStorage.getItem('preferred_language') || 'en';
}

// Persist language settings across page views and alert dynamic listeners
export function saveNavLanguage(lang) {
  localStorage.setItem('preferred_language', lang);
  // Dispatch dynamic event to switch vocabulary without a reload
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

export function updateHeaderNavControls() {
  const navContainer = document.getElementById('header-nav-controls');
  if (!navContainer) return;

  const currentLang = getNavLanguage();
  const t = (key) => {
    return translations[currentLang]?.[key] || translations['en']?.[key] || key;
  };

  document.documentElement.dir = 'ltr';
  document.documentElement.lang = currentLang;

  // Track if mobile overlays were active to preserve across dynamic re-draw
  const overlayWasOpen = document.getElementById('mobile-nav-overlay')?.classList.contains('open');

  // Render a beautifully crafted, pixel-perfect language toggle pill
  const desktopLangToggleHtml = `
    <div class="lang-toggle-wrapper" style="display: flex; align-items: center; gap: 4px; border: 2px solid var(--color-border); border-radius: var(--border-radius-md); padding: 2px; background: white; height: 38px; box-sizing: border-box; margin-right: 8px;">
      <button id="lang-btn-en" class="lang-btn ${currentLang === 'en' ? 'active' : ''}" style="border: none; background: ${currentLang === 'en' ? 'var(--color-terracotta)' : 'transparent'}; color: ${currentLang === 'en' ? 'white' : 'var(--color-charcoal-light)'}; padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 4px; cursor: pointer; text-transform: uppercase; transition: var(--transition-smooth); height: 100%; display: flex; align-items: center; justify-content: center;">EN</button>
      <button id="lang-btn-fr" class="lang-btn ${currentLang === 'fr' ? 'active' : ''}" style="border: none; background: ${currentLang === 'fr' ? 'var(--color-terracotta)' : 'transparent'}; color: ${currentLang === 'fr' ? 'white' : 'var(--color-charcoal-light)'}; padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 4px; cursor: pointer; text-transform: uppercase; transition: var(--transition-smooth); height: 100%; display: flex; align-items: center; justify-content: center;">FR</button>
    </div>
  `;

  const mobileLangToggleHtml = `
    <div class="lang-toggle-wrapper-mobile" style="display: flex; align-items: center; gap: 4px; border: 2px solid var(--color-border); border-radius: var(--border-radius-md); padding: 2px; background: white; height: 38px; box-sizing: border-box;">
      <button id="lang-btn-en-mob" class="lang-btn ${currentLang === 'en' ? 'active' : ''}" style="border: none; background: ${currentLang === 'en' ? 'var(--color-terracotta)' : 'transparent'}; color: ${currentLang === 'en' ? 'white' : 'var(--color-charcoal-light)'}; padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 4px; cursor: pointer; text-transform: uppercase; transition: var(--transition-smooth); height: 100%; display: flex; align-items: center; justify-content: center;">EN</button>
      <button id="lang-btn-fr-mob" class="lang-btn ${currentLang === 'fr' ? 'active' : ''}" style="border: none; background: ${currentLang === 'fr' ? 'var(--color-terracotta)' : 'transparent'}; color: ${currentLang === 'fr' ? 'white' : 'var(--color-charcoal-light)'}; padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 4px; cursor: pointer; text-transform: uppercase; transition: var(--transition-smooth); height: 100%; display: flex; align-items: center; justify-content: center;">FR</button>
    </div>
  `;

  // Draw Desktop Nav structure
  let desktopHtml = `
    <div class="desktop-nav" style="align-items: center; gap: 8px;">
      <a href="/index.html" class="nav-link-desktop" style="font-size: 14px; text-decoration: none; font-weight: 600; color: var(--color-charcoal); transition: var(--transition-smooth); padding: 8px 10px;">
        <span>${t('home')}</span>
      </a>
      <a href="/cities.html" class="nav-link-desktop" style="font-size: 14px; text-decoration: none; font-weight: 600; color: var(--color-charcoal); transition: var(--transition-smooth); padding: 8px 10px;">
        <span>${t('browse_cities')}</span>
      </a>
      <a href="/culture.html" class="nav-link-desktop" style="font-size: 14px; text-decoration: none; font-weight: 600; color: var(--color-charcoal); transition: var(--transition-smooth); padding: 8px 10px;">
        <span>${t('culture')}</span>
      </a>
      <a href="/blog.html" class="nav-link-desktop" style="font-size: 14px; text-decoration: none; font-weight: 600; color: var(--color-charcoal); transition: var(--transition-smooth); padding: 8px 10px;">
        <span>${t('blog')}</span>
      </a>
      <a href="/trip-planner.html" class="nav-link-desktop highlighted-trip-planner" style="font-size: 13px; text-decoration: none; font-weight: 700; color: var(--color-terracotta); background-color: rgba(211, 94, 53, 0.08); border: 1.5px solid var(--color-gold); border-radius: var(--border-radius-md); display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; height: 38px; box-sizing: border-box; transition: var(--transition-smooth);">
        <i data-lucide="sparkles" style="width: 14px; height: 14px; color: var(--color-gold-dark);"></i>
        <span>${t('trip_planner')}</span>
      </a>
      <a href="/about.html" class="nav-link-desktop" style="font-size: 14px; text-decoration: none; font-weight: 600; color: var(--color-charcoal); transition: var(--transition-smooth); padding: 8px 10px;">
        <span>${t('about_nav')}</span>
      </a>
      <a href="/contact.html" class="nav-link-desktop" style="font-size: 14px; text-decoration: none; font-weight: 600; color: var(--color-charcoal); transition: var(--transition-smooth); padding: 8px 10px; margin-right: 8px;">
        <span>${t('contact_nav')}</span>
      </a>
      ${desktopLangToggleHtml}
    </div>
  `;

  // Draw Mobile Nav trigger (on mobile closed state, show ONLY the hamburger menu icon)
  let mobileHtml = `
    <div class="mobile-nav-bar" style="align-items: center;">
      <button id="nav-hamburger-trigger" class="hamburger-btn" aria-label="Open global menu">
        <i data-lucide="menu" style="width: 20px; height: 20px;"></i>
      </button>
    </div>
  `;

  // Draw overlay structure (hidden by default under CSS)
  let overlayHtml = `
    <div id="mobile-nav-overlay" class="mobile-nav-overlay">
      <div class="mobile-nav-overlay-header">
        <a href="/index.html" class="mobile-nav-overlay-logo">
          GoMoroccoAI
        </a>
        <button id="mobile-nav-close" class="close-overlay-btn" aria-label="Close global menu">
          <i data-lucide="x" style="width: 24px; height: 24px;"></i>
        </button>
      </div>
      <nav class="mobile-nav-links">
        <a href="/index.html" class="mobile-nav-link">
          <i data-lucide="home" style="width: 20px; height: 20px; color: var(--color-terracotta);"></i>
          <span>${t('home')}</span>
        </a>
        <a href="/cities.html" class="mobile-nav-link">
          <i data-lucide="compass" style="width: 20px; height: 20px; color: var(--color-chefchaouen);"></i>
          <span>${t('browse_cities')}</span>
        </a>
        <a href="/culture.html" class="mobile-nav-link">
          <i data-lucide="scroll" style="width: 20px; height: 20px; color: var(--color-gold);"></i>
          <span>${t('culture')}</span>
        </a>
        <a href="/blog.html" class="mobile-nav-link">
          <i data-lucide="book-open" style="width: 20px; height: 20px; color: var(--color-chefchaouen);"></i>
          <span>${t('blog')}</span>
        </a>
        <a href="/trip-planner.html" class="mobile-nav-link" style="border: 1.5px solid var(--color-gold); background: rgba(194, 154, 56, 0.1);">
          <i data-lucide="sparkles" style="width: 20px; height: 20px; color: var(--color-gold-dark);"></i>
          <span style="font-weight: 700; color: var(--color-gold);">${t('trip_planner')}</span>
        </a>
        <a href="/about.html" class="mobile-nav-link">
          <i data-lucide="info" style="width: 20px; height: 20px; color: var(--color-terracotta);"></i>
          <span>${t('about_nav')}</span>
        </a>
        <a href="/contact.html" class="mobile-nav-link">
          <i data-lucide="mail" style="width: 20px; height: 20px; color: var(--color-chefchaouen);"></i>
          <span>${t('contact_nav')}</span>
        </a>
        <div style="margin-top: 16px; display: flex; justify-content: center; width: 100%;">
          ${mobileLangToggleHtml}
        </div>
      </nav>
    </div>
  `;

  navContainer.innerHTML = desktopHtml + mobileHtml + overlayHtml;

  // Preserve the mobile menu's opened state if it was toggled
  if (overlayWasOpen) {
    const freshOverlay = document.getElementById('mobile-nav-overlay');
    if (freshOverlay) {
      freshOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  // Add click events to language toggle buttons
  const wireToggles = (enBtnId, frBtnId) => {
    const enBtn = document.getElementById(enBtnId);
    const frBtn = document.getElementById(frBtnId);

    if (enBtn) {
      enBtn.addEventListener('click', (e) => {
        e.preventDefault();
        saveNavLanguage('en');
      });
    }

    if (frBtn) {
      frBtn.addEventListener('click', (e) => {
        e.preventDefault();
        saveNavLanguage('fr');
      });
    }
  };

  wireToggles('lang-btn-en', 'lang-btn-fr');
  wireToggles('lang-btn-en-mob', 'lang-btn-fr-mob');

  // Listeners for Hamburger trigger menu toggle
  const hamburgerTrigger = document.getElementById('nav-hamburger-trigger');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const overlayClose = document.getElementById('mobile-nav-close');

  if (hamburgerTrigger && mobileOverlay) {
    hamburgerTrigger.addEventListener('click', () => {
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden'; 
    });
  }

  if (overlayClose && mobileOverlay) {
    overlayClose.addEventListener('click', () => {
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = ''; 
    });
  }

  // Refresh lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Localized Cookie Consent Banner injection
export function mountCookieConsentBanner() {
  if (localStorage.getItem('cookie_consent_accepted')) {
    return; // Already accepted
  }

  let banner = document.getElementById('morocco-cookie-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'morocco-cookie-banner';
    document.body.appendChild(banner);
  }

  const currentLang = getNavLanguage();
  const text = translations[currentLang]?.cookie_text || translations['en'].cookie_text;
  const acceptLabel = translations[currentLang]?.cookie_accept || translations['en'].cookie_accept;
  const policyLabel = translations[currentLang]?.cookie_policy || translations['en'].cookie_policy;

  banner.innerHTML = `
    <p class="cookie-text">${text}</p>
    <div class="cookie-actions">
      <a href="/privacy.html" class="btn-cookie-privacy">${policyLabel}</a>
      <button id="cookie-accept-btn" class="btn-cookie-accept">${acceptLabel}</button>
    </div>
  `;

  const acceptBtn = document.getElementById('cookie-accept-btn');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookie_consent_accepted', 'true');
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(20px)';
      setTimeout(() => banner.remove(), 400);
    });
  }
}

// Dynamically populate footer links globally
export function updateGlobalFooterLinks() {
  const footer = document.querySelector('footer');
  if (!footer) return;

  const currentLang = getNavLanguage();
  
  const footerVocabulary = {
    en: {
      brand_title: "GoMoroccoAI",
      tagline: "Discover the magic of historic imperial cities, sandy desert vistas, and rich living cultural legacy of the Moroccan Kingdom.",
      explore_title: "Explore Destinations",
      legal_title: "Legal Directory",
      powered_by: "Powered by local knowledge",
      copyright_msg: "© 2025 GoMoroccoAI. All rights reserved.",
      home: "Home Portal",
      browse_cities: "Browse Cities",
      culture: "Moroccan Culture",
      plan_your_trip: "AI Custom Planner",
      blog: "Blog",
      about: "About Us",
      contact: "Contact Directory",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    fr: {
      brand_title: "GoMoroccoAI",
      tagline: "Découvrez la magie des cités impériales, des sables fins du Sahara et de l'héritage d'hospitalité du Royaume marocain.",
      explore_title: "Découvertes",
      legal_title: "Informations Légales",
      powered_by: "Inspiré par le savoir local",
      copyright_msg: "© 2025 GoMoroccoAI. Tous droits réservés.",
      home: "Portail d'Accueil",
      browse_cities: "Découvrir les Villes",
      culture: "Culture Marocaine",
      plan_your_trip: "Planificateur de Voyage",
      blog: "Blog",
      about: "À Propos de Nous",
      contact: "Contactez-nous",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation"
    }
  };

  const strings = footerVocabulary[currentLang] || footerVocabulary['en'];

  // Update outer footer styling and replace inner HTML
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-grid">
      <!-- Column 1: Brand & Socials -->
      <div class="footer-col" style="display: flex; flex-direction: column; gap: 16px;">
        <a href="/index.html" class="footer-brand-title" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">
          <svg style="width: 26px; height: 26px; fill: var(--color-gold);" viewBox="0 0 24 24">
            <path d="M12,2L14.7,8.6L21.8,7.9L16.8,13L18.6,20L12,16L5.4,20L7.2,13L2.2,7.9L9.3,8.6L12,2Z" />
          </svg>
          <span style="font-family: var(--font-sans), sans-serif; font-weight: 800; letter-spacing: 0.5px;">${strings.brand_title}</span>
        </a>
        <p class="footer-tagline" style="margin: 0; line-height: 1.6; font-size: 14px; color: #C2B6B0; max-width: 360px;">
          ${strings.tagline}
        </p>
        <div class="footer-social-links" style="display: flex; gap: 10px; margin-top: 8px;">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="footer-social-icon" aria-label="Facebook">
            <i data-lucide="facebook" style="width: 16px; height: 16px;"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="footer-social-icon" aria-label="Instagram">
            <i data-lucide="instagram" style="width: 16px; height: 16px;"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="footer-social-icon" aria-label="YouTube">
            <i data-lucide="youtube" style="width: 16px; height: 16px;"></i>
          </a>
        </div>
      </div>

      <!-- Column 2: Explore links -->
      <div class="footer-col">
        <h3>${strings.explore_title}</h3>
        <ul class="footer-nav-links">
          <li>
            <a href="/index.html">
              <i data-lucide="home" style="width: 14px; height: 14px; color: var(--color-terracotta);"></i>
              <span>${strings.home}</span>
            </a>
          </li>
          <li>
            <a href="/cities.html">
              <i data-lucide="compass" style="width: 14px; height: 14px; color: var(--color-chefchaouen);"></i>
              <span>${strings.browse_cities}</span>
            </a>
          </li>
          <li>
            <a href="/culture.html">
              <i data-lucide="scroll" style="width: 14px; height: 14px; color: var(--color-gold);"></i>
              <span>${strings.culture}</span>
            </a>
          </li>
          <li>
            <a href="/trip-planner.html">
              <i data-lucide="sparkles" style="width: 14px; height: 14px; color: var(--color-gold);"></i>
              <span style="font-weight: 700; color: var(--color-gold-hover);">${strings.plan_your_trip}</span>
            </a>
          </li>
          <li>
            <a href="/blog.html">
              <i data-lucide="book-open" style="width: 14px; height: 14px; color: var(--color-chefchaouen);"></i>
              <span>${strings.blog}</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Column 3: Legal stuff -->
      <div class="footer-col">
        <h3>${strings.legal_title}</h3>
        <ul class="footer-nav-links">
          <li>
            <a href="/about.html">
              <i data-lucide="info" style="width: 14px; height: 14px; color: var(--color-terracotta);"></i>
              <span>${strings.about}</span>
            </a>
          </li>
          <li>
            <a href="/contact.html">
              <i data-lucide="mail" style="width: 14px; height: 14px; color: var(--color-chefchaouen);"></i>
              <span>${strings.contact}</span>
            </a>
          </li>
          <li>
            <a href="/privacy.html">
              <i data-lucide="shield-check" style="width: 14px; height: 14px; color: var(--color-gold);"></i>
              <span>${strings.privacy}</span>
            </a>
          </li>
          <li>
            <a href="/terms.html">
              <i data-lucide="file-text" style="width: 14px; height: 14px; color: var(--color-terracotta);"></i>
              <span>${strings.terms}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom copyrights bar -->
    <div class="footer-bottom-bar">
      <div class="footer-bottom-container">
        <span style="color: #9C8E88; font-size: 13px;">${strings.copyright_msg}</span>
        <span style="display: inline-flex; align-items: center; gap: 6px; font-style: italic; color: #9C8E88; font-size: 13px;">
          <i data-lucide="award" style="width: 14px; height: 14px; color: var(--color-gold);"></i>
          ${strings.powered_by}
        </span>
      </div>
    </div>
  `;

  // Dynamic Lucide parsing of newly added elements
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Register global update event listener so toggle reacts in real time across the script
window.addEventListener('languageChanged', () => {
  updateHeaderNavControls();
  updateGlobalFooterLinks();
  mountCookieConsentBanner();
});

// Automatically update controls when the DOM is ready or when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    updateHeaderNavControls();
    mountCookieConsentBanner();
    updateGlobalFooterLinks();
    initStickyHeader();
    initViewportReveal();
  });
} else {
  updateHeaderNavControls();
  mountCookieConsentBanner();
  updateGlobalFooterLinks();
  initStickyHeader();
  initViewportReveal();
}

// --- PREMIUM SCROLL INTERACTIONS AND REVEAL TRIGGERS ---

// Sticky Header that Hides on Scroll Down, Shows on Scroll Up
function initStickyHeader() {
  let lastScrollY = window.scrollY;
  const header = document.getElementById('app-header');
  
  if (header) {
    header.classList.add('header-show');
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling Down - hide header
        header.classList.add('header-hidden');
        header.classList.remove('header-show');
      } else {
        // Scrolling Up - show header
        header.classList.remove('header-hidden');
        header.classList.add('header-show');
      }
      
      // Top of Page Reset
      if (currentScrollY <= 15) {
        header.classList.remove('header-hidden');
        header.classList.remove('header-show');
      }
      
      lastScrollY = currentScrollY;
    }, { passive: true });
  }
}

// Fade-In Viewport Reveal Animations
export function initViewportReveal() {
  const observerOptions = {
    root: null,
    threshold: 0.05,
    rootMargin: "0px 0px -40px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Auto-detect and observe section blocks & interactive divs
  const selectors = 'section, .adventure-grid, .culture-row, .card, .transit-item, .attraction-card, .dir-card, .city-card';
  document.querySelectorAll(selectors).forEach(el => {
    if (!el.classList.contains('reveal-section')) {
      el.classList.add('reveal-section');
      revealObserver.observe(el);
    }
  });
}

// Apply reveal animations on page changes or dynamic content refreshes
window.addEventListener('scrollRevealTrigger', () => {
  initViewportReveal();
});

window.addEventListener('languageChanged', () => {
  setTimeout(initViewportReveal, 100);
});

