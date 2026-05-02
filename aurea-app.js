/* ============================================================
   AUREA-APP.JS — Toda a lógica da aplicação
   Carrinho, Busca, Filtros, Modal de Produto, Checkout,
   Contador animado, Newsletter, Hambúrguer, Countdown
   ============================================================ */

'use strict';

// ═══════════════════════════════════════════════════════
// 1. BASE DE DADOS DE PRODUTOS
// ═══════════════════════════════════════════════════════
const PRODUCTS = [
  {
    id: 1, brand: 'Gucci', name: 'Jaqueta Couro Premium',
    price: 199.90, oldPrice: 299.90,
    category: 'jaquetas', badge: 'SALE', badgeClass: 'sale',
    img: 'assets/img/product-1.webp',
    rating: 4.8, reviews: 124,
    sizes: ['P','M','G','GG'], colors: [{ name: 'Preto', hex: '#1a1a1a' }, { name: 'Marrom', hex: '#5c3d1a' }],
    desc: 'Jaqueta de couro legítimo com acabamento premium. Forro interno em seda, zíper YKK e botões dourados. Corte slim italiano que valoriza a silhueta.'
  },
  {
    id: 2, brand: 'Valentino', name: 'Malha Tricô Luxe',
    price: 749.90, oldPrice: null,
    category: 'malhas', badge: 'NOVO', badgeClass: '',
    img: 'assets/img/product-2.webp',
    rating: 4.6, reviews: 87,
    sizes: ['P','M','G'], colors: [{ name: 'Creme', hex: '#f5e6c8' }, { name: 'Vinho', hex: '#6b1a2e' }],
    desc: 'Malha de tricô artesanal em lã merino 100%. Toque macio e textura sofisticada, ideal para looks casuais e formais.'
  },
  {
    id: 3, brand: 'Prada', name: 'Camiseta Minimalista',
    price: 399.90, oldPrice: null,
    category: 'camisetas', badge: null, badgeClass: '',
    img: 'assets/img/product-3.webp',
    rating: 4.5, reviews: 210,
    sizes: ['PP','P','M','G','GG'], colors: [{ name: 'Branco', hex: '#f5f5f5' }, { name: 'Preto', hex: '#111' }, { name: 'Cinza', hex: '#888' }],
    desc: 'Camiseta em algodão pima 200g, corte regular com acabamento de costura dupla. O básico elevado ao máximo de qualidade.'
  },
  {
    id: 4, brand: 'Hermès', name: 'Bolsa Birkin 30',
    price: 599.90, oldPrice: 799.90,
    category: 'bolsas', badge: 'SALE', badgeClass: 'sale',
    img: 'assets/img/bolsahermes.webp',
    rating: 4.9, reviews: 56,
    sizes: ['M','G','GG'], colors: [{ name: 'Cinza', hex: '#888' }, { name: 'Preto', hex: '#111' }],
    desc: 'Bolsa Birkin 30 em couro de crocodilo. Design clássico e sofisticado, perfeita para mulheres elegantes.'
  },
  {
    id: 5, brand: 'Dior', name: 'Camisa Social Slim',
    price: 849.90, oldPrice: null,
    category: 'camisas', badge: 'EXCLUSIVO', badgeClass: '',
    img: 'assets/img/camisaslimdior.webp',
    rating: 4.7, reviews: 98,
    sizes: ['P','M','G'], colors: [{ name: 'Branco', hex: '#f5f5f5' }, { name: 'Azul Claro', hex: '#a8c4e0' }],
    desc: 'Camisa social em popeline egípcio com acabamento nacarado nos botões. Corte slim adaptado ao corpo brasileiro.'
  },
  {
    id: 6, brand: 'Chanel', name: 'bolsachanel22',
    price: 2499.90, oldPrice: null,
    category: 'bolsas', badge: 'EXCLUSIVO', badgeClass: '',
    img: 'assets/img/bolsachanel22.webp',
    rating: 5.0, reviews: 32,
    sizes: ['P','M','G'], colors: [{ name: 'Bege', hex: '#d4b896' }, { name: 'Preto', hex: '#111' }],
    desc: 'Jaqueta em tweed de lã francesa com bordados de corrente dourada. Icônica, intemporal e artesanal. Peça de colecionador.'
  },
  {
    id: 7, brand: 'Louis Vuitton', name: 'Sobretudo Premium',
    price: 1299.90, oldPrice: 1599.90,
    category: 'moletons', badge: 'SALE', badgeClass: 'sale',
    img: 'assets/img/sobretudolouis.webp',
    rating: 4.8, reviews: 73,
    sizes: ['P','M','G','GG'], colors: [{ name: 'Marrom', hex: '#5c3d1a' }],
    desc: 'Moletom com estampa Monogram LV. Algodão premium 100% com acabamento bordado. Capuz com cordão e bolso frontal.'
  },
  {
    id: 8, brand: 'Valentino', name: 'Camisa Oversized Print',
    price: 479.90, oldPrice: null,
    category: 'camisas', badge: 'NOVO', badgeClass: '',
    img: 'assets/img/Camisa Oversized Print.webp',
    rating: 4.4, reviews: 145,
    sizes: ['P','M','G','GG'], colors: [{ name: 'Off-White', hex: '#f0ead6' }, { name: 'Preto', hex: '#111' }],
    desc: 'Camiseta oversized com estampa artística exclusiva. Algodão orgânico 180g com caimento relaxado e estilo editorial.'
  },
  {
    id: 9, brand: 'Gucci', name: 'Malha Gola Alta',
    price: 899.90, oldPrice: 1099.90,
    category: 'malhas', badge: 'SALE', badgeClass: 'sale',
    img: 'assets/img/Malhagolaalta.webp',
    rating: 4.6, reviews: 61,
    sizes: ['P','M','G'], colors: [{ name: 'Verde Escuro', hex: '#1a3a2a' }, { name: 'Vinho', hex: '#6b1a2e' }],
    desc: 'Malha gola alta em cashmere escocês. Toque incomparável, resistência ao pilling e leveza excepcional.'
  },
  {
    id: 10, brand: 'Hermès', name: 'Camisa Linho Premium',
    price: 699.90, oldPrice: null,
    category: 'camisas', badge: null, badgeClass: '',
    img: 'assets/img/camisalinhopremium.webp',
    rating: 4.5, reviews: 88,
    sizes: ['P','M','G','GG'], colors: [{ name: 'Natural', hex: '#d4c9a8' }, { name: 'Azul', hex: '#3a6a9a' }],
    desc: 'Camisa em linho belga premium com acabamento lavado. Respirável e elegante para os dias quentes do verão.'
  },
];

// ═══════════════════════════════════════════════════════
// 2. DEPOIMENTOS
// ═══════════════════════════════════════════════════════
const TESTIMONIALS = [
  { name: 'Ana Beatriz', city: 'São Paulo, SP', text: 'Qualidade impecável! A jaqueta chegou em dois dias e o acabamento é incrível. Já é minha terceira compra e nunca me decepcionei.', stars: 5, initial: 'A' },
  { name: 'Carlos Mendonça', city: 'Rio de Janeiro, RJ', text: 'O moletom Hermès é simplesmente perfeito. Vale cada centavo. O atendimento pós-venda também foi excelente quando precisei de uma troca.', stars: 5, initial: 'C' },
  { name: 'Isabela Fonseca', city: 'Recife, PE', text: 'Finalmente uma loja que entende de moda de verdade. As peças têm um caimento diferente, parece que foram feitas sob medida pra mim.', stars: 5, initial: 'I' },
  { name: 'Rodrigo Alves', city: 'Belo Horizonte, MG', text: 'Comprei a camisa social Dior e recebi vários elogios no primeiro uso. Entrega rápida, embalagem linda e produto idêntico ao site.', stars: 4, initial: 'R' },
  { name: 'Marina Costa', city: 'Brasília, DF', text: 'A malha tricô Valentino tem o caimento mais bonito que já vi. Parece que saiu de editorial de revista. Amei demais!', stars: 5, initial: 'M' },
  { name: 'Felipe Torres', city: 'Porto Alegre, RS', text: 'Curadoria de altíssimo nível. Cada peça conta uma história e você percebe o cuidado na seleção. Minha loja favorita definitivamente.', stars: 5, initial: 'F' },
];

// ═══════════════════════════════════════════════════════
// 3. ESTADO DA APLICAÇÃO
// ═══════════════════════════════════════════════════════
let cart = JSON.parse(localStorage.getItem('aurea_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('aurea_wishlist') || '[]');
let currentFilter = 'todos';
let currentSort = 'default';
let searchQuery = '';
let currentProduct = null;
let selectedSize = null;
let selectedColor = null;
let qty = 1;
let checkoutStep = 1;

// ═══════════════════════════════════════════════════════
// 4. UTILITÁRIOS
// ═══════════════════════════════════════════════════════
const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const saveCart = () => localStorage.setItem('aurea_cart', JSON.stringify(cart));
const saveWishlist = () => localStorage.setItem('aurea_wishlist', JSON.stringify(wishlist));

function showToast(msg, duration = 2800) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), duration);
}

function stars(rating) {
  let s = '';
  for (let i = 1; i <= 5; i++) {
    s += `<i class="ri-star-${i <= Math.round(rating) ? 'fill' : 'line'} star-filled"></i>`;
  }
  return s;
}

// ═══════════════════════════════════════════════════════
// 5. RENDERIZAR PRODUTOS
// ═══════════════════════════════════════════════════════
function getFilteredProducts() {
  let list = [...PRODUCTS];

  // Filtro por categoria
  if (currentFilter !== 'todos') {
    list = list.filter(p => p.category === currentFilter);
  }

  // Busca por texto
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  // Ordenação
  switch (currentSort) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'name-asc':   list.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
  }

  return list;
}

function renderProducts() {
  const grid = $('#productGrid');
  const noResults = $('#noResults');
  const countEl = $('#productCount');
  const list = getFilteredProducts();

  countEl.textContent = `${list.length} produto${list.length !== 1 ? 's' : ''}`;

  if (list.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  grid.innerHTML = list.map(p => `
    <div class="card" data-id="${p.id}" tabindex="0" role="button" aria-label="Ver ${p.name}">
      ${p.badge ? `<div class="card-badge ${p.badgeClass}">${p.badge}</div>` : ''}
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
      <button class="card-add-btn" data-id="${p.id}" aria-label="Adicionar ${p.name} ao carrinho">
        <i class="ri-shopping-bag-4-fill"></i>Adicionar
      </button>
      <div class="card_info">
        <p>${p.brand}</p>
        <p>${p.name}</p>
        <p>${fmt(p.price)}</p>
        <div class="card-rating">
          ${stars(p.rating)}
          <span>(${p.reviews})</span>
        </div>
      </div>
    </div>
  `).join('');

  // Eventos dos cards
  $$('#productGrid .card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-add-btn')) return;
      openProductModal(parseInt(card.dataset.id));
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') openProductModal(parseInt(card.dataset.id));
    });
  });

  $$('#productGrid .card-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const p = PRODUCTS.find(x => x.id === parseInt(btn.dataset.id));
      if (p) quickAddToCart(p);
    });
  });
}

function quickAddToCart(p) {
  addToCart(p, p.sizes[0], p.colors[0]?.name || '', 1);
}

// ═══════════════════════════════════════════════════════
// 6. MODAL DO PRODUTO
// ═══════════════════════════════════════════════════════
function openProductModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  currentProduct = p;
  selectedSize = p.sizes[0];
  selectedColor = p.colors[0]?.name || '';
  qty = 1;

  $('#modalImg').src = p.img;
  $('#modalImg').alt = p.name;
  $('#modalBrand').textContent = p.brand;
  $('#modalName').textContent = p.name;
  $('#modalPrice').textContent = fmt(p.price);
  $('#modalDesc').textContent = p.desc;
  $('#modalBadge').textContent = p.badge || '';
  $('#modalBadge').style.display = p.badge ? 'block' : 'none';
  $('#modalRating').innerHTML = `${stars(p.rating)} <span>${p.rating} (${p.reviews} avaliações)</span>`;
  $('#qtyValue').textContent = 1;

  // Tamanhos
  $('#sizeGrid').innerHTML = p.sizes.map(s =>
    `<button class="size-btn${s === selectedSize ? ' active' : ''}" data-size="${s}">${s}</button>`
  ).join('');
  $$('#sizeGrid .size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedSize = btn.dataset.size;
      $$('#sizeGrid .size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Cores
  $('#selectedColorName').textContent = p.colors[0]?.name || '';
  $('#colorGrid').innerHTML = p.colors.map((c, i) =>
    `<button class="color-btn${i === 0 ? ' active' : ''}" data-color="${c.name}" style="background:${c.hex}" title="${c.name}"></button>`
  ).join('');
  $$('#colorGrid .color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedColor = btn.dataset.color;
      $('#selectedColorName').textContent = selectedColor;
      $$('#colorGrid .color-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Wishlist
  const inWish = wishlist.includes(p.id);
  const wishBtn = $('#btnWishlist');
  wishBtn.classList.toggle('active', inWish);
  wishBtn.innerHTML = inWish ? '<i class="ri-heart-fill"></i>' : '<i class="ri-heart-line"></i>';

  $('#productOverlay').classList.add('open');
  $('#productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  $('#productOverlay').classList.remove('open');
  $('#productModal').classList.remove('open');
  document.body.style.overflow = '';
}

// ═══════════════════════════════════════════════════════
// 7. CARRINHO
// ═══════════════════════════════════════════════════════
function addToCart(product, size, color, quantity) {
  const key = `${product.id}_${size}_${color}`;
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({ key, id: product.id, brand: product.brand, name: product.name, price: product.price, img: product.img, size, color, qty: quantity });
  }
  saveCart();
  updateCartUI();
  showToast(`✓ ${product.name} adicionado ao carrinho`);
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function updateCartQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function getCartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function getCartCount() {
  return cart.reduce((s, i) => s + i.qty, 0);
}

function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();

  // Badge navbar
  const badge = $('#navCartBadge');
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';

  // Badge drawer
  $('#cartCount').textContent = count;

  // Totais
  $('#cartSubtotal').textContent = fmt(total);
  $('#cartTotal').textContent = fmt(total);

  // Footer/empty
  $('#cartFooter').style.display = count > 0 ? 'block' : 'none';
  $('#cartEmpty').style.display = count === 0 ? 'flex' : 'none';
  $('#cartItems').style.display = count === 0 ? 'none' : 'flex';
}

function renderCartItems() {
  const container = $('#cartItems');
  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-key="${item.key}">
      <img class="cart-item__img" src="${item.img}" alt="${item.name}" />
      <div class="cart-item__body">
        <p class="cart-item__brand">${item.brand}</p>
        <p class="cart-item__name">${item.name}</p>
        <p class="cart-item__meta">Tam: ${item.size}${item.color ? ' · ' + item.color : ''}</p>
        <div class="cart-item__bottom">
          <span class="cart-item__price">${fmt(item.price * item.qty)}</span>
          <div class="cart-item__controls">
            <button onclick="updateCartQty('${item.key}', -1)" aria-label="Diminuir">−</button>
            <span>${item.qty}</span>
            <button onclick="updateCartQty('${item.key}', 1)" aria-label="Aumentar">+</button>
          </div>
          <button class="cart-item__remove" onclick="removeFromCart('${item.key}')" aria-label="Remover">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function openCart() {
  renderCartItems();
  updateCartUI();
  $('#cartDrawer').classList.add('open');
  $('#cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  $('#cartDrawer').classList.remove('open');
  $('#cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ═══════════════════════════════════════════════════════
// 8. CHECKOUT
// ═══════════════════════════════════════════════════════
function openCheckout() {
  closeCart();
  checkoutStep = 1;
  renderCheckoutSidebar();
  renderOrderSummary();
  updateCheckoutSteps(1);
  $$('.checkout-panel').forEach(p => { p.classList.remove('active'); p.style.display = ''; });
  $('#checkoutPanel1').classList.add('active');
  $('#checkoutSuccess').style.display = 'none';
  $('#checkoutOverlay').classList.add('open');
  $('#checkoutModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  $('#checkoutOverlay').classList.remove('open');
  $('#checkoutModal').classList.remove('open');
  document.body.style.overflow = '';
}

function checkoutNext(step) {
  const panels = { 1: 'checkoutPanel1', 2: 'checkoutPanel2', 3: 'checkoutPanel3' };
  const nextPanels = { 1: 'checkoutPanel2', 2: 'checkoutPanel3' };

  // Captura dados no momento certo, antes de mudar de painel
  if (step === 1 && typeof saveDeliverySnapshot === 'function') saveDeliverySnapshot();
  if (step === 2 && typeof savePaymentSnapshot  === 'function') savePaymentSnapshot();

  if (step === 3) {
    // ── Captura o estado do carrinho ANTES de limpar ──
    const cartSnapshot = JSON.parse(JSON.stringify(cart));
    const orderTotal   = getCartTotal();
    const orderNumber  = Math.floor(Math.random() * 900000 + 100000);

    // ── Limpa o carrinho e atualiza UI ───────────────
    cart = [];
    saveCart();
    updateCartUI();

    // ── Mostra tela de sucesso ────────────────────────
    $$('.checkout-panel').forEach(p => { p.classList.remove('active'); });
    $('#checkoutSuccess').style.display = 'flex';
    $('#orderNumber').textContent = orderNumber;
    $$('.checkout-step').forEach((s, i) => { s.classList.remove('active'); s.classList.add('done'); });

    // ── Envia o e-mail para a loja (assíncrono, não bloqueia) ──
    sendOrderEmail(orderNumber, cartSnapshot, orderTotal);
    return;
  }

  $$('.checkout-panel').forEach(p => p.classList.remove('active'));
  $(`#${nextPanels[step]}`).classList.add('active');
  checkoutStep = step + 1;
  updateCheckoutSteps(checkoutStep);
}

function checkoutBack(step) {
  const prevPanels = { 2: 'checkoutPanel1', 3: 'checkoutPanel2' };
  $$('.checkout-panel').forEach(p => p.classList.remove('active'));
  $(`#${prevPanels[step]}`).classList.add('active');
  checkoutStep = step - 1;
  updateCheckoutSteps(checkoutStep);
}

function updateCheckoutSteps(active) {
  $$('.checkout-step').forEach((s, i) => {
    const n = i + 1;
    s.classList.remove('active', 'done');
    if (n < active) s.classList.add('done');
    else if (n === active) s.classList.add('active');
  });
}

function renderCheckoutSidebar() {
  const items = cart.map(i => `
    <div class="sidebar-item">
      <img src="${i.img}" alt="${i.name}" />
      <div class="sidebar-item__info">
        <p>${i.brand}</p>
        <strong>${i.name}</strong>
        <span style="color:#888;font-size:0.72rem">Tam: ${i.size} · Qtd: ${i.qty}</span>
      </div>
      <span class="sidebar-item__price">${fmt(i.price * i.qty)}</span>
    </div>
  `).join('');
  $('#sidebarItems').innerHTML = items || '<p style="color:#888;font-size:0.85rem">Carrinho vazio</p>';
  const total = getCartTotal();
  $('#sidebarSubtotal').textContent = fmt(total);
  $('#sidebarTotal').textContent = fmt(total);
}

function renderOrderSummary() {
  const items = cart.map(i => `
    <div class="order-summary-item">
      <img src="${i.img}" alt="${i.name}" />
      <div class="order-summary-item__info">
        <p>${i.brand}</p>
        <strong>${i.name}</strong>
        <span>Tam: ${i.size} · Qtd: ${i.qty}</span>
      </div>
      <span class="order-summary-item__price">${fmt(i.price * i.qty)}</span>
    </div>
  `).join('');
  $('#orderSummary').innerHTML = items || '<p style="color:#888">Carrinho vazio</p>';
}

// ═══════════════════════════════════════════════════════
// 9. BUSCA
// ═══════════════════════════════════════════════════════
function openSearch() {
  $('#searchOverlay').classList.add('open');
  setTimeout(() => $('#searchInput').focus(), 100);
  document.body.style.overflow = 'hidden';
}

function closeSearch() {
  $('#searchOverlay').classList.remove('open');
  document.body.style.overflow = '';
  $('#searchInput').value = '';
  $('#searchResults').innerHTML = '';
}

function renderSearchResults(query) {
  const q = query.toLowerCase().trim();
  if (!q) { $('#searchResults').innerHTML = ''; return; }

  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );

  if (results.length === 0) {
    $('#searchResults').innerHTML = `<p style="color:#666;font-family:'Poppins',sans-serif;font-size:0.9rem">Nenhum produto encontrado para "<em>${query}</em>"</p>`;
    return;
  }

  $('#searchResults').innerHTML = results.map(p => `
    <div class="search-result-card" data-id="${p.id}">
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
      <div class="search-result-card__info">
        <p>${p.brand}</p>
        <strong>${p.name}</strong>
        <span>${fmt(p.price)}</span>
      </div>
    </div>
  `).join('');

  $$('.search-result-card').forEach(card => {
    card.addEventListener('click', () => {
      closeSearch();
      openProductModal(parseInt(card.dataset.id));
    });
  });
}

// ═══════════════════════════════════════════════════════
// 10. WISHLIST
// ═══════════════════════════════════════════════════════
function toggleWishlist(id) {
  const idx = wishlist.indexOf(id);
  if (idx === -1) {
    wishlist.push(id);
    showToast('♡ Adicionado aos favoritos');
  } else {
    wishlist.splice(idx, 1);
    showToast('Removido dos favoritos');
  }
  saveWishlist();
  updateWishlistBadge();

  // Atualiza botão no modal se aberto
  if (currentProduct && currentProduct.id === id) {
    const inWish = wishlist.includes(id);
    const btn = $('#btnWishlist');
    btn.classList.toggle('active', inWish);
    btn.innerHTML = inWish ? '<i class="ri-heart-fill"></i>' : '<i class="ri-heart-line"></i>';
  }
}

function updateWishlistBadge() {
  const badge = $('#wishlistBadge');
  badge.textContent = wishlist.length;
  badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
}

// ═══════════════════════════════════════════════════════
// 11. CONTADOR ANIMADO
// ═══════════════════════════════════════════════════════
function animateCounters() {
  const counters = $$('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current).toLocaleString('pt-BR') + '+';
        if (current >= target) clearInterval(timer);
      }, 16);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ═══════════════════════════════════════════════════════
// 12. COUNTDOWN
// ═══════════════════════════════════════════════════════
function startCountdown() {
  const end = new Date();
  end.setDate(end.getDate() + 3);
  end.setHours(23, 59, 59, 0);

  function update() {
    const now = new Date();
    const diff = Math.max(0, end - now);
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const pad = n => String(n).padStart(2, '0');
    if ($('#cdDays')) { $('#cdDays').textContent = pad(d); $('#cdHours').textContent = pad(h); $('#cdMins').textContent = pad(m); $('#cdSecs').textContent = pad(s); }
  }
  update();
  setInterval(update, 1000);
}

// ═══════════════════════════════════════════════════════
// 13. DEPOIMENTOS
// ═══════════════════════════════════════════════════════
function renderTestimonials() {
  const grid = $('#depoimentosGrid');
  if (!grid) return;
  grid.innerHTML = TESTIMONIALS.map(t => `
    <div class="depo-card">
      <div class="depo-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
      <p class="depo-text">"${t.text}"</p>
      <div class="depo-author">
        <div class="depo-avatar">${t.initial}</div>
        <div class="depo-author__info">
          <strong>${t.name}</strong>
          <span>${t.city}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════════════════
// 14. NEWSLETTER
// ═══════════════════════════════════════════════════════
function setupNewsletter() {
  const form = $('#newsletterForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#newsletterEmail').value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('⚠ Insira um e-mail válido.');
      return;
    }
    showToast('✓ Inscrito com sucesso! Bem-vindo(a) à família Áurea.');
    form.reset();
  });
}

// ═══════════════════════════════════════════════════════
// 15. HAMBÚRGUER
// ═══════════════════════════════════════════════════════
function setupHamburger() {
  const ham = $('#hamburger');
  const menu = $('#navMenu');
  if (!ham || !menu) return;
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

// ═══════════════════════════════════════════════════════
// 16. FILTROS DA SEÇÃO COLEÇÕES
// ═══════════════════════════════════════════════════════
function setupFilters() {
  $$('#filterBtns button').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#filterBtns button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderProducts();
    });
  });

  // Busca na seção
  const colSearch = $('#colSearch');
  const colClear = $('#colSearchClear');
  if (colSearch) {
    colSearch.addEventListener('input', () => {
      searchQuery = colSearch.value;
      colClear.style.display = searchQuery ? 'block' : 'none';
      renderProducts();
    });
  }
  if (colClear) {
    colClear.addEventListener('click', () => {
      colSearch.value = '';
      searchQuery = '';
      colClear.style.display = 'none';
      renderProducts();
      colSearch.focus();
    });
  }

  // Ordenação
  $('#sortSelect')?.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
  });
}

// ═══════════════════════════════════════════════════════
// 17. PAYMENT TABS NO CHECKOUT
// ═══════════════════════════════════════════════════════
function setupPaymentTabs() {
  $$('.payment-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      $$('.payment-opt').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      const val = opt.querySelector('input').value;
      $('#cardFields').style.display = val === 'card' ? 'block' : 'none';
    });
  });
}

// ═══════════════════════════════════════════════════════
// 18. INICIALIZAÇÃO
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {

  // Renderiza conteúdo
  renderProducts();
  renderTestimonials();

  // Setup dos módulos
  setupHamburger();
  setupFilters();
  setupNewsletter();
  setupPaymentTabs();
  animateCounters();
  startCountdown();
  updateCartUI();
  updateWishlistBadge();

  // ── Botão carrinho (navbar) ──────────────────────────
  $('#cartBtn')?.addEventListener('click', openCart);
  $('#cartClose')?.addEventListener('click', closeCart);
  $('#cartOverlay')?.addEventListener('click', closeCart);
  $('#btnContinue')?.addEventListener('click', closeCart);
  $('#btnCheckout')?.addEventListener('click', openCheckout);

  // ── Checkout ────────────────────────────────────────
  $('#checkoutClose')?.addEventListener('click', closeCheckout);
  $('#checkoutOverlay')?.addEventListener('click', closeCheckout);
  $('#btnFinish')?.addEventListener('click', () => checkoutNext(3));

  // ── Busca (overlay) ─────────────────────────────────
  $('#searchBtn')?.addEventListener('click', openSearch);
  $('#searchClose')?.addEventListener('click', closeSearch);
  $('#searchOverlay')?.addEventListener('click', (e) => {
    if (e.target === $('#searchOverlay')) closeSearch();
  });
  $('#searchInput')?.addEventListener('input', (e) => {
    renderSearchResults(e.target.value);
  });

  // ── Modal do produto ─────────────────────────────────
  $('#productClose')?.addEventListener('click', closeProductModal);
  $('#productOverlay')?.addEventListener('click', closeProductModal);

  $('#qtyMinus')?.addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    $('#qtyValue').textContent = qty;
  });
  $('#qtyPlus')?.addEventListener('click', () => {
    qty = Math.min(10, qty + 1);
    $('#qtyValue').textContent = qty;
  });

  $('#btnAddModal')?.addEventListener('click', () => {
    if (!currentProduct) return;
    if (!selectedSize) { showToast('⚠ Selecione um tamanho'); return; }
    addToCart(currentProduct, selectedSize, selectedColor, qty);
    closeProductModal();
    setTimeout(openCart, 350);
  });

  $('#btnWishlist')?.addEventListener('click', () => {
    if (currentProduct) toggleWishlist(currentProduct.id);
  });

  // ── Wishlist badge (navbar) ──────────────────────────
  $('#wishlistBtn')?.addEventListener('click', () => {
    showToast(`♡ ${wishlist.length} item${wishlist.length !== 1 ? 's' : ''} nos favoritos`);
  });

  // ── Fechar modais com ESC ────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if ($('#searchOverlay.open')) closeSearch();
    if ($('#productModal.open')) closeProductModal();
    if ($('#cartDrawer.open')) closeCart();
    if ($('#checkoutModal.open')) closeCheckout();
  });

  // ── Scroll suave para links âncora ──────────────────
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = $(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Inicializa EmailJS ───────────────────────────────
  initEmailJS();

  console.log('%c Áurea App carregado ✓', 'color:#c9a84c;font-family:serif;font-size:1.2rem;font-weight:bold;');
});
