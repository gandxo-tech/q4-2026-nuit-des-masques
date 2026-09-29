(() => {
  'use strict';

  // Formatters & helpers
  const fcfa = n => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(Math.round(n));
  const pct = (was, now) => Math.round((1 - now / was) * 100);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Centralized SVG Icons
  const ICONS = {
    starFilled: `<svg viewBox="0 0 24 24" fill="currentColor" class="svg-icon" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    starEmpty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svg-icon" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    cart: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`,
    cartAdd: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><path d="M12 12v6m-3-3h6"/></svg>`,
    trash: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
    minus: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" class="svg-icon" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" class="svg-icon" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    close: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    tag: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    truck: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
    check: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`,
    copy: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    lock: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" class="svg-icon" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.3-.5-.5-1-1.1-1.3-1.7-.1-.2 0-.4.1-.5l.4-.5.3-.4v-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.7.7-1 1.6-1 2.5.1 1.1.5 2.1 1.2 3 1.2 1.8 2.8 3.2 4.7 4 .5.2 1 .4 1.6.5.6.2 1.2.2 1.8.1.7-.1 1.4-.6 1.8-1.2.2-.4.2-.9.1-1.3z"/></svg>`,
    chevronRight: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>`,
    ruler: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><path d="m21.73 2.27-8.35 8.35a6.002 6.002 0 0 0-8.23 8.23l-3.15 3.15 1.42 1.42 3.15-3.15a6 6 0 0 0 8.23-8.23l8.35-8.35a1.5 1.5 0 0 0-2.12-2.12z"/></svg>`,
    sparkles: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    // Categories
    catAll: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    catMasques: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><path d="M2 10c1.5-4 5-6 10-6s8.5 2 10 6c-.5 6-4 10-10 10S2.5 16 2 10Z"/><circle cx="8" cy="11" r="2"/><circle cx="16" cy="11" r="2"/></svg>`,
    catCostumes: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>`,
    catMaquillage: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/></svg>`,
    catAccessoires: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>`,
    catDeco: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><path d="M12 2c-.5 1.5-2 3-2 5a2 2 0 0 0 4 0c0-2-1.5-3.5-2-5z"/><rect x="8" y="9" width="8" height="13" rx="1"/></svg>`,
    catLooks: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  };

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
      options: { label: 'Taille de cape', values: ['S/M', 'L/XL'], def: 0 },
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

    $$('.cart-count').forEach(countEl => {
      countEl.classList.remove('bump');
      void countEl.offsetWidth;
      countEl.classList.add('bump');
    });

    toast(`« ${P[id].name} » ajouté au panier`);
    setTimeout(openCart, 300);
  }

  function getSubtotal() {
    return cart.reduce((sum, item) => sum + (P[item.id] ? P[item.id].price * item.qty : 0), 0);
  }

  // Star Rating Renderer (All SVG Icons)
  function renderStars(rating, count = null) {
    const r = Math.round(rating || 5);
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      starsHtml += i <= r ? ICONS.starFilled : ICONS.starEmpty;
    }
    return `
      <div class="stars-row" role="img" aria-label="Note : ${rating} sur 5">
        ${starsHtml}
        ${count !== null ? `<span class="stars-count">(${count})</span>` : ''}
      </div>
    `;
  }

  function renderCart() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    $$('.cart-count').forEach(el => el.textContent = totalQty);

    const b = $('.drawer-b');
    const f = $('.drawer-f');
    if (!b || !f) return;

    if (!cart.length) {
      b.innerHTML = `
        <div style="text-align:center;padding:3.5rem 1rem;color:var(--muted)">
          <div style="opacity:0.6;margin-bottom:1rem">${ICONS.cart}</div>
          <p style="font-weight:700;color:var(--fg);font-size:1.1rem;margin-bottom:0.4rem">Votre panier est vide</p>
          <p style="font-size:0.9rem">Découvrez les masques faits main de la collection.</p>
          <a class="btn btn-acc btn-sm" href="#/boutique" style="margin-top:1.2rem;gap:0.4rem" data-close>
            ${ICONS.catAll} <span>Découvrir la boutique</span>
          </a>
        </div>
      `;
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
        <div class="ship-bar-txt">
          ${freeRemain > 0 ? ICONS.truck : ICONS.check}
          <span>${freeRemain > 0 ? `Plus que <b>${fcfa(freeRemain)}</b> pour la <b>livraison offerte</b>` : '<b>Livraison offerte débloquée</b> à Cotonou'}</span>
        </div>
        <div class="bar"><i style="width:${Math.min(100, (sub / FREE_SHIP_THRESHOLD) * 100)}%"></i></div>
      </div>
      ${cart.map((l, i) => {
        const p = P[l.id];
        if (!p) return '';
        const img = p.combo ? P[p.combo[0]].img : p.img;
        return `
          <div class="line">
            <img src="${img}" alt="${esc(p.name)}" width="60" height="60">
            <div>
              <h4>${esc(p.name)}</h4>
              ${l.opt ? `<div style="font-size:0.8rem;color:var(--muted)">Option : <b>${esc(l.opt)}</b></div>` : ''}
              <div class="qty" style="margin-top:0.35rem">
                <button data-cq="${i}" data-d="-1" aria-label="Moins">${ICONS.minus}</button>
                <output>${l.qty}</output>
                <button data-cq="${i}" data-d="1" aria-label="Plus">${ICONS.plus}</button>
              </div>
            </div>
            <div style="text-align:right">
              <b class="tnum" style="display:block">${fcfa(p.price * l.qty)}</b>
              <button class="btn-ghost" data-rm="${i}" style="font-size:0.78rem;color:var(--muted);padding:0.3rem 0;display:inline-flex;align-items:center;gap:0.25rem" aria-label="Retirer du panier">
                ${ICONS.trash} <span>Retirer</span>
              </button>
            </div>
          </div>
        `;
      }).join('')}
    `;

    f.innerHTML = `
      <div class="code-row">
        <input id="code-input" placeholder="Code promo (ex: BOO10)" aria-label="Code promo" value="${activeCode ? activeCode.c : ''}">
        <button class="btn btn-ghost btn-sm" data-apply-code style="gap:0.35rem">
          ${ICONS.tag} <span>Appliquer</span>
        </button>
      </div>
      <div class="tot"><span>Sous-total</span><span class="tnum">${fcfa(sub)}</span></div>
      ${disc ? `<div class="tot" style="color:var(--acc)"><span>Remise code ${activeCode.c} (-${activeCode.pct} %)</span><span class="tnum">−${fcfa(disc)}</span></div>` : ''}
      <div class="tot"><span>Livraison</span><span class="tnum">${ship === 0 ? '<span style="color:var(--success)">Offerte</span>' : fcfa(ship)}</span></div>
      <div class="tot big"><span>Total estimé</span><span class="tnum">${fcfa(total)}</span></div>
      <button class="btn btn-acc btn-block" data-checkout style="gap:0.5rem">
        ${ICONS.lock} <span>Commander · ${fcfa(total)}</span>
      </button>
      <div class="pay-badges">
        <span>${ICONS.check} MTN MoMo</span>
        <span>${ICONS.check} Moov Money</span>
        <span>${ICONS.check} Wave</span>
        <span>${ICONS.check} Orange Money</span>
        <span>${ICONS.truck} Espèces</span>
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

  // Mobile Navigation Drawer Controls
  function openMobileNav() {
    const mn = $('#mobile-nav');
    const mt = $('#menu-toggle');
    if (mn) mn.classList.add('open');
    if (mt) mt.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    const mn = $('#mobile-nav');
    const mt = $('#menu-toggle');
    if (mn) mn.classList.remove('open');
    if (mt) mt.setAttribute('aria-expanded', 'false');
  }

  // Toast
  let toastTimer;
  function toast(msg) {
    const el = $('.toast');
    if (!el) return;
    el.innerHTML = `${ICONS.check} <span>${msg}</span>`;
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
        <button class="x" style="position:absolute;top:0.8rem;right:0.8rem" aria-label="Fermer">${ICONS.close}</button>
        ${contentHtml}
      </div>
    `;
    document.body.appendChild(m);
    m.addEventListener('click', e => {
      if (e.target.classList.contains('modal-bg') || e.target.closest('.x')) m.remove();
    });
    return m;
  }

  // Countdown timer
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

    $$('[data-cd-label]').forEach(el => {
      el.innerHTML = `${ICONS.clock} <span>${labelText}</span>`;
    });
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

  // Product Card Renderer with SVG Icons
  function renderCard(p) {
    const d = p.was ? pct(p.was, p.price) : 0;
    const img = p.combo ? P[p.combo[0]].img : p.img;
    const badgeText = p.badge || (d ? `-${d} %` : null);

    return `
      <article class="card" data-id="${p.id}">
        <div class="card-media">
          ${badgeText ? `<span class="card-badge">${ICONS.tag} <span>${esc(badgeText)}</span></span>` : ''}
          <img src="${img}" alt="${esc(p.name)}" loading="lazy" width="400" height="400">
        </div>
        <div class="card-body">
          <span class="card-meta">${esc(p.catLabel || p.cat)} · Cotonou</span>
          <h3><a href="#/produit/${p.id}">${esc(p.name)}</a></h3>
          ${p.rating ? renderStars(p.rating, p.reviews) : ''}
          <div class="price">
            <strong>${fcfa(p.price)}</strong>
            ${p.was ? `<s>${fcfa(p.was)}</s>` : ''}
          </div>
          ${p.stock && p.stock <= 5 ? `<span class="stock-warning">${ICONS.clock} Plus que ${p.stock} pièces</span>` : ''}
          <button class="btn btn-acc btn-sm" data-add="${p.id}" style="margin-top:auto;gap:0.4rem">
            ${ICONS.cartAdd} <span>Ajouter au panier</span>
          </button>
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
      const cats = [
        ['all', 'Tout', ICONS.catAll],
        ['masques', 'Masques', ICONS.catMasques],
        ['costumes', 'Costumes', ICONS.catCostumes],
        ['maquillage', 'Maquillage FX', ICONS.catMaquillage],
        ['accessoires', 'Accessoires', ICONS.catAccessoires],
        ['deco', 'Déco', ICONS.catDeco],
        ['looks', 'Looks complets', ICONS.catLooks]
      ];
      chips.innerHTML = cats.map(([k, l, ico]) => `
        <button class="chip" aria-pressed="${k === currentShopCat}" data-cat="${k}">
          ${ico} <span>${esc(l)}</span>
        </button>
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
    if (count) count.textContent = `${list.length} création${list.length > 1 ? 's' : ''}`;
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
          <a href="#/">
            <svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <span>Accueil</span>
          </a>
          ${ICONS.chevronRight}
          <a href="#/boutique">Boutique</a>
          ${ICONS.chevronRight}
          <a href="#/boutique/${p.cat}">${esc(p.catLabel || p.cat)}</a>
          ${ICONS.chevronRight}
          <span aria-current="page">${esc(p.name)}</span>
        </nav>

        <div class="pdp">
          <div class="pdp-media ${p.combo ? 'combo' : ''}">
            ${p.combo
              ? p.combo.map(i => `<img src="${P[i].img}" alt="${esc(P[i].name)}" width="600" height="600">`).join('')
              : `<img src="${p.img}" alt="${esc(p.name)}" width="800" height="800">`}
          </div>

          <div>
            <span class="eyebrow">
              ${ICONS.sparkles}
              <span>${esc(p.catLabel || p.cat)} · Pièce numérotée</span>
            </span>
            <h1>${esc(p.name)}</h1>
            ${p.rating ? `<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.6rem">${renderStars(p.rating, `${p.reviews} avis vérifiés`)}</div>` : ''}

            <div class="price" style="margin:1rem 0">
              <strong style="font-size:1.8rem">${fcfa(p.price)}</strong>
              ${p.was ? `<s>${fcfa(p.was)}</s> <span class="save-badge">${ICONS.tag} <span>-${d} % (Économie : ${fcfa(p.was - p.price)})</span></span>` : ''}
            </div>

            <p style="color:#DCD4E6;font-size:1.05rem;line-height:1.6">${p.short}</p>

            ${p.options ? `
              <div style="margin:1.4rem 0">
                <span style="font-weight:700;font-size:0.9rem">${esc(p.options.label)} : <b id="opt-val">${esc(curPDPOpt)}</b></span>
                <div class="chips" id="pdp-opts">
                  ${p.options.values.map(o => `<button class="chip" aria-pressed="${o === curPDPOpt}" data-pdp-opt="${esc(o)}">${esc(o)}</button>`).join('')}
                </div>
                ${p.cat === 'costumes' || p.id === 'look-foret' ? `
                  <button class="btn-ghost" data-open-size-guide style="font-size:0.82rem;margin-top:0.6rem;text-decoration:underline;padding:0.2rem 0;display:inline-flex;align-items:center;gap:0.35rem">
                    ${ICONS.ruler} <span>Guide des tailles & conseils</span>
                  </button>
                ` : ''}
              </div>
            ` : ''}

            ${p.stock ? `<p class="stock-warning" style="margin:1rem 0">${ICONS.truck} <span>${p.stock <= 5 ? `Plus que ${p.stock} pièces en stock : commandez avant mercredi pour Halloween` : 'En stock · Expédié sous 24 h à Cotonou'}</span></p>` : ''}

            <div class="buy-row">
              <div class="qty" role="group" aria-label="Quantité">
                <button data-pq="-1" aria-label="Moins">${ICONS.minus}</button>
                <output id="pdp-qv">1</output>
                <button data-pq="1" aria-label="Plus">${ICONS.plus}</button>
              </div>
              <button class="btn btn-acc" data-add-pdp style="gap:0.5rem">
                ${ICONS.cartAdd} <span>Ajouter au panier · <span id="pdp-btn-tot">${fcfa(p.price)}</span></span>
              </button>
            </div>

            <a class="btn btn-wa btn-block" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(`Bonjour ${BRAND}, je souhaite commander : ${p.name} (${fcfa(p.price)}).`)}" style="margin-top:0.75rem;gap:0.5rem">
              ${ICONS.whatsapp} <span>Commander directement sur WhatsApp</span>
            </a>

            <ul class="info-list">
              <li>
                ${ICONS.truck}
                <span><b>Livraison 24 h à Cotonou</b> (gratuite dès 30 000 FCFA). Commandez avant le 28 octobre.</span>
              </li>
              <li>
                ${ICONS.lock}
                <span>Paiement Mobile Money (MTN MoMo, Moov, Wave, Orange) ou <b>espèces à la livraison</b>.</span>
              </li>
              <li>
                ${ICONS.check}
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
        <button class="btn btn-acc" data-add-pdp style="gap:0.4rem">
          ${ICONS.cartAdd} <span>Ajouter</span>
        </button>
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

    // Sync Desktop Nav & Mobile Nav Active States
    $$('.nav a, .mobile-nav-link').forEach(a => {
      const href = a.getAttribute('href');
      a.toggleAttribute('aria-current', href === hash || (href === '#/boutique' && hash.startsWith('#/boutique')));
    });

    window.scrollTo(0, 0);
    closeCart();
    closeMobileNav();
  }

  // Event Listeners
  document.addEventListener('click', e => {
    // Mobile Nav Toggle
    if (e.target.closest('#menu-toggle')) {
      openMobileNav();
      return;
    }
    if (e.target.closest('#mobile-nav-close') || e.target.closest('#mobile-nav-backdrop') || e.target.closest('.mobile-nav-link')) {
      closeMobileNav();
    }

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
    if (e.target.closest('[data-open-cart]')) {
      closeMobileNav();
      openCart();
    }
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
        <span class="eyebrow">${ICONS.sparkles} Secret d’initié</span>
        <h2 style="font-size:1.8rem;margin-top:0.4rem">👻 Vous avez trouvé le fantôme !</h2>
        <p style="color:#DCD4E6;margin:1rem 0">Bravo ! Voici votre code exclusif de <b>-15 %</b> valable sur l'ensemble de votre panier.</p>
        <div style="background:#0D0D0D;border:1px dashed var(--acc);border-radius:8px;padding:1rem;text-align:center;font-size:1.4rem;font-weight:800;letter-spacing:0.1em;color:var(--acc);margin-bottom:1.2rem">
          OMBRE15
        </div>
        <button class="btn btn-acc btn-block" data-copy="OMBRE15" style="gap:0.4rem">
          ${ICONS.copy} <span>Copier le code OMBRE15 (-15 %)</span>
        </button>
      `);
    }

    // Size Guide Modal
    if (e.target.closest('[data-open-size-guide]')) {
      openModal(`
        <span class="eyebrow">${ICONS.ruler} Guide des tailles</span>
        <h2 style="font-size:1.7rem;margin-top:0.4rem">Quelle taille de cape choisir ?</h2>
        <div style="display:grid;gap:1rem;margin:1.2rem 0;font-size:0.95rem">
          <div style="background:#0D0D0D;padding:1rem;border-radius:8px;border:1px solid var(--line)">
            <b style="color:var(--acc);display:flex;align-items:center;gap:0.4rem;margin-bottom:0.3rem">
              ${ICONS.check} Taille S/M (Longueur 125 cm)
            </b>
            <span>Idéale pour les personnes mesurant entre <b>1,55 m et 1,70 m</b>. Tombe élégamment au niveau des mollets.</span>
          </div>
          <div style="background:#0D0D0D;padding:1rem;border-radius:8px;border:1px solid var(--line)">
            <b style="color:var(--acc);display:flex;align-items:center;gap:0.4rem;margin-bottom:0.3rem">
              ${ICONS.check} Taille L/XL (Longueur 145 cm)
            </b>
            <span>Idéale pour les personnes mesurant entre <b>1,70 m et 1,95 m</b>. Ample et majestueuse.</span>
          </div>
        </div>
        <p style="font-size:0.85rem;color:var(--muted);display:flex;align-items:center;gap:0.4rem">
          ${ICONS.truck} <span><b>Garantie ajustement :</b> Essayage gratuit devant le livreur, échange sous 7 jours garanti.</span>
        </p>
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
        <span class="eyebrow">${ICONS.lock} Finaliser votre commande</span>
        <h2 style="font-size:1.7rem;margin-top:0.4rem">Votre réservation Halloween</h2>
        <div style="background:#0D0D0D;border-radius:8px;padding:1rem;margin:1rem 0;font-size:0.92rem;display:grid;gap:0.5rem">
          <div><b>Articles :</b> ${esc(summary)}</div>
          <div><b>Montant total :</b> <b class="tnum" style="color:var(--acc);font-size:1.15rem">${fcfa(finalTot)}</b> ${ship === 0 ? '<span style="color:var(--success)">(Livraison offerte)</span>' : ''}</div>
        </div>
        <p style="font-size:0.9rem;color:var(--muted);margin-bottom:1.2rem">
          🔒 <b>Site officiel :</b> Choisissez votre mode de finalisation instantané :
        </p>
        <a class="btn btn-wa btn-block" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(`Bonjour Nuit des Masques, je valide ma commande :\n- Articles : ${summary}\n- Total : ${fcfa(finalTot)}\nMerci de me confirmer la livraison à Cotonou.`)}" style="margin-bottom:0.8rem;gap:0.5rem">
          ${ICONS.whatsapp} <span>Envoyer ma commande sur WhatsApp</span>
        </a>
        <button class="btn btn-ghost btn-block" onclick="this.closest('.modal').remove();Q4.toast('Commande enregistrée pour paiement à la livraison !');" style="gap:0.4rem">
          ${ICONS.truck} <span>Confirmer le paiement en espèces à la livraison</span>
        </button>
      `);
    }

    // Shop Category Filter & Hash Sync
    const catBtn = e.target.closest('[data-cat]');
    if (catBtn) {
      const cat = catBtn.dataset.cat;
      location.hash = cat === 'all' ? '#/boutique' : `#/boutique/${cat}`;
    }

    // Quiz Option Click
    const quizOpt = e.target.closest('[data-quiz-val]');
    if (quizOpt) {
      const recId = quizOpt.dataset.quizVal;
      const recProduct = P[recId];
      if (recProduct) {
        openModal(`
          <span class="eyebrow">${ICONS.sparkles} Votre révélation de la nuit</span>
          <h2 style="font-size:1.75rem;margin-top:0.4rem">${esc(recProduct.name)}</h2>
          <div style="display:grid;grid-template-columns:120px 1fr;gap:1.2rem;align-items:center;margin:1.2rem 0">
            <img src="${recProduct.img}" alt="${esc(recProduct.name)}" style="border-radius:8px;width:100%;aspect-ratio:1;object-fit:cover">
            <div>
              <p style="color:#DCD4E6;font-size:0.95rem;margin-bottom:0.6rem">${recProduct.short}</p>
              <div class="price"><strong>${fcfa(recProduct.price)}</strong></div>
            </div>
          </div>
          <button class="btn btn-acc btn-block" onclick="Q4.addToCart('${recProduct.id}', 1); this.closest('.modal').remove();" style="gap:0.4rem">
            ${ICONS.cartAdd} <span>Ajouter ${esc(recProduct.name)} à mon panier</span>
          </button>
        `);
      }
    }
  });

  // Sort dropdown & Delivery Estimator
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
          out.innerHTML = `
            <svg class="svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--acc);margin-top:2px"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <span>Délai estimé : <b>48 heures ouvrées</b> (Livraison assurée avant le 31 octobre). Frais : <b>2 000 FCFA</b> (Offerts dès 30 000 FCFA).</span>
          `;
        } else {
          out.innerHTML = `
            <svg class="svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--acc);margin-top:2px"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <span>Délai express : <b>Livraison en 24 h chrono</b> à ${esc(selected)} (ou retrait immédiat à l'atelier de Haie Vive).</span>
          `;
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
      closeMobileNav();
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
  window.Q4 = { fcfa, pct, esc, P, toast, addToCart, openCart, openModal, ICONS };

  // ========================================================
  // HORROR CALLIGRAPHY TYPEWRITER MICRO-ANIMATION
  // ========================================================
  function initHorrorCalligraphyTypewriter() {
    const el = $('#horror-typewriter');
    if (!el) return;

    const phrases = [
      "masque maudit",
      "part d'ombre",
      "reine des abysses",
      "esprit de la forêt",
      "mystère de Cotonou",
      "parure nocturne"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function tick() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        el.textContent = currentPhrase.substring(0, charIndex);
      } else {
        charIndex++;
        el.textContent = currentPhrase.substring(0, charIndex);
      }

      // Dynamic horror cadence
      let delay = isDeleting ? 45 : Math.floor(70 + Math.random() * 85);

      // Shivering hesitation before the end of dramatic words
      if (!isDeleting && (charIndex === currentPhrase.length - 3 || charIndex === 4)) {
        delay += 90;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isWaiting = true;
        delay = 2400; // Breathable pause while glowing
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        isWaiting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 500;
      }

      setTimeout(tick, delay);
    }

    tick();
  }

  // Init
  window.addEventListener('hashchange', route);
  initHeroFlashlight();
  initHorrorCalligraphyTypewriter();
  tickCountdown();
  setInterval(tickCountdown, 1000);
  renderCart();
  route();
})();
