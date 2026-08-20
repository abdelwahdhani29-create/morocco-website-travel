// GoMoroccoAI Blog Articles Registry (Bilingual English & French)
// Modulized and expanded for optimal performance and SEO compliance.

import { postWhatToWearInMorocco } from "./posts/what-to-wear-in-morocco.js";
import { postWhyMoroccoFastestGrowingDestination } from "./posts/why-morocco-fastest-growing-destination.js";
import { postMoroccoBrokeRecords2026 } from "./posts/morocco-broke-tourism-records-2026.js";
import { postMoroccoTravelTips30Things } from "./posts/morocco-travel-tips-30-things-to-know.js";
import { postWorldCup2026 } from "./posts/world-cup-2026.js";
import { postIsMoroccoSafe2026 } from "./posts/is-morocco-safe-2026.js";
import { postBestTime } from "./posts/best-time.js";
import { postMarrakech } from "./posts/marrakech.js";
import { postChefchaouen } from "./posts/chefchaouen.js";
import { postMerzouga } from "./posts/merzouga.js";
import { postFez } from "./posts/fez.js";
import { postEssaouira } from "./posts/essaouira.js";
import { postRabat } from "./posts/rabat.js";
import { postSafetyEtiquette } from "./posts/safety-etiquette.js";
import { postCasablanca } from "./posts/casablanca.js";
import { postBestPlaces } from "./posts/best-places-to-visit-in-morocco.js";
import { postMoroccoItineraryFirstTime } from "./posts/morocco-itinerary-first-time.js";
import { postMoroccoCostOfTravel } from "./posts/morocco-cost-of-travel.js";
import { postHowMuchCashToBringToMorocco } from "./posts/how-much-cash-to-bring-to-morocco.js";
import { postMoroccoVisaRequirements } from "./posts/morocco-visa-requirements.js";

export const blogPosts = [
  postMoroccoVisaRequirements,
  postHowMuchCashToBringToMorocco,
  postMoroccoCostOfTravel,
  postMoroccoItineraryFirstTime,
  postBestPlaces,
  postCasablanca,
  postWhatToWearInMorocco,
  postWhyMoroccoFastestGrowingDestination,
  postMoroccoBrokeRecords2026,
  postMoroccoTravelTips30Things,
  postWorldCup2026,
  postIsMoroccoSafe2026,
  postSafetyEtiquette,
  postBestTime,
  postMarrakech,
  postChefchaouen,
  postMerzouga,
  postFez,
  postEssaouira,
  postRabat
];

const verificationSourcesById = {
  "morocco-itinerary-first-time": [
    ["ONCF Voyages — official train schedules", "https://www.oncf-voyages.ma/"],
    ["ONDA — official airport information", "https://www.onda.ma/"],
    ["Morocco National Tourism Office", "https://www.visitmorocco.com/"]
  ],
  "why-morocco-fastest-growing-destination": [
    ["Morocco National Tourism Office", "https://www.visitmorocco.com/"],
    ["Moroccan Tourism Observatory", "https://www.observatoiredutourisme.ma/"]
  ],
  "safety-etiquette": [
    ["UNESCO — Morocco heritage profile", "https://whc.unesco.org/en/statesparties/ma"],
    ["Morocco Constitution — official languages and institutions", "https://www.constituteproject.org/constitution/Morocco_2011"]
  ],
  "best-time-to-visit-morocco": [
    ["Morocco National Tourism Office", "https://www.visitmorocco.com/"],
    ["Morocco General Directorate of Meteorology", "https://www.marocmeteo.ma/"]
  ],
  "marrakech-souks-guide": [
    ["UNESCO — Medina of Marrakesh", "https://whc.unesco.org/en/list/331/"],
    ["Morocco National Tourism Office", "https://www.visitmorocco.com/"]
  ],
  "chefchaouen-azure-streets": [
    ["Morocco National Tourism Office", "https://www.visitmorocco.com/"],
    ["UNESCO — Morocco heritage profile", "https://whc.unesco.org/en/statesparties/ma"]
  ],
  "merzouga-sahara-overnight": [
    ["Morocco National Tourism Office", "https://www.visitmorocco.com/"],
    ["Morocco General Directorate of Meteorology", "https://www.marocmeteo.ma/"]
  ],
  "flavors-of-fez-culinary": [
    ["UNESCO — Medina of Fez", "https://whc.unesco.org/en/list/170/"],
    ["Morocco National Tourism Office", "https://www.visitmorocco.com/"]
  ],
  "essaouira-coastal-sanctuary": [
    ["UNESCO — Medina of Essaouira", "https://whc.unesco.org/en/list/753/"],
    ["Morocco National Tourism Office", "https://www.visitmorocco.com/"]
  ],
  "moroccan-tea-rituals": [
    ["UNESCO — Morocco intangible heritage", "https://ich.unesco.org/en/state/morocco-MA"],
    ["Morocco National Tourism Office", "https://www.visitmorocco.com/"]
  ]
};

for (const post of blogPosts) {
  const englishText = String(post.content?.en || "").replace(/<[^>]*>/g, " ").replace(/&[a-z0-9#]+;/gi, " ");
  const frenchText = String(post.content?.fr || "").replace(/<[^>]*>/g, " ").replace(/&[a-z0-9#]+;/gi, " ");
  const minutes = text => Math.max(1, Math.ceil((text.trim().match(/\S+/g) || []).length / 220));
  post.readTime = {
    en: `${minutes(englishText)} min read`,
    fr: `${minutes(frenchText)} min de lecture`
  };

  const sources = verificationSourcesById[post.id];
  if (!sources || !post.content) continue;
  const links = sources.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer" class="blog-external-link">${label}</a></li>`).join("");
  post.content.en += `<section class="article-sources"><h2>Verification sources</h2><p>Use these primary or institutional sources to confirm time-sensitive details before travel:</p><ul>${links}</ul></section>`;
  post.content.fr += `<section class="article-sources"><h2>Sources de vérification</h2><p>Utilisez ces sources officielles ou institutionnelles pour confirmer les informations susceptibles d'évoluer :</p><ul>${links}</ul></section>`;
}
