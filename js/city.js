// Morocco Tourism - Vanilla JS City Profile Detail Engine (Bilingual English / Français)
import { getNavLanguage } from './auth-nav.js';

const translations = {
  en: {
    back_home: "Back to Overview",
    back_home_text: "Back to Home Portal",
    palette_label: "Palette:",
    explore_tagline: "Moroccan Imperial Destination",
    loading_lbl: "Loading Selected City...",
    loading_desc: "Fetching authentic historical data, regional details, cultural etiquette protocols, riads lists, and local transportation guidelines...",
    tab_places: "Top Places",
    tab_hotels: "Accommodations",
    tab_transit: "Transportation",
    sidebar_title: "Local Fast Facts",
    fact_duration: "Suggested Stay",
    fact_region: "Government Region",
    fact_languages: "Spoken Tongues",
    fact_languages_val: "Standard Moroccan Arabic, Berber & French",
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
      "Dakhla-Oued Ed-Dahab": "Dakhla-Oued Ed-Dahab Region"
    }
  },
  fr: {
    back_home: "Retour",
    back_home_text: "Retour à l'Accueil",
    palette_label: "Palette :",
    explore_tagline: "Destination Impériale Marocaine",
    loading_lbl: "Chargement de la ville...",
    loading_desc: "Récupération des données historiques authentiques, détails régionaux, guides d'étiquette culturelle, riads et transports...",
    tab_places: "Lieux à Visiter",
    tab_hotels: "Où Dormir",
    tab_transit: "Transports Locaux",
    sidebar_title: "Infos Pratiques",
    fact_duration: "Durée Conseillée",
    fact_region: "Région Administrative",
    fact_languages: "Langues Parlées",
    fact_languages_val: "Arabe Marocain (Darija), Berbère (Tamazight) et Français",
    cultural_title: "Conseils de Visite",
    error_title: "Cité introuvable",
    error_desc: "Le profil de cette destination n'a pas pu être trouvé. Veuillez retourner à la page d'accueil pour explorer un autre catalogue.",
    error_btn: "Retourner à l'Accueil",
    approx_night: "environ par nuit",
    amenity_lbl: "Atout Principal",
    credits: "GoMoroccoAI Explorer • Répertoire détaillé développé en JavaScript Pur.",
    budget: "Budget",
    mid_range: "Standard",
    luxury: "Luxe",
    days: "jours",
    browse_cities_nav: "Découvrir les Villes",
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

const localizedCityData = {
  marrakech: {
    fr: {
      name: "Marrakech",
      subtitle: "La Perle du Sud",
      desc: "Découvrez Marrakech, joyau impérial mondialement célèbre. Admirez ses palais d'argile, aventurez-vous au gré des souks traditionnels et savourez la légendaire hospitalité marocaine.",
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
      subtitle: "La Cité Bleue",
      desc: "Embarquez vers le calme envoûtant du Rif. Une balade inoubliable au milieu de ruelles blanchies d'un bleu magique et des sommets montagneux verdoyants.",
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
      subtitle: "Athènes de l'Afrique",
      desc: "Visitez Fès, mémoire vivante de l'art de vivre et de l'artisanat du Maroc. Flânez à l'ombre de la plus monumentale médina préservée au monde.",
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
      subtitle: "L'ancienne Mogador",
      desc: "Respirez le parfum de la mer à Essaouira. Admirez ses fortifications portugaises, son port d'embarcation bleu et laissez-vous emporter par ses galeries de peinture.",
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

let currentLang = getNavLanguage();
let activeCityData = null;

document.addEventListener('DOMContentLoaded', () => {
  initCityDetail();
});

async function initCityDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const cityId = urlParams.get('id') || 'marrakech'; 

  try {
    const response = await fetch('/data/cities.json');
    if (!response.ok) {
      throw new Error(`Failed to load cities.json database file: ${response.statusText}`);
    }
    const cities = await response.json();
    
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

    // Listen to real-time navbar language toggling event
    window.addEventListener('languageChanged', (e) => {
      currentLang = e.detail.lang;
      renderCityProfile();
    });

  } catch (error) {
    console.error('Error fetching city profile details:', error);
    showErrorState();
  }
}

// Dynamically sets title, metadata and description for SEO compliance
function updateSEO(city) {
  const isFr = currentLang === 'fr';
  const titleText = isFr 
    ? `Voyage à ${city.name} - Meilleurs Lieux, Hébergements & Guide Local`
    : `Explore ${city.name} - Best Sights, Riad Lodgings & Local Guides • Portal`;
  document.title = titleText;

  // 1. Meta description (between 120 and 160 characters)
  const descText = isFr
    ? `Découvrez ${city.name}, Maroc. Explorez les meilleurs lieux historiques, les recommandations de riads authentiques et les transports locaux.`
    : `Discover ${city.name}, Morocco. Explore top historical sights, authentic traditional riad lodging recommendations, and local transit networks for a safe journey.`;
  
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.name = "description";
    document.head.appendChild(descMeta);
  }
  descMeta.content = descText;

  // 2. Canonical URL Link
  const canonicalUrl = `https://gomoroccoai.com/city.html?id=${city.id.toLowerCase()}`;
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
        "name": isFr ? "Accueil" : "Home",
        "item": "https://gomoroccoai.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isFr ? "Villes" : "Cities",
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
  return translations[currentLang]?.[key] || translations['en']?.[key] || key;
}

function renderCityProfile() {
  if (!activeCityData) return;

  // Set Language and Direction
  document.documentElement.setAttribute('lang', currentLang);
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
  setElText('lbl-tab-hotels', t('tab_hotels'));
  setElText('lbl-tab-transit', t('tab_transit'));
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

  // Swap content with French localization if active
  let cityName = activeCityData.name;
  let cityExcerpt = currentLang === 'fr' 
    ? `Un guide complet pour explorer la culture locale de ${activeCityData.name}. Découvrez les secrets de son histoire, réservez des hébergements traditionnels insolites et maîtrisez les moyens de transport locaux.`
    : `A comprehensive travel blueprint to inspect the dynamic culture in ${activeCityData.name}. Unearth the historical background, locate elegant lodgings, and browse the transport modes.`;
  let cityCultureNote = activeCityData.cultural_note;

  if (currentLang === 'fr' && localizedCityData[activeCityData.id]) {
    const loc = localizedCityData[activeCityData.id].fr;
    if (loc.name) cityName = loc.name;
    if (loc.desc) cityExcerpt = loc.desc;
    if (loc.cultural_note) cityCultureNote = loc.cultural_note;
  }

  // Render Names & Description
  setElHtml('city-title-display', cityName);
  setElText('city-desc-display', cityExcerpt);

  // Render Sidebar Facts
  setElText('fact-duration-val', `${activeCityData.suggested_days} ${t('days')}`);
  
  const displayRegion = translations[currentLang].regions[activeCityData.region] || activeCityData.region;
  setElText('fact-region-val', displayRegion);

  // Render Cultural note
  setElText('cultural-text-display', cityCultureNote);

  // Tab contents populations
  renderTabPlacesContent();
  renderTabHotelsContent();
  renderTabTransitContent();

  // Refresh Lucide Icons inside the new views
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 1. Renders the Top Places view of Attractions (with French support if active)
function renderTabPlacesContent() {
  const container = document.getElementById('places-list');
  if (!container) return;
  container.innerHTML = '';

  let attractions = activeCityData.attractions;
  if (currentLang === 'fr' && localizedCityData[activeCityData.id]) {
    attractions = localizedCityData[activeCityData.id].fr.attractions.map((attr, idx) => ({
      ...attr,
      image: activeCityData.attractions[idx]?.image || attr.image
    }));
  }

  attractions.forEach(place => {
    let displayName = place.name;
    let displayDesc = place.description;

    const card = document.createElement('div');
    card.className = 'place-detail-card';
    card.innerHTML = `
      <img class="place-detail-img" src="${place.image}" alt="${displayName}" referrerPolicy="no-referrer" />
      <div class="place-detail-body">
        <h4 class="place-detail-name">${displayName}</h4>
        <p class="place-detail-desc">${displayDesc}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// 2. Renders the Accommodations options (with French support if active)
function renderTabHotelsContent() {
  const container = document.getElementById('hotels-deck');
  if (!container) return;
  container.innerHTML = '';

  let hotels = activeCityData.hotels;
  if (currentLang === 'fr' && localizedCityData[activeCityData.id]) {
    hotels = localizedCityData[activeCityData.id].fr.hotels;
  }

  const tiers = ['budget', 'mid_range', 'luxury'];
  tiers.forEach(tier => {
    const hotel = hotels[tier] || activeCityData.hotels[tier]; // fallback to raw json if french is partial
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

// 3. Renders the Transportation system list (with French support if active)
function renderTabTransitContent() {
  const container = document.getElementById('transit-deck');
  if (!container) return;
  container.innerHTML = '';

  let transportation = activeCityData.transportation;
  if (currentLang === 'fr' && localizedCityData[activeCityData.id]) {
    transportation = localizedCityData[activeCityData.id].fr.transportation;
  }

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
  
  const fallbackTitle = currentLang === 'fr' ? "Cité Introuvable • Portail" : "City Profile Not Found • GoMoroccoAI Portal";
  document.title = fallbackTitle;
  
  setElText('lbl-error-title', t('error_title'));
  setElText('lbl-error-desc', t('error_desc'));
  setElText('lbl-error-btn', t('error_btn'));
}
