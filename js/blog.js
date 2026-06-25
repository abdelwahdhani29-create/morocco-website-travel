// GoMoroccoAI Blog System (Bilingual English / Français)
import { blogPosts } from './blog-posts.js';
import { translations } from './translations.js';
import { getNavLanguage } from './auth-nav.js';

// Setup state
let currentLanguage = getNavLanguage();
let selectedCategory = 'all';
let searchQuery = '';
let visiblePostsCount = 4; // Pagination limit
const postsPerPage = 4;

// Track active view state
let activePostId = null;

// Initialize
function initBlog() {
  currentLanguage = getNavLanguage();
  
  // Parse URL query parameter for active article
  const params = new URLSearchParams(window.location.search);
  activePostId = params.get('id');

  // Render correct view
  renderView();

  // Listen for language changes to keep everything dynamic and aligned
  window.addEventListener('languageChanged', (e) => {
    currentLanguage = e.detail.lang;
    renderView();
  });
}

function renderView() {
  const directorySection = document.getElementById('blog-directory-section');
  const articleSection = document.getElementById('blog-article-section');
  
  if (activePostId) {
    // Show single post view
    if (directorySection) directorySection.style.display = 'none';
    if (articleSection) articleSection.style.display = 'block';
    renderSingleArticle(activePostId);
  } else {
    // Show directory view
    if (directorySection) directorySection.style.display = 'block';
    if (articleSection) articleSection.style.display = 'none';
    renderDirectory();
  }

  // Update Breadcrumbs
  renderBreadcrumbs();
}

// --------------------------------------------------------------------------
// 1. Directory View Renderer (Catalog, Filter, Search, Pagination)
// --------------------------------------------------------------------------
function renderDirectory() {
  const currentLang = currentLanguage;
  const t = (key) => translations[currentLang]?.[key] || translations['en']?.[key] || key;

  // Set page headers
  document.title = `${t('blog')} | GoMoroccoAI`;
  
  // Update static titles
  const mainTitle = document.getElementById('blog-main-title');
  const mainDesc = document.getElementById('blog-main-desc');
  if (mainTitle) mainTitle.textContent = t('blog_title');
  if (mainDesc) mainDesc.textContent = t('blog_desc');

  // Update search placeholder
  const searchInput = document.getElementById('blog-search-input');
  if (searchInput) {
    searchInput.placeholder = t('search_blog');
    searchInput.value = searchQuery;
  }

  // Populate dynamic Categories list
  renderCategoriesFilter();

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    // Category match
    const categoryEn = post.categories.en.toLowerCase();
    const categoryFr = post.categories.fr.toLowerCase();
    const isCategoryMatch = selectedCategory === 'all' || 
      categoryEn === selectedCategory.toLowerCase() || 
      categoryFr === selectedCategory.toLowerCase();

    // Search query match (bilingual titles / excerpts)
    const titleEn = post.title.en.toLowerCase();
    const titleFr = post.title.fr.toLowerCase();
    const excerptEn = post.excerpt.en.toLowerCase();
    const excerptFr = post.excerpt.fr.toLowerCase();
    const isSearchMatch = !searchQuery || 
      titleEn.includes(searchQuery.toLowerCase()) || 
      titleFr.includes(searchQuery.toLowerCase()) || 
      excerptEn.includes(searchQuery.toLowerCase()) || 
      excerptFr.includes(searchQuery.toLowerCase());

    return isCategoryMatch && isSearchMatch;
  });

  // Render posts list
  const gridContainer = document.getElementById('blog-posts-grid');
  if (!gridContainer) return;

  if (filteredPosts.length === 0) {
    gridContainer.innerHTML = `
      <div class="blog-no-results" style="grid-column: 1 / -1; text-align: center; padding: 48px 24px; background: white; border: 2px dashed var(--color-border); border-radius: var(--border-radius-md);">
        <i data-lucide="search-code" style="width: 48px; height: 48px; color: var(--color-terracotta); margin-bottom: 16px;"></i>
        <h3 style="font-family: var(--font-serif); font-size: 20px; color: var(--color-charcoal); margin-bottom: 8px;">${t('no_posts')}</h3>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    
    // Hide Load More button
    const loadMoreBtn = document.getElementById('blog-load-more-btn');
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    return;
  }

  // Paginate posts
  const postsToDisplay = filteredPosts.slice(0, visiblePostsCount);

  let gridHtml = '';
  postsToDisplay.forEach(post => {
    const postTitle = post.title[currentLang] || post.title.en;
    const postExcerpt = post.excerpt[currentLang] || post.excerpt.en;
    const postCategory = post.categories[currentLang] || post.categories.en;
    const postReadTime = post.readTime[currentLang] || post.readTime.en;
    const postAuthor = post.author[currentLang] || post.author.en;
    const formattedDate = new Date(post.date).toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    gridHtml += `
      <article class="blog-card" style="background: white; border: 2px solid var(--color-border); border-radius: var(--border-radius-md); overflow: hidden; display: flex; flex-direction: column; transition: var(--transition-smooth); box-shadow: 0 4px 15px rgba(42,33,30,0.01);" id="post-${post.id}">
        <div class="blog-card-img-wrapper" style="position: relative; height: 220px; width: 100%; overflow: hidden; background-color: #eee;">
          <img src="${post.image}" alt="${postTitle}" style="width: 100%; height: 100%; object-fit: cover; transition: var(--transition-smooth);" loading="lazy" referrerPolicy="no-referrer" />
          <span class="blog-card-badge" style="position: absolute; top: 16px; left: 16px; background-color: var(--color-terracotta); color: white; padding: 4px 12px; font-size: 11px; font-weight: 700; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
            ${postCategory}
          </span>
        </div>
        <div class="blog-card-body" style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1; gap: 12px;">
          <div class="blog-card-meta" style="display: flex; gap: 12px; align-items: center; font-size: 12px; color: var(--color-charcoal-light); font-weight: 500;">
            <span style="display: flex; align-items: center; gap: 4px;">
              <i data-lucide="calendar" style="width: 12px; height: 12px;"></i> ${formattedDate}
            </span>
            <span>•</span>
            <span style="display: flex; align-items: center; gap: 4px;">
              <i data-lucide="clock" style="width: 12px; height: 12px;"></i> ${postReadTime}
            </span>
          </div>
          <h2 class="blog-card-title" style="font-family: var(--font-serif); font-size: 20px; font-weight: 700; color: var(--color-charcoal); line-height: 1.4; margin: 0; transition: var(--transition-smooth);">
            <a href="/blog.html?id=${post.id}" style="color: inherit; text-decoration: none;">${postTitle}</a>
          </h2>
          <p class="blog-card-excerpt" style="font-size: 14px; color: var(--color-charcoal-light); line-height: 1.6; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
            ${postExcerpt}
          </p>
          <div class="blog-card-footer" style="margin-top: auto; padding-top: 16px; border-top: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center;">
            <span class="blog-card-author" style="font-size: 13px; font-weight: 600; color: var(--color-charcoal);">
              <span style="color: var(--color-charcoal-light); font-weight: 400;">${t('blog_author')}</span> ${postAuthor}
            </span>
            <a href="/blog.html?id=${post.id}" class="blog-card-link" style="font-size: 13px; font-weight: 700; color: var(--color-terracotta); text-decoration: none; display: inline-flex; align-items: center; gap: 4px; transition: var(--transition-smooth);">
              <span>${t('read_more').replace('&rarr;', '')}</span> &rarr;
            </a>
          </div>
        </div>
      </article>
    `;
  });

  gridContainer.innerHTML = gridHtml;
  if (window.lucide) window.lucide.createIcons();

  // Add hover effects dynamically
  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)';
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

  // Handle Load More pagination button
  const loadMoreBtn = document.getElementById('blog-load-more-btn');
  if (loadMoreBtn) {
    if (filteredPosts.length > visiblePostsCount) {
      loadMoreBtn.style.display = 'inline-flex';
      loadMoreBtn.textContent = t('load_more');
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }

  // Dynamic schema for WebSite index
  injectSEOIndexSchema();
}

function renderCategoriesFilter() {
  const currentLang = currentLanguage;
  const t = (key) => translations[currentLang]?.[key] || translations['en']?.[key] || key;

  const filterContainer = document.getElementById('blog-categories-filter');
  if (!filterContainer) return;

  // Extract categories in current language
  const categoriesMap = new Map(); // categoryKey => localizedLabel
  categoriesMap.set('all', t('all_categories'));
  
  blogPosts.forEach(post => {
    const key = post.categories.en; // We keep English as standard key
    const localizedLabel = post.categories[currentLang] || post.categories.en;
    categoriesMap.set(key, localizedLabel);
  });

  let filterHtml = '';
  categoriesMap.forEach((label, key) => {
    const isActive = selectedCategory.toLowerCase() === key.toLowerCase();
    filterHtml += `
      <button class="filter-chip ${isActive ? 'active' : ''}" data-category="${key}" style="border: 2px solid ${isActive ? 'var(--color-terracotta)' : 'var(--color-border)'}; background-color: ${isActive ? 'var(--color-terracotta)' : 'white'}; color: ${isActive ? 'white' : 'var(--color-charcoal-light)'}; padding: 8px 18px; border-radius: 20px; font-size: 13px; font-weight: 600; cursor: pointer; transition: var(--transition-smooth); white-space: nowrap; display: inline-flex; align-items: center; justify-content: center;">
        ${label}
      </button>
    `;
  });

  filterContainer.innerHTML = filterHtml;

  // Wire events
  filterContainer.querySelectorAll('.filter-chip').forEach(button => {
    button.addEventListener('click', () => {
      selectedCategory = button.getAttribute('data-category');
      visiblePostsCount = postsPerPage; // reset pagination limit on filter switch
      renderDirectory();
    });
  });
}

// Wire search input listener
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('blog-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      visiblePostsCount = postsPerPage; // reset pagination
      renderDirectory();
    });
  }

  const loadMoreBtn = document.getElementById('blog-load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visiblePostsCount += postsPerPage;
      renderDirectory();
    });
  }

  initBlog();
});


// --------------------------------------------------------------------------
// 2. Single Article Details View Renderer
// --------------------------------------------------------------------------
function renderSingleArticle(id) {
  const currentLang = currentLanguage;
  const t = (key) => translations[currentLang]?.[key] || translations['en']?.[key] || key;

  // Find article
  const post = blogPosts.find(p => p.id === id);
  if (!post) {
    // Post not found, redirect back to index
    window.location.href = '/blog.html';
    return;
  }

  const postTitle = post.title[currentLang] || post.title.en;
  const postExcerpt = post.excerpt[currentLang] || post.excerpt.en;
  const postContent = post.content[currentLang] || post.content.en;
  const postCategory = post.categories[currentLang] || post.categories.en;
  const postReadTime = post.readTime[currentLang] || post.readTime.en;
  const postAuthor = post.author[currentLang] || post.author.en;
  const formattedDate = new Date(post.date).toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Fetch specialized meta fields for maximum SEO precision
  const metaTitle = (post.metaTitle && post.metaTitle[currentLang]) || post.metaTitle?.en || postTitle;
  const metaDesc = (post.metaDescription && post.metaDescription[currentLang]) || post.metaDescription?.en || postExcerpt;

  // 1. Override meta tags dynamically for pure SEO-optimized views
  document.title = `${metaTitle} | GoMoroccoAI Blog`;
  
  // Create / Update dynamic meta descriptions
  updateMetaTags(metaTitle, metaDesc, post.image, `https://gomoroccoai.com/blog.html?id=${post.id}`);

  // 2. Render Article Body
  const titleEl = document.getElementById('article-title');
  const catEl = document.getElementById('article-category');
  const dateEl = document.getElementById('article-date');
  const readEl = document.getElementById('article-read-time');
  const authorEl = document.getElementById('article-author');
  const authorSubtitleEl = document.getElementById('article-author-subtitle');
  const heroImgEl = document.getElementById('article-hero-image');
  const contentEl = document.getElementById('article-content-body');
  const backBtnEl = document.getElementById('article-back-btn');

  if (titleEl) titleEl.textContent = postTitle;
  if (catEl) {
    catEl.textContent = postCategory;
    catEl.style.backgroundColor = 'var(--color-terracotta-light)';
    catEl.style.color = 'var(--color-terracotta)';
  }
  if (dateEl) dateEl.innerHTML = `<i data-lucide="calendar" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i> ${formattedDate}`;
  if (readEl) readEl.innerHTML = `<i data-lucide="clock" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i> ${postReadTime}`;
  if (authorEl) authorEl.textContent = postAuthor;
  if (authorSubtitleEl) authorSubtitleEl.textContent = `${t('published_on')} ${formattedDate}`;
  if (heroImgEl) {
    heroImgEl.src = post.image;
    heroImgEl.alt = postTitle;
  }
  if (contentEl) {
    let html = postContent;
    if (post.faqs && post.faqs.length > 0) {
      const faqTitle = currentLang === 'fr' ? 'Questions Fréquentes (FAQ)' : 'Frequently Asked Questions (FAQ)';
      let faqHtml = `
        <div class="blog-faq-section" style="margin-top: 48px; border-top: 2px solid var(--color-border); padding-top: 36px; margin-bottom: 24px;">
          <h2 style="font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-charcoal); margin-bottom: 24px;">${faqTitle}</h2>
          <div style="display: flex; flex-direction: column; gap: 16px;">
      `;
      post.faqs.forEach(faq => {
        const q = faq.question[currentLang] || faq.question.en;
        const a = faq.answer[currentLang] || faq.answer.en;
        faqHtml += `
          <details style="background: var(--color-sand); border: 2px solid var(--color-border); border-radius: var(--border-radius-md); overflow: hidden; transition: var(--transition-smooth);" class="faq-item">
            <summary style="font-family: var(--font-sans); font-size: 16px; font-weight: 700; color: var(--color-charcoal); padding: 18px 24px; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; outline: none; user-select: none;">
              <span>${q}</span>
              <span class="faq-icon" style="font-size: 20px; color: var(--color-terracotta); transition: transform 0.3s; font-weight: 700;">+</span>
            </summary>
            <div style="padding: 0 24px 20px 24px; font-size: 15px; line-height: 1.7; color: var(--color-charcoal-light);">
              ${a}
            </div>
          </details>
        `;
      });
      faqHtml += `
          </div>
        </div>
      `;
      html += faqHtml;
    }
    contentEl.innerHTML = html;
  }
  if (backBtnEl) {
    backBtnEl.innerHTML = `&larr; ${t('back_to_blog')}`;
    backBtnEl.href = '/blog.html';
  }

  // 3. Render Share Social Widget
  renderShareButtons(postTitle, `https://gomoroccoai.com/blog.html?id=${post.id}`);

  // 4. Render Related articles
  renderRelatedArticles(post);

  // 5. Inject JSON-LD Article Schema
  injectSEOArticleSchema(post, postTitle, postExcerpt, formattedDate);

  if (window.lucide) window.lucide.createIcons();
}

function updateMetaTags(title, desc, image, url) {
  // Update canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', url);
  } else {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', url);
    document.head.appendChild(canonical);
  }

  // Update description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', desc);
  }

  // Open Graph
  const ogTags = {
    'og:title': title,
    'og:description': desc,
    'og:image': image,
    'og:url': url
  };

  for (const [property, val] of Object.entries(ogTags)) {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (meta) {
      meta.setAttribute('content', val);
    } else {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      meta.setAttribute('content', val);
      document.head.appendChild(meta);
    }
  }

  // Twitter
  const twitterTags = {
    'twitter:title': title,
    'twitter:description': desc,
    'twitter:image': image
  };

  for (const [name, val] of Object.entries(twitterTags)) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (meta) {
      meta.setAttribute('content', val);
    } else {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      meta.setAttribute('content', val);
      document.head.appendChild(meta);
    }
  }
}

function renderShareButtons(title, url) {
  const container = document.getElementById('article-share-links');
  if (!container) return;

  const currentLang = currentLanguage;
  const t = (key) => translations[currentLang]?.[key] || translations['en']?.[key] || key;

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  container.innerHTML = `
    <span style="font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--color-charcoal-light);">${t('share_article')}</span>
    <div style="display: flex; gap: 8px;">
      <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-icon-btn" aria-label="Share on X" style="display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--color-border); color: var(--color-charcoal); transition: var(--transition-smooth); background: white;">
        <i data-lucide="twitter" style="width: 14px; height: 14px;"></i>
      </a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-icon-btn" aria-label="Share on Facebook" style="display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--color-border); color: var(--color-charcoal); transition: var(--transition-smooth); background: white;">
        <i data-lucide="facebook" style="width: 14px; height: 14px;"></i>
      </a>
      <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-icon-btn" aria-label="Share on WhatsApp" style="display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--color-border); color: var(--color-charcoal); transition: var(--transition-smooth); background: white;">
        <i data-lucide="message-circle" style="width: 14px; height: 14px;"></i>
      </a>
      <button onclick="navigator.clipboard.writeText('${url}').then(() => alert('${currentLang === 'fr' ? 'Lien copié !' : 'Link copied to clipboard!'}'))" class="share-icon-btn" aria-label="Copy link" style="display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--color-border); color: var(--color-charcoal); cursor: pointer; transition: var(--transition-smooth); background: white;">
        <i data-lucide="copy" style="width: 14px; height: 14px;"></i>
      </button>
    </div>
  `;

  // Apply hover transitions
  container.querySelectorAll('.share-icon-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.borderColor = 'var(--color-terracotta)';
      btn.style.color = 'var(--color-terracotta)';
      btn.style.backgroundColor = 'var(--color-terracotta-light)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.borderColor = 'var(--color-border)';
      btn.style.color = 'var(--color-charcoal)';
      btn.style.backgroundColor = 'white';
    });
  });
}

function renderRelatedArticles(activePost) {
  const container = document.getElementById('related-articles-grid');
  if (!container) return;

  const currentLang = currentLanguage;
  const t = (key) => translations[currentLang]?.[key] || translations['en']?.[key] || key;

  // Header translation
  const headerEl = document.getElementById('related-articles-heading');
  if (headerEl) headerEl.textContent = t('related_articles');

  // Filter posts that are not the active one
  let related = blogPosts.filter(p => p.id !== activePost.id);
  
  // Try to recommend articles from the same category first
  const sameCategory = related.filter(p => p.categories.en === activePost.categories.en);
  if (sameCategory.length >= 2) {
    related = sameCategory;
  }
  
  // Limit to 2 articles
  const recommendations = related.slice(0, 2);

  let relatedHtml = '';
  recommendations.forEach(post => {
    const postTitle = post.title[currentLang] || post.title.en;
    const postCategory = post.categories[currentLang] || post.categories.en;
    const postReadTime = post.readTime[currentLang] || post.readTime.en;
    const formattedDate = new Date(post.date).toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    relatedHtml += `
      <div class="related-card" style="background: white; border: 1.5px solid var(--color-border); border-radius: var(--border-radius-md); overflow: hidden; display: flex; flex-direction: column; transition: var(--transition-smooth); box-shadow: 0 2px 10px rgba(42,33,30,0.01);">
        <div style="height: 140px; overflow: hidden; position: relative;">
          <img src="${post.image}" alt="${postTitle}" style="width: 100%; height: 100%; object-fit: cover; transition: var(--transition-smooth);" loading="lazy" referrerPolicy="no-referrer" />
          <span style="position: absolute; top: 12px; left: 12px; background: var(--color-terracotta); color: white; padding: 2px 8px; font-size: 10px; font-weight: 700; border-radius: 10px; text-transform: uppercase;">
            ${postCategory}
          </span>
        </div>
        <div style="padding: 16px; display: flex; flex-direction: column; flex-grow: 1; gap: 8px;">
          <div style="display: flex; gap: 8px; align-items: center; font-size: 11px; color: var(--color-charcoal-light);">
            <span>${formattedDate}</span>
            <span>•</span>
            <span>${postReadTime}</span>
          </div>
          <h4 style="font-family: var(--font-serif); font-size: 15px; font-weight: 700; line-height: 1.4; margin: 0;">
            <a href="/blog.html?id=${post.id}" style="color: var(--color-charcoal); text-decoration: none; transition: var(--transition-smooth);">${postTitle}</a>
          </h4>
        </div>
      </div>
    `;
  });

  container.innerHTML = relatedHtml;

  // Add hover animation to related cards
  container.querySelectorAll('.related-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-3px)';
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
}

// --------------------------------------------------------------------------
// 3. Breadcrumbs Dynamic Generator
// --------------------------------------------------------------------------
function renderBreadcrumbs() {
  const currentLang = currentLanguage;
  const t = (key) => translations[currentLang]?.[key] || translations['en']?.[key] || key;

  const breadcrumbsList = document.getElementById('blog-breadcrumbs-list');
  if (!breadcrumbsList) return;

  let html = `
    <li>
      <a href="/index.html" class="crumb-link" style="color: var(--color-charcoal-light); text-decoration: none; display: inline-flex; align-items: center; gap: 4px; font-weight: 500;">
        <i data-lucide="home" style="width: 14px; height: 14px;"></i> ${t('home')}
      </a>
    </li>
    <li class="crumb-separator" style="color: var(--color-border); font-size: 12px; margin: 0 4px;">/</li>
  `;

  if (activePostId) {
    const post = blogPosts.find(p => p.id === activePostId);
    const postTitle = post ? (post.title[currentLang] || post.title.en) : '';

    html += `
      <li>
        <a href="/blog.html" class="crumb-link" style="color: var(--color-charcoal-light); text-decoration: none; font-weight: 500;">
          ${t('blog')}
        </a>
      </li>
      <li class="crumb-separator" style="color: var(--color-border); font-size: 12px; margin: 0 4px;">/</li>
      <li class="active-crumb" style="color: var(--color-terracotta); font-weight: 600; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 250px;">
        ${postTitle}
      </li>
    `;
  } else {
    html += `
      <li class="active-crumb" style="color: var(--color-terracotta); font-weight: 600;">
        ${t('blog')}
      </li>
    `;
  }

  breadcrumbsList.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

// --------------------------------------------------------------------------
// 4. Schema.org Dynamic Injections (JSON-LD SEO Structured Data)
// --------------------------------------------------------------------------
function injectSEOIndexSchema() {
  removeExistingSchema();

  const currentLang = currentLanguage;
  const t = (key) => translations[currentLang]?.[key] || translations['en']?.[key] || key;

  // Blog catalog schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": t('blog_title'),
    "url": "https://gomoroccoai.com/blog.html",
    "description": t('blog_desc'),
    "publisher": {
      "@type": "Organization",
      "name": "GoMoroccoAI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://media.cntraveler.com/photos/65dfc055e781ac22c9a500e9/16:9/w_2240,c_limit/GettyImages-1450546518.jpg"
      }
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title[currentLang] || post.title.en,
      "url": `https://gomoroccoai.com/blog.html?id=${post.id}`,
      "datePublished": post.date,
      "image": post.image,
      "description": post.excerpt[currentLang] || post.excerpt.en,
      "author": {
        "@type": "Person",
        "name": post.author[currentLang] || post.author.en
      }
    }))
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'blog-schema-jsonld';
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}

function injectSEOArticleSchema(post, title, excerpt, formattedDate) {
  removeExistingSchema();

  const currentLang = currentLanguage;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://gomoroccoai.com/blog.html?id=${post.id}`
    },
    "headline": title,
    "description": excerpt,
    "image": [post.image],
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author[currentLang] || post.author.en
    },
    "publisher": {
      "@type": "Organization",
      "name": "GoMoroccoAI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://media.cntraveler.com/photos/65dfc055e781ac22c9a500e9/16:9/w_2240,c_limit/GettyImages-1450546518.jpg"
      }
    }
  };

  const schemas = [articleSchema];

  // Append rich FAQPage structured data to schema graph
  if (post.faqs && post.faqs.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": post.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question[currentLang] || faq.question.en,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer[currentLang] || faq.answer.en
        }
      }))
    };
    schemas.push(faqSchema);
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'blog-schema-jsonld';
  script.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 2);
  document.head.appendChild(script);
}

function removeExistingSchema() {
  const existing = document.getElementById('blog-schema-jsonld');
  if (existing) {
    existing.remove();
  }
}
