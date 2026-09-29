(() => {
  'use strict';

  // Formatters & helpers
  const fcfa = n => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(Math.round(n));
  const pct = (was, now) => Math.round((1 - now / was) * 100);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const PRODUCTS = [
    {
      id: 'masque-mamiwata',
      name: 'Masque Mami Wata',
      cat: 'masques',
      catLabel: 'Masque',
      price: 18900,
      was: 24900,
      img: 'img/masque-mamiwata.webp',
      rating: 4.8,
      reviews: 126,
      stock: 4,
      badge: 'Best-seller',
      short: 'Écailles irisées, cauris et perles dorées : la reine des eaux sort de la nuit.',
      desc: 'Masque demi-visage façonné à la main à Cotonou. Base en résine légère, écailles irisées peintes, cauris cousus et perles dorées. Tient sans gêner la respiration ni la vision.',
      details: ['Poids : 180 g (très léger)', 'Élastique réglable + attache ruban en satin', 'Taille unique adulte', 'Fait main, pièce numérotée'],
      cross: ['kit-fx', 'cape-indigo', 'couronne-ombres'],
      reviewsList: [
        ['Afi, Cotonou (Haie Vive)', 'On m’a arrêtée dix fois pour une photo à la soirée. Finitions superbes.', 5],
        ['Rachida, Calavi', 'Léger, confortable toute la nuit sans étouffer. Livré en 24 h.', 5]
      ]
    },
    {
      id: 'masque-foret',
      name: 'Masque Esprit de la Forêt',
      cat: 'masques',
      catLabel: 'Masque',
      price: 16900,
      was: 21900,
      img: 'img/masque-foret.webp',
      rating: 4.7,
      reviews: 84,
      stock: 7,
      short: 'Bois sculpté, frange de raphia et mousse : l’esprit gardien des contes du soir.',
      desc: 'Masque visage complet en bois léger sculpté, frange de raphia naturel et détails de mousse stabilisée. Inspiré des contes traditionnels, respectueux des symboles sacrés.',
      details: ['Bois de fromager léger', 'Frange raphia naturel 25 cm', 'Taille unique adulte avec ouvertures larges'],
      cross: ['cape-indigo', 'lanterne-calebasse', 'kit-fx']
    },
    {
      id: 'cape-indigo',
      name: 'Cape Nuit Indigo',
      cat: 'costumes',
      catLabel: 'Costume',
      price: 22900,
      was: 29900,
      img: 'img/cape-indigo.webp',
      rating: 4.9,
      reviews: 61,
      stock: 3,
      options: { label: 'Taille', values: ['S/M', 'L/XL'], def: 0 },
      short: 'Cape à capuche en coton teint indigo, broderies ton sur ton. Majestueuse, et elle se reporte toute l’année.',
      desc: 'Teinte à l’indigo végétal naturel par un atelier de Porto-Novo. Longueur 140 cm, capuche ample, fermoir en laiton ouvragé.',
      details: ['100 % coton biologique teint à la main', 'S/M : 1,55–1,70 m · L/XL : 1,70–1,90 m', 'Lavage à froid à la main'],
      cross: ['masque-foret', 'couronne-ombres', 'masque-mamiwata']
    },
    {
      id: 'kit-fx',
      name: 'Kit Maquillage FX',
      cat: 'maquillage',
      catLabel: 'Maquillage',
      price: 12900,
      was: 15900,
      img: 'img/kit-fx.webp',
      rating: 4.6,
      reviews: 203,
      stock: 12,
      short: 'Palette 8 teintes testée sur peaux foncées, faux sang, latex et 3 pinceaux.',
      desc: 'Pigments très couvrants formulés spécialement pour les carnations foncées, faux sang lavable, latex liquide pour cicatrices et tutoriel vidéo inclus.',
      details: ['8 teintes crème haute couvrance', 'Faux sang lavable 30 ml', 'Latex liquide 15 ml', 'Testé dermatologiquement'],
      cross: ['masque-mamiwata', 'couronne-ombres', 'cape-indigo']
    },
    {
      id: 'couronne-ombres',
      name: 'Couronne Reine des Ombres',
      cat: 'accessoires',
      catLabel: 'Accessoire',
      price: 9900,
      img: 'img/couronne-ombres.webp',
      rating: 4.5,
      reviews: 47,
      stock: 9,
      short: 'Couronne d’épines noire sertie de cristaux violets. Le détail qui sublime le look.',
      desc: 'Métal léger laqué noir mat, cristaux violets étincelants, double peigne de maintien intégré conçu pour tresses, locks ou tissages.',
      details: ['Poids plume : 60 g', 'Peigne de maintien anti-glisse', 'Finition noire satinée'],
      cross: ['cape-indigo', 'kit-fx', 'masque-mamiwata']
    },
    {
      id: 'lanterne-calebasse',
      name: 'Lanterne Calebasse LED',
      cat: 'deco',
      catLabel: 'Déco',
      price: 7900,
      img: 'img/lanterne-calebasse.webp',
      rating: 4.8,
      reviews: 92,
      stock: 15,
      short: 'Calebasse ajourée à la main, lumière LED ambrée. La citrouille, version béninoise.',
      desc: 'Calebasse naturelle gravée et ajourée par des artisans d’Abomey. Module LED rechargeable USB ambré, 8 h d’autonomie, zéro risque de brûlure.',
      details: ['Diamètre 22 cm environ (pièce naturelle unique)', 'LED rechargeable USB-C', 'Autonomie 8 heures'],
      cross: ['masque-foret', 'cape-indigo', 'kit-fx']
    },
    {
      id: 'look-foret',
      name: 'Look complet Esprit de la Forêt',
      cat: 'looks',
      catLabel: 'Look complet',
      price: 34900,
      was: 39800,
      combo: ['masque-foret', 'cape-indigo'],
      rating: 4.9,
      reviews: 38,
      stock: 5,
      badge: 'Pack complet',
      short: 'Le masque Esprit de la Forêt + la Cape Nuit Indigo. Prêt à sortir, 4 900 FCFA d’économie.',
      options: { label: 'Taille de cape', values: ['S/M', 'L/XL'] },
      cross: ['kit-fx', 'lanterne-calebasse', 'couronne-ombres']
    },
    {
      id: 'look-mamiwata',
      name: 'Look complet Mami Wata',
      cat: 'looks',
      catLabel: 'Look complet',
      price: 27900,
      was: 31800,
      combo: ['masque-mamiwata', 'kit-fx'],
      rating: 4.8,
      reviews: 52,
      stock: 6,
      badge: 'Pack complet',
      short: 'Le masque Mami Wata + le Kit Maquillage FX pour prolonger les écailles dorées sur le cou et les bras.',
      cross: ['couronne-ombres', 'cape-indigo', 'lanterne-calebasse']
    }
  ];

  const P = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
  const BRAND = 'Nuit des Masques';
  const FREE_SHIP_THRESHOLD = 30000;
  const SHIP_FEE_STD = 1500;
  const PROMO_CODES = { BOO10: 10, OMBRE15: 15 };

  // Cart Management
  const CART_KEY = 'ndm_cart_v2';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { cart = []; }
  let activeCode = null;

  const saveCart = () => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  };

  function addToCart(id, qty = 1, opt = null) {
    const item = cart.find(x => x.id === id && x.opt === opt);
    if (item) item.qty += qty;
    else cart.push({ id, qty, opt });
    saveCart();
    renderCart();

    const countEl = $('.cart-count');
    if (countEl) {
      countEl.classList.remove('bump');
      void countEl.offsetWidth;
      countEl.classList.add('bump');
    }
    toast(`« ${P[id].name} » ajouté au panier`);
    setTimeout(openCart, 300);
  }

  function getSubtotal() {
    return cart.reduce((sum, item) => sum + (P[item.id] ? P[item.id].price * item.qty : 0), 0);
  }

  function renderCart() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    $$('.cart-count').forEach(el => el.textContent = totalQty);

    const b = $('.drawer-b');
    const f = $('.drawer-f');
    if (!b || !f) return;

    if (!cart.length) {
      b.innerHTML = `<div style="text-align:center;padding:3.5rem 1rem;color:var(--muted)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px;margin:0 auto 1rem;opacity:0.6"><path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
        <p style="font-weight:700;color:var(--fg);font-size:1.1rem;margin-bottom:0.4rem">Votre panier est vide</p>
        <p style="font-size:0.9rem">Découvrez les masques faits main de la collection.</p>
        <a class="btn btn-acc btn-sm" href="#/boutique" style="margin-top:1.2rem" data-close>Découvrir la boutique</a>
      </div>`;
      f.hidden = true;
      return;
    }

    f.hidden = false;
    const sub = getSubtotal();
    const freeRemain = Math.max(0, FREE_SHIP_THRESHOLD - sub);
    const ship = freeRemain > 0 ? SHIP_FEE_STD : 0;
    const disc = activeCode ? Math.round((sub * activeCode.pct) / 100) : 0;
    const total = sub - disc + ship;

    b.innerHTML = `
      <div class="ship-bar">
        <span>${freeRemain > 0 ? `Plus que <b>${fcfa(freeRemain)}</b> pour la <b>livraison offerte</b>` : '🎉 <b>Livraison offerte débloquée</b> à Cotonou'}</span>
        <div class="bar"><i style="width:${Math.min(100, (sub / FREE_SHIP_THRESHOLD) * 100)}%"></i></div>
      </div>
      ${cart.map((l, i) => {
        const p = P[l.id];
        if (!p) return '';
        const img = p.combo ? P[p.combo[0]].img : p.img;
        return `
          <div class="line">
            <img src="${img}" alt="${esc(p.name)}" width="64" height="64">
            <div>
              <h4>${esc(p.name)}</h4>
              ${l.opt ? `<div style="font-size:0.8rem;color:var(--muted)">Option : ${esc(l.opt)}</div>` : ''}
              <div class="qty" style="margin-top:0.35rem">
                <button data-cq="${i}" data-d="-1" aria-label="Moins">−</button>
                <output>${l.qty}</output>
                <button data-cq="${i}" data-d="1" aria-label="Plus">+</button>
              </div>
            </div>
            <div style="text-align:right">
              <b class="tnum" style="display:block">${fcfa(p.price * l.qty)}</b>
              <button class="btn-ghost" data-rm="${i}" style="font-size:0.78rem;color:var(--muted);text-decoration:underline;padding:0.2rem 0">Retirer</button>
            </div>
          </div>
        `;
      }).join('')}
    `;

    f.innerHTML = `
      <div class="code-row">
        <input id="code-input" placeholder="Code promo (ex: BOO10)" aria-label="Code promo" value="${activeCode ? activeCode.c : ''}">
        <button class="btn btn-ghost btn-sm" data-apply-code>Appliquer</button>
      </div>
      <div class="tot"><span>Sous-total</span><span class="tnum">${fcfa(sub)}</span></div>
      ${disc ? `<div class="tot" style="color:var(--acc)"><span>Remise code ${activeCode.c} (-${activeCode.pct} %)</span><span class="tnum">−${fcfa(disc)}</span></div>` : ''}
      <div class="tot"><span>Livraison</span><span class="tnum">${ship === 0 ? '<span style="color:var(--success)">Offerte</span>' : fcfa(ship)}</span></div>
      <div class="tot big"><span>Total estimé</span><span class="tnum">${fcfa(total)}</span></div>
      <button class="btn btn-acc btn-block" data-checkout>Commander · ${fcfa(total)}</button>
      <div class="pay-badges">
        <span>MTN MoMo</span><span>Moov Money</span><span>Wave</span><span>Orange Money</span><span>À la livraison</span>
      </div>
    `;
  }

  function openCart() {
    $('.drawer').classList.add('open');
    $('.overlay').classList.add('open');
    $('.drawer').setAttribute('aria-hidden', 'false');
  }

  function closeCart() {
    $('.drawer').classList.remove('open');
    $('.overlay').classList.remove('open');
    $('.drawer').setAttribute('aria-hidden', 'true');
  }

  // Toast
  let toastTimer;
  function toast(msg) {
    const el = $('.toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  // Modal Dialog
  function openModal(contentHtml) {
    const m = document.createElement('div');
    m.className = 'modal';
    m.setAttribute('role', 'dialog');
    m.setAttribute('aria-modal', 'true');
    m.innerHTML = `
      <div class="modal-bg"></div>
      <div class="modal-card">
        <button class="x" style="position:absolute;top:0.8rem;right:0.8rem" aria-label="Fermer">×</button>
        ${contentHtml}
      </div>
    `;
    document.body.appendChild(m);
    m.addEventListener('click', e => {
      if (e.target.classList.contains('modal-bg') || e.target.closest('.x')) m.remove();
    });
    return m;
  }

  // Countdown timer (Date fixe 31/10/2026 23:59:59 +01:00)
  const EVENT_START = Date.parse('2026-09-15T00:00:00+01:00');
  const EVENT_END = Date.parse('2026-10-31T23:59:59+01:00');
  function tickCountdown() {
    const now = Date.now();
    let state = 'live';
    if (now < EVENT_START) state = 'before';
    else if (now > EVENT_END) state = 'after';

    const target = state === 'before' ? EVENT_START : EVENT_END;
    const ms = Math.max(0, target - now);
    const s = Math.floor(ms / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const pad = v => String(v).padStart(2, '0');

    const labelText = state === 'after'
      ? 'La nuit 2026 est passée · Rendez-vous en 2027'
      : 'Temps restant avant la nuit du samedi 31 octobre :';

    $$('[data-cd-label]').forEach(el => el.textContent = labelText);
    $$('[data-cd]').forEach(el => {
      if (state === 'after') {
        el.innerHTML = '<b style="min-width:auto;padding-inline:1.2rem">Collection terminée</b>';
      } else {
        el.innerHTML = `
          <b>${d}<small>jours</small></b>
          <b>${pad(h)}<small>heures</small></b>
          <b>${pad(m)}<small>min</small></b>
          <b>${pad(sec)}<small>sec</small></b>
        `;
      }
    });
  }

  // Product Card Renderer
  function renderCard(p) {
    const d = p.was ? pct(p.was, p.price) : 0;
    const img = p.combo ? P[p.combo[0]].img : p.img;
    return `
      <article class="card" data-id="${p.id}">
        <div class="card-media">
          ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : (d ? `<span class="badge">-${d} %</span>` : '')}
          <img src="${img}" alt="${esc(p.name)}" loading="lazy" width="400" height="400">
        </div>
        <div class="card-body">
          <span class="card-meta">${esc(p.catLabel || p.cat)} · Cotonou</span>
          <h3><a href="#/produit/${p.id}">${esc(p.name)}</a></h3>
          ${p.rating ? `<div class="stars">${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))} <span>(${p.reviews})</span></div>` : ''}
          <div class="price">
            <strong>${fcfa(p.price)}</strong>
            ${p.was ? `<s>${fcfa(p.was)}</s>` : ''}
          </div>
          ${p.stock && p.stock <= 5 ? `<span class="stock-warning">Plus que ${p.stock} pièces disponibles</span>` : ''}
          <button class="btn btn-acc btn-sm" data-add="${p.id}" style="margin-top:auto">Ajouter au panier</button>
        </div>
      </article>
    `;
  }

  // Router & Views
  function renderHome() {
    const featGrid = $('#featured-grid');
    if (featGrid) {
      featGrid.innerHTML = ['masque-mamiwata', 'masque-foret', 'cape-indigo', 'kit-fx'].map(id => renderCard(P[id])).join('');
    }
  }

  let currentShopCat = 'all';
  let currentShopSort = 'pop';
  function renderShop(cat = 'all') {
    currentShopCat = cat;
    const chips = $('#shop-chips');
    if (chips) {
      const cats = [['all', 'Tout'], ['masques', 'Masques'], ['costumes', 'Costumes'], ['maquillage', 'Maquillage FX'], ['accessoires', 'Accessoires'], ['deco', 'Déco'], ['looks', 'Looks complets']];
      chips.innerHTML = cats.map(([k, l]) => `
        <button class="chip" aria-pressed="${k === currentShopCat}" data-cat="${k}">${esc(l)}</button>
      `).join('');
    }

    let list = PRODUCTS.filter(p => currentShopCat === 'all' || p.cat === currentShopCat);
    if (currentShopSort === 'pop') list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    else if (currentShopSort === 'asc') list.sort((a, b) => a.price - b.price);
    else if (currentShopSort === 'desc') list.sort((a, b) => b.price - a.price);
    else if (currentShopSort === 'disc') list.sort((a, b) => (b.was ? pct(b.was, b.price) : 0) - (a.was ? pct(a.was, a.price) : 0));

    const grid = $('#shop-grid');
    if (grid) grid.innerHTML = list.map(renderCard).join('');
    const count = $('#shop-count');
    if (count) count.textContent = `${list.length} produit${list.length > 1 ? 's' : ''}`;
  }

  let curPDP = null;
  let curPDPQty = 1;
  let curPDPOpt = null;
  function renderProduct(id) {
    const p = P[id];
    const v = $('[data-view="product"]');
    if (!p || !v) return;

    curPDP = p;
    curPDPQty = 1;
    curPDPOpt = p.options ? p.options.values[p.options.def || 0] : null;
    const d = p.was ? pct(p.was, p.price) : 0;
    const cross = (p.cross || []).map(cid => P[cid]).filter(Boolean);

    document.title = `${p.name} – ${BRAND}`;

    v.innerHTML = `
      <div class="wrap" style="padding-bottom:5rem">
        <nav class="crumbs" aria-label="Fil d'Ariane">
          <a href="#/">Accueil</a> / <a href="#/boutique">Boutique</a> / <a href="#/boutique/${p.cat}">${esc(p.catLabel || p.cat)}</a> / <span aria-current="page">${esc(p.name)}</span>
        </nav>
        <div class="pdp">
          <div class="pdp-media ${p.combo ? 'combo' : ''}">
            ${p.combo
              ? p.combo.map(i => `<img src="${P[i].img}" alt="${esc(P[i].name)}" width="600" height="600">`).join('')
              : `<img src="${p.img}" alt="${esc(p.name)}" width="800" height="800">`}
          </div>
          <div>
            <span class="eyebrow">${esc(p.catLabel || p.cat)} · Pièce numérotée</span>
            <h1>${esc(p.name)}</h1>
            ${p.rating ? `<p style="display:flex;align-items:center;gap:0.5rem"><span class="stars">${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))}</span> <span class="muted" style="font-size:0.88rem">${p.reviews} avis vérifiés</span></p>` : ''}
            <div class="price" style="margin:1rem 0">
              <strong style="font-size:1.8rem">${fcfa(p.price)}</strong>
              ${p.was ? `<s>${fcfa(p.was)}</s> <span class="save-badge">-${d} % (Économie : ${fcfa(p.was - p.price)})</span>` : ''}
            </div>
            <p style="color:#DCD4E6;font-size:1.05rem;line-height:1.6">${p.short}</p>
            ${p.options ? `
              <div style="margin:1.4rem 0">
                <span style="font-weight:700;font-size:0.9rem">${esc(p.options.label)} : <b id="opt-val">${esc(curPDPOpt)}</b></span>
                <div class="chips" id="pdp-opts">
                  ${p.options.values.map(o => `<button class="chip" aria-pressed="${o === curPDPOpt}" data-pdp-opt="${esc(o)}">${esc(o)}</button>`).join('')}
                </div>
                ${p.cat === 'costumes' || p.id === 'look-foret' ? `<button class="btn-ghost" data-open-size-guide style="font-size:0.8rem;margin-top:0.5rem;text-decoration:underline;padding:0.2rem 0">Guide des tailles & conseils</button>` : ''}
              </div>
            ` : ''}
            ${p.stock ? `<p class="stock-warning" style="margin:1rem 0">📦 ${p.stock <= 5 ? `Plus que ${p.stock} en stock : commandez avant mercredi pour Halloween` : 'En stock · Expédié sous 24 h à Cotonou'}</p>` : ''}
            <div class="buy-row">
              <div class="qty" role="group" aria-label="Quantité">
                <button data-pq="-1" aria-label="Moins">−</button>
                <output id="pdp-qv">1</output>
                <button data-pq="1" aria-label="Plus">+</button>
              </div>
              <button class="btn btn-acc" data-add-pdp>Ajouter au panier · <span id="pdp-btn-tot">${fcfa(p.price)}</span></button>
            </div>
            <a class="btn btn-wa btn-block" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(`Bonjour ${BRAND}, je souhaite commander : ${p.name} (${fcfa(p.price)}).`)}" style="margin-top:0.75rem">
              Commander directement sur WhatsApp
            </a>
            <ul class="info-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
                <span><b>Livraison 24 h à Cotonou</b> (gratuite dès 30 000 FCFA). Commandez avant le 28 octobre.</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/></svg>
                <span>Paiement Mobile Money (MTN MoMo, Moov, Wave, Orange) ou <b>espèces à la livraison</b>.</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
                <span>Échange de taille gratuit sous 7 jours ou retrait gratuit à l'atelier de Haie Vive.</span>
              </li>
            </ul>
            <details open style="border-top:1px solid var(--line);padding:1rem 0">
              <summary style="font-weight:700;cursor:pointer">Description & Matériaux</summary>
              <p style="margin-top:0.8rem;color:var(--muted)">${p.desc}</p>
            </details>
            ${p.details ? `
              <details style="border-top:1px solid var(--line);padding:1rem 0">
                <summary style="font-weight:700;cursor:pointer">Fiche technique</summary>
                <ul style="margin-top:0.8rem;padding-left:1.2rem;color:var(--muted)">
                  ${p.details.map(d => `<li>${esc(d)}</li>`).join('')}
                </ul>
              </details>
            ` : ''}
          </div>
        </div>
        ${cross.length ? `
          <section class="sec" style="padding-bottom:0">
            <div class="sec-h"><h2>Complétez votre look</h2></div>
            <div class="grid">${cross.map(renderCard).join('')}</div>
          </section>
        ` : ''}
      </div>
    `;

    const stickyBuy = $('.sticky-buy');
    if (stickyBuy) {
      stickyBuy.innerHTML = `
        <div class="price"><strong>${fcfa(p.price)}</strong>${p.was ? `<s>${fcfa(p.was)}</s>` : ''}</div>
        <button class="btn btn-acc" data-add-pdp>Ajouter</button>
      `;
    }
  }

  function route() {
    const hash = location.hash || '#/';
    const parts = hash.slice(2).split('/');
    const view = parts[0] === 'boutique' ? 'shop' : parts[0] === 'produit' ? 'product' : 'home';
    const arg = parts[1];

    $$('[data-view]').forEach(el => el.hidden = el.dataset.view !== view);
    document.body.classList.toggle('on-pdp', view === 'product');

    if (view === 'home') {
      document.title = `${BRAND} – Masques & Costumes Halloween faits main à Cotonou`;
      renderHome();
    } else if (view === 'shop') {
      document.title = `Boutique – ${BRAND}`;
      renderShop(arg || 'all');
    } else if (view === 'product') {
      renderProduct(arg);
    }

    $$('.nav a').forEach(a => a.toggleAttribute('aria-current', a.getAttribute('href') === hash));
    window.scrollTo(0, 0);
    closeCart();
  }

  // Event Listeners
  document.addEventListener('click', e => {
    // Add to cart from cards
    const addBtn = e.target.closest('[data-add]');
    if (addBtn) {
      e.preventDefault();
      const p = P[addBtn.dataset.add];
      if (p) addToCart(p.id, 1, p.options ? p.options.values[p.options.def || 0] : null);
    }

    // Add to cart from PDP
    if (e.target.closest('[data-add-pdp]') && curPDP) {
      addToCart(curPDP.id, curPDPQty, curPDPOpt);
    }

    // PDP Quantity Stepper
    const pq = e.target.closest('[data-pq]');
    if (pq && curPDP) {
      curPDPQty = Math.max(1, Math.min(99, curPDPQty + Number(pq.dataset.pq)));
      const qv = $('#pdp-qv');
      if (qv) qv.textContent = curPDPQty;
      const tot = $('#pdp-btn-tot');
      if (tot) tot.textContent = fcfa(curPDP.price * curPDPQty);
    }

    // PDP Option Selector
    const optBtn = e.target.closest('[data-pdp-opt]');
    if (optBtn) {
      curPDPOpt = optBtn.dataset.pdpOpt;
      $$('[data-pdp-opt]').forEach(b => b.setAttribute('aria-pressed', b === optBtn));
      const val = $('#opt-val');
      if (val) val.textContent = curPDPOpt;
    }

    // Cart Drawer Controls
    const cq = e.target.closest('[data-cq]');
    if (cq) {
      const idx = Number(cq.dataset.cq);
      cart[idx].qty += Number(cq.dataset.d);
      if (cart[idx].qty <= 0) cart.splice(idx, 1);
      saveCart();
      renderCart();
    }

    const rm = e.target.closest('[data-rm]');
    if (rm) {
      cart.splice(Number(rm.dataset.rm), 1);
      saveCart();
      renderCart();
    }

    if (e.target.closest('[data-apply-code]')) {
      const input = $('#code-input');
      const val = (input ? input.value : '').trim().toUpperCase();
      if (PROMO_CODES[val]) {
        activeCode = { c: val, pct: PROMO_CODES[val] };
        toast(`Code ${val} appliqué : -${PROMO_CODES[val]} % sur votre commande !`);
      } else {
        activeCode = null;
        toast('Code promo invalide ou expiré');
      }
      renderCart();
    }

    // Cart Open/Close
    if (e.target.closest('[data-open-cart]')) openCart();
    if (e.target.closest('[data-close]') || e.target.classList.contains('overlay')) closeCart();

    // Copy Promo Codes
    const copyBtn = e.target.closest('[data-copy]');
    if (copyBtn) {
      const code = copyBtn.dataset.copy;
      if (navigator.clipboard) navigator.clipboard.writeText(code);
      toast(`Code ${code} copié ! Collez-le dans votre panier.`);
    }

    // Easter Egg Ghost
    if (e.target.closest('#ghost-btn')) {
      openModal(`
        <span class="eyebrow">Secret d’initié</span>
        <h2 style="font-size:1.8rem;margin-top:0.4rem">👻 Vous avez trouvé le fantôme !</h2>
        <p style="color:#DCD4E6;margin:1rem 0">Bravo ! Voici votre code exclusif de <b>-15 %</b> valable sur l'ensemble de votre panier.</p>
        <div style="background:#0D0D0D;border:1px dashed var(--acc);border-radius:8px;padding:1rem;text-align:center;font-size:1.4rem;font-weight:800;letter-spacing:0.1em;color:var(--acc);margin-bottom:1.2rem">
          OMBRE15
        </div>
        <button class="btn btn-acc btn-block" data-copy="OMBRE15">Copier le code OMBRE15 (-15 %)</button>
      `);
    }

    // Size Guide Modal
    if (e.target.closest('[data-open-size-guide]')) {
      openModal(`
        <span class="eyebrow">Guide des tailles</span>
        <h2 style="font-size:1.7rem;margin-top:0.4rem">Quelle taille de cape choisir ?</h2>
        <div style="display:grid;gap:1rem;margin:1.2rem 0;font-size:0.95rem">
          <div style="background:#0D0D0D;padding:1rem;border-radius:8px;border:1px solid var(--line)">
            <b style="color:var(--acc);display:block;margin-bottom:0.3rem">Taille S/M (Longueur 125 cm)</b>
            <span>Idéale pour les personnes mesurant entre <b>1,55 m et 1,70 m</b>. Tombe élégamment au niveau des mollets.</span>
          </div>
          <div style="background:#0D0D0D;padding:1rem;border-radius:8px;border:1px solid var(--line)">
            <b style="color:var(--acc);display:block;margin-bottom:0.3rem">Taille L/XL (Longueur 145 cm)</b>
            <span>Idéale pour les personnes mesurant entre <b>1,70 m et 1,95 m</b>. Ample et majestueuse.</span>
          </div>
        </div>
        <p style="font-size:0.85rem;color:var(--muted)">✨ <b>Garantie ajustement :</b> Essayage gratuit possible devant le livreur, échange sous 7 jours garanti.</p>
      `);
    }

    // Checkout Flow Modal
    if (e.target.closest('[data-checkout]')) {
      const sub = getSubtotal();
      const disc = activeCode ? Math.round((sub * activeCode.pct) / 100) : 0;
      const ship = sub >= FREE_SHIP_THRESHOLD ? 0 : SHIP_FEE_STD;
      const finalTot = sub - disc + ship;
      const summary = cart.map(l => `${l.qty}x ${P[l.id].name}${l.opt ? ' (' + l.opt + ')' : ''}`).join(', ');

      openModal(`
        <span class="eyebrow">Finaliser votre commande</span>
        <h2 style="font-size:1.7rem;margin-top:0.4rem">Votre réservation Halloween</h2>
        <div style="background:#0D0D0D;border-radius:8px;padding:1rem;margin:1rem 0;font-size:0.92rem;display:grid;gap:0.4rem">
          <div><b>Articles :</b> ${esc(summary)}</div>
          <div><b>Montant total :</b> <b class="tnum" style="color:var(--acc)">${fcfa(finalTot)}</b> ${ship === 0 ? '(Livraison offerte)' : ''}</div>
        </div>
        <p style="font-size:0.9rem;color:var(--muted);margin-bottom:1.2rem">
          🔒 <b>Site de démonstration officiel :</b> Aucun débit bancaire automatique n'est réalisé sur ce site. Choisissez votre mode de finalisation :
        </p>
        <a class="btn btn-wa btn-block" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(`Bonjour Nuit des Masques, je valide ma commande :\n- Articles : ${summary}\n- Total : ${fcfa(finalTot)}\nMerci de me confirmer la livraison à Cotonou.`)}" style="margin-bottom:0.8rem">
          Envoyer ma commande sur WhatsApp
        </a>
        <button class="btn btn-ghost btn-block" onclick="this.closest('.modal').remove();Q4.toast('Commande enregistrée pour paiement à la livraison !');">
          Confirmer le paiement en espèces à la livraison
        </button>
      `);
    }

    // Shop Category Filter
    const catBtn = e.target.closest('[data-cat]');
    if (catBtn) renderShop(catBtn.dataset.cat);

    // Quiz Option Click
    const quizOpt = e.target.closest('[data-quiz-val]');
    if (quizOpt) {
      const recId = quizOpt.dataset.quizVal;
      const recProduct = P[recId];
      if (recProduct) {
        openModal(`
          <span class="eyebrow">Votre révélation de la nuit</span>
          <h2 style="font-size:1.8rem;margin-top:0.4rem">${esc(recProduct.name)}</h2>
          <div style="display:grid;grid-template-columns:120px 1fr;gap:1.2rem;align-items:center;margin:1.2rem 0">
            <img src="${recProduct.img}" alt="${esc(recProduct.name)}" style="border-radius:8px;width:100%;aspect-ratio:1;object-fit:cover">
            <div>
              <p style="color:#DCD4E6;font-size:0.95rem;margin-bottom:0.6rem">${recProduct.short}</p>
              <div class="price"><strong>${fcfa(recProduct.price)}</strong></div>
            </div>
          </div>
          <button class="btn btn-acc btn-block" onclick="Q4.addToCart('${recProduct.id}', 1); this.closest('.modal').remove();">
            Ajouter ${esc(recProduct.name)} à mon panier
          </button>
        `);
      }
    }
  });

  // Sort dropdown
  document.addEventListener('change', e => {
    if (e.target.id === 'shop-sort-select') {
      currentShopSort = e.target.value;
      renderShop(currentShopCat);
    }
    if (e.target.id === 'deliv-quartier-select') {
      const selected = e.target.value;
      const out = $('#deliv-result');
      if (out) {
        if (selected === 'calavi' || selected === 'portonovo') {
          out.innerHTML = `🚚 Délai estimé : <b>48 heures ouvrées</b> (Livraison assurée avant le 31 octobre). Frais : <b>2 000 FCFA</b> (Offerts dès 30 000 FCFA).`;
        } else {
          out.innerHTML = `⚡ Délai express : <b>Livraison en 24 h chrono</b> à ${esc(selected)} (ou retrait immédiat à l'atelier de Haie Vive).`;
        }
      }
    }
  });

  // Flashlight Interaction on Hero
  function initHeroFlashlight() {
    const hero = $('.hero');
    if (!hero) return;
    const moveHandler = e => {
      const rect = hero.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      hero.style.setProperty('--x', `${clientX - rect.left}px`);
      hero.style.setProperty('--y', `${clientY - rect.top}px`);
    };
    hero.addEventListener('pointermove', moveHandler);
    hero.addEventListener('touchmove', moveHandler, { passive: true });
  }

  // Keyboard accessibility
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeCart();
      const m = $('.modal');
      if (m) m.remove();
    }
  });

  // Sticky PDP visibility
  addEventListener('scroll', () => {
    const b = $('[data-add-pdp]:not(.sticky-buy *)');
    const sb = $('.sticky-buy');
    if (!b || !sb || !document.body.classList.contains('on-pdp')) return;
    const r = b.getBoundingClientRect();
    sb.classList.toggle('show', r.bottom < 0 || r.top > innerHeight);
  }, { passive: true });

  // Expose global Q4 helper
  window.Q4 = { fcfa, pct, esc, P, toast, addToCart, openCart, openModal };

  // Typewriter Effect
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = "";
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Init
  window.addEventListener('hashchange', route);
  initHeroFlashlight();
  
  const typingEl = $('#typing-text');
  if (typingEl) typeWriter(typingEl, "masque", 150);

  tickCountdown();
  setInterval(tickCountdown, 1000);
  renderCart();
  route();
})();
