import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { blogPosts } from "./js/blog-posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let citiesData: any[] = [];
try {
  const pathsToTry = [
    path.join(process.cwd(), "public", "data", "cities.json"),
    path.join(process.cwd(), "dist", "data", "cities.json")
  ];
  for (const p of pathsToTry) {
    if (fs.existsSync(p)) {
      citiesData = JSON.parse(fs.readFileSync(p, "utf-8"));
      break;
    }
  }
} catch (err) {
  console.error("Error loading cities.json in server.ts:", err);
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getTemplate(filename: string): string {
  const distFile = path.join(process.cwd(), "dist", filename);
  if (fs.existsSync(distFile)) {
    return fs.readFileSync(distFile, "utf-8");
  }
  const rootFile = path.join(process.cwd(), filename);
  if (fs.existsSync(rootFile)) {
    return fs.readFileSync(rootFile, "utf-8");
  }
  return "";
}

function renderPreRenderedCityPage(req: express.Request, templateHtml: string): string | null {
  const cityId = req.query.id ? String(req.query.id).trim().toLowerCase() : "";
  if (!cityId || !citiesData.length) return null;

  const city = citiesData.find((c: any) => c.id && c.id.toLowerCase() === cityId);
  if (!city) return null;

  const canonicalUrl = `https://gomoroccoai.com/city.html?id=${city.id.toLowerCase()}`;
  const pageTitle = `${city.name} Travel Guide 2026 • GoMoroccoAI`;
  const metaDesc = city.overview || `Discover ${city.name} in Morocco: attractions, hotels, transit, and travel tips.`;
  const coverImage = city.cover_image || "https://gomoroccoai.com/assets/og-image.jpg";

  let html = templateHtml;

  // 1. Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(pageTitle)}</title>`);

  // 2. Meta description
  if (html.includes('id="seo-meta-desc"')) {
    html = html.replace(/<meta\s+name="description"\s+id="seo-meta-desc"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="description" id="seo-meta-desc" content="${escapeHtml(metaDesc)}" />`);
  } else if (/<meta\s+name="description"/i.test(html)) {
    html = html.replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(metaDesc)}" />`);
  }

  // 3. Canonical
  html = html.replace(/<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 4. OG tags
  html = html.replace(/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);

  if (/<meta\s+property="og:title"/i.test(html)) {
    html = html.replace(/<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(pageTitle)}" />`);
  } else {
    html = html.replace("</head>", `  <meta property="og:title" content="${escapeHtml(pageTitle)}" />\n</head>`);
  }

  if (/<meta\s+property="og:description"/i.test(html)) {
    html = html.replace(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(metaDesc)}" />`);
  } else {
    html = html.replace("</head>", `  <meta property="og:description" content="${escapeHtml(metaDesc)}" />\n</head>`);
  }

  if (/<meta\s+property="og:image"/i.test(html)) {
    html = html.replace(/<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:image" content="${escapeHtml(coverImage)}" />`);
  } else {
    html = html.replace("</head>", `  <meta property="og:image" content="${escapeHtml(coverImage)}" />\n</head>`);
  }

  // 5. Hero Section
  html = html.replace(
    /<h1\s+class="global-hero-title"\s+id="city-title-display">[\s\S]*?<\/h1>/i,
    `<h1 class="global-hero-title" id="city-title-display">${escapeHtml(city.name)}</h1>`
  );

  html = html.replace(
    /<p\s+class="global-hero-desc"\s+id="city-desc-display">[\s\S]*?<\/p>/i,
    `<p class="global-hero-desc" id="city-desc-display">${escapeHtml(city.overview)}</p>`
  );

  html = html.replace(
    /<div\s+class="global-hero-tagline"\s+id="city-meta-badge">[\s\S]*?<\/div>/i,
    `<div class="global-hero-tagline" id="city-meta-badge">${escapeHtml(city.region ? city.region + ' Region' : 'Moroccan Imperial Destination')}</div>`
  );

  // 6. Unhide detail container
  html = html.replace(
    '<div class="city-detail-grid" id="city-detail-container" style="display: none;">',
    '<div class="city-detail-grid" id="city-detail-container">'
  );

  // 7. Inject Attractions in #places-list
  if (Array.isArray(city.attractions) && city.attractions.length > 0) {
    const placesHtml = city.attractions.map((attr: any) => `
      <div class="place-detail-card">
        <div class="place-detail-body">
          <div class="place-detail-header">
            <h4 class="place-detail-name">${escapeHtml(attr.name)}</h4>
            ${attr.duration ? `<span class="attraction-duration-tag"><i data-lucide="clock" style="width: 13px; height: 13px;"></i> ${escapeHtml(attr.duration)}</span>` : ''}
          </div>
          <p class="place-detail-desc">${escapeHtml(attr.description)}</p>
        </div>
      </div>
    `).join('\n');

    html = html.replace(
      '<div id="places-list" class="places-grid">\n              <!-- Inline JavaScript dynamic rendering -->\n            </div>',
      `<div id="places-list" class="places-grid">\n${placesHtml}\n            </div>`
    );
  }

  // 8. Inject Neighborhoods in #neighborhoods-list
  if (Array.isArray(city.neighborhoods) && city.neighborhoods.length > 0) {
    const neighHtml = city.neighborhoods.map((n: any) => `
      <div class="neighborhood-card">
        <h4 class="neighborhood-title">${escapeHtml(n.name)}</h4>
        <p class="neighborhood-known"><strong>Known for:</strong> ${escapeHtml(n.known_for)}</p>
        <p class="neighborhood-desc">${escapeHtml(n.activities)}</p>
      </div>
    `).join('\n');

    html = html.replace(
      '<div id="neighborhoods-list" class="neighborhoods-grid">\n              <!-- Inline JavaScript dynamic rendering -->\n            </div>',
      `<div id="neighborhoods-list" class="neighborhoods-grid">\n${neighHtml}\n            </div>`
    );
  }

  // 9. Inject Hotels in #hotels-deck
  if (city.hotels) {
    const tiers = ['budget', 'mid_range', 'luxury'];
    const hotelsHtml = tiers.map(tier => {
      const h = city.hotels[tier];
      if (!h) return '';
      const tierLabel = tier === 'budget' ? 'Budget' : tier === 'mid_range' ? 'Mid-Range' : 'Luxury';
      return `
        <div class="hotel-tier-box ${tier === 'luxury' ? 'luxury-card' : ''}">
          <span class="hotel-tier-badge ${tier}">${tierLabel}</span>
          <h4 class="hotel-top-name">${escapeHtml(h.name)}</h4>
          <div class="hotel-p-rate">$${h.price_approx} <span>/ approx. per night</span></div>
          <div class="hotel-amenity-pill"><span><strong>Key Amenity:</strong> ${escapeHtml(h.amenity)}</span></div>
        </div>
      `;
    }).join('\n');

    html = html.replace(
      '<div id="hotels-deck" class="hotel-tier-deck">\n              <!-- Inline JavaScript dynamic rendering -->\n            </div>',
      `<div id="hotels-deck" class="hotel-tier-deck">\n${hotelsHtml}\n            </div>`
    );
  }

  // 10. Inject Transit in #transit-deck
  if (Array.isArray(city.transportation) && city.transportation.length > 0) {
    const transitHtml = city.transportation.map((t: any) => `
      <div class="transit-card">
        <div class="transit-details">
          <div>
            <div class="transit-title-text">${escapeHtml(t.type)}</div>
            <div class="transit-text-desc">${escapeHtml(t.description)}</div>
          </div>
        </div>
        <div class="transit-price-tag">${escapeHtml(t.approx_cost)}</div>
      </div>
    `).join('\n');

    html = html.replace(
      '<div id="transit-deck" class="transit-tier-deck">\n              <!-- Inline JavaScript dynamic rendering -->\n            </div>',
      `<div id="transit-deck" class="transit-tier-deck">\n${transitHtml}\n            </div>`
    );
  }

  // 11. Inject Best Time in #seasons-grid
  const bestTime = city.bestTime || city.best_time;
  if (bestTime) {
    const seasons = ['spring', 'summer', 'autumn', 'winter'];
    const monthsMap: Record<string, string> = {
      spring: 'March - May',
      summer: 'June - August',
      autumn: 'September - November',
      winter: 'December - February'
    };
    const seasonsHtml = seasons.map(season => {
      const desc = bestTime[season];
      if (!desc) return '';
      const seasonName = season.charAt(0).toUpperCase() + season.slice(1);
      return `
        <div class="season-card">
          <div class="season-header">
            <h4 class="season-name">${seasonName} (${monthsMap[season]})</h4>
          </div>
          <p class="season-desc">${escapeHtml(desc)}</p>
        </div>
      `;
    }).join('\n');

    html = html.replace(
      '<div class="seasons-grid" id="seasons-grid">\n              <!-- Dynamic population via js/city.js based on selected city details -->\n            </div>',
      `<div class="seasons-grid" id="seasons-grid">\n${seasonsHtml}\n            </div>`
    );
  }

  // 12. Fast Facts Sidebar
  const daysVal = `${city.suggested_days || 3} Days`;
  html = html.replace(
    '<span id="fact-duration-val" class="meta-value">...</span>',
    `<span id="fact-duration-val" class="meta-value">${escapeHtml(daysVal)}</span>`
  );

  const regionVal = city.region || 'Morocco';
  html = html.replace(
    '<span id="fact-region-val" class="meta-value">...</span>',
    `<span id="fact-region-val" class="meta-value">${escapeHtml(regionVal)}</span>`
  );

  if (city.cultural_note) {
    html = html.replace(
      'Loading deep custom-tailored local neighborhood guides & respectful behavior guidelines for this city destination...',
      escapeHtml(city.cultural_note)
    );
  }

  return html;
}

function renderPreRenderedBlogPage(req: express.Request, templateHtml: string): string | null {
  const postId = req.query.id ? String(req.query.id).trim().toLowerCase() : "";
  if (!postId || !blogPosts.length) return null;

  const post = blogPosts.find((p: any) => p.id && p.id.toLowerCase() === postId);
  if (!post) return null;

  const getStringVal = (val: any): string => {
    if (!val) return "";
    if (typeof val === "object") return val.en || "";
    return String(val);
  };

  const canonicalUrl = `https://gomoroccoai.com/blog.html?id=${post.id}`;
  const postTitle = getStringVal(post.title);
  const metaTitleStr = getStringVal(post.metaTitle) || postTitle;
  const pageTitle = `${metaTitleStr} • GoMoroccoAI Blog`;
  const metaDescStr = getStringVal(post.metaDescription) || getStringVal(post.excerpt);
  const heroImage = post.image || post.heroImage || "https://gomoroccoai.com/assets/og-image.jpg";
  const authorName = getStringVal(post.author) || "GoMoroccoAI";
  const dateStr = getStringVal(post.date);
  const readTimeStr = getStringVal(post.readTime);
  const categoryStr = getStringVal(post.categories) || "Travel Guides";
  const contentHtml = getStringVal(post.content);

  let html = templateHtml;

  // 1. Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(pageTitle)}</title>`);

  // 2. Replace Description
  html = html.replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(metaDescStr)}" />`);

  // 3. Replace Canonical
  html = html.replace(/<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 4. Open Graph tags
  html = html.replace(/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(pageTitle)}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(metaDescStr)}" />`);
  html = html.replace(/<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:image" content="${escapeHtml(heroImage)}" />`);
  html = html.replace(/<meta\s+property="og:type"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:type" content="article" />`);

  // Twitter tags
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(pageTitle)}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(metaDescStr)}" />`);
  html = html.replace(/<meta\s+name="twitter:image"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="twitter:image" content="${escapeHtml(heroImage)}" />`);

  // 5. Hide directory section and show article section
  html = html.replace('<section id="blog-directory-section">', '<section id="blog-directory-section" style="display: none;">');
  html = html.replace('<section id="blog-article-section" style="display: none;">', '<section id="blog-article-section" style="display: block;">');

  // 6. Inject Article Header elements
  html = html.replace(
    '<span id="article-category" class="article-category-badge">Travel Guides</span>',
    `<span id="article-category" class="article-category-badge">${escapeHtml(categoryStr)}</span>`
  );

  html = html.replace(
    '<h1 id="article-title" class="article-main-title"></h1>',
    `<h1 id="article-title" class="article-main-title">${escapeHtml(postTitle)}</h1>`
  );

  if (dateStr) {
    html = html.replace(
      /<span id="article-date">[\s\S]*?<\/span>/i,
      `<span id="article-date"><i data-lucide="calendar" style="width: 14px; height: 14px;"></i> ${escapeHtml(dateStr)}</span>`
    );
  }

  if (readTimeStr) {
    html = html.replace(
      /<span id="article-read-time">[\s\S]*?<\/span>/i,
      `<span id="article-read-time"><i data-lucide="clock" style="width: 14px; height: 14px;"></i> ${escapeHtml(readTimeStr)}</span>`
    );
  }

  // 7. Hero Image
  html = html.replace(
    '<img id="article-hero-image" src="" alt="Featured image" referrerPolicy="no-referrer" />',
    `<img id="article-hero-image" src="${escapeHtml(heroImage)}" alt="${escapeHtml(postTitle)}" referrerPolicy="no-referrer" />`
  );

  // 8. Article Body & FAQs
  let faqsHtml = "";
  if (Array.isArray(post.faqs) && post.faqs.length > 0) {
    faqsHtml = `
      <div class="article-faqs-container" style="margin-top: 40px; border-top: 2px solid var(--color-border); padding-top: 30px;">
        <h3 style="font-family: var(--font-serif); font-size: 24px; font-weight: 700; color: var(--color-charcoal); margin-bottom: 20px;">Frequently Asked Questions</h3>
        ${post.faqs.map((faq: any) => {
          const q = (typeof faq.question === "object" ? faq.question.en : faq.question) || "";
          const a = (typeof faq.answer === "object" ? faq.answer.en : faq.answer) || "";
          return `
            <div class="faq-item" style="margin-bottom: 24px;">
              <h4 style="font-family: var(--font-sans); font-size: 16px; font-weight: 700; color: var(--color-charcoal); margin: 0 0 8px 0;">${escapeHtml(q)}</h4>
              <p style="color: var(--color-charcoal-light); font-size: 15px; line-height: 1.6; margin: 0;">${escapeHtml(a)}</p>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  const fullArticleBody = `${contentHtml}\n${faqsHtml}`;

  html = html.replace(
    /<article id="article-content-body" class="article-rich-body">[\s\S]*?<\/article>/i,
    `<article id="article-content-body" class="article-rich-body">\n${fullArticleBody}\n</article>`
  );

  // 9. Author Info
  html = html.replace(
    '<h4 id="article-author" style="font-family: var(--font-sans); font-size: 16px; font-weight: 700; color: var(--color-charcoal); margin: 0 0 4px 0;"></h4>',
    `<h4 id="article-author" style="font-family: var(--font-sans); font-size: 16px; font-weight: 700; color: var(--color-charcoal); margin: 0 0 4px 0;">${escapeHtml(authorName)}</h4>`
  );

  html = html.replace(
    '<p id="article-author-subtitle" style="font-size: 12px; color: var(--color-charcoal-light); margin: 0;"></p>',
    '<p id="article-author-subtitle" style="font-size: 12px; color: var(--color-charcoal-light); margin: 0;">Verified Guide Blogger</p>'
  );

  return html;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing middleware
  app.use(express.json());

  // 1. Consolidated Canonical Redirection Middleware
  // Enforces non-www HTTPS (gomoroccoai.com), /index.html -> /, and trailing slash normalization in 1 hop
  app.use((req, res, next) => {
    const rawHost = req.headers.host || "";
    const proto = (req.headers["x-forwarded-proto"] as string) || req.protocol;

    const isWww = rawHost.startsWith("www.gomoroccoai.com");
    const isLocalOrContainer = rawHost.includes("localhost") || rawHost.includes("127.0.0.1") || rawHost.includes("run.app");

    let targetHost = rawHost;
    if (isWww) {
      targetHost = rawHost.replace(/^www\./, "");
    }

    let targetProto = proto;
    if (targetHost === "gomoroccoai.com" && proto === "http") {
      targetProto = "https";
    }

    let targetPath = req.path;
    if (targetPath === "/index.html") {
      targetPath = "/";
    } else if (targetPath.length > 1 && targetPath.endsWith("/")) {
      targetPath = targetPath.slice(0, -1);
    }

    const queryIndex = req.url.indexOf("?");
    const queryString = queryIndex !== -1 ? req.url.substring(queryIndex) : "";

    const isWwwRedirect = isWww;
    const isHttpRedirect = (targetHost === "gomoroccoai.com" && proto === "http");
    const isPathRedirect = targetPath !== req.path;

    if (!isLocalOrContainer && (isWwwRedirect || isHttpRedirect || isPathRedirect)) {
      const destination = `${targetProto}://${targetHost}${targetPath}${queryString}`;
      return res.redirect(301, destination);
    }

    next();
  });

  // Server-Side Pre-Rendering Routes for City and Blog
  app.get(["/city.html", "/city"], (req, res, next) => {
    if (req.query.id) {
      const template = getTemplate("city.html");
      if (template) {
        const rendered = renderPreRenderedCityPage(req, template);
        if (rendered) {
          return res.type("text/html").send(rendered);
        }
      }
    }
    next();
  });

  app.get(["/blog.html", "/blog"], (req, res, next) => {
    if (req.query.id) {
      const template = getTemplate("blog.html");
      if (template) {
        const rendered = renderPreRenderedBlogPage(req, template);
        if (rendered) {
          return res.type("text/html").send(rendered);
        }
      }
    }
    next();
  });

  // Hot Module Replacement/Middleware setup with Vite
  if (process.env.NODE_ENV !== "production") {
    // Support clean/pretty URLs in development mode by rewriting them to .html before passing to Vite
    app.use((req, res, next) => {
      if (!req.path.includes(".") && !req.path.endsWith("/")) {
        req.url = `${req.path}.html${req.url.substring(req.path.length)}`;
      }
      next();
    });

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));

    // Support clean/pretty URLs by trying to append .html if requested without extension
    app.get("*", (req, res, next) => {
      if (req.path.endsWith("/") || req.path.includes(".")) {
        return next();
      }
      const cleanPath = path.join(distPath, `${req.path}.html`);
      res.sendFile(cleanPath, (err) => {
        if (err) {
          next();
        }
      });
    });

    // Fallback to 404.html if route not found
    app.get("*", (req, res) => {
      res.status(404).sendFile(path.join(distPath, "404.html"), (err) => {
        if (err) {
          res.status(404).sendFile(path.join(distPath, "index.html"));
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Morocco Server] running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to bootstrap server:", err);
});

