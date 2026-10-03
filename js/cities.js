// Morocco Tourism - Vanilla JS All Cities Directory Engine (English-only)
import { citiesDataFallback } from './cities-data-fallback.js';

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
      "Dakhla-Oued Ed-Dahab": "Dakhla-Oued Ed-Dahab Region",
      "Oriental": "Oriental Region",
      "Beni Mellal-Khenifra": "Beni Mellal-Khenifra Region"
    }
  }
};

// English descriptions for catalog cities
const cityDescriptions = {
  marrakech: "The legendary 'Red City', renowned for its ancient clay walls, vibrant squares, majestic palaces, and the lively souks filled with centuries-old Moroccan crafts.",
  chefchaouen: "Morocco's mystical 'Blue Pearl', tucked into the majestic Rif Mountains, boasting pristine indigo pathways and serene, mountain-fresh streams.",
  fez: "The historic spiritual and intellectual soul of the Kingdom, containing the oldest continuously operating university in the world and 9,000 winding medieval lanes.",
  essaouira: "A beautiful, windswept Atlantic coastal harbor fortress, filled with historical bronze cannons, pristine sandy beaches, and traditional Gnaoua music vibes.",
  casablanca: "Morocco's vibrant seaside metropolis, blending towering modern wonders like the Hassan II Mosque with charming art-deco French quarters.",
  tangier: "The iconic 'Gateway to Africa', sitting between the sea and ocean, inspiring generations of international writers and artists with its bohemian spirit.",
  rabat: "The stately capital city of Morocco, showcasing wide tree-lined boulevards, immaculate modern gardens, and the ancient seaside Kasbah of the Udayas.",
  agadir: "A premier sun-kissed seaside resort looking over a spectacular 10-kilometer golden crescent beach, famous for water sports and rich Amazigh crafts.",
  ouarzazate: "Morocco's sun-baked 'desert Hollywood', framed by dramatic Atlas peaks and majestic red clay fortresses like UNESCO-listed Ait Benhaddou.",
  merzouga: "An unforgettable desert jewel situated beneath the wind-sculpted golden Erg Chebbi dunes, offering starry Saharan campfires and caravan treks.",
  meknes: "An Imperial city surrounded by massive protective clay bastions, containing exquisite gates, historic granaries, and nearby ancient Roman Volubilis.",
  tetouan: "The elegant 'White Dove' of northern hills, showcasing beautiful Spanish-Andalusian architectural lanes and UNESCO traditional artisan guilds.",
  alhoceima: "A spectacular Mediterranean haven tucked into the Rif cliffs, praised for sapphire beaches like Quemado and mountain coastal reserves.",
  ifrane: "A unique alpine mountain resort known as 'Little Switzerland', boasting sloped red roofs, snowy winter pine woods, and pure cedar forests.",
  dakhla: "A world-class lagoon paradise where golden desert ridges meet the windy turquoise Atlantic, creating an ultimate sports spot.",
  eljadida: "A charming historic ocean harbor containing the UNESCO-listed Portuguese stone cistern, old watchtowers, and Atlantic fortress ramparts.",
  oujda: "The historic capital of Eastern Morocco, known for deep hospitality, traditional Gharnati music, a beautiful medina, and Lalla Aicha Park.",
  "beni-mellal": "An agricultural oasis beneath the Middle Atlas, famous for olive groves, cascading mountain springs, and high-altitude fortress views."
};

let allCities = [];
let searchQuery = '';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initCitiesDirectory();
  });
} else {
  initCitiesDirectory();
}

async function initCitiesDirectory() {
  try {
    try {
      const response = await fetch('/data/cities.json?v=' + Date.now(), { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to read cities.json file data: ${response.status}`);
      }
      allCities = await response.json();
    } catch (e) {
      console.warn("Dynamic fetch of cities.json failed in cities.js, falling back to citiesDataFallback:", e);
      allCities = citiesDataFallback;
    }
    
    // Wire Search Input & Clear actions
    setupSearchListeners();
    // Render the layout
    renderAll();
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
  return translations.en?.[key] || key;
}

// Global text utility
function setElText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderAll() {
  // Update direction and lang attributes
  document.documentElement.setAttribute('lang', 'en');
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
    const matchesAttraction = city.attractions.some(attr => 
      attr.name.toLowerCase().includes(term) || attr.description.toLowerCase().includes(term)
    );

    return matchesEnName || matchesRegion || matchesAttraction;
  });

  // Render Stats Counter
  const statsBadge = document.getElementById('lbl-count-badge');
  if (statsBadge) {
    const unitText = filtered.length === 1 ? 'destination' : t('destinations_lbl');
    statsBadge.textContent = `${t('showing_lbl')} ${filtered.length} ${unitText}`;
  }

  // Render Grid
  const grid = document.getElementById('cities-directory-grid');
  if (!grid) return;

  // Check if static HTML cards are already rendered in English with no active search
  const existingCardsCount = grid.querySelectorAll('.dir-card').length;
  if (existingCardsCount === allCities.length && !searchQuery && !grid.dataset.renderedByJs) {
    grid.dataset.renderedByJs = 'true';
    if (window.lucide) {
      window.lucide.createIcons();
    }
    window.dispatchEvent(new Event('scrollRevealTrigger'));
    return;
  }

  // Otherwise, render filtered cards directly
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
    let displayName = city.name;
    const displayDesc = cityDescriptions[city.id.toLowerCase()] || city.cultural_note;
    const displayRegion = translations.en.regions?.[city.region] || city.region;

    const card = document.createElement('div');
    card.className = 'dir-card';
    card.setAttribute('id', `card-city-${city.id}`);
    
    card.innerHTML = `
      <div class="dir-card-photo-wrapper">
        <img class="dir-card-img lazy-img loaded" src="${city.cover_image}" alt="${displayName}" loading="lazy" referrerPolicy="no-referrer" />
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
          <a href="/city/${city.id}.html" class="dir-card-btn" id="btn-explore-${city.id}">
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

  grid.dataset.renderedByJs = 'true';

  // Re-generate Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Trigger reveal trigger
  window.dispatchEvent(new Event('scrollRevealTrigger'));
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
