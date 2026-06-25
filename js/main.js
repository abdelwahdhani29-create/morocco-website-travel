// Morocco Tourism - Vanilla JS Application Core (Bilingual English / Français)
import { translations } from './translations.js';
import { getNavLanguage } from './auth-nav.js';
import { blogPosts } from './blog-posts.js';

// Global App State
let appLanguage = getNavLanguage();
let allCitiesData = [];
let activeCityData = null;
let activeHotelTier = 'mid_range';

// Localized mapping for city components to avoid English database values when browsing in French
const localizedCityData = {
  marrakech: {
    fr: {
      name: "Marrakech",
      subtitle: "Médina Rouge Impériale",
      cultural_note: "Lors de vos visites à Marrakech, négocier dans les souks se fait d'abord avec respect. Commencez par un chaleureux 'Salam Alaykum' (Que la paix soit sur vous), demandez les prix poliment et appréciez l'échange comme une interaction sociale vivante. Une tenue décente est très appréciée, en particulier autour des quartiers historiques.",
      attractions: [
        { name: "La Place Jemaa el-Fnaa", description: "Une place de légende qui se transforme au couchant en théâtre à ciel ouvert avec conteurs, musiciens et étals de cuisine parfumée.", image: "https://images.pexels.com/photos/34793906/pexels-photo-34793906.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { name: "Le Jardin Majorelle", description: "Un paradis botanique créé par la ferveur du peintre Jacques Majorelle, arborant sa céleste villa bleu cobalt outremer.", image: "https://images.unsplash.com/photo-1773501934878-104c1e234ba0?auto=format&fit=crop&w=800&q=80" }
      ],
      hotels: {
        budget: { name: "Riad Diana", price_approx: 45, amenity: "Patio traditionnel marocain, bassin de fraîcheur & accueil au thé traditionnel" },
        mid_range: { name: "Riad Kniza", price_approx: 120, amenity: "Riad d'époque datant du XVIIIe siècle, petit-déjeuner exceptionnel" },
        luxury: { name: "La Mamounia", price_approx: 650, amenity: "Hôtel-palais de réputation mondiale doté de superbes jardins d'oliviers centenaires et spa" }
      },
      transportation: [
        { type: "Petit Taxi", approx_cost: "20 - 50 MAD (2 - 5 USD)", description: "Petits taxis de couleur beige idéaux pour se déplacer rapidement. Activez le compteur." },
        { type: "Calèche Traditionnelle", approx_cost: "120 - 200 MAD (12 - 20 USD)/h", description: "Une promenade romantique et historique entourant les remparts de la Médina." },
        { type: "Bus ALSA", approx_cost: "4 MAD (0.40 USD)", description: "Trajets de transports publics reliant la Médina à Guéliz et Majorelle." }
      ]
    }
  },
  chefchaouen: {
    fr: {
      name: "Chefchaouen",
      subtitle: "La Perle Bleue du Rif",
      cultural_note: "Chefchaouen est célèbre pour son atmosphère sereine. Il convient ici de solliciter l'accord des habitants avant de photographier les façades ou les jolies portes bleutées.",
      attractions: [
        { name: "La Médina Bleue", description: "Promenez-vous au cœur d'un labyrinthe de ruelles entièrement baignées de nuances de bleu azuré fardé de chaux.", image: "https://images.unsplash.com/photo-1538600838042-6a0c694ffab5?auto=format&fit=crop&w=800&q=80" },
        { name: "La Cascade de Ras El Maa", description: "Une rafraîchissante source d'eau douce de montagne juste à la sortie des murs de la ville, où les habitants se rassemblent.", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/94/7f/74/photo0jpg.jpg?w=1100&h=-1&s=1" }
      ],
      hotels: {
        budget: { name: "Hostel Baraka", price_approx: 25, amenity: "Toit-terrasse de style bohème dominant les crêtes majestueuses du Rif" },
        mid_range: { name: "Lina Ryad & Spa", price_approx: 95, amenity: "Piscine intérieure chauffée et espace hammam surplombant la terrasse de la vallée" },
        luxury: { name: "Riad Cherifa", price_approx: 180, amenity: "Suites de luxe restaurées dans un style architectural andalou remarquable" }
      },
      transportation: [
        { type: "Petit Taxi", approx_cost: "15 - 30 MAD (1.50 - 3 USD)", description: "Taxis bleus abordables circulant dans toute la ville et desservant les hauteurs du Rif." },
        { type: "Minibus Partagé (Grand Taxi)", approx_cost: "10 - 20 MAD (1 - 2 USD)", description: "Navettes de transport partagé à tarif fixe très pratiques pour explorer le Rif." },
        { type: "Lignes CTM", approx_cost: "45 MAD (4.50 USD)", description: "Service d'autocars confortables et réguliers desservant Fès, Tanger et Tétouan." }
      ]
    }
  },
  fez: {
    fr: {
      name: "Fès",
      subtitle: "La Capitale Spirituelle",
      cultural_note: "Fès est le sanctuaire de la spiritualité et de l'artisanat marocain. Prenez votre temps dans les ruelles étroites, parlez de manière posée et respectez la quiétude des édifices religieux.",
      attractions: [
        { name: "Les Tanneries de Chouara", description: "Les célèbres bassins en nid d'abeille médiévaux où l'on teint le cuir selon des méthodes ancestrales.", image: "https://images.pexels.com/photos/38112658/pexels-photo-38112658.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { name: "L'Université Al-Qarawiyyin", description: "Fondée en 859 par Fatima al-Fihri, elle est officiellement reconnue par l'UNESCO comme la plus ancienne université encore en activité au monde.", image: "https://images.pexels.com/photos/35070809/pexels-photo-35070809.jpeg?auto=compress&cs=tinysrgb&w=800" }
      ],
      hotels: {
        budget: { name: "Riad Verus", price_approx: 35, amenity: "Toit-terrasse dynamique offrant une vue à 360° sur toute la Médina" },
        mid_range: { name: "Riad Dar Bensouda", price_approx: 85, amenity: "Splendide riad historique restauré avec piscine au sein du calme sanctuaire" },
        luxury: { name: "Hotel Sahrai", price_approx: 220, amenity: "Hôtel design de style contemporain avec piscine à débordement géante sur Fès" }
      },
      transportation: [
        { type: "Petit Taxi", approx_cost: "15 - 35 MAD (1.50 - 3.50 USD)", description: "Taxis rouges très compacts reliant l'ancienne et la nouvelle ville de Fès." },
        { type: "Bus National (CTM)", approx_cost: "100 - 150 MAD (10 - 15 USD)", description: "Réseau national d'autobus tout confort desservant l'ensemble des cités royales." },
        { type: "Trains ONCF", approx_cost: "90 - 140 MAD (9 - 14 USD)", description: "Réseau ferroviaire direct très confortable de la gare de Fès vers Meknès et Rabat." }
      ]
    }
  },
  essaouira: {
    fr: {
      name: "Essaouira",
      subtitle: "La Cité du Vent",
      cultural_note: "Essaouira se distingue par sa douceur de vivre marine. Adressez des saluts chaleureux aux pêcheurs du port historique et encouragez les sculpteurs de bois précieux de thuya.",
      attractions: [
        { name: "La Sqala de la Kasbah", description: "Une promenade spectaculaire le long des anciens bastions royaux flanqués de fiers canons orientés vers la mer.", image: "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,height=385,dpr=2/tour_img/b36d0ad759487476ead14b4e63b005c9c5d60253be08c763df3287a1b7a90906.jpg" },
        { name: "Le Port de Pêche", description: "Un port bleu et animé où chalutiers, odeurs de poisson grillé et harmonies musicales Gnaoua forment un spectacle constant.", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/02/26/94/c3/puerto.jpg?w=1000&h=-1&s=1" }
      ],
      hotels: {
        budget: { name: "Riad Zahra", price_approx: 40, amenity: "Riad familial chaleureux situé à quelques mètres de la longue plage de sable" },
        mid_range: { name: "Heure Bleue Palais", price_approx: 150, amenity: "Élégante oasis historique avec piscine sur toit-terrasse et patio verdoyant" },
        luxury: { name: "Le Jardin des Douars", price_approx: 240, amenity: "Maison d'hôtes de charme d'une exceptionnelle quiétude au milieu d'un grand jardin luxuriant" }
      },
      transportation: [
        { type: "Petit Taxi", approx_cost: "7 - 15 MAD (0.70 - 1.50 USD)", description: "Petits taxis bleus très abordables pour tous vos déplacements urbains." },
        { type: "Autocar Supratours", approx_cost: "80 - 120 MAD (8 - 12 USD)", description: "Lignes de bus rapides et climatisées assurant des navettes quotidiennes vers Marrakech." },
        { type: "Calèche Traditionnelle", approx_cost: "80 - 120 MAD (8 - 12 USD)/h", description: "Promenades à cheval pittoresques le long de la grande plage et de la promenade maritime." }
      ]
    }
  }
};

const customItineraries = {
  marrakech: {
    en: [
      { day: "Day 1", title: "Souks Labyrinth & Jemaa el-Fnaa", desc: "Wander the old clay alleys, inspect metal lanterns, dine at a high terrace watching snake charmers on Jemaa el-Fnaa." },
      { day: "Day 2", title: "Jardin Majorelle & Gueliz Style", desc: "Enjoy the crisp visual contrast of cobalt blue at Jardin Majorelle, visit Yves Saint Laurent museum, eat dinner in Gueliz." },
      { day: "Day 3", title: "Saadian Tombs & Sunset Gardens", desc: "Explore tilework at Saadian Tombs, admire terracotta clay fortress portals, and sunset walk around Menara orchards." }
    ],
    fr: [
      { day: "Jour 1", title: "Labyrinthe des Souks & Jemaa el-Fnaa", desc: "Déambulez dans les ruelles d'argile, observez les lanternes en bronze et dînez sur une terrasse haute face au spectacle de la place." },
      { day: "Jour 2", title: "Jardin Majorelle & Style Guéliz", desc: "Saisissez les parfaits contrastes cobalt du Jardin Majorelle, explorez le musée Yves Saint Laurent et profitez des bistrots de Guéliz." },
      { day: "Jour 3", title: "Tombeaux Saadiens & Promenade de la Ménara", desc: "Contemplez l'art des zelliges des Tombeaux Saadiens, puis offrez-vous un coucher de soleil serein dans l'oliveraie de la Ménara." }
    ]
  },
  chefchaouen: {
    en: [
      { day: "Day 1", title: "Blue Medina Photo Safari", desc: "Climb cobblestone stairs, admire custom blue turquoise doors, and have lunch at Plaza Uta el-Hammam." },
      { day: "Day 2", title: "Ras El Maa Spring & Spanish Mosque", desc: "Hike up to the sweet freshwater waterfall, observe laundry washing, and watch sunset from the Spanish Mosque crest." }
    ],
    fr: [
      { day: "Jour 1", title: "Exploration de la Médina Bleue", desc: "Arpentez les ruelles pavées bleues, découvrez l'artisanat de laine et déjeunez sur la grande terrasse de la place Outa el-Hammam." },
      { day: "Jour 2", title: "Cascade Ras El Maa & Mosquée Espagnole", desc: "Marchez jusqu'à la cascade d'eau douce fraîche, puis gravissez les collines pour contempler le panorama divin depuis la Mosquée Espagnole." }
    ]
  },
  fez: {
    en: [
      { day: "Day 1", title: "Fes El Bali & Tanneries Portal", desc: "Venture deep into the 9,400 carless lanes with a guide, inspect Chouara honeycomb leather basins, buy authentic slippers." },
      { day: "Day 2", title: "Fatima Al-Fihri Legacy & Qarawiyyin", desc: "Contemplate majestic inner wood carvings of Madrasa Bou Inania, and peer inside historic Al-Qarawiyyin entrance." },
      { day: "Day 3", title: "Blue Gate & Marinid Tombs Panorama", desc: "Photograph classic Bab Boujloud mosaic, sample goat cheese with wild honey, hike up to Marinid Tombs ruins." }
    ],
    fr: [
      { day: "Jour 1", title: "Fès el-Bali & Les Tanneries Royales", desc: "Pénétrez dans le dédale millénaire de la Médina, admirez la vue des cuves de teinture de Chouara et achetez de superbes babouches." },
      { day: "Jour 2", title: "Fondation Al-Qarawiyyin & Chef-d'œuvre de Bois", desc: "Admirez le savoir-faire géométrique de la Médersa Bou Inania, puis passez devant les arcades sacrées de la célèbre université Al-Qarawiyyin." },
      { day: "Jour 3", title: "Porte Bab Boujloud & Vue des Tombeaux Mérinides", desc: "Photographiez les faïences bleues de la célèbre grande porte, puis offrez-vous un panorama inoubliable sur les hauteurs des ruines des Tombeaux Mérinides." }
    ]
  },
  essaouira: {
    en: [
      { day: "Day 1", title: "Sea Fortress Cannon Walk", desc: "Walk on the sea fortress bastions, photograph traditional brass cannons, watch woodcarvers sculpt aromatic thuya wood workshops." },
      { day: "Day 2", title: "Blue Boats Port & Fresh Seagrills", desc: "Stroll blue armada fishing berths, sample local oysters and ocean scallops, and listen to soulful street Gnaoua music." }
    ],
    fr: [
      { day: "Jour 1", title: "Les Bastions Royaux & Sentier de Ruelle", desc: "Parcourez les grands bastions garnis de canons de bronze faisant face à l'océan Atlantique et visitez les ateliers d'ébénisterie de thuya." },
      { day: "Jour 2", title: "Chaluts Bleus & Grillades de la Pêche du Jour", desc: "Explorez les pontons de bois bleus du port, dégustez des huîtres ou du poisson frais de la criée et laissez-vous porter par les sonorités Gnaoua." }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// Skeleton helper for visual loader shimmers
function showSkeletons(gridId, count = 3) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = '';
  
  for (let i = 0; i < count; i++) {
    const card = document.createElement('div');
    card.className = 'skeleton-card';
    card.innerHTML = `
      <div class="skeleton-media"></div>
      <div class="skeleton-block skeleton-title"></div>
      <div class="skeleton-block skeleton-text-lg"></div>
      <div class="skeleton-block skeleton-text-sm"></div>
    `;
    grid.appendChild(card);
  }
}

async function initApp() {
  try {
    const response = await fetch('/data/cities.json');
    if (!response.ok) {
      throw new Error(`Failed to load cities.json: ${response.statusText}`);
    }
    allCitiesData = await response.json();
    
    // Default selected city
    activeCityData = allCitiesData[0];
    
    // Show premium skeleton loaders first for progressive loading flow
    showSkeletons('featured-cities-grid', 3);
    showSkeletons('attractions-grid', 2);
    
    setupEventListeners();
    
    // Smooth loader delay
    setTimeout(() => {
      renderCityDashboard();
      renderFeaturedCitiesGrid();
      renderHomepageBlogWidget();
    }, 450);
    
    // Listen to bilingual real-time updates from Navbar toggle
    window.addEventListener('languageChanged', (e) => {
      appLanguage = e.detail.lang;
      renderCityDashboard();
      renderFeaturedCitiesGrid();
      renderHomepageBlogWidget();
    });

  } catch (error) {
    console.error('Error initializing Morocco Guide:', error);
    const grid = document.getElementById('featured-cities-grid');
    if (grid) {
      grid.innerHTML = `
        <div style="text-align: center; grid-column: 1 / -1; padding: 40px; border: 2px dashed var(--color-terracotta-dark); border-radius: 12px; background-color: rgba(211, 94, 53, 0.05);">
          <p style="color: var(--color-terracotta-dark); font-weight: bold; font-family: var(--font-serif); font-size: 18px;">
            ${appLanguage === 'fr' ? "Impossible de charger la base de données des villes" : "Could not load cities database"}
          </p>
          <p style="color: var(--color-charcoal-light); margin-top: 8px; font-size: 14px;">
            ${appLanguage === 'fr' ? "Veuillez vérifier que le fichier de données '/data/cities.json' existe et est accessible." : "Please ensure the data file '/data/cities.json' is present and fully accessible."}
          </p>
        </div>
      `;
    }
  }
}

// Global translator lookup 
function t(key) {
  return translations[appLanguage]?.[key] || translations['en']?.[key] || key;
}

// Local helper to translate administrative regions on-the-fly
function getLocalizedRegion(regionName, lang) {
  if (lang === 'fr') {
    if (regionName === "Marrakech-Safi") return "Région de Marrakech-Safi";
    if (regionName === "Tanger-Tetouan-Al Hoceima") return "Tanger-Tétouan-Al Hoceïma";
    if (regionName === "Fes-Meknes") return "Fès-Meknès";
    if (regionName === "Casablanca-Settat") return "Région de Casablanca-Settat";
    if (regionName === "Rabat-Sale-Kenitra") return "Rabat-Salé-Kénitra";
    if (regionName === "Souss-Massa") return "Souss-Massa";
    if (regionName === "Draa-Tafilalet") return "Drâa-Tafilalet";
    if (regionName === "Dakhla-Oued Ed-Dahab") return "Dakhla-Oued Ed-Dahab";
  }
  return regionName;
}

// Generate featured city cards on homepage (Marrakech, Chefchaouen, Fez)
function renderFeaturedCitiesGrid() {
  const grid = document.getElementById('featured-cities-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // Limit homepage to first 4 cities
  allCitiesData.slice(0, 4).forEach(city => {
    const card = document.createElement('div');
    card.id = `city-card-${city.id}`;
    card.className = `city-card`;
    
    // Highlight the active card boundaries
    if (activeCityData && activeCityData.id === city.id) {
      card.classList.add(`active-${city.id}`);
    }

    let cityName = city.name;
    let cityRegion = getLocalizedRegion(city.region, appLanguage);
    let cityCultureNote = city.cultural_note;

    if (appLanguage === 'fr' && localizedCityData[city.id]) {
      const loc = localizedCityData[city.id].fr;
      if (loc.name) cityName = loc.name;
      if (loc.cultural_note) cityCultureNote = loc.cultural_note;
    }

    // Lazy load image with progressive fade-in
    card.innerHTML = `
      <div class="city-card-cover-frame">
        <img class="city-card-img lazy-img" src="${city.cover_image}" alt="${cityName}" loading="lazy" onload="this.classList.add('loaded')" referrerPolicy="no-referrer" />
        <div class="city-card-badge">${city.suggested_days} ${t('days')}</div>
      </div>
      <div class="city-card-body">
        <h3 class="city-card-name">
          <span>${cityName}</span>
        </h3>
        <p class="city-card-region">${cityRegion}</p>
        <p class="city-card-note">${cityCultureNote}</p>
      </div>
      <div class="city-card-footer">
        <span class="city-card-link-text">${t('view_guide_btn')}</span>
        <span class="city-card-days">${city.suggested_days} ${t('days_duration')}</span>
      </div>
    `;

    // Click handler to update Dashboard
    card.addEventListener('click', () => {
      // Remove all active borders
      allCitiesData.forEach(c => {
        const otherCard = document.getElementById(`city-card-${c.id}`);
        if (otherCard) {
          otherCard.className = 'city-card';
        }
      });

      // Highlight clicked card
      card.classList.add(`active-${city.id}`);
      activeCityData = city;
      
      // Clear and show attractions skeletons first to prevent flash of old content
      showSkeletons('attractions-grid', 2);
      
      // Delay render of active dashboard details slightly for perfect skeletal progression
      setTimeout(() => {
        renderCityDashboard();
      }, 350);
      
      // Scroll smoothly to dashboard section
      document.getElementById('explorer-header-section').scrollIntoView({ behavior: 'smooth' });
    });

    grid.appendChild(card);
  });

  // Localize See All Cities button
  const lblSeeAll = document.getElementById('lbl-see-all-cities');
  if (lblSeeAll) {
    lblSeeAll.textContent = t('see_all_cities');
  }

  // Trigger reveal scroll listener to observe newly rendered cards
  window.dispatchEvent(new Event('scrollRevealTrigger'));
}

// Live city search filtering
function filterCityCards(query) {
  query = query.toLowerCase().trim();
  allCitiesData.forEach(city => {
    const card = document.getElementById(`city-card-${city.id}`);
    if (card) {
      const matchName = city.name.toLowerCase().includes(query);
      const matchRegion = city.region.toLowerCase().includes(query);
      
      if (matchName || matchRegion || query === '') {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    }
  });

  const clearBtn = document.getElementById('search-clear');
  if (clearBtn) {
    clearBtn.style.display = query ? 'block' : 'none';
  }
}

// Core Dashboard Renderer
function renderCityDashboard() {
  if (!activeCityData) return;

  // Language & Direction Updates
  document.documentElement.setAttribute('lang', appLanguage);
  document.documentElement.setAttribute('dir', 'ltr');

  const setElText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  // Synchronise common titles and badges
  setElText('lbl-subtitle', t('explore_city') + activeCityData.name);
  setElText('lbl-days-to-visit', t('suggested_duration'));
  setElText('lbl-region', t('region'));
  setElText('lbl-languages', t('language_label'));
  setElText('val-languages-val', t('languages_val'));
  setElText('lbl-culture-title', t('cultural_insight'));
  setElText('lbl-accommodation', t('accommodation'));
  setElText('lbl-transportation', t('transportation_label'));
  setElText('lbl-attractions', t('attractions_label'));
  setElText('lbl-calc-title', t('currency_calc_title'));
  setElText('lbl-calc-usd', t('usd_amount'));
  setElText('lbl-calc-mad', t('mad_amount'));
  setElText('lbl-itinerary-title', t('itinerary_title'));
  setElText('lbl-explore-marrakech', t('explore_city') + activeCityData.name);

  // Hero Landing texts
  setElText('lbl-hero-tagline', t('hero_tagline'));
  const lblHeroTitle = document.getElementById('lbl-hero-title');
  if (lblHeroTitle) {
    lblHeroTitle.textContent = t('hero_title');
  }
  setElText('lbl-hero-desc', t('hero_desc'));
  setElText('lbl-hero-plan-btn', t('plan_your_trip_btn'));
  
  const searchInput = document.getElementById('city-search');
  if (searchInput) searchInput.placeholder = t('search_placeholder');

  setElText('lbl-featured-title', t('featured_title'));
  setElText('lbl-featured-sub', t('featured_sub'));

  // Hotel toggle controls
  setElText('btn-toggle-budget', t('budget_tier'));
  setElText('btn-toggle-mid', t('mid_range_tier'));
  setElText('btn-toggle-luxury', t('luxury_tier'));

  // Open Dedicated profile target text
  const btnDedicated = document.getElementById('btn-view-dedicated');
  if (btnDedicated) {
    btnDedicated.setAttribute('href', `/city.html?id=${activeCityData.id}`);
    const lblDedicated = document.getElementById('lbl-dedicated-btn');
    if (lblDedicated) {
      lblDedicated.textContent = t('dedicated_btn');
    }
  }

  // Active City variables
  let currentCityName = activeCityData.name;
  let currentCitySubtitle = "Imperial Medina";
  let currentCityCulture = activeCityData.cultural_note;
  let currentCityAttractions = activeCityData.attractions;
  let currentCityHotels = activeCityData.hotels;
  let currentCityTransit = activeCityData.transportation;

  // Swap to translated data structure if French
  if (appLanguage === 'fr' && localizedCityData[activeCityData.id]) {
    const loc = localizedCityData[activeCityData.id].fr;
    if (loc.name) currentCityName = loc.name;
    if (loc.subtitle) currentCitySubtitle = loc.subtitle;
    if (loc.cultural_note) currentCityCulture = loc.cultural_note;
    if (loc.attractions) {
      currentCityAttractions = loc.attractions.map((attr, idx) => ({
        ...attr,
        image: activeCityData.attractions[idx]?.image || attr.image
      }));
    }
    if (loc.hotels) currentCityHotels = loc.hotels;
    if (loc.transportation) currentCityTransit = loc.transportation;
  }

  const heroImgBg = document.getElementById('hero-img-bg');
  if (heroImgBg) {
    heroImgBg.style.backgroundImage = `url('${activeCityData.cover_image}')`;
  }

  setElText('hero-title-en', currentCityName);
  setElText('hero-title-sub', currentCitySubtitle);
  setElText('val-region', getLocalizedRegion(activeCityData.region, appLanguage));
  setElText('val-days', `${activeCityData.suggested_days} ${t('days_duration')}`);
  setElText('val-culture-text', currentCityCulture);

  // Render attractions/sights with progressive, performance-aligned tags
  const attractionsGrid = document.getElementById('attractions-grid');
  if (attractionsGrid) {
    attractionsGrid.innerHTML = '';
    currentCityAttractions.forEach(att => {
      const card = document.createElement('div');
      card.className = 'attraction-card';
      card.innerHTML = `
        <div class="attraction-img-frame">
          <img class="attraction-img lazy-img" src="${att.image}" alt="${att.name}" loading="lazy" onload="this.classList.add('loaded')" referrerPolicy="no-referrer">
        </div>
        <div class="attraction-info">
          <h4 class="attraction-name">${att.name}</h4>
          <p class="attraction-desc">${att.description}</p>
        </div>
      `;
      attractionsGrid.appendChild(card);
    });
  }

  // Trigger viewport observer for dashboard update
  window.dispatchEvent(new Event('scrollRevealTrigger'));

  // Accommodations drawer refresh
  renderHotelTier();

  // Transportation Hub
  const transitListEl = document.getElementById('transit-list');
  if (transitListEl) {
    transitListEl.innerHTML = '';
    currentCityTransit.forEach(tr => {
      let type = tr.type;
      let desc = tr.description;
      let cost = tr.approx_cost;

      const transitItem = document.createElement('div');
      transitItem.className = 'transit-item';
      
      let svgIcon = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="1" y="3" width="22" height="13" rx="2" ry="2"></rect>
          <line x1="16" y1="8" x2="20" y2="8"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="8" y1="18" x2="12" y2="18"></line>
          <line x1="12" y1="18" x2="16" y2="18"></line>
        </svg>
      `;
      if (tr.type.toLowerCase().includes('taxi')) {
        svgIcon = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
            <path d="M5 11V4h14v7"></path>
            <line x1="9" y1="4" x2="9" y2="11"></line>
            <line x1="15" y1="4" x2="15" y2="11"></line>
          </svg>
        `;
      } else if (tr.type.toLowerCase().includes('bus') || tr.type.toLowerCase().includes('supratours')) {
        svgIcon = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="3" width="16" height="16" rx="2" ry="2"></rect>
            <line x1="4" y1="11" x2="20" y2="11"></line>
            <circle cx="8" cy="19" r="2"></circle>
            <circle cx="16" cy="19" r="2"></circle>
          </svg>
        `;
      } else if (tr.type.toLowerCase().includes('train')) {
        svgIcon = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="3" width="16" height="16" rx="2" ry="2"></rect>
            <line x1="12" y1="3" x2="12" y2="19"></line>
            <line x1="4" y1="15" x2="20" y2="15"></line>
            <circle cx="8" cy="19" r="2"></circle>
            <circle cx="16" cy="19" r="2"></circle>
          </svg>
        `;
      }

      transitItem.innerHTML = `
        <div class="transit-left">
          <div class="transit-icon-avatar">${svgIcon}</div>
          <div>
            <div class="transit-name">${type}</div>
            <div class="transit-desc">${desc}</div>
          </div>
        </div>
        <div class="transit-fare">${cost}</div>
      `;
      transitListEl.appendChild(transitItem);
    });
  }

  // Render Itinerary Sequence
  renderItineraryTimeline();
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderHotelTier() {
  if (!activeCityData) return;
  
  // Choose standard or French hotels
  let currentHotels = activeCityData.hotels;
  if (appLanguage === 'fr' && localizedCityData[activeCityData.id]) {
    currentHotels = localizedCityData[activeCityData.id].fr.hotels;
  }

  const hotelData = currentHotels[activeHotelTier];
  if (!hotelData) return;

  const tLabel = activeHotelTier.replace('_', '-').toUpperCase();
  const amenityValue = hotelData.amenity;
  const hotelName = hotelData.name;

  const elTier = document.getElementById('hotel-card-tier');
  if (elTier) elTier.textContent = tLabel;
  const elAmenityVal = document.getElementById('lbl-hotel-amenity-val');
  if (elAmenityVal) elAmenityVal.textContent = amenityValue;
  const elAmenityHeader = document.getElementById('lbl-hotel-amenity-header');
  if (elAmenityHeader) elAmenityHeader.textContent = `${t('amenities')}:`;
  const elName = document.getElementById('hotel-card-name');
  if (elName) elName.textContent = hotelName;
  const elPrice = document.getElementById('hotel-card-price');
  
  const formattedPrice = hotelData.price_approx || activeCityData.hotels[activeHotelTier].price_approx;

  if (elPrice) {
    elPrice.innerHTML = `
      $${formattedPrice} <span style="font-size: 14px; font-weight: 500">${t('night')}</span>
    `;
  }
}

// Generate Day-By-Day local itinerary fallbacks
function renderItineraryTimeline() {
  const container = document.getElementById('itinerary-timeline');
  if (!container) return;
  container.innerHTML = '';
  
  let itineraries = customItineraries[activeCityData.id]?.[appLanguage] || customItineraries[activeCityData.id]?.['en'];
  
  if (!itineraries) {
    // Generate dynamic fallback itinerary based on current city attractions
    let attractions = activeCityData.attractions || [];
    if (appLanguage === 'fr' && localizedCityData[activeCityData.id]) {
      const loc = localizedCityData[activeCityData.id].fr;
      if (loc.attractions) {
        attractions = loc.attractions.map((attr, idx) => ({
          ...attr,
          image: activeCityData.attractions[idx]?.image || attr.image
        }));
      }
    }
    
    itineraries = attractions.map((attr, idx) => {
      const dayNum = idx + 1;
      const dayLabel = appLanguage === 'fr' ? `Jour ${dayNum}` : `Day ${dayNum}`;
      const titlePrefix = appLanguage === 'fr' ? "Explorer " : "Explore ";
      return {
        day: dayLabel,
        title: `${titlePrefix}${attr.name}`,
        desc: attr.description
      };
    });
  }

  itineraries.forEach((step, index) => {
    const el = document.createElement('div');
    el.className = 'timeline-step';
    el.innerHTML = `
      <div class="timeline-idx">${index + 1}</div>
      <div class="timeline-content">
        <div class="timeline-day">${step.day}</div>
        <h5 class="timeline-title">${step.title}</h5>
        <div class="timeline-desc">${step.desc}</div>
      </div>
    `;
    container.appendChild(el);
  });
}

function setupEventListeners() {
  // Accommodation tier buttons
  const tierBtns = {
    budget: document.getElementById('btn-toggle-budget'),
    mid_range: document.getElementById('btn-toggle-mid'),
    luxury: document.getElementById('btn-toggle-luxury')
  };

  Object.keys(tierBtns).forEach(tier => {
    const btn = tierBtns[tier];
    if (btn) {
      btn.addEventListener('click', () => {
        Object.values(tierBtns).forEach(b => {
          if (b) b.classList.remove('active');
        });
        btn.classList.add('active');
        activeHotelTier = tier;
        renderHotelTier();
      });
    }
  });

  // Currency Converter Slide and inputs
  const sliderUSD = document.getElementById('currency-slider');
  const inputUSD = document.getElementById('calc-input-usd');
  const inputMAD = document.getElementById('calc-input-mad');
  const exchangeRate = 10.0; 

  function updateConverter(usdVal) {
    usdVal = parseFloat(usdVal) || 0;
    if (inputUSD) inputUSD.value = usdVal;
    if (sliderUSD) sliderUSD.value = Math.min(usdVal, 1000); 
    if (inputMAD) inputMAD.value = (usdVal * exchangeRate).toFixed(2);
  }

  if (sliderUSD) {
    sliderUSD.addEventListener('input', (e) => {
      updateConverter(e.target.value);
    });
  }

  if (inputUSD) {
    inputUSD.addEventListener('input', (e) => {
      updateConverter(e.target.value);
    });
  }

  if (inputMAD) {
    inputMAD.addEventListener('input', (e) => {
      const madVal = parseFloat(e.target.value) || 0;
      if (inputUSD) inputUSD.value = (madVal / exchangeRate).toFixed(2);
      if (sliderUSD) sliderUSD.value = Math.min(madVal / exchangeRate, 1000);
    });
  }

  // Seed default value
  updateConverter(100);

  // Live search input filtering elements
  const searchInput = document.getElementById('city-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterCityCards(e.target.value);
    });
  }

  const searchClear = document.getElementById('search-clear');
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      filterCityCards('');
    });
  }
}

// Generate homepage latest blog posts section (3 most recent)
function renderHomepageBlogWidget() {
  const grid = document.getElementById('homepage-blog-grid');
  if (!grid) return;

  // Localize labels
  const lblBlogTitle = document.getElementById('lbl-latest-blog-title');
  const lblBlogSub = document.getElementById('lbl-latest-blog-sub');
  const lblSeeAllBlog = document.getElementById('lbl-see-all-blog');

  if (lblBlogTitle) lblBlogTitle.textContent = t('latest_blog_title');
  if (lblBlogSub) lblBlogSub.textContent = t('latest_blog_sub');
  if (lblSeeAllBlog) lblSeeAllBlog.textContent = t('read_more').replace('&rarr;', '').trim();

  // Slice top 3 most recent articles
  const latestPosts = blogPosts.slice(0, 3);
  
  let html = '';
  latestPosts.forEach(post => {
    const postTitle = post.title[appLanguage] || post.title.en;
    const postExcerpt = post.excerpt[appLanguage] || post.excerpt.en;
    const postCategory = post.categories[appLanguage] || post.categories.en;
    const postReadTime = post.readTime[appLanguage] || post.readTime.en;
    const formattedDate = new Date(post.date).toLocaleDateString(appLanguage === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    html += `
      <div class="city-card" style="display: flex; flex-direction: column; overflow: hidden; border: 2px solid var(--color-border); background-color: white; border-radius: var(--border-radius-md); transition: var(--transition-smooth);" id="home-post-${post.id}">
        <div class="city-card-image-container" style="position: relative; height: 180px; overflow: hidden; background-color: #eee;">
          <img class="city-card-image" src="${post.image}" alt="${postTitle}" style="width: 100%; height: 100%; object-fit: cover; transition: var(--transition-smooth);" loading="lazy" referrerPolicy="no-referrer" />
          <span style="position: absolute; top: 12px; left: 12px; background: var(--color-terracotta); color: white; padding: 4px 10px; font-size: 10px; font-weight: 700; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px; z-index: 2;">
            ${postCategory}
          </span>
        </div>
        <div class="city-card-info" style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 20px; gap: 10px;">
          <div>
            <div style="font-size: 11px; color: var(--color-charcoal-light); font-weight: 500; display: flex; gap: 8px; margin-bottom: 8px;">
              <span>${formattedDate}</span>
              <span>•</span>
              <span>${postReadTime}</span>
            </div>
            <h3 style="font-family: var(--font-serif); font-size: 18px; font-weight: 700; line-height: 1.4; margin: 0; color: var(--color-charcoal); transition: var(--transition-smooth);">
              <a href="/blog.html?id=${post.id}" style="color: inherit; text-decoration: none;">${postTitle}</a>
            </h3>
            <p style="font-size: 13px; color: var(--color-charcoal-light); line-height: 1.6; margin: 8px 0 0 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
              ${postExcerpt}
            </p>
          </div>
          <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--color-border); display: flex; justify-content: flex-end;">
            <a href="/blog.html?id=${post.id}" style="font-size: 12px; font-weight: 700; color: var(--color-terracotta); text-decoration: none; display: inline-flex; align-items: center; gap: 4px; transition: var(--transition-smooth);">
              <span>${t('read_more').replace('&rarr;', '').trim()}</span> &rarr;
            </a>
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;

  // Add card hover effect transitions
  grid.querySelectorAll('.city-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.borderColor = 'var(--color-terracotta)';
      const img = card.querySelector('img');
      if (img) img.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.borderColor = 'var(--color-border)';
      const img = card.querySelector('img');
      if (img) img.style.transform = 'scale(1)';
    });
  });

  // Re-trigger icons refresh
  if (window.lucide) window.lucide.createIcons();
}
