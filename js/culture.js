// Moroccan Cultural Diversity Page JS
// Bilingual English & Français
import { getNavLanguage } from './auth-nav.js';

const translations = {
  en: {
    back_home: "Back to Home",
    browse_cities: "Browse Cities",
    culture_title: "Morocco's Cultural Diversity",
    culture_subtitle: "An Ancient Mosaic of Civilizations & Traditions",
    culture_intro: "Morocco is celebrated globally for its rich, pluralistic identity. Formally recognized in the Kingdom's national constitution, Moroccan culture brings together Arab-Islamic, Amazigh (Berber), and Saharan-Hassani currents, beautifully enriched by African, Andalusian, Hebraic, and Mediterranean influences of peace and coexistence.",
    
    // Core Topics
    amazigh_title: "Amazigh Heritage",
    amazigh_subtitle: "The Foundation of Moroccan Identity",
    amazigh_text1: "The Amazigh (meaning 'free people') are the indigenous inhabitants of Morocco, with archaeological roots extending back thousands of years. Their resilient mountain spirit, language, and worldview form the absolute bedrock of Moroccan society.",
    amazigh_text2: "This rich culture is proudly preserved through dynamic customs, unique regional Amazigh dialects (Tachelhit, Tamazight, Tarifit), and exquisite artifacts. From the geometric protection symbols stamped in crimson clay pottery to stunning tribal silver talismans adorned with amber and real coral, and the traditional flat-weave tribal carpets woven with local wool, Amazigh craftsmanship represents an unbroken legacy of historical artistry.",

    andalusian_title: "Arab & Andalusian Artistry",
    andalusian_subtitle: "A Symbiosis of Scholars and Architects",
    andalusian_text1: "The Arab-Islamic influx from the 7th century onwards brought monumental changes, introducing classical scholarship and blending beautifully with Andalusian exiles who settled in royal cities like Fez, Meknes, Rabat, and Tetouan.",
    andalusian_text2: "This aesthetic marriage created breathtaking high-craft wonders: mathematical geometric zellige tilework, intricate carved plaster (stucco), and masterfully detailed cedarwood ceilings. This physical legacy is paired with the acoustic mastery of Al-Ala (Andalusian classical music), a soulful, orchestral performance that represents a living historic link to the courtyards of Moorish Spain.",

    cuisine_title: "Moroccan Culinary Arts",
    cuisine_subtitle: "A Masterpiece of Sensory Pairings",
    cuisine_text1: "Moroccan gastronomy is renowned as one of the world's most vibrant culinary traditions. It is a slow-cooked tapestry where savory and sweet flavor notes balance effortlessly, accented by native herbs like saffron, cumin, ginger, and fresh mint.",
    cuisine_text2: "Key culinary symbols include the slow-simmered Tajine, named after the iconic conical clay pot that retains moisture; the legendary Friday dish Couscous, composed of hand-rolled semolina steamed over seven seasonal vegetables; the sweet-and-savory seafood or chicken Pastilla wrapped in flaky pastry sheets; and 'Moroccan Whiskey'—hot green tea masterfully infused with fresh peppermint leaves and poured from height to create a majestic crown of foam.",

    attire_title: "Traditional Clothing & Craftswork",
    attire_subtitle: "Timeless Elegance of National Pride",
    attire_text1: "Traditional Moroccan attire is a visual statement of dignity, modesty, and deep-seated artistic pride. Historically hand-loomed and embroidered, these elegant garments remain active, beloved pieces worn proudly during celebrations and daily life.",
    attire_text2: "Men and women wear the Djellaba, a loose-fitting, cozy hooded outer robe tailored to insulate against both mountain snows and desert sands. For grand occasions, Moroccan women wear the spectacular Kaftan or Takchita, a luxurious multi-piece silk dress heavily embroidered with golden threads (Sfifa) and hand-stitched buttons. These are paired with traditional, super-soft yellow leather Babouches (slippers) crafted by guilds in ancient medina souks.",

    festivals_title: "Seasons, Festivals & Tbourida",
    festivals_subtitle: "Vibrant Rhythms of Shared Celebrations",
    festivals_text1: "Throughout Morocco, seasonal festivals (Moussems) commemorate harvests, historic dates, and local saints, turning historical town squares into active canvases of musical expression, dance, and poetry.",
    festivals_text2: "Major events include the fragrant Rose Festival in the desert valleys of Kelaat M'gouna, the spiritual Gnaoua World Music Festival in windswept Essaouira, and legendary, explosive Tbourida (Fantasia) displays—where synchronised riders in white jellabas raise muzzle-loading rifles to the sky and gallop at breakneck speed, unleashing a simultaneous roar of gunpowder that honors cavalry ancestors.",

    // New Category 6: Moroccan Music & Instruments
    music_title: "Moroccan Music & Instruments",
    music_subtitle: "Soulful Rhythms of Desert & Medina",
    music_text1: "Moroccan music is a powerful auditory map of the country’s diverse history. It ranges from the spiritual, hypnotic trance rhythms of Gnawa (brought by sub-Saharan ancestors) to the sophisticated, classical Al-Ala orchestral strings inherited from Moorish Andalusia.",
    music_text2: "Traditional instruments form the heartbeat of these melodies. Master luthiers craft the wooden Oud (a fretless lute), the Hajhouj or Guembri (a three-stringed skin-covered bass lute played by Gnawa maâlems), the metallic Qraqeb cymbals, and various hand drums like the Bendir and Darbuka, creating an acoustic heritage that resonates across generations.",

    // New Category 7: Moroccan Hospitality & Tea Ceremony
    hospitality_title: "Hospitality & Tea Ceremony",
    hospitality_subtitle: "An Unbending Sacred Ritual of Welcome",
    hospitality_text1: "In Morocco, hospitality is not merely a polite gesture; it is a sacred cultural duty and an art form. Guests are welcomed with open arms, genuine warmth, and a generosity that makes no distinction between family, friends, or weary travelers.",
    hospitality_text2: "At the heart of this welcoming ritual is the famous Moroccan Mint Tea, affectionately known as 'Moroccan Whiskey'. Brewed with green gunpowder tea, fresh spearmint leaves, and generous sugar, it is ceremoniously poured from silver teapots held high above small decorated glasses. The resulting layer of crown-like foam (Rezza) is a sign of respect and warm welcome to the guest.",

    // New Category 8: Traditional Souks & Artisan Markets
    souks_title: "Traditional Souks & Artisan Markets",
    souks_subtitle: "A Sensory Maze of Living Masterpieces",
    souks_text1: "The historic medinas of Morocco are centered around vibrant 'souks'—labyrinthine markets organized by craft guilds that have operated for over a thousand years. Wandering through these alleyways is a journey back in time, alive with the sounds of hammers on brass and the scent of cedar and spices.",
    souks_text2: "Each souk specializes in a distinct craft: shimmering copper and brass lanterns in the metalworking souk, colorful hand-dyed wool skeins drying in the sun, fine leather goods, and intricate zellige clay tiles. These markets are not just tourist attractions, but highly structured ecosystems where master artisans (Maâlems) transmit centuries-old skills to the next generation.",

    // New Category 9: Moroccan Weddings & Family Traditions
    weddings_title: "Moroccan Weddings & Family",
    weddings_subtitle: "Luxurious Multi-Day Celebrations of Love",
    weddings_text1: "Family is the cornerstone of Moroccan society, and nowhere is this more beautifully demonstrated than in the grand celebrations of marriage. A traditional Moroccan wedding is a legendary, multi-day feast of music, gastronomy, and high-fashion couture that unites families and communities.",
    weddings_text2: "The ceremony features ancient steps, beginning with the pre-wedding Henna night where the bride's hands and feet are adorned with intricate protective patterns. On the main night, the bride wears up to seven different traditional kaftans representing various regions of Morocco. She is carried majestically on an ornate platform (Ammariya) by male relatives, while guests dance to traditional love songs under glittering chandeliers.",

    // New Category 10: Storytelling, Halqa & Folk Traditions
    folklore_title: "Storytelling, Halqa & Folklore",
    folklore_subtitle: "The Living Library of Jemaa el-Fnaa",
    folklore_text1: "Morocco possesses an exceptionally rich oral tradition, where history, moral philosophies, and magical legends are kept alive through spoken word. The pinnacle of this art is the 'Halqa' (circle gathering), an ancient form of street theater performed in public squares, most famously Marrakech's Jemaa el-Fnaa.",
    folklore_text2: "In these circles, master storytellers (Hlayquia) command crowds with dramatic tales from the Arabian Nights, historical epics, and local folklore. Accompanied by musicians, acrobats, and dancers, they transform public spaces into interactive theaters, representing a UNESCO-recognized Masterpiece of the Oral and Intangible Heritage of Humanity.",

    // Interactive Proverb section
    proverbs_header: "Traditional Wisdom & Proverbs",
    proverbs_subheader: "Tap below for a timeless spark of Moroccan philosophical guidance",
    next_proverb_btn: "Get Another Proverb",
    proverb_label: "Moroccan Wisdom",

    // Footer
    credit: "GoMoroccoAI Explorer • Cultural Diversity Showcase crafted with care.",
    planner_nav: "AI Planner"
  },
  fr: {
    back_home: "Retour à l'Accueil",
    browse_cities: "Découvrir les Villes",
    culture_title: "Diversité Culturelle du Maroc",
    culture_subtitle: "Une Mosaïque Millénaire de Civilisations & de Traditions",
    culture_intro: "Le Maroc est célèbre dans le monde entier pour sa richesse et son identité plurielle. Inscrite dans la Constitution nationale du Royaume, la culture marocaine réunit des courants arabo-islamiques, amazighs (berbères) et saharo-hassaniens, magnifiquement enrichis par des influences africaines, andalouses, hébraïques et méditerranéennes de paix et de coexistence.",
    
    // Core Topics
    amazigh_title: "Patrimoine Amazigh",
    amazigh_subtitle: "Le Socle Fondateur de l'Identité Marocaine",
    amazigh_text1: "Les Amazighs (qui signifie 'hommes libres') sont les premiers habitants du Maroc, avec des racines archéologiques qui remontent à des milliers d'années. Leur résilience, leur langue et leur vision du monde constituent la base absolue de la société marocaine.",
    amazigh_text2: "Cette riche culture est fièrement préservée grâce à des coutumes vivantes, des dialectes régionaux (Tachelhit, Tamazight, Tarifit) et des créations merveilleuses. Des motifs géométriques protecteurs façonnés dans la poterie d'argile rouge aux somptueux bijoux en argent ornés d'ambre et de corail, en passant par les tapis tissés à la main, l'artisanat amazigh témoigne d'un savoir-faire ancestral.",

    andalusian_title: "L'Art Arabo-Andalou",
    andalusian_subtitle: "Une Symbiose d'Érudition et d'Architecture",
    andalusian_text1: "L'apport arabo-islamique à partir du VIIe siècle a profondément façonné le Maroc, introduisant les sciences classiques et s'unissant de façon spectaculaire avec l'héritage des exilés d'Andalousie qui se sont installés dans les villes impériales telles que Fès, Meknès, Rabat et Tétouan.",
    andalusian_text2: "Cette union esthétique a donné naissance à des chefs-d'œuvre architecturaux : carreaux de zellige aux savants décors géométriques, stucs sculptés à la main et plafonds monumentaux en bois de cèdre. Cet héritage s'accompagne de la musique classique Al-Ala (musique andalouse), une expression orchestrale subtile reliant le Maroc d'aujourd'hui aux fastes d'Al-Andalus.",

    cuisine_title: "L'Art Culinaire Marocain",
    cuisine_subtitle: "Un Chef-d'œuvre Équilibré de Saveurs",
    cuisine_text1: "La gastronomie marocaine figure parmi les traditions culinaires les plus appréciées au monde. Il s'agit d'une symphonie de saveurs douces, salées et épicées, rehaussée de condiments parfumés comme le safran, le cumin, le gingembre et la menthe fraîche.",
    cuisine_text2: "Ses grands symboles comprennent le Tajine, cuit lentement à l'étouffée dans son plat conique en terre cuite caractéristique, et le Couscous traditionnel du vendredi, composé de semoule de blé fine cuite à la vapeur accompagnée de sept légumes de saison. S'y ajoutent la Pastilla farcie croustillante et le fameux thé à la menthe servi bien chaud et versé de haut pour former sa couronne de mousse.",

    attire_title: "Habits Traditionnels & Artisanat",
    attire_subtitle: "L'Élégance Préservée de la Nation",
    attire_text1: "Les vêtements traditionnels du Maroc racontent une histoire de dignité, de modestie et de grande fierté artistique. Façonnés et brodés à la main, ces habits précieux restent portés avec fierté lors des fêtes comme au quotidien.",
    attire_text2: "Les hommes et les femmes portent la Djellaba, une longue robe ample à capuchon confectionnée pour protéger du froid des montagnes comme de la chaleur du désert. Pour les grandes réceptions, les femmes marocaines arborent le somptueux Caftan ou la Takchita, une robe de soie brodée de fils d'or (Sfifa) et ornée de boutons faits main (Aâkad). Ces tenues sont complétées par des babouches de cuir souple réalisées par les artisans des souks.",

    festivals_title: "Saisons, Fêtes & Tbourida",
    festivals_subtitle: "Les Rythmes Vibrants des Célébrations",
    festivals_text1: "À travers tout le pays, de nombreux festivals saisonniers (Moussems) fêtent les moissons, l'histoire ou les traditions locales, transformant les places publiques en scènes de musique, de danse et d'art oratoire authentiques.",
    festivals_text2: "Parmi les événements majeurs figurent la Fête des Roses dans la vallée saharienne de Kelaat M'gouna, le Festival de musique Gnaoua d'Essaouira et les spectaculaires démonstrations de Tbourida (Fantasia) — où des cavaliers synchronisés en djellabas blanches s'élancent en galop effréné avant de tirer en l'air au même instant un coup de fusil à poudre noire.",

    // New Category 6: Moroccan Music & Instruments
    music_title: "Musique Marocaine & Instruments",
    music_subtitle: "Rythmes Envoûtants du Désert et des Médinas",
    music_text1: "La musique marocaine est une véritable carte sonore retraçant la riche histoire du pays. Elle s'étend des rythmes hypnotiques et spirituels de la musique Gnaoua (héritée des ancêtres subsahariens) aux mélodies orchestrales sophistiquées de l'Al-Ala, legs de l'Andalousie maure.",
    music_text2: "Les instruments traditionnels constituent le cœur battant de ces mélodies. Les maîtres luthiers façonnent l'Oud en bois de cèdre (un luth sans frettes), le Hajhouj ou Guembri (un luth basse à trois cordes recouvert de peau utilisé par les maâlems Gnaoua), les crotales métalliques Qraqeb, ainsi que divers tambours à main comme le Bendir et la Darbouka.",

    // New Category 7: Moroccan Hospitality & Tea Ceremony
    hospitality_title: "Hospitalité & Cérémonie du Thé",
    hospitality_subtitle: "Le Rituel Sacré de la Bienvenue",
    hospitality_text1: "Au Maroc, l'hospitalité n'est pas un simple geste de politesse ; c'est un devoir culturel sacré et un véritable art de vivre. Les invités sont accueillis à bras ouverts avec une chaleur et une générosité sincères, sans distinction entre proches ou voyageurs.",
    hospitality_text2: "Le cœur de ce rituel d'accueil bat au rythme du fameux thé à la menthe marocain. Préparé avec du thé vert, des feuilles de menthe fraîche (Naanaâ) et du sucre, il est versé cérémonieusement depuis une théière en argent tenue bien haute au-dessus de verres décorés. La mousse ainsi formée, appelée 'couronne' (Rezza), est un gage de respect et d'hospitalité.",

    // New Category 8: Traditional Souks & Artisan Markets
    souks_title: "Souks Traditionnels & Marchés d'Artisans",
    souks_subtitle: "Le Labyrinthe Sensoriel des Métiers d'Art",
    souks_text1: "Les médinas historiques du Maroc s'articulent autour de souks animés — des marchés labyrinthiques organisés par corporations d'artisans depuis plus d'un millénaire. S'y promener est un véritable voyage dans le temps, bercé par le martèlement du cuivre et l'odeur du cèdre et des épices.",
    souks_text2: "Chaque souk est spécialisé : lanternes en cuivre ciselé, écheveaux de laine colorés séchant au soleil, maroquinerie fine en cuir souple et carreaux de zellige. Ces marchés sont des écosystèmes structurés où les maîtres artisans (Maâlems) transmettent des savoir-faire séculaires aux apprentis.",

    // New Category 9: Moroccan Weddings & Family Traditions
    weddings_title: "Mariages & Traditions Familiales",
    weddings_subtitle: "Les Fastueuses Célébrations de l'Union",
    weddings_text1: "La famille est la pierre angulaire de la société marocaine, et nulle part cela n'est mieux illustré que lors des célébrations de mariage. Un mariage marocain traditionnel est une fête légendaire étalée sur plusieurs jours, mêlant haute couture, délices culinaires et musiques envoûtantes.",
    weddings_text2: "La cérémonie suit des rituels ancestraux, à commencer par la nuit du henné où les mains de la mariée sont ornées de motifs protecteurs. Lors de la grande soirée, la mariée revêt jusqu'à sept caftans traditionnels représentant les régions du pays, et est portée sur l'Ammariya, une chaise à porteurs dorée, sous les chants et les youyous.",

    // New Category 10: Storytelling, Halqa & Folk Traditions
    folklore_title: "Contes, Halqa & Traditions Orales",
    folklore_subtitle: "La Bibliothèque Vivante de Jemaa el-Fnaa",
    folklore_text1: "Le Maroc possède une tradition orale exceptionnellement riche, où l'histoire, la philosophie morale et les légendes fantastiques restent vivantes par la parole. Le sommet de cet art est la 'Halqa' (le cercle d'auditeurs), une forme de théâtre de rue ancestrale pratiquée dans les places publiques, principalement à Jemaa el-Fnaa.",
    folklore_text2: "Dans ces cercles, les maîtres conteurs (Hlayquia) captivent les foules avec des récits épiques et des contes populaires, accompagnés de musiciens et d'acrobates. Ils transforment la place publique en un théâtre interactif, classé chef-d'œuvre du patrimoine oral et immatériel de l'humanité par l'UNESCO.",

    proverbs_header: "Sagesse & Proverbes Traditionnels",
    proverbs_subheader: "Cliquez ci-dessous pour découvrir une pensée issue de la sagesse populaire marocaine",
    next_proverb_btn: "Obtenir un autre proverbe",
    proverb_label: "Sagesse Marocaine",

    credit: "GoMoroccoAI Explorer • Portail de découverte culturelle réalisé avec soin.",
    planner_nav: "Planificateur interactif"
  }
};

const proverbs = [
  {
    en: "“Trust in your own hand, not in your brother's.” (Self-reliance is the true key to victory)",
    fr: "« Ne compte que sur ta propre main, pas sur celle de ton frère. » (L'autonomie est la clé véritable de la réussite)"
  },
  {
    en: "“Little by little, the camel gets into the couscous pot.” (Patience and steady effort achieve the impossible)",
    fr: "« Petit à petit, le chameau entre dans la marmite de couscous. » (Avec du temps et de la patience, on vient à bout de tout)"
  },
  {
    en: "“One pomegranate is enough to feed a whole city, if the hearts are united.” (Unity and shared love amplify simple blessings)",
    fr: "« Une grenade suffit à nourrir toute une ville si les cœurs sont unis. » (L'union sacrée multiplie les moindres richesses)"
  },
  {
    en: "“Slowly, slowly water flows into the river and fills it.” (Gentleness and small daily habits create massive outcomes)",
    fr: "« Doucement, doucement l'eau s'écoule dans la rivière et la remplit. » (La douceur et la constance mènent aux plus grands accomplissements)"
  },
  {
    en: "“Understanding is better than gold.” (True wealth is intellect and wisdom)",
    fr: "« Mieux vaut de l'esprit que de l'or. » (La vraie fortune réside dans l'intelligence et la sagesse)"
  },
  {
    en: "« The tea is a hospitality ritual, and hospitality is a life obligation. »",
    fr: "« Le thé est un rituel d'accueil, et l'accueil est un devoir de vie. » (L'hospitalité marocaine est sacrée)"
  }
];

let currentLang = getNavLanguage();
let currentProverbIndex = 0;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initCulturePage();
  });
} else {
  initCulturePage();
}

function initCulturePage() {
  setupProverbHandler();
  renderAllTexts();
  
  // Real-time language updates
  window.addEventListener('languageChanged', (e) => {
    currentLang = e.detail.lang;
    renderAllTexts();
  });
}

function t(key) {
  return translations[currentLang]?.[key] || translations['en']?.[key] || key;
}

function renderAllTexts() {
  // Update HTML direction attributes
  document.documentElement.setAttribute('lang', currentLang);
  document.documentElement.setAttribute('dir', 'ltr');

  const setElText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  // Set navbar targets and buttons
  setElText('lbl-back-home', t('back_home'));
  setElText('lbl-nav-cities', t('browse_cities'));
  
  const lblNavPlanner = document.getElementById('lbl-nav-planner');
  if (lblNavPlanner) {
    lblNavPlanner.textContent = t('planner_nav');
  }

  // Titles & Introductions
  setElText('culture-main-title', t('culture_title'));
  setElText('culture-main-subtitle', t('culture_subtitle'));
  setElText('culture-intro-text', t('culture_intro'));

  // Category 1: Amazigh Heritage
  setElText('title-amazigh', t('amazigh_title'));
  setElText('subtitle-amazigh', t('amazigh_subtitle'));
  setElText('p1-amazigh', t('amazigh_text1'));
  setElText('p2-amazigh', t('amazigh_text2'));

  // Category 2: Arab-Andalusian
  setElText('title-andalusian', t('andalusian_title'));
  setElText('subtitle-andalusian', t('andalusian_subtitle'));
  setElText('p1-andalusian', t('andalusian_text1'));
  setElText('p2-andalusian', t('andalusian_text2'));

  // Category 3: Gastronomy
  setElText('title-cuisine', t('cuisine_title'));
  setElText('subtitle-cuisine', t('cuisine_subtitle'));
  setElText('p1-cuisine', t('cuisine_text1'));
  setElText('p2-cuisine', t('cuisine_text2'));

  // Category 4: Clothing
  setElText('title-attire', t('attire_title'));
  setElText('subtitle-attire', t('attire_subtitle'));
  setElText('p1-attire', t('attire_text1'));
  setElText('p2-attire', t('attire_text2'));

  // Category 5: Festivals
  setElText('title-festivals', t('festivals_title'));
  setElText('subtitle-festivals', t('festivals_subtitle'));
  setElText('p1-festivals', t('festivals_text1'));
  setElText('p2-festivals', t('festivals_text2'));

  // Category 6: Music
  setElText('title-music', t('music_title'));
  setElText('subtitle-music', t('music_subtitle'));
  setElText('p1-music', t('music_text1'));
  setElText('p2-music', t('music_text2'));

  // Category 7: Hospitality
  setElText('title-hospitality', t('hospitality_title'));
  setElText('subtitle-hospitality', t('hospitality_subtitle'));
  setElText('p1-hospitality', t('hospitality_text1'));
  setElText('p2-hospitality', t('hospitality_text2'));

  // Category 8: Souks
  setElText('title-souks', t('souks_title'));
  setElText('subtitle-souks', t('souks_subtitle'));
  setElText('p1-souks', t('souks_text1'));
  setElText('p2-souks', t('souks_text2'));

  // Category 9: Weddings
  setElText('title-weddings', t('weddings_title'));
  setElText('subtitle-weddings', t('weddings_subtitle'));
  setElText('p1-weddings', t('weddings_text1'));
  setElText('p2-weddings', t('weddings_text2'));

  // Category 10: Folklore
  setElText('title-folklore', t('folklore_title'));
  setElText('subtitle-folklore', t('folklore_subtitle'));
  setElText('p1-folklore', t('folklore_text1'));
  setElText('p2-folklore', t('folklore_text2'));

  // Interactive Proverbs Layout Title
  setElText('proverbs-h2', t('proverbs_header'));
  setElText('proverbs-p-desc', t('proverbs_subheader'));
  setElText('btn-next-proverb', t('next_proverb_btn'));
  setElText('proverb-badge-lbl', t('proverb_label'));

  // Footer credits
  setElText('lbl-foot-credit-cult', t('credit'));

  // Render active proverb text
  updateProverbText();

  // Re-generate Lucide CDN icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updateProverbText() {
  const container = document.getElementById('proverb-content-block');
  const text = proverbs[currentProverbIndex]?.[currentLang] || proverbs[currentProverbIndex]?.['en'] || '';
  
  if (container) {
    container.style.opacity = '0';
    container.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      container.textContent = text;
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }, 200);
  }
}

function setupProverbHandler() {
  const proverbBtn = document.getElementById('btn-next-proverb');
  if (!proverbBtn) return;

  proverbBtn.addEventListener('click', () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * proverbs.length);
    } while (nextIndex === currentProverbIndex && proverbs.length > 1);
    
    currentProverbIndex = nextIndex;
    updateProverbText();
  });
}
