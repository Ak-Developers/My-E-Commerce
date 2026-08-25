/* =========================================================
   GENERATE-PRODUCT-PAGES.JS
   Run this any time you edit products.js:

       node generate-product-pages.js

   It creates one small page per product inside /products/,
   e.g. products/p1.html. Those pages carry the image info
   that WhatsApp reads to show a photo preview in the chat.
   Then commit and push as usual — Netlify redeploys.
   ========================================================= */

const fs = require("fs");
const path = require("path");
const { SHOP_CONFIG, PRODUCTS } = require("./products.js");

if (SHOP_CONFIG.siteUrl.includes("your-site-name")) {
  console.warn(
    "\n⚠️  Heads up: SHOP_CONFIG.siteUrl in products.js is still the placeholder.\n" +
      "   Set it to your real Netlify/domain URL first, then run this again.\n"
  );
}

const outDir = path.join(__dirname, "products");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

PRODUCTS.forEach((p) => {
  const price = SHOP_CONFIG.currencySymbol + p.price.toLocaleString();
  const pageUrl = `${SHOP_CONFIG.siteUrl}/products/${p.id}.html`;
  const catalogueUrl = `${SHOP_CONFIG.siteUrl}/index.html`;
  const waMessage = encodeURIComponent(
    `Hi! I'm interested in "${p.name}" (${price}). Is it available?\n${pageUrl}`
  );
  const waLink = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${waMessage}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHTML(p.name)} — ${escapeHTML(SHOP_CONFIG.shopName)}</title>

<!-- These tags are what let WhatsApp (and Facebook/Instagram/iMessage)
     show the photo, name, and price as a preview card when this link
     is shared or sent in a chat. -->
<meta property="og:title" content="${escapeHTML(p.name)} — ${escapeHTML(price)}" />
<meta property="og:description" content="${escapeHTML(p.description)}" />
<meta property="og:image" content="${p.image}" />
<meta property="og:url" content="${pageUrl}" />
<meta property="og:type" content="product" />
<meta name="twitter:card" content="summary_large_image" />

<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../style.css" />
</head>
<body>
  <header class="site-header">
    <a href="${catalogueUrl}" style="color:inherit;text-decoration:none;">
      <h1 class="shop-name" style="font-size:1.6rem;">${escapeHTML(SHOP_CONFIG.shopName)}</h1>
    </a>
  </header>
  <main class="catalogue" style="grid-template-columns:minmax(260px,420px);justify-content:center;">
    <div class="tag-wrap">
      <div class="tag-string"></div>
      <div class="punch-hole"></div>
      <article class="product-card">
        <img class="product-image" src="${p.image}" alt="${escapeHTML(p.name)}" />
        <div class="product-category">${escapeHTML(p.category)}</div>
        <h3 class="product-name">${escapeHTML(p.name)}</h3>
        <p class="product-desc">${escapeHTML(p.description)}</p>
        <div class="product-footer">
          <span class="product-price">${escapeHTML(price)}</span>
          ${
            p.inStock
              ? `<a class="chat-btn" target="_blank" rel="noopener" href="${waLink}">Chat to buy</a>`
              : `<span class="out-of-stock-badge">Sold out</span>`
          }
        </div>
      </article>
    </div>
  </main>
  <footer class="site-footer">
    <a href="${catalogueUrl}">← Back to full catalogue</a>
  </footer>
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, `${p.id}.html`), html);
});

console.log(`✅ Generated ${PRODUCTS.length} product page(s) in /products`);
