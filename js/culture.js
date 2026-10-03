// Moroccan Cultural Diversity Page JS (English-only)
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
    amazigh_text1: "Amazigh communities have deep roots across Morocco and North Africa. Amazigh languages, arts, agricultural knowledge, and regional traditions are important parts of Morocco's diverse cultural life; practices and identities vary between communities.",
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
    hospitality_text1: "Hospitality is valued in many Moroccan homes and communities, often expressed through greetings, tea, or a shared meal. Customs differ by family, region, generation, and setting, so visitors should follow their host's lead rather than expect one universal ritual.",
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
    weddings_text2: "Moroccan wedding celebrations vary widely. Some include a henna gathering, several outfits chosen by the couple, regional music, and an ornate platform known as an Ammariya; others are shorter or combine local and contemporary customs. No single sequence or number of kaftans applies to every family.",

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
  }
};

const proverbs = [
  "“Trust in your own hand, not in your brother's.” (Self-reliance is the true key to victory)",
  "“Little by little, the camel gets into the couscous pot.” (Patience and steady effort achieve the impossible)",
  "“One pomegranate is enough to feed a whole city, if the hearts are united.” (Unity and shared love amplify simple blessings)",
  "“Slowly, slowly water flows into the river and fills it.” (Gentleness and small daily habits create massive outcomes)",
  "“Understanding is better than gold.” (True wealth is intellect and wisdom)",
  "« The tea is a hospitality ritual, and hospitality is a life obligation. »"
];

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
}

function t(key) {
  return translations.en?.[key] || key;
}

function renderAllTexts() {
  // Update HTML direction attributes
  document.documentElement.setAttribute('lang', 'en');
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
  const text = proverbs[currentProverbIndex] || '';
  
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
