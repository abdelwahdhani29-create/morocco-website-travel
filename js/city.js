// Morocco Tourism - Vanilla JS City Profile Detail Engine (Bilingual English / Français)
import { getNavLanguage } from './auth-nav.js';
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
  },
  fr: {
    back_home: "Retour",
    back_home_text: "Retour à l'Accueil",
    palette_label: "Palette :",
    explore_tagline: "Destination Impériale Marocaine",
    loading_lbl: "Chargement de la ville...",
    loading_desc: "Récupération des données historiques authentiques, détails régionaux, guides d'étiquette culturelle, riads et transports...",
    tab_places: "Lieux à Visiter",
    tab_neighborhoods: "Quartiers",
    tab_hotels: "Où Dormir",
    tab_transit: "Transports Locaux",
    travel_tips_title: "Conseils Pratiques de Voyage",
    internal_links_title: "Guides de Voyage Associés",
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
      "Dakhla-Oued Ed-Dahab": "Dakhla-Oued Ed-Dahab",
      "Oriental": "Région de l'Oriental",
      "Beni Mellal-Khenifra": "Région de Béni Mellal-Khénifra"
    },
    best_time_title: "Meilleure Période pour Visiter",
    spring: "Printemps",
    summer: "Été",
    autumn: "Automne",
    winter: "Hiver",
    recommended: "Recommandé",
    months_spring: "Mars - Mai",
    months_summer: "Juin - Août",
    months_autumn: "Septembre - Novembre",
    months_winter: "Décembre - Février",
    budget_estimator_title: "Estimateur de Budget Quotidien",
    budget_estimator_subtitle: "Coûts quotidiens estimés par personne en Euros (€)",
    col_expense: "Catégorie de Dépense",
    row_accommodation: "Hébergement",
    row_food: "Restauration",
    row_transport: "Transports Locaux",
    row_activities: "Activités & Loisirs",
    row_total: "Total"
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
        { name: "Le Jardin Majorelle", description: "Un paradis botanique créé par la ferveur du peintre Jacques Majorelle, arborant sa céleste villa bleu cobalt outremer.", image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80" }
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
      ],
      bestTime: {
        spring: "Journées douces et soirées fraîches, jardins en fleurs. Idéal pour les visites.",
        summer: "Très chaud et sec, dépassant souvent 40°C. Privilégiez les visites tôt le matin ou tard le soir.",
        autumn: "Agréablement chaud et ensoleillé. Excellent pour les balades et festivals culturels.",
        winter: "Journées fraîches sous un grand soleil, mais les nuits sont froides. Parfait pour les petits budgets."
      }
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
        { name: "La Cascade de Ras El Maa", description: "Une rafraîchissante source d'eau douce de montagne juste à la sortie des murs de la ville, où les habitants se rassemblent.", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80" }
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
      ],
      bestTime: {
        spring: "Collines verdoyantes et douces journées ensoleillées. Idéal pour la randonnée dans le Rif.",
        summer: "Chaud et agréable, offrant une échappée fraîche par rapport aux plaines intérieures.",
        autumn: "Climat doux avec moins de touristes. Superbe pour explorer la ville dans le calme.",
        winter: "Froid et souvent pluvieux avec parfois de la neige. Prévoir des vêtements chauds."
      }
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
      ],
      bestTime: {
        spring: "Délicieusement doux et ensoleillé. Idéal pour parcourir les milliers de ruelles de la médina.",
        summer: "Chaleur intense et sèche. À éviter pour les longues marches en plein soleil.",
        autumn: "Le retour de températures agréables. Fantastique pour les circuits culturels.",
        winter: "Frais et parfois humide, mais les belles après-midis ensoleillées sont fréquentes."
      }
    }
  },
  essaouira: {
    fr: {
      name: "Essaouira",
      subtitle: "L'ancienne Mogador",
      desc: "Respirez le parfum de la mer à Essaouira. Admirez ses fortifications portugaises, son port d'embarcation bleu et laissez-vous emporter par ses galeries de peinture.",
      cultural_note: "Essaouira se distingue par sa douceur de vivre marine. Adressez des saluts chaleureux aux pêcheurs du port historique et encouragez les sculpteurs de bois précieux de thuya.",
      attractions: [
        { name: "La Sqala de la Kasbah", description: "Une promenade spectaculaire le long des anciens bastions royaux flanqués de fiers canons orientés vers la mer.", image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1200&q=80" },
        { name: "Le Port de Pêche", description: "Un port bleu et animé où chalutiers, odeurs de poisson grillé et harmonies musicales Gnaoua forment un spectacle constant.", image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80" }
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
      ],
      bestTime: {
        spring: "Agréablement doux mais venteux. Idéal pour flâner sur la plage et les remparts.",
        summer: "Doux et venté, offrant un refuge idéal contre les fortes chaleurs de l'intérieur.",
        autumn: "Ensoleillé avec des vents apaisés. Parfait pour admirer l'océan et déguster du poisson frais.",
        winter: "Doux et humide avec quelques tempêtes atlantiques. Les paysages marins y sont spectaculaires."
      }
    }
  },
  oujda: {
    fr: {
      name: "Oujda",
      subtitle: "Capitale de l'Oriental",
      desc: "Découvrez Oujda, porte du Maroc oriental. Admirez ses jardins paisibles, sa médina authentique et laissez-vous charmer par sa musique traditionnelle Gharnati.",
      cultural_note: "À Oujda, la musique Gharnati et la convivialité orientale sont reines. Le parc Lalla Aicha est idéal pour une pause sereine auprès des habitants.",
      attractions: [
        { name: "La Grande Mosquée", description: "Bâtie au XIIIe siècle, ce monument de l'ère Almohade est un chef-d'œuvre architectural au cœur de la médina.", image: "https://images.pexels.com/photos/33605163/pexels-photo-33605163.jpeg?_gl=1*2ju3qf*_ga*MTM4MjQ0MjExNS4xNzMxMjU3OTAx*_ga_8JE65Q40S6*czE3ODQ0NjU1ODIkbzIyJGcxJHQxNzg0NDY3NzQwJGoyMiRsMCRoMA.." },
        { name: "Le Parc Lalla Aïcha", description: "Un havre de verdure et de fraîcheur orné de grands arbres centenaires et de jolis bassins.", image: "https://images.unsplash.com/photo-1664185494794-97cbe900c105?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGFsbGElMjBhaWNoYSUyMHBhcmt8ZW58MHx8MHx8fDI%3D" }
      ],
      hotels: {
        budget: { name: "Hôtel L'Oasis", price_approx: 30, amenity: "Chambres simples et traditionnelles, accueil familial chaleureux" },
        mid_range: { name: "Atlas Orient", price_approx: 70, amenity: "Hôtel moderne avec piscine et situation idéale à deux pas de la médina" },
        luxury: { name: "Terminus City Center", price_approx: 130, amenity: "Hôtel haut de gamme contemporain proposant de superbes spas et vues panoramiques" }
      },
      transportation: [
        { type: "Petit Taxi", approx_cost: "10 - 20 MAD (1 - 2 USD)", description: "Petits taxis rouges parfaits pour parcourir les boulevards modernes." },
        { type: "ONCF Train", approx_cost: "120 - 200 MAD (12 - 20 USD)", description: "Liaisons directes confortables reliant Oujda à Fès, Rabat et Casablanca." }
      ],
      bestTime: {
        spring: "Climat très agréable, idéal pour se promener dans les parcs fleuris de la ville.",
        summer: "Chaud et sec, mais les soirées s'animent de concerts de musique Gharnati en plein air.",
        autumn: "Journées ensoleillées et douces, parfaites pour explorer la médina.",
        winter: "Frais avec des ondées passagères, propice aux emplettes de produits locaux."
      }
    }
  },
  "beni-mellal": {
    fr: {
      name: "Béni Mellal",
      subtitle: "L'Oasis du Moyen Atlas",
      desc: "Découvrez Béni Mellal, au pied du Moyen Atlas. Une ville célèbre pour ses oliveraies à perte de vue, ses sources jaillissantes et ses châteaux d'argile.",
      cultural_note: "La source de Ain Asserdoun est un lieu sacré de détente familiale. Veillez à préserver la pureté de ses eaux fraîches de montagne.",
      attractions: [
        { name: "La Source de Aïn Asserdoun", description: "Source d'eau de montagne spectaculaire aménagée en jardins en terrasses avec de magnifiques cascades.", image: "https://images.unsplash.com/photo-1652720187538-b1894af2dc35?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmVuaSUyMG1lbGxhbHxlbnwwfHwwfHx8Mg%3D%3D" }
      ],
      hotels: {
        budget: { name: "Hôtel Paris", price_approx: 30, amenity: "Chambres simples et soignées en plein cœur de ville" },
        mid_range: { name: "Hôtel Tazarkount", price_approx: 65, amenity: "Complexe de style riad niché au cœur de magnifiques vergers d'oliviers" },
        luxury: { name: "Hôtel Chems", price_approx: 110, amenity: "Hôtel de luxe doté d'une grande piscine, de jardins paysagers et de restaurants" }
      },
      transportation: [
        { type: "Petit Taxi", approx_cost: "10 - 15 MAD (1 - 1.50 USD)", description: "Petits taxis rouges très pratiques pour naviguer rapidement en ville." },
        { type: "Grand Taxi", approx_cost: "40 - 70 MAD (4 - 7 USD)", description: "Taxis collectifs parfaits pour rejoindre les cascades d'Ouzoud ou le lac de Bin el Ouidane." }
      ],
      bestTime: {
        spring: "La nature est florissante et la source de Aïn Asserdoun coule à plein régime.",
        summer: "Chaud et ensoleillé, mais très agréable à l'ombre des jardins de la source fraîche.",
        autumn: "Températures de saison clémentes, coïncidant avec la cueillette traditionnelle des olives.",
        winter: "Frais avec une magnifique vue sur les cimes enneigées de l'Atlas."
      }
    }
  }
};

let currentLang = getNavLanguage();
if (currentLang !== 'en' && currentLang !== 'fr') {
  currentLang = 'en';
}
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
    'eljadida', 'oujda', 'beni-mellal'
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

    // Listen to real-time navbar language toggling event
    window.addEventListener('languageChanged', (e) => {
      let lang = e.detail.lang;
      if (lang !== 'en' && lang !== 'fr') {
        lang = 'en';
      }
      currentLang = lang;
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

  // Swap content with French localization if active
  let cityName = activeCityData.name;
  let cityExcerpt = activeCityData.overview || (currentLang === 'fr' 
    ? `Un guide complet pour explorer la culture locale de ${activeCityData.name}. Découvrez les secrets de son histoire, réservez des hébergements traditionnels insolites et maîtrisez les moyens de transport locaux.`
    : `A comprehensive travel blueprint to inspect the dynamic culture in ${activeCityData.name}. Unearth the historical background, locate elegant lodgings, and browse the transport modes.`);
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
  
  const displayRegion = (translations[currentLang]?.regions?.[activeCityData.region]) || (translations['en']?.regions?.[activeCityData.region]) || activeCityData.region;
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
    if (currentLang === 'fr') {
      if (localizedCityData[activeCityData.id]?.fr?.bestTime?.[season]) {
        desc = localizedCityData[activeCityData.id].fr.bestTime[season];
      }
    }

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

// 1. Renders the Top Places view of Attractions (with French support if active)
function renderTabPlacesContent() {
  const container = document.getElementById('places-list');
  if (!container) return;
  container.innerHTML = '';

  let attractions = activeCityData.attractions || [];
  if (currentLang === 'fr' && localizedCityData[activeCityData.id]) {
    attractions = localizedCityData[activeCityData.id].fr.attractions.map((attr, idx) => ({
      ...attr,
      image: activeCityData.attractions[idx]?.image || attr.image
    }));
  }

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
