// Morocco Tourism - Vanilla JS City Profile Detail Engine (English-only)
import { citiesDataFallback } from './cities-data-fallback.js';

const translations = {
  en: {
    back_home: "Back to Overview",
    back_home_text: "Back to Home Portal",
    palette_label: "Palette:",
    explore_tagline: "Moroccan Imperial Destination",
    loading_lbl: "Loading Selected City...",
    loading_desc: "Fetching authentic historical data, regional details, cultural etiquette protocols, riads lists, and local transportation guidelines...",
    tab_places: "Top Places",
    tab_neighborhoods: "Neighborhoods",
    tab_hotels: "Accommodations",
    tab_transit: "Transportation",
    travel_tips_title: "Local Travel Tips & Practical Advice",
    internal_links_title: "Featured Travel Guides",
    sidebar_title: "Local Fast Facts",
    fact_duration: "Suggested Stay",
    fact_region: "Government Region",
    fact_languages: "Spoken Tongues",
    fact_languages_val: "Arabic and Amazigh; Darija and French are widely spoken",
    cultural_title: "Cultural Insights",
    error_title: "City Profile Not Found",
    error_desc: "We couldn't retrieve the localized profile request for the city parameters provided in the URL query. Return home to choose other destinations.",
    error_btn: "Return Back to Map",
    approx_night: "approx. per night",
    amenity_lbl: "Key Amenity",
    credits: "GoMoroccoAI Explorer • Dedicated City Detail Engine crafted in Pure Vanilla JS.",
    budget: "Budget",
    mid_range: "Mid-Range",
    luxury: "Luxury",
    days: "Days",
    browse_cities_nav: "Browse All Cities",
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
    },
    best_time_title: "Best Time to Visit",
    spring: "Spring",
    summer: "Summer",
    autumn: "Autumn",
    winter: "Winter",
    recommended: "Recommended",
    months_spring: "March - May",
    months_summer: "June - August",
    months_autumn: "September - November",
    months_winter: "December - February",
    budget_estimator_title: "Daily Budget Estimator",
    budget_estimator_subtitle: "Estimated daily travel costs per person in Euros (€)",
    col_expense: "Expense Category",
    row_accommodation: "Accommodation",
    row_food: "Food & Dining",
    row_transport: "Local Transport",
    row_activities: "Activities & Sightseeing",
    row_total: "Total"
  }
};

let activeCityData = null;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initCityDetail();
  });
} else {
  initCityDetail();
}

async function initCityDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramCityId = urlParams.get('id');

  const validCities = [
    'marrakech', 'chefchaouen', 'fez', 'essaouira', 'casablanca',
    'tangier', 'rabat', 'agadir', 'ouarzazate', 'merzouga',
    'meknes', 'tetouan', 'alhoceima', 'ifrane', 'dakhla',
    'eljadida', 'oujda', 'beni-mellal', 'azilal'
  ];

  if (paramCityId) {
    const slug = paramCityId.toLowerCase().trim();
    if (validCities.includes(slug)) {
      window.location.replace('/city/' + slug + '.html');
      return;
    }
  }

  let cityId = null;
  const pathSegments = window.location.pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1] || pathSegments[pathSegments.length - 2] || '';
  if (lastSegment && lastSegment !== 'city.html' && lastSegment !== 'city') {
    cityId = lastSegment.replace('.html', '');
  }

  if (!cityId) {
    cityId = 'marrakech';
  } 

  try {
    let cities;
    try {
      const response = await fetch('/data/cities.json?v=' + Date.now(), { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to load cities.json database file: ${response.status}`);
      }
      cities = await response.json();
    } catch (e) {
      console.warn("Dynamic fetch of cities.json failed in city.js, falling back to citiesDataFallback:", e);
      cities = citiesDataFallback;
    }
    
    // Find matched city
    activeCityData = cities.find(c => c.id.toLowerCase() === cityId.toLowerCase());
    
    if (!activeCityData) {
      showErrorState();
      return;
    }

    // Success - render application views
    document.getElementById('city-detail-container').style.display = 'grid';
    document.getElementById('error-fallback-view').style.display = 'none';

    // Populate Dynamic SEO Metas based on selected city details to optimize crawling
    updateSEO(activeCityData);

    // Initial render of page
    renderCityProfile();
    setupTabListeners();
  } catch (error) {
    console.error('Error fetching city profile details:', error);
    showErrorState();
  }
}

// Dynamically sets title, metadata and description for SEO compliance
function updateSEO(city) {
  const titleText = `Explore ${city.name} - Best Sights, Riad Lodgings & Local Guides • Portal`;
  document.title = titleText;

  // 1. Meta description (between 120 and 160 characters)
  const descText = `Discover ${city.name}, Morocco. Explore top historical sights, authentic traditional riad lodging recommendations, and local transit networks for a safe journey.`;
  
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.name = "description";
    document.head.appendChild(descMeta);
  }
  descMeta.content = descText;

  // 2. Canonical URL Link
  const canonicalUrl = `https://gomoroccoai.com/city/${city.id.toLowerCase()}.html`;
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = "canonical";
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = canonicalUrl;

  // 3. Open Graph Tags
  const setOgTag = (property, content) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.content = content;
  };

  setOgTag('og:title', titleText);
  setOgTag('og:description', descText);
  setOgTag('og:image', city.cover_image);
  setOgTag('og:url', canonicalUrl);
  setOgTag('og:type', 'website');

  // 4. Twitter Card Tags
  const setTwitterTag = (name, content) => {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = name;
      document.head.appendChild(tag);
    }
    tag.content = content;
  };

  setTwitterTag('twitter:card', 'summary_large_image');
  setTwitterTag('twitter:title', titleText);
  setTwitterTag('twitter:description', descText);
  setTwitterTag('twitter:image', city.cover_image);

  // 5. JSON-LD Schema Markup (TouristDestination and BreadcrumbList)
  const touristSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": city.name,
    "description": descText,
    "image": city.cover_image,
    "url": canonicalUrl
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://gomoroccoai.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Cities",
        "item": "https://gomoroccoai.com/cities.html"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": city.name,
        "item": canonicalUrl
      }
    ]
  };

  let schemaScript = document.getElementById('dynamic-jsonld-schema');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'dynamic-jsonld-schema';
    document.head.appendChild(schemaScript);
  }
  schemaScript.text = JSON.stringify([touristSchema, breadcrumbSchema], null, 2);
}

function t(key) {
  return translations.en?.[key] || key;
}

function renderCityProfile() {
  if (!activeCityData) return;

  // Set Language and Direction
  document.documentElement.setAttribute('lang', 'en');
  document.documentElement.setAttribute('dir', 'ltr');

  const setElText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  const setElHtml = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = val;
  };

  // Static Elements Translation
  const btnBackTop = document.getElementById('btn-back-top');
  if (btnBackTop) {
    const span = btnBackTop.querySelector('span');
    if (span) span.textContent = t('back_home');
  }
  
  const backLabels = document.querySelectorAll('#lbl-back-home, #lbl-back-home-text');
  backLabels.forEach(lbl => {
    lbl.textContent = t('back_home_text');
  });

  setElText('lbl-pal-label', t('palette_label'));
  const lblNavCities = document.getElementById('lbl-nav-cities');
  if (lblNavCities) {
    lblNavCities.textContent = t('browse_cities_nav');
  }
  
  const lblNavCulture = document.getElementById('lbl-nav-culture');
  if (lblNavCulture) {
    lblNavCulture.textContent = t('culture_nav');
  }
  
  const lblNavPlanner = document.getElementById('lbl-nav-planner');
  if (lblNavPlanner) {
    lblNavPlanner.textContent = t('planner_nav');
  }
  setElText('city-meta-badge', t('explore_tagline'));
  setElText('lbl-tab-places', t('tab_places'));
  setElText('lbl-tab-neighborhoods', t('tab_neighborhoods'));
  setElText('lbl-tab-hotels', t('tab_hotels'));
  setElText('lbl-tab-transit', t('tab_transit'));
  setElText('lbl-travel-tips-title', t('travel_tips_title'));
  setElText('lbl-internal-links-title', t('internal_links_title'));
  setElText('lbl-sidebar-title', t('sidebar_title'));
  setElText('lbl-fact-duration', t('fact_duration'));
  setElText('lbl-fact-region', t('fact_region'));
  setElText('lbl-fact-languages', t('fact_languages'));
  setElText('fact-languages-val', t('fact_languages_val'));
  setElHtml('cultural-title-lbl', `
    <i data-lucide="shield-alert" style="width: 16px; height: 16px; color: var(--color-gold);"></i>
    ${t('cultural_title')}
  `);
  setElText('lbl-foot-credit-city', t('credits'));

  // Fill Header Elements with Chosen City Data
  const bannerHero = document.getElementById('city-panoramic-hero');
  if (bannerHero) {
    bannerHero.style.backgroundImage = `url('${activeCityData.cover_image}')`;
  }

  let cityName = activeCityData.name;
  let cityExcerpt = activeCityData.overview || `A comprehensive travel blueprint to inspect the dynamic culture in ${activeCityData.name}. Unearth the historical background, locate elegant lodgings, and browse the transport modes.`;
  let cityCultureNote = activeCityData.cultural_note;

  // Render Names & Description
  setElHtml('city-title-display', cityName);
  setElText('city-desc-display', cityExcerpt);

  // Render Sidebar Facts
  setElText('fact-duration-val', `${activeCityData.suggested_days} ${t('days')}`);
  
  const displayRegion = translations.en?.regions?.[activeCityData.region] || activeCityData.region;
  setElText('fact-region-val', displayRegion);

  // Render Cultural note
  setElText('cultural-text-display', cityCultureNote);

  // Tab contents populations
  renderTabPlacesContent();
  renderTabNeighborhoodsContent();
  renderTabHotelsContent();
  renderTabTransitContent();
  renderBudgetEstimator();
  renderBestTimeContent();
  renderTravelTipsContent();
  renderInternalLinksContent();

  // Refresh Lucide Icons inside the new views
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 0. Renders the Best Time to Visit section (4 season cards in a grid)
function renderBestTimeContent() {
  const container = document.getElementById('seasons-grid');
  if (!container) return;
  container.innerHTML = '';

  const bestTime = activeCityData.bestTime;
  if (!bestTime) {
    const el = document.getElementById('best-time-section');
    if (el) el.style.display = 'none';
    return;
  } else {
    const el = document.getElementById('best-time-section');
    if (el) el.style.display = 'block';
  }

  const titleEl = document.getElementById('lbl-best-time-title');
  if (titleEl) titleEl.textContent = t('best_time_title');

  const seasons = ['spring', 'summer', 'autumn', 'winter'];
  const seasonIcons = {
    spring: 'sprout',
    summer: 'sun',
    autumn: 'leaf',
    winter: 'snowflake'
  };

  seasons.forEach(season => {
    let desc = bestTime[season];

    const isRec = bestTime.recommended && bestTime.recommended.includes(season);

    const card = document.createElement('div');
    card.className = `season-card ${isRec ? 'recommended-card' : ''}`;

    card.innerHTML = `
      <div class="season-header">
        <div class="season-badge-row">
          ${isRec ? `<span class="season-rec-badge">${t('recommended')}</span>` : ''}
        </div>
        <div class="season-name-row">
          <i class="season-icon" data-lucide="${seasonIcons[season]}" style="width: 22px; height: 22px;"></i>
          <h4 class="season-name">${t(season)}</h4>
        </div>
        <span class="season-months">${t('months_' + season)}</span>
      </div>
      <p class="season-desc">${desc}</p>
    `;
    container.appendChild(card);
  });
}

// 1. Renders the Top Places view of Attractions
function renderTabPlacesContent() {
  const container = document.getElementById('places-list');
  if (!container) return;
  container.innerHTML = '';

  let attractions = activeCityData.attractions || [];

  attractions.forEach(place => {
    let displayName = place.name;
    let displayDesc = place.description;
    let durationHtml = place.duration ? `<span class="attraction-duration-tag"><i data-lucide="clock" style="width: 13px; height: 13px;"></i> ${place.duration}</span>` : '';

    const card = document.createElement('div');
    card.className = 'place-detail-card';
    card.innerHTML = `
      <div class="place-detail-body">
        <div class="place-detail-header">
          <h4 class="place-detail-name">${displayName}</h4>
          ${durationHtml}
        </div>
        <p class="place-detail-desc">${displayDesc}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderTabNeighborhoodsContent() {
  const container = document.getElementById('neighborhoods-list');
  if (!container) return;
  container.innerHTML = '';

  const neighborhoods = activeCityData.neighborhoods;
  if (!neighborhoods || neighborhoods.length === 0) {
    const tabBtn = document.getElementById('tab-btn-neighborhoods');
    if (tabBtn) tabBtn.style.display = 'none';
    return;
  } else {
    const tabBtn = document.getElementById('tab-btn-neighborhoods');
    if (tabBtn) tabBtn.style.display = 'inline-flex';
  }

  neighborhoods.forEach(neigh => {
    const card = document.createElement('div');
    card.className = 'neighborhood-card';
    card.innerHTML = `
      <div class="neighborhood-header">
        <h4 class="neighborhood-title">${neigh.name}</h4>
        <span class="neighborhood-location-tag"><i data-lucide="map-pin" style="width: 13px; height: 13px;"></i> ${neigh.location}</span>
      </div>
      <div class="neighborhood-pills">
        <span class="pill-badge"><strong>Known for:</strong> ${neigh.known_for}</span>
        <span class="pill-badge"><strong>Best for:</strong> ${neigh.best_for}</span>
      </div>
      <p class="neighborhood-activities">${neigh.activities}</p>
    `;
    container.appendChild(card);
  });
}

function renderTravelTipsContent() {
  const container = document.getElementById('travel-tips-content');
  const section = document.getElementById('travel-tips-section');
  if (!container || !section) return;
  container.innerHTML = '';

  const tips = activeCityData.travel_tips;
  if (!tips || tips.length === 0) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';

  const list = document.createElement('ul');
  list.className = 'travel-tips-list';

  tips.forEach(tip => {
    const item = document.createElement('li');
    item.className = 'travel-tip-item';
    item.innerHTML = `
      <i class="travel-tip-icon" data-lucide="check-circle-2" style="width: 18px; height: 18px;"></i>
      <span>${tip}</span>
    `;
    list.appendChild(item);
  });

  container.appendChild(list);
}

function renderInternalLinksContent() {
  const container = document.getElementById('internal-links-deck');
  const section = document.getElementById('internal-links-section');
  if (!container || !section) return;
  container.innerHTML = '';

  const links = activeCityData.internal_links;
  if (!links || links.length === 0) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';

  links.forEach(link => {
    const card = document.createElement('a');
    card.className = 'internal-link-card';
    card.href = `/blog/${link.blog_id}.html`;
    card.innerHTML = `
      <div class="internal-link-title">
        <span>${link.title}</span>
        <i data-lucide="arrow-right" style="width: 18px; height: 18px; color: var(--color-terracotta);"></i>
      </div>
      <p class="internal-link-desc">${link.description}</p>
    `;
    container.appendChild(card);
  });
}

function renderBudgetEstimator() {
  const container = document.getElementById('budget-estimator-section');
  if (!container) return;
  container.innerHTML = '';

  const est = activeCityData.budgetEstimate;
  if (!est) {
    container.style.display = 'none';
    return;
  }
  container.style.display = 'block';

  // Helper to parse "€15 - €30" or "15 - 30"
  const parseRange = (str) => {
    if (!str) return { min: 0, max: 0 };
    const numbers = str.replace(/[^0-9\-]/g, '').split('-');
    const min = parseInt(numbers[0]) || 0;
    const max = parseInt(numbers[1]) || min || 0;
    return { min, max };
  };

  // Helper to format ranges nicely with €
  const formatRange = (min, max) => {
    if (min === max) return `€${min}`;
    return `€${min} - €${max}`;
  };

  // Extract values
  const rows = [
    { key: 'row_accommodation', field: 'accommodation' },
    { key: 'row_food', field: 'food' },
    { key: 'row_transport', field: 'transport' },
    { key: 'row_activities', field: 'activities' }
  ];

  // Sum calculations
  let budgetTotalMin = 0, budgetTotalMax = 0;
  let midTotalMin = 0, midTotalMax = 0;
  let luxTotalMin = 0, luxTotalMax = 0;

  rows.forEach(row => {
    const budgetVal = parseRange(est.budget?.[row.field]);
    budgetTotalMin += budgetVal.min;
    budgetTotalMax += budgetVal.max;

    const midVal = parseRange(est.midRange?.[row.field]);
    midTotalMin += midVal.min;
    midTotalMax += midVal.max;

    const luxVal = parseRange(est.luxury?.[row.field]);
    luxTotalMin += luxVal.min;
    luxTotalMax += luxVal.max;
  });

  // Table HTML construction
  let tableRowsHtml = '';
  rows.forEach(row => {
    tableRowsHtml += `
      <tr>
        <td style="font-weight: 500;">${t(row.key)}</td>
        <td>${est.budget?.[row.field] || '—'}</td>
        <td>${est.midRange?.[row.field] || '—'}</td>
        <td>${est.luxury?.[row.field] || '—'}</td>
      </tr>
    `;
  });

  // Total Row Html
  tableRowsHtml += `
    <tr class="total-row">
      <td>${t('row_total')}</td>
      <td>${formatRange(budgetTotalMin, budgetTotalMax)}</td>
      <td>${formatRange(midTotalMin, midTotalMax)}</td>
      <td>${formatRange(luxTotalMin, luxTotalMax)}</td>
    </tr>
  `;

  container.className = 'budget-estimator-section';
  container.innerHTML = `
    <h3 class="budget-estimator-title">
      <i data-lucide="calculator" style="width: 20px; height: 20px; color: var(--color-terracotta);"></i>
      <span>${t('budget_estimator_title')}</span>
    </h3>
    <p class="budget-estimator-desc">${t('budget_estimator_subtitle')}</p>
    
    <div class="budget-table-wrapper">
      <table class="budget-table">
        <thead>
          <tr>
            <th>${t('col_expense')}</th>
            <th>${t('budget')}</th>
            <th>${t('mid_range')}</th>
            <th>${t('luxury')}</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHtml}
        </tbody>
      </table>
    </div>
  `;
}

// 2. Renders the Accommodations options (with French support if active)
function renderTabHotelsContent() {
  const container = document.getElementById('hotels-deck');
  if (!container) return;
  container.innerHTML = '';

  // Accommodation names are neutral categories, not endorsements of specific properties.
  const hotels = activeCityData.hotels;

  const tiers = ['budget', 'mid_range', 'luxury'];
  tiers.forEach(tier => {
    const hotel = hotels[tier] || activeCityData.hotels[tier];
    if (!hotel) return;

    let displayHotelName = hotel.name;
    let displayAmenity = hotel.amenity;
    const rawPrice = activeCityData.hotels[tier].price_approx;

    const card = document.createElement('div');
    card.className = `hotel-tier-box ${tier === 'luxury' ? 'luxury-card' : ''}`;
    
    card.innerHTML = `
      <span class="hotel-tier-badge ${tier}">${t(tier)}</span>
      <h4 class="hotel-top-name">${displayHotelName}</h4>
      
      <div class="hotel-p-rate">
        $${rawPrice} 
        <span>/ ${t('approx_night')}</span>
      </div>
  
      <div class="hotel-amenity-pill">
        <i data-lucide="check-circle" style="width: 16px; height: 16px;"></i>
        <span><strong>${t('amenity_lbl')}:</strong> ${displayAmenity}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// 3. Renders the Transportation system list
function renderTabTransitContent() {
  const container = document.getElementById('transit-deck');
  if (!container) return;
  container.innerHTML = '';

  let transportation = activeCityData.transportation || [];

  transportation.forEach(tr => {
    let displayType = tr.type;
    let displayDesc = tr.description;
    let cost = tr.approx_cost;

    // Dynamic icon generation
    let iconName = 'car';
    if (tr.type.toLowerCase().includes('bus')) iconName = 'bus';
    else if (tr.type.toLowerCase().includes('carriage') || tr.type.toLowerCase().includes('van')) iconName = 'navigation';
    else if (tr.type.toLowerCase().includes('train')) iconName = 'train';

    const card = document.createElement('div');
    card.className = 'transit-card';
    card.innerHTML = `
      <div class="transit-details">
        <div class="transit-avatar">
          <i data-lucide="${iconName}" style="width: 24px; height: 24px;"></i>
        </div>
        <div>
          <div class="transit-title-text">${displayType}</div>
          <div class="transit-text-desc">${displayDesc}</div>
        </div>
      </div>
      <div class="transit-price-tag">
        ${cost}
      </div>
    `;
    container.appendChild(card);
  });
}

function setupTabListeners() {
  const triggers = document.querySelectorAll('.tab-trigger-btn');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      // Deactivate all triggers & panels
      triggers.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      const panels = document.querySelectorAll('.tab-content-panel');
      panels.forEach(p => p.classList.remove('active'));

      // Activate clicked trigger & matching panel
      trigger.classList.add('active');
      trigger.setAttribute('aria-selected', 'true');
      
      const panelId = trigger.getAttribute('data-tab-panel');
      const activePanel = document.getElementById(panelId);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

function showErrorState() {
  document.getElementById('city-detail-container').style.display = 'none';
  document.getElementById('error-fallback-view').style.display = 'block';
  
  document.title = "City Profile Not Found • GoMoroccoAI Portal";
  
  setElText('lbl-error-title', t('error_title'));
  setElText('lbl-error-desc', t('error_desc'));
  setElText('lbl-error-btn', t('error_btn'));
}
