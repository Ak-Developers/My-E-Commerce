/* =========================================================
   SCRIPT.JS — rendering logic.
   You normally don't need to edit this file.
   Edit products.js instead to change what's on the site.
   ========================================================= */

const catalogueEl = document.getElementById("catalogue");
const filterBarEl = document.getElementById("filter-bar");

document.getElementById("shop-name").textContent = SHOP_CONFIG.shopName;
document.getElementById("shop-tagline").textContent = SHOP_CONFIG.tagline;
document.title = SHOP_CONFIG.shopName;

let activeCategory = "All";

function formatPrice(amount) {
  return SHOP_CONFIG.currencySymbol + amount.toLocaleString();
}

function buildWhatsAppLink(product) {
  // Including the product's own page link lets WhatsApp show a photo
  // preview card in the chat once the message is sent, since wa.me
  // itself can only pre-fill text, not attach an image directly.
  const pageUrl = `${SHOP_CONFIG.siteUrl}/products/${product.id}.html`;
  const message =
    `Hi! I'm interested in "${product.name}" (${formatPrice(product.price)}). ` +
    `Is it available?\n${pageUrl}`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encoded}`;
}

function whatsappIconSVG() {
  return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.33 5L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.87 14.24c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.68-.63-2.96-1.28-4.89-4.26-5.04-4.46-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.52.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.75 1.24 1.62 2 1.11 1 2.05 1.31 2.35 1.46.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.72.81 2.01.96.3.15.5.22.57.35.07.13.07.75-.18 1.45z"/>
  </svg>`;
}

function renderFilters() {
  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
  filterBarEl.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "filter-chip" + (cat === activeCategory ? " active" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      activeCategory = cat;
      renderFilters();
      renderProducts();
    });
    filterBarEl.appendChild(btn);
  });
}

function renderProducts() {
  const list =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  catalogueEl.innerHTML = "";

  if (list.length === 0) {
    catalogueEl.innerHTML = `<div class="empty-state">Nothing in this category yet — check back soon.</div>`;
    return;
  }

  list.forEach((product) => {
    const wrap = document.createElement("div");
    wrap.className = "tag-wrap";

    const chatHref = buildWhatsAppLink(product);
    const imgSrc =
      product.image && product.image.trim() !== ""
        ? product.image
        : "https://placehold.co/600x450/E8E2D2/3A473F?text=" +
          encodeURIComponent(product.name);

    wrap.innerHTML = `
      <div class="tag-string"></div>
      <div class="punch-hole"></div>
      <article class="product-card">
        <img class="product-image" src="${imgSrc}" alt="${product.name}" loading="lazy" />
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${formatPrice(product.price)}</span>
          ${
            product.inStock
              ? `<a class="chat-btn" target="_blank" rel="noopener" href="${chatHref}">${whatsappIconSVG()} Chat to buy</a>`
              : `<span class="out-of-stock-badge">Sold out</span>`
          }
        </div>
      </article>
    `;

    catalogueEl.appendChild(wrap);
  });
}

renderFilters();
renderProducts();