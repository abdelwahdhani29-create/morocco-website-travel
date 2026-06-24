// Morocco Tourism - Vanilla JS All Cities Directory Engine (Bilingual English / Français)
import { getNavLanguage } from './auth-nav.js';

const translations = {
  en: {
    back_home: "Back to Home",
    dir_title: "Explore All Cities",
    dir_desc: "Browse our curated catalog of spectacular imperial cities, azure mountaintops, windswept beach harbors, and ancient medinas. Choose your destination to start planning.",
    search_placeholder: "Search cities by name, region, or sights...",
    showing_lbl: "Showing",
    destinations_lbl: "destinations",
    loading_lbl: "Loading destination catalogs...",
    suggested_stay: "Suggested Stay",
    days: "Days",
    view_details: "Explore Destination ↗",
    credits: "GoMoroccoAI Explorer • Curated Directory Index crafted in Pure Vanilla JS.",
    no_results: "No destinations match your search parameters. Try another term!",
    culture_nav: "Moroccan Culture",
    planner_nav: "AI Planner",
    regions: {
      "Marrakech-Safi": "Marrakech-Safi Region",
      "Tanger-Tetouan-Al Hoceima": "Tangier-Tetouan-Al Hoceima",
      "Fes-Meknes": "Fes-Meknes Region",
      "Casablanca-Settat": "Casablanca-Settat Region",
      "Rabat-Sale-Kenitra": "Rabat-Sale-Kenitra Region",
      "Souss-Massa": "Souss-Massa Region",
      "Draa-Tafilalet": "Draa-Tafilalet Region",
      "Dakhla-Oued Ed-Dahab": "Dakhla-Oued Ed-Dahab Region"
    }
  },
  fr: {
    back_home: "Retour à l'Accueil",
    dir_title: "Découvrir toutes les Villes",
    dir_desc: "Explorez notre répertoire de cités impériales majestueuses, de sommets azurés, de ports côtiers balayés par le vent et de médinas millénaires pour préparer votre voyage.",
    search_placeholder: "Rechercher par nom de ville, région, sites...",
    showing_lbl: "Affichage de",
    destinations_lbl: "destinations",
    loading_lbl: "Chargement des destinations...",
    suggested_stay: "Séjour Conseillé",
    days: "jours",
    view_details: "Explorer la destination ↗",
    credits: "GoMoroccoAI Explorer • Index complet réalisé en JavaScript pur.",
    no_results: "Aucun résultat ne correspond à votre recherche. Essayez un autre mot !",
    culture_nav: "Culture Marocaine",
    planner_nav: "Planificateur IA",
    regions: {
      "Marrakech-Safi": "Région de Marrakech-Safi",
      "Tanger-Tetouan-Al Hoceima": "Tanger-Tétouan-Al Hoceïma",
      "Fes-Meknes": "Fès-Meknès",
      "Casablanca-Settat": "Région de Casablanca-Settat",
      "Rabat-Sale-Kenitra": "Rabat-Salé-Kénitra",
      "Souss-Massa": "Souss-Massa",
      "Draa-Tafilalet": "Drâa-Tafilalet",
      "Dakhla-Oued Ed-Dahab": "Dakhla-Oued Ed-Dahab"
    }
  }
};

// Beautiful bilingual descriptions for all 16 catalog cities
const cityDescriptions = {
  marrakech: {
    en: "The legendary 'Red City', renowned for its ancient clay walls, vibrant squares, majestic palaces, and the lively souks filled with centuries-old Moroccan crafts.",
    fr: "La légendaire 'Ville Rouge', célèbre pour ses anciens remparts de pisé, ses places animées, ses palais majestueux et ses souks débordant d'artisanat marocain séculaire."
  },
  chefchaouen: {
    en: "Morocco's mystical 'Blue Pearl', tucked into the majestic Rif Mountains, boasting pristine indigo pathways and serene, mountain-fresh streams.",
    fr: "La mystique 'Perle Bleue' du Maroc, nichée dans les hauteurs du Rif, renommée pour ses ruelles indigo étincelantes et ses sources d'eau de montagne fraîches."
  },
  fez: {
    en: "The historic spiritual and intellectual soul of the Kingdom, containing the oldest continuously operating university in the world and 9,000 winding medieval lanes.",
    fr: "Le cœur historique, spirituel et intellectuel du Royaume, abritant la plus ancienne université en activité au monde et plus de 9 000 ruelles médiévales."
  },
  essaouira: {
    en: "A beautiful, windswept Atlantic coastal harbor fortress, filled with historical bronze cannons, pristine sandy beaches, and traditional Gnaoua music vibes.",
    fr: "Une superbe forteresse portuaire sur l'Atlantique, dotée de canons de bronze historiques, de plages de sable fin et bercée par la musique spirituelle Gnaoua."
  },
  casablanca: {
    en: "Morocco's vibrant seaside metropolis, blending towering modern wonders like the Hassan II Mosque with charming art-deco French quarters.",
    fr: "La vibrante métropole côtière du Maroc, mariant de modernes chefs-d'œuvre comme la mosquée Hassan II avec de charmants quartiers de style Art déco."
  },
  tangier: {
    en: "The iconic 'Gateway to Africa', sitting between the sea and ocean, inspiring generations of international writers and artists with its bohemian spirit.",
    fr: "L'emblématique 'Porte de l'Afrique', entre mer et océan, inspirant des générations d'écrivains et d'artistes internationaux par son esprit bohème."
  },
  rabat: {
    en: "The stately capital city of Morocco, showcasing wide tree-lined boulevards, immaculate modern gardens, and the ancient seaside Kasbah of the Udayas.",
    fr: "La majestueuse capitale du Maroc, arborant de larges boulevards ombragés, des parcs modernes impeccables et l'antique Kasbah des Oudayas face au large."
  },
  agadir: {
    en: "A premier sun-kissed seaside resort looking over a spectacular 10-kilometer golden crescent beach, famous for water sports and rich Amazigh crafts.",
    fr: "Une importante station balnéaire du sud bordée par un superbe croissant de sable doré de 10 kilomètres, appréciée pour ses vagues et son artisanat amazigh."
  },
  ouarzazate: {
    en: "Morocco's sun-baked 'desert Hollywood', framed by dramatic Atlas peaks and majestic red clay fortresses like UNESCO-listed Ait Benhaddou.",
    fr: "Le fameux 'Hollywood du désert' marocain, encadré par les hauts sommets de l'Atlas et d'imposantes forteresses d'argile rouge classées à l'UNESCO comme Aït-ben-Haddou."
  },
  merzouga: {
    en: "An unforgettable desert jewel situated beneath the wind-sculpted golden Erg Chebbi dunes, offering starry Saharan campfires and caravan treks.",
    fr: "Un joyau inoubliable du désert au pied des immenses dunes de l'Erg Chebbi, proposant des nuitées étoilées en bivouac et d'authentiques balades à dromadaire."
  },
  meknes: {
    en: "An Imperial city surrounded by massive protective clay bastions, containing exquisite gates, historic granaries, and nearby ancient Roman Volubilis.",
    fr: "Une cité impériale ceinte de remparts protecteurs monumentaux, abritant de splendides portes ornées, des greniers à blé géants et le site antique romain de Volubilis."
  },
  tetouan: {
    en: "The elegant 'White Dove' of northern hills, showcasing beautiful Spanish-Andalusian architectural lanes and UNESCO traditional artisan guilds.",
    fr: "L'élégante 'Colombe Blanche' des collines du nord, ornée de remarquables édifices hispano-mauresques et d'ateliers d'artisans classés à l'UNESCO."
  },
  alhoceima: {
    en: "A spectacular Mediterranean haven tucked into the Rif cliffs, praised for sapphire beaches like Quemado and mountain coastal reserves.",
    fr: "Un havre méditerranéen spectaculaire blotti dans les falaises du Rif, réputé pour ses plages saphir comme Quemado et ses criques vierges."
  },
  ifrane: {
    en: "A unique alpine mountain resort known as 'Little Switzerland', boasting sloped red roofs, snowy winter pine woods, and pure cedar forests.",
    fr: "Une station alpine de montagne unique surnommée la 'Petite Suisse', célèbre pour ses toitures de tuiles rouges, ses sapins enneigés et ses forêts de cèdres."
  },
  dakhla: {
    en: "A world-class lagoon paradise where golden desert ridges meet the windy turquoise Atlantic, creating an ultimate sports spot.",
    fr: "Un lagon paradisiaque d'envergure mondiale où les dunes dorées du désert rencontrent l'Atlantique, formant le temple ultime du kitesurf."
  },
  eljadida: {
    en: "A charming historic ocean harbor containing the UNESCO-listed Portuguese stone cistern, old watchtowers, and Atlantic fortress ramparts.",
    fr: "Un port atlantique historique abritant la magnifique citerne de pierre portugaise classée à l'UNESCO, ses fortifications côtières et ses bastions marins."
  }
};

let currentLang = getNavLanguage();
let allCities = [];
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  initCitiesDirectory();
});

async function initCitiesDirectory() {
  try {
    const response = await fetch('/data/cities.json');
    if (!response.ok) {
      throw new Error(`Failed to read cities.json file data: ${response.statusText}`);
    }
    allCities = await response.json();
    
    // Wire Search Input & Clear actions
    setupSearchListeners();
    // Render the layout
    renderAll();
    
    // Listen to real-time navbar language toggling event
    window.addEventListener('languageChanged', (e) => {
      currentLang = e.detail.lang;
      renderAll();
    });

  } catch (err) {
    console.error("Error setting up cities directory dashboard:", err);
    const grid = document.getElementById('cities-directory-grid');
    if (grid) {
      grid.innerHTML = `
        <div style="text-align: center; grid-column: 1 / -1; padding: 60px;">
          <p style="color: var(--color-terracotta-dark); font-weight: bold; font-family: var(--font-serif); font-size: 20px;">Could not load Directory data</p>
          <p style="color: var(--color-charcoal-light)">Please check if cities database contains valid layout parameters.</p>
        </div>
      `;
    }
  }
}

function t(key) {
  return translations[currentLang]?.[key] || translations['en']?.[key] || key;
}

// Global text utility
function setElText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderAll() {
  // Update direction and lang attributes
  document.documentElement.setAttribute('lang', currentLang);
  document.documentElement.setAttribute('dir', 'ltr');

  // Translate static UI elements
  setElText('lbl-back-home', t('back_home'));
  
  const lblNavCulture = document.getElementById('lbl-nav-culture');
  if (lblNavCulture) {
    lblNavCulture.textContent = t('culture_nav');
  }

  const lblNavPlanner = document.getElementById('lbl-nav-planner');
  if (lblNavPlanner) {
    lblNavPlanner.textContent = t('planner_nav');
  }

  const lblDirTitle = document.getElementById('lbl-dir-title');
  if (lblDirTitle) {
    lblDirTitle.innerHTML = `<span>${t('dir_title')}</span>`;
  }
  
  setElText('lbl-dir-desc', t('dir_desc'));
  
  const dirSearchInput = document.getElementById('dir-search-input');
  if (dirSearchInput) {
    dirSearchInput.placeholder = t('search_placeholder');
  }
  
  setElText('lbl-foot-credit-dir', t('credits'));

  // Filter cities based on search
  const filtered = allCities.filter(city => {
    if (!searchQuery) return true;
    
    const term = searchQuery.toLowerCase();
    
    // Check English attributes
    const matchesEnName = city.name.toLowerCase().includes(term);
    const matchesRegion = city.region.toLowerCase().includes(term);
    
    // Also check French translated fields if active
    let matchesFrName = false;
    let matchesFrDesc = false;

    if (currentLang === 'fr' && cityDescriptions[city.id]) {
      matchesFrName = city.name.toLowerCase().includes(term);
      matchesFrDesc = cityDescriptions[city.id].fr.toLowerCase().includes(term);
    }
    
    const matchesAttraction = city.attractions.some(attr => 
      attr.name.toLowerCase().includes(term) || attr.description.toLowerCase().includes(term)
    );

    return matchesEnName || matchesRegion || matchesAttraction || matchesFrName || matchesFrDesc;
  });

  // Render Stats Counter
  const statsBadge = document.getElementById('lbl-count-badge');
  if (statsBadge) {
    const unitText = filtered.length === 1 ? (currentLang === 'fr' ? 'destination' : 'destination') : t('destinations_lbl');
    statsBadge.textContent = `${t('showing_lbl')} ${filtered.length} ${unitText}`;
  }

  // Render Grid with active progressive skeleton shimmers
  const grid = document.getElementById('cities-directory-grid');
  if (!grid) return;

  // Let's render skeleton loader elements first to keep core web vitals pristine
  grid.innerHTML = `
    <div class="skeleton-card">
      <div class="skeleton-media"></div>
      <div class="skeleton-block skeleton-title"></div>
      <div class="skeleton-block skeleton-text-lg"></div>
    </div>
    <div class="skeleton-card">
      <div class="skeleton-media"></div>
      <div class="skeleton-block skeleton-title"></div>
      <div class="skeleton-block skeleton-text-lg"></div>
    </div>
    <div class="skeleton-card">
      <div class="skeleton-media"></div>
      <div class="skeleton-block skeleton-title"></div>
      <div class="skeleton-block skeleton-text-lg"></div>
    </div>
    <div class="skeleton-card">
      <div class="skeleton-media"></div>
      <div class="skeleton-block skeleton-title"></div>
      <div class="skeleton-block skeleton-text-lg"></div>
    </div>
  `;

  // Render authentic cards with a slight delay
  setTimeout(() => {
    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="text-align: center; grid-column: 1 / -1; padding: 60px 20px; background: var(--color-cream); border: 2px dashed var(--color-border); border-radius: var(--border-radius-md);">
          <i data-lucide="compass" style="width: 48px; height: 48px; color: var(--color-terracotta); margin: 0 auto 12px auto; display: block;"></i>
          <p style="font-family: var(--font-serif); font-size: 18px; color: var(--color-charcoal); font-weight: 600; margin-bottom: 8px;">${t('no_results')}</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    filtered.forEach((city, index) => {
      // Choose translated name & description if french is active
      let displayName = city.name;
      const descObj = cityDescriptions[city.id.toLowerCase()];
      const displayDesc = descObj ? (descObj[currentLang] || descObj['en']) : city.cultural_note;
      const displayRegion = translations[currentLang].regions[city.region] || city.region;

      const card = document.createElement('div');
      card.className = 'dir-card';
      card.setAttribute('id', `card-city-${city.id}`);
      
      card.innerHTML = `
        <div class="dir-card-photo-wrapper">
          <img class="dir-card-img lazy-img" src="${city.cover_image}" alt="${displayName}" loading="lazy" onload="this.classList.add('loaded')" referrerPolicy="no-referrer" />
          <span class="dir-card-days-badge">
            ${city.suggested_days} ${t('days')}
          </span>
        </div>
        <div class="dir-card-body">
          <div class="dir-card-title-row">
            <h2 class="dir-card-name">${displayName}</h2>
          </div>
          <div class="dir-card-region">
            <i data-lucide="map" style="width: 14px; height: 14px;"></i>
            <span>${displayRegion}</span>
          </div>
          <p class="dir-card-desc">${displayDesc}</p>
          <div class="dir-card-footer">
            <a href="/city.html?id=${city.id}" class="dir-card-btn" id="btn-explore-${city.id}">
              <span>${t('view_details')}</span>
            </a>
          </div>
        </div>
      `;
      grid.appendChild(card);

      // Insert an ad slot after the first row of cards (usually 3 cards wide on desktop)
      if (index === 2) {
        const adContainer = document.createElement('div');
        adContainer.className = 'ad-slot';
        adContainer.style.gridColumn = '1 / -1';
        adContainer.style.width = '100%';
        adContainer.style.minHeight = '90px';
        adContainer.style.margin = '20px 0';
        adContainer.style.boxSizing = 'border-box';
        grid.appendChild(adContainer);
      }
    });

    // Re-generate Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Trigger reveal trigger
    window.dispatchEvent(new Event('scrollRevealTrigger'));
  }, 300);
}

// Listeners helper
function setupSearchListeners() {
  const input = document.getElementById('dir-search-input');
  const clearBtn = document.getElementById('dir-search-clear');
  if (!input) return;

  input.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    if (searchQuery.trim().length > 0) {
      clearBtn.style.display = 'block';
    } else {
      clearBtn.style.display = 'none';
    }
    renderAll();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      searchQuery = '';
      clearBtn.style.display = 'none';
      input.focus();
      renderAll();
    });
  }
}
