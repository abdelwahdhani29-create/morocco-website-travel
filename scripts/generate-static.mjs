import fs from 'fs';
import path from 'path';

function escapeAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function updateHeadMeta(html, { title, description, canonicalUrl, imageUrl }) {
  let updatedHtml = html;

  // Title
  if (title) {
    const titleTag = `<title>${escapeAttr(title)}</title>`;
    if (/<title>.*?<\/title>/s.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(/<title>.*?<\/title>/s, titleTag);
    } else {
      updatedHtml = updatedHtml.replace('</head>', `  ${titleTag}\n</head>`);
    }
  }

  // Meta Description
  if (description) {
    const descTag = `<meta name="description" id="seo-meta-desc" content="${escapeAttr(description)}" />`;
    if (/<meta\s+name="description"[^>]*>/s.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(/<meta\s+name="description"[^>]*>/s, descTag);
    } else {
      updatedHtml = updatedHtml.replace('</head>', `  ${descTag}\n</head>`);
    }
  }

  // Canonical link
  if (canonicalUrl) {
    const canonicalTag = `<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`;
    if (/<link\s+rel="canonical"[^>]*>/s.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(/<link\s+rel="canonical"[^>]*>/s, canonicalTag);
    } else {
      updatedHtml = updatedHtml.replace('</head>', `  ${canonicalTag}\n</head>`);
    }
  }

  // Open Graph Title
  if (title) {
    const ogTitle = `<meta property="og:title" content="${escapeAttr(title)}" />`;
    if (/<meta\s+property="og:title"[^>]*>/s.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(/<meta\s+property="og:title"[^>]*>/s, ogTitle);
    } else {
      updatedHtml = updatedHtml.replace('</head>', `  ${ogTitle}\n</head>`);
    }
  }

  // Open Graph Description
  if (description) {
    const ogDesc = `<meta property="og:description" content="${escapeAttr(description)}" />`;
    if (/<meta\s+property="og:description"[^>]*>/s.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(/<meta\s+property="og:description"[^>]*>/s, ogDesc);
    } else {
      updatedHtml = updatedHtml.replace('</head>', `  ${ogDesc}\n</head>`);
    }
  }

  // Open Graph Image
  if (imageUrl) {
    const ogImg = `<meta property="og:image" content="${escapeAttr(imageUrl)}" />`;
    if (/<meta\s+property="og:image"[^>]*>/s.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(/<meta\s+property="og:image"[^>]*>/s, ogImg);
    } else {
      updatedHtml = updatedHtml.replace('</head>', `  ${ogImg}\n</head>`);
    }
  }

  // Open Graph URL
  if (canonicalUrl) {
    const ogUrl = `<meta property="og:url" content="${escapeAttr(canonicalUrl)}" />`;
    if (/<meta\s+property="og:url"[^>]*>/s.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(/<meta\s+property="og:url"[^>]*>/s, ogUrl);
    } else {
      updatedHtml = updatedHtml.replace('</head>', `  ${ogUrl}\n</head>`);
    }
  }

  // Twitter Title
  if (title) {
    const twTitle = `<meta name="twitter:title" content="${escapeAttr(title)}" />`;
    if (/<meta\s+name="twitter:title"[^>]*>/s.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(/<meta\s+name="twitter:title"[^>]*>/s, twTitle);
    } else {
      updatedHtml = updatedHtml.replace('</head>', `  ${twTitle}\n</head>`);
    }
  }

  // Twitter Description
  if (description) {
    const twDesc = `<meta name="twitter:description" content="${escapeAttr(description)}" />`;
    if (/<meta\s+name="twitter:description"[^>]*>/s.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(/<meta\s+name="twitter:description"[^>]*>/s, twDesc);
    } else {
      updatedHtml = updatedHtml.replace('</head>', `  ${twDesc}\n</head>`);
    }
  }

  // Twitter Image
  if (imageUrl) {
    const twImg = `<meta name="twitter:image" content="${escapeAttr(imageUrl)}" />`;
    if (/<meta\s+name="twitter:image"[^>]*>/s.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(/<meta\s+name="twitter:image"[^>]*>/s, twImg);
    } else {
      updatedHtml = updatedHtml.replace('</head>', `  ${twImg}\n</head>`);
    }
  }

  return updatedHtml;
}

async function run() {
  console.log('--- Starting Static Page Generation ---');

  const rootDir = process.cwd();
  const distDir = path.join(rootDir, 'dist');
  const distCityDir = path.join(distDir, 'city');
  const distBlogDir = path.join(distDir, 'blog');

  if (!fs.existsSync(distCityDir)) fs.mkdirSync(distCityDir, { recursive: true });
  if (!fs.existsSync(distBlogDir)) fs.mkdirSync(distBlogDir, { recursive: true });

  // 1. Read Cities Data
  let cities = [];
  const citiesJsonPath = path.join(rootDir, 'public', 'data', 'cities.json');
  if (fs.existsSync(citiesJsonPath)) {
    try {
      cities = JSON.parse(fs.readFileSync(citiesJsonPath, 'utf8'));
    } catch (e) {
      console.error('Error parsing cities.json:', e);
    }
  }
  console.log(`Loaded ${cities.length} cities.`);

  // 2. Read Blog Posts Data
  let blogPosts = [];
  try {
    const blogPostsModule = await import('../js/blog-posts.js');
    blogPosts = blogPostsModule.blogPosts || blogPostsModule.default || [];
  } catch (e) {
    console.error('Error importing blog-posts.js:', e);
  }
  console.log(`Loaded ${blogPosts.length} blog posts.`);

  // 3. Read Base Templates
  let cityTemplate = '';
  const distCityTemplatePath = path.join(distDir, 'city.html');
  const srcCityTemplatePath = path.join(rootDir, 'city.html');
  if (fs.existsSync(distCityTemplatePath)) {
    cityTemplate = fs.readFileSync(distCityTemplatePath, 'utf8');
  } else if (fs.existsSync(srcCityTemplatePath)) {
    cityTemplate = fs.readFileSync(srcCityTemplatePath, 'utf8');
  }

  let blogTemplate = '';
  const distBlogTemplatePath = path.join(distDir, 'blog.html');
  const srcBlogTemplatePath = path.join(rootDir, 'blog.html');
  if (fs.existsSync(distBlogTemplatePath)) {
    blogTemplate = fs.readFileSync(distBlogTemplatePath, 'utf8');
  } else if (fs.existsSync(srcBlogTemplatePath)) {
    blogTemplate = fs.readFileSync(srcBlogTemplatePath, 'utf8');
  }

  const generatedFiles = [];

  // 4. Generate Static City Pages
  for (const city of cities) {
    const id = city.id || '';
    if (!id) continue;

    const name = (typeof city.name === 'object' ? (city.name.en || city.name.fr) : city.name) || 'Moroccan City';
    const arabicName = city.arabic_name || '';
    const coverImage = city.cover_image || city.hero_image || 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&q=80';
    const fullOverview = (typeof city.overview === 'object' ? (city.overview.en || city.overview.fr) : city.overview)
      || (typeof city.description === 'object' ? (city.description.en || city.description.fr) : city.description)
      || `Explore ${name}, a premier destination in Morocco featuring historical landmarks, vibrant souks, and cultural experiences.`;

    const shortDesc = fullOverview.length > 155 
      ? fullOverview.substring(0, 152) + '...' 
      : fullOverview;

    const title = `${name} Travel Guide • GoMoroccoAI`;
    const description = shortDesc;
    const canonicalUrl = `https://gomoroccoai.com/city/${id}.html`;

    let html = updateHeadMeta(cityTemplate, {
      title,
      description,
      canonicalUrl,
      imageUrl: coverImage
    });

    // Bake city title, overview, background image, and display grid
    html = html.replace(
      /id="city-title-display"[^>]*>.*?<\/h1>/s,
      () => `id="city-title-display" class="panoramic-city-title">${escapeAttr(name)}</h1>`
    );
    html = html.replace(
      /id="city-desc-display"[^>]*>.*?<\/p>/s,
      () => `id="city-desc-display" class="panoramic-city-desc">${escapeAttr(fullOverview)}</p>`
    );
    html = html.replace(
      /id="city-panoramic-hero"[^>]*style="[^"]*"/s,
      () => `id="city-panoramic-hero" class="city-panoramic-hero" style="background-image: url('${escapeAttr(coverImage)}');"`
    );
    html = html.replace(
      /id="city-detail-container"\s+style="display:\s*none;"/g,
      'id="city-detail-container" style="display: grid;"'
    );
    // Empty error fallback view for valid pre-rendered city pages so error text is not in static HTML
    html = html.replace(
      /<div id="error-fallback-view"[^>]*>.*?<\/div>/s,
      '<div id="error-fallback-view" class="error-card" style="display: none;"></div>'
    );

    // Pre-render Fast Facts
    const suggestedDays = city.suggested_days || city.suggested_stay || 3;
    const regionName = city.region || 'Morocco';
    const culturalNote = city.cultural_note || city.cultural_tips || `When visiting ${name}, respect local customs, greet shopkeepers warmly with 'Salam Alaykum', and dress modestly when visiting historic neighborhoods.`;

    html = html.replace(
      /<span id="fact-duration-val"[^>]*>.*?<\/span>/s,
      `<span id="fact-duration-val" class="meta-value">${escapeAttr(suggestedDays)} Days</span>`
    );
    html = html.replace(
      /<span id="fact-region-val"[^>]*>.*?<\/span>/s,
      `<span id="fact-region-val" class="meta-value">${escapeAttr(regionName)}</span>`
    );
    html = html.replace(
      /<span id="fact-languages-val"[^>]*>.*?<\/span>/s,
      `<span id="fact-languages-val" class="meta-value">Standard Moroccan Arabic, Berber &amp; French</span>`
    );
    html = html.replace(
      /id="cultural-text-display"[^>]*>.*?<\/div>/s,
      `id="cultural-text-display" class="cultural-note-text">${escapeAttr(culturalNote)}</div>`
    );

    // 1. Pre-render Places / Attractions
    const attractions = Array.isArray(city.attractions) ? city.attractions : [];
    if (attractions.length > 0) {
      const placesHtml = attractions.map(place => {
        const pName = place.name || 'Attraction';
        const pDesc = place.description || '';
        const pImg = place.image || '';
        const pDur = place.duration || '';
        return `
          <div class="place-detail-card">
            ${pImg ? `<img src="${escapeAttr(pImg)}" alt="${escapeAttr(pName)}" style="width:100%; height:200px; object-fit:cover; border-top-left-radius:var(--border-radius-md); border-top-right-radius:var(--border-radius-md);" loading="lazy" />` : ''}
            <div class="place-detail-body">
              <div class="place-detail-header">
                <h3 class="place-detail-name">${escapeAttr(pName)}</h3>
                ${pDur ? `<span class="attraction-duration-tag"><i data-lucide="clock" style="width: 13px; height: 13px;"></i> ${escapeAttr(pDur)}</span>` : ''}
              </div>
              <p class="place-detail-desc">${escapeAttr(pDesc)}</p>
            </div>
          </div>
        `;
      }).join('');
      html = html.replace('<div id="places-list" class="places-grid">', () => `<div id="places-list" class="places-grid">${placesHtml}`);
    }

    // 2. Pre-render Neighborhoods
    const neighborhoods = Array.isArray(city.neighborhoods) ? city.neighborhoods : [];
    if (neighborhoods.length > 0) {
      const neighHtml = neighborhoods.map(n => {
        const nName = n.name || 'District';
        const nLoc = n.location || '';
        const nKnown = n.known_for || '';
        const nAct = n.activities || '';
        const nBest = n.best_for || '';
        return `
          <div class="neighborhood-card">
            <div class="neighborhood-header">
              <h3 class="neighborhood-title">${escapeAttr(nName)}</h3>
              ${nLoc ? `<span class="neighborhood-location-tag"><i data-lucide="map-pin" style="width: 13px; height: 13px;"></i> ${escapeAttr(nLoc)}</span>` : ''}
            </div>
            <div class="neighborhood-pills">
              ${nKnown ? `<span class="pill-badge"><strong>Known for:</strong> ${escapeAttr(nKnown)}</span>` : ''}
              ${nBest ? `<span class="pill-badge"><strong>Best for:</strong> ${escapeAttr(nBest)}</span>` : ''}
            </div>
            ${nAct ? `<p class="neighborhood-activities">${escapeAttr(nAct)}</p>` : ''}
          </div>
        `;
      }).join('');
      html = html.replace('<div id="neighborhoods-list" class="neighborhoods-grid">', () => `<div id="neighborhoods-list" class="neighborhoods-grid">${neighHtml}`);
    }

    // 3. Pre-render Accommodations / Hotels
    if (city.hotels) {
      const tiers = ['budget', 'mid_range', 'luxury'];
      const tierLabels = { budget: 'Budget', mid_range: 'Mid-Range', luxury: 'Luxury' };
      const hotelCardsHtml = tiers.map(tier => {
        const h = city.hotels[tier];
        if (!h) return '';
        const hName = h.name || 'Hotel';
        const hPrice = h.price_approx || 50;
        const hAmenity = h.amenity || 'Comfortable rooms & local breakfast';
        return `
          <div class="hotel-tier-box ${tier === 'luxury' ? 'luxury-card' : ''}">
            <span class="hotel-tier-badge ${tier}">${tierLabels[tier]}</span>
            <h4 class="hotel-top-name">${escapeAttr(hName)}</h4>
            <div class="hotel-p-rate">$${hPrice} <span>/ approx. per night</span></div>
            <div class="hotel-amenity-pill">
              <i data-lucide="check-circle" style="width: 16px; height: 16px;"></i>
              <span><strong>Key Amenity:</strong> ${escapeAttr(hAmenity)}</span>
            </div>
          </div>
        `;
      }).join('');
      html = html.replace('<div id="hotels-deck" class="hotel-tier-deck">', () => `<div id="hotels-deck" class="hotel-tier-deck">${hotelCardsHtml}`);
    }

    // 4. Pre-render Transportation
    const transitList = Array.isArray(city.transportation) ? city.transportation : [];
    if (transitList.length > 0) {
      const transitHtml = transitList.map(tr => {
        const tType = tr.type || 'Local Transport';
        const tCost = tr.approx_cost || 'Metered rate';
        const tDesc = tr.description || '';
        let iconName = 'car';
        if (tType.toLowerCase().includes('bus')) iconName = 'bus';
        else if (tType.toLowerCase().includes('carriage') || tType.toLowerCase().includes('van')) iconName = 'navigation';
        else if (tType.toLowerCase().includes('train')) iconName = 'train';
        return `
          <div class="transit-card">
            <div class="transit-details">
              <div class="transit-avatar"><i data-lucide="${iconName}" style="width: 24px; height: 24px;"></i></div>
              <div>
                <div class="transit-title-text">${escapeAttr(tType)}</div>
                <div class="transit-text-desc">${escapeAttr(tDesc)}</div>
              </div>
            </div>
            <div class="transit-price-tag">${escapeAttr(tCost)}</div>
          </div>
        `;
      }).join('');
      html = html.replace('<div id="transit-deck" class="transit-tier-deck">', () => `<div id="transit-deck" class="transit-tier-deck">${transitHtml}`);
    }

    // 5. Pre-render Daily Budget Estimator
    if (city.budgetEstimate) {
      const est = city.budgetEstimate;
      const parseRange = (str) => {
        if (!str) return { min: 0, max: 0 };
        const numbers = str.replace(/[^0-9\-]/g, '').split('-');
        const min = parseInt(numbers[0]) || 0;
        const max = parseInt(numbers[1]) || min || 0;
        return { min, max };
      };
      const formatRange = (min, max) => (min === max ? `€${min}` : `€${min} - €${max}`);

      const rows = [
        { name: 'Accommodation', field: 'accommodation' },
        { name: 'Food & Dining', field: 'food' },
        { name: 'Local Transport', field: 'transport' },
        { name: 'Activities & Sightseeing', field: 'activities' }
      ];

      let bMin = 0, bMax = 0, mMin = 0, mMax = 0, lMin = 0, lMax = 0;
      let rowsHtml = '';
      rows.forEach(r => {
        const bv = parseRange(est.budget?.[r.field]); bMin += bv.min; bMax += bv.max;
        const mv = parseRange(est.midRange?.[r.field]); mMin += mv.min; mMax += mv.max;
        const lv = parseRange(est.luxury?.[r.field]); lMin += lv.min; lMax += lv.max;
        rowsHtml += `
          <tr>
            <td style="font-weight: 500;">${r.name}</td>
            <td>${escapeAttr(est.budget?.[r.field] || '—')}</td>
            <td>${escapeAttr(est.midRange?.[r.field] || '—')}</td>
            <td>${escapeAttr(est.luxury?.[r.field] || '—')}</td>
          </tr>
        `;
      });
      rowsHtml += `
        <tr class="total-row">
          <td>Total</td>
          <td>${formatRange(bMin, bMax)}</td>
          <td>${formatRange(mMin, mMax)}</td>
          <td>${formatRange(lMin, lMax)}</td>
        </tr>
      `;

      const budgetTableHtml = `
        <div class="budget-estimator-section">
          <h3 class="budget-estimator-title">
            <i data-lucide="calculator" style="width: 20px; height: 20px; color: var(--color-terracotta);"></i>
            <span>Daily Budget Estimator</span>
          </h3>
          <p class="budget-estimator-desc">Estimated daily travel costs per person in Euros (€)</p>
          <div class="budget-table-wrapper">
            <table class="budget-table">
              <thead>
                <tr>
                  <th>Expense Category</th>
                  <th>Budget</th>
                  <th>Mid-Range</th>
                  <th>Luxury</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>
        </div>
      `;
      html = html.replace('<div id="budget-estimator-section" style="margin-top: 40px;"></div>', () => `<div id="budget-estimator-section" style="margin-top: 40px;">${budgetTableHtml}</div>`);
    }

    // 6. Pre-render Best Time to Visit
    if (city.bestTime) {
      const bt = city.bestTime;
      const seasons = ['spring', 'summer', 'autumn', 'winter'];
      const seasonLabels = { spring: 'Spring', summer: 'Summer', autumn: 'Autumn', winter: 'Winter' };
      const seasonMonths = { spring: 'March - May', summer: 'June - August', autumn: 'September - November', winter: 'December - February' };
      const seasonIcons = { spring: 'sprout', summer: 'sun', autumn: 'leaf', winter: 'snowflake' };

      const seasonsCardsHtml = seasons.map(s => {
        const desc = bt[s] || 'Favorable travel weather.';
        const isRec = Array.isArray(bt.recommended) && bt.recommended.includes(s);
        return `
          <div class="season-card ${isRec ? 'recommended-card' : ''}">
            <div class="season-header">
              <div class="season-badge-row">${isRec ? '<span class="season-rec-badge">Recommended</span>' : ''}</div>
              <div class="season-name-row">
                <i class="season-icon" data-lucide="${seasonIcons[s]}" style="width: 22px; height: 22px;"></i>
                <h4 class="season-name">${seasonLabels[s]}</h4>
              </div>
              <span class="season-months">${seasonMonths[s]}</span>
            </div>
            <p class="season-desc">${escapeAttr(desc)}</p>
          </div>
        `;
      }).join('');
      html = html.replace('<div class="seasons-grid" id="seasons-grid">', () => `<div class="seasons-grid" id="seasons-grid">${seasonsCardsHtml}`);
    }

    // 7. Pre-render Travel Tips
    const travelTips = Array.isArray(city.travel_tips) ? city.travel_tips : [];
    if (travelTips.length > 0) {
      const tipsListHtml = `
        <ul class="travel-tips-list">
          ${travelTips.map(tip => `
            <li class="travel-tip-item">
              <i class="travel-tip-icon" data-lucide="check-circle-2" style="width: 18px; height: 18px;"></i>
              <span>${escapeAttr(tip)}</span>
            </li>
          `).join('')}
        </ul>
      `;
      html = html.replace('<div id="travel-tips-content" class="travel-tips-box">', () => `<div id="travel-tips-content" class="travel-tips-box">${tipsListHtml}`);
    }

    // 8. Pre-render Internal Links (Featured Travel Guides)
    const internalLinks = Array.isArray(city.internal_links) ? city.internal_links : [];
    if (internalLinks.length > 0) {
      const linksHtml = internalLinks.map(link => `
        <a class="internal-link-card" href="/blog/${escapeAttr(link.blog_id)}.html">
          <div class="internal-link-title">
            <span>${escapeAttr(link.title)}</span>
            <i data-lucide="arrow-right" style="width: 18px; height: 18px; color: var(--color-terracotta);"></i>
          </div>
          <p class="internal-link-desc">${escapeAttr(link.description)}</p>
        </a>
      `).join('');
      html = html.replace('<div id="internal-links-deck" class="internal-links-deck">', () => `<div id="internal-links-deck" class="internal-links-deck">${linksHtml}`);
    }

    const cityFilePath = path.join(distCityDir, `${id}.html`);
    fs.writeFileSync(cityFilePath, html, 'utf8');
    console.log(`✓ Generated: ${cityFilePath}`);
    generatedFiles.push(`dist/city/${id}.html`);
  }

  // 5. Generate Static Blog Pages
  for (const post of blogPosts) {
    const id = post.id || '';
    if (!id) continue;

    const titleStr = (typeof post.title === 'object' ? (post.title.en || post.title.fr) : post.title) || 'Morocco Travel Article';
    const metaTitleStr = (typeof post.metaTitle === 'object' ? (post.metaTitle.en || post.metaTitle.fr) : post.metaTitle) || titleStr;
    const metaDescStr = (typeof post.metaDescription === 'object' ? (post.metaDescription.en || post.metaDescription.fr) : post.metaDescription)
      || (typeof post.excerpt === 'object' ? (post.excerpt.en || post.excerpt.fr) : post.excerpt)
      || 'Discover expert travel insights on GoMoroccoAI.';
    const categoryStr = (typeof post.categories === 'object' ? (post.categories.en || post.categories.fr) : post.categories) || 'Travel Guide';
    const authorStr = (typeof post.author === 'object' ? (post.author.en || post.author.fr) : post.author) || 'GoMoroccoAI';
    const dateStr = post.date || '2026-07-30';
    const readTimeStr = (typeof post.readTime === 'object' ? (post.readTime.en || post.readTime.fr) : post.readTime) || '5 min read';
    const imageStr = post.image || 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&q=80';
    const contentStr = (typeof post.content === 'object' ? (post.content.en || post.content.fr) : post.content) || '';
    const faqs = Array.isArray(post.faqs) ? post.faqs : [];

    let faqHtml = '';
    if (faqs.length > 0) {
      faqHtml += `
        <div class="blog-faq-section" style="margin-top: 48px; border-top: 2px solid var(--color-border); padding-top: 36px; margin-bottom: 24px;">
          <h2 style="font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-charcoal); margin-bottom: 24px;">Frequently Asked Questions (FAQ)</h2>
          <div style="display: flex; flex-direction: column; gap: 16px;">
      `;
      faqs.forEach(faq => {
        const q = (typeof faq.question === 'object' ? (faq.question.en || faq.question.fr) : faq.question) || '';
        const a = (typeof faq.answer === 'object' ? (faq.answer.en || faq.answer.fr) : faq.answer) || '';
        faqHtml += `
          <details style="background: var(--color-sand); border: 2px solid var(--color-border); border-radius: var(--border-radius-md); overflow: hidden;" class="faq-item">
            <summary style="font-family: var(--font-sans); font-size: 16px; font-weight: 700; color: var(--color-charcoal); padding: 18px 24px; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; outline: none; user-select: none;">
              <span>${escapeAttr(q)}</span>
              <span class="faq-icon" style="font-size: 20px; color: var(--color-terracotta); font-weight: 700;">+</span>
            </summary>
            <div style="padding: 0 24px 20px 24px; font-size: 15px; line-height: 1.7; color: var(--color-charcoal-light);">
              ${a}
            </div>
          </details>
        `;
      });
      faqHtml += `</div></div>`;
    }

    const title = `${metaTitleStr} • GoMoroccoAI Blog`;
    const description = metaDescStr;
    const canonicalUrl = `https://gomoroccoai.com/blog/${id}.html`;

    let html = updateHeadMeta(blogTemplate, {
      title,
      description,
      canonicalUrl,
      imageUrl: imageStr
    });

    // Make body show article view
    html = html.replace('<body>', '<body class="article-view">');
    html = html.replace('<section id="blog-directory-section">', '<section id="blog-directory-section" style="display: none;">');
    html = html.replace('<section id="blog-article-section" style="display: none;">', '<section id="blog-article-section" style="display: block;">');

    // Populate Article elements
    html = html.replace(
      /id="article-category"[^>]*>.*?<\/span>/s,
      () => `id="article-category" class="article-category-badge">${escapeAttr(categoryStr)}</span>`
    );
    html = html.replace(
      /id="article-title"[^>]*>.*?<\/h1>/s,
      () => `id="article-title" class="article-main-title">${escapeAttr(titleStr)}</h1>`
    );
    html = html.replace(
      /id="article-date">.*?<\/span>/s,
      () => `id="article-date"><i data-lucide="calendar" style="width: 14px; height: 14px;"></i> ${escapeAttr(dateStr)}</span>`
    );
    html = html.replace(
      /id="article-read-time">.*?<\/span>/s,
      () => `id="article-read-time"><i data-lucide="clock" style="width: 14px; height: 14px;"></i> ${escapeAttr(readTimeStr)}</span>`
    );
    html = html.replace(
      /id="article-hero-image"\s+src=""/g,
      () => `id="article-hero-image" src="${escapeAttr(imageStr)}" alt="${escapeAttr(titleStr)}"`
    );
    html = html.replace(
      /id="article-content-body"\s+class="article-rich-body">\s*<!--[^>]*-->\s*<\/article>/s,
      () => `id="article-content-body" class="article-rich-body">${contentStr + faqHtml}</article>`
    );
    html = html.replace(
      /id="article-author"[^>]*>.*?<\/h4>/s,
      () => `id="article-author" style="font-family: var(--font-sans); font-size: 16px; font-weight: 700; color: var(--color-charcoal); margin: 0 0 4px 0;">${escapeAttr(authorStr)}</h4>`
    );
    html = html.replace(
      /id="article-author-subtitle"[^>]*>.*?<\/p>/s,
      () => `id="article-author-subtitle" style="font-size: 12px; color: var(--color-charcoal-light); margin: 0;">Published on ${escapeAttr(dateStr)}</p>`
    );

    const blogFilePath = path.join(distBlogDir, `${id}.html`);
    fs.writeFileSync(blogFilePath, html, 'utf8');
    console.log(`✓ Generated: ${blogFilePath}`);
    generatedFiles.push(`dist/blog/${id}.html`);
  }

  console.log(`\nSuccessfully generated ${generatedFiles.length} static HTML files:`);
  generatedFiles.forEach(f => console.log(' - ' + f));
}

run().catch(err => {
  console.error('Fatal error during static page generation:', err);
  process.exit(1);
});
