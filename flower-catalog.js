// --- STATE MANAGEMENT ---
let cart = {};
let count = 0;
let favorites = new Map();

// --- DOM ELEMENTS ---
const drawer = document.getElementById('cart-drawer');
const favDrawer = document.getElementById('fav-drawer');
const trigger = document.getElementById('cart-trigger');
const favTrigger = document.getElementById('fav-trigger');
const closeBtn = document.getElementById('close-cart');
const closeFavBtn = document.getElementById('close-fav');
const searchInput = document.getElementById('flower-search');
const cartItemsList = document.getElementById('cart-items-list');
const favItemsList = document.getElementById('fav-items-list');
const totalDisplay = document.getElementById('cart-total-price');
const countDisplay = document.getElementById('cart-count');

function getMenuItemInfo(item) {
  const name = item.dataset.name || item.querySelector('h3')?.innerText.trim() || 'Product';
  const price = parseInt(item.dataset.price) || parseInt(item.querySelector('.price')?.innerText.replace(/[^0-9]/g, '')) || 0;
  const image = item.querySelector('img')?.src || '';
  return { name, price, image };
}

function updateCountDisplay() {
  if (countDisplay) countDisplay.innerText = count;
}

function renderCart() {
  if (!cartItemsList || !totalDisplay) return;
  cartItemsList.innerHTML = '';

  const items = Object.values(cart);
  if (!items.length) {
    cartItemsList.innerHTML = '<p class="empty-state">No items in your cart yet.</p>';
    totalDisplay.innerText = '0';
    return;
  }

  let totalValue = 0;
  items.forEach(item => {
    totalValue += item.price * item.qty;
    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <div style="font-size:0.9rem;color:#666;">$${item.price} x ${item.qty}</div>
      </div>
      <button class="remove-item-btn" type="button">✕</button>
    `;
    row.querySelector('.remove-item-btn').addEventListener('click', () => removeItem(item.name));
    cartItemsList.appendChild(row);
  });

  totalDisplay.innerText = totalValue;
}

function renderFavorites() {
  if (!favItemsList) return;
  favItemsList.innerHTML = '';

  const items = Object.values(favorites);
  if (!items.length) {
    favItemsList.innerHTML = '<p class="empty-state">No favorites yet.</p>';
    return;
  }

  items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'fav-item-row';
    row.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <div style="font-size:0.9rem;color:#666;">$${item.price}</div>
      </div>
      <button class="remove-fav-btn" type="button">Remove</button>
    `;
    row.querySelector('.remove-fav-btn').addEventListener('click', () => removeFavorite(item.name));
    favItemsList.appendChild(row);
  });
}

function setFavoriteState(name, active) {
  document.querySelectorAll('.menu-item').forEach(item => {
    const info = getMenuItemInfo(item);
    if (info.name === name) {
      const btn = item.querySelector('.fav-btn');
      if (btn) {
        btn.innerText = active ? '❤️' : '♡';
        btn.classList.toggle('active', active);
      }
    }
  });
}

function ensureFavoriteButton(item) {
  let button = item.querySelector('.fav-btn');
  if (!button) {
    button = document.createElement('button');
    button.type = 'button';
    button.className = 'fav-btn';
    button.innerText = '♡';
    item.appendChild(button);
  }
  return button;
}

function toggleFavorite(item) {
  const info = getMenuItemInfo(item);
  const active = !favorites[info.name];
  if (active) {
    favorites[info.name] = { ...info, qty: favorites[info.name]?.qty || 0 };
  } else {
    delete favorites[info.name];
  }
  setFavoriteState(info.name, active);
  renderFavorites();
}

function updateCartForItem(item, delta) {
  const info = getMenuItemInfo(item);
  if (!cart[info.name]) {
    cart[info.name] = { ...info, qty: 0 };
  }
  cart[info.name].qty = Math.max(0, cart[info.name].qty + delta);
  if (cart[info.name].qty === 0) delete cart[info.name];

  const qtyText = item.querySelector('.qty-num');
  if (qtyText) qtyText.innerText = cart[info.name] ? cart[info.name].qty : '0';

  count = Object.values(cart).reduce((sum, current) => sum + current.qty, 0);
  updateCountDisplay();
  renderCart();
}

function removeItem(name) {
  if (!cart[name]) return;
  delete cart[name];
  count = Object.values(cart).reduce((sum, current) => sum + current.qty, 0);
  updateCountDisplay();
  renderCart();

  document.querySelectorAll('.menu-item').forEach(item => {
    const info = getMenuItemInfo(item);
    if (info.name === name) {
      const qtyText = item.querySelector('.qty-num');
      if (qtyText) qtyText.innerText = '0';
    }
  });
}

function removeFavorite(name) {
  if (!favorites[name]) return;
  delete favorites[name];
  setFavoriteState(name, false);
  renderFavorites();
}

trigger?.addEventListener('click', () => {
  drawer?.classList.add('open');
  favDrawer?.classList.remove('open');
});

closeBtn?.addEventListener('click', () => drawer?.classList.remove('open'));

favTrigger?.addEventListener('click', () => {
  favDrawer?.classList.add('open');
  drawer?.classList.remove('open');
});

closeFavBtn?.addEventListener('click', () => favDrawer?.classList.remove('open'));

document.querySelectorAll('.menu-item').forEach(item => {
  const plus = item.querySelector('.plus');
  const minus = item.querySelector('.minus');
  const favButton = ensureFavoriteButton(item);

  favButton.addEventListener('click', (e) => {
    e.preventDefault();
    toggleFavorite(item);
  });

  plus?.addEventListener('click', (e) => {
    e.preventDefault();
    updateCartForItem(item, 1);
  });

  minus?.addEventListener('click', (e) => {
    e.preventDefault();
    updateCartForItem(item, -1);
  });
});

searchInput?.addEventListener('input', (e) => {
  const val = e.target.value.toLowerCase();
  document.querySelectorAll('.menu-item').forEach(item => {
    const title = item.dataset.name?.toLowerCase() || '';
    item.style.display = title.includes(val) ? 'block' : 'none';
  });
});

const lb = document.getElementById('image-lightbox');
const lbImg = document.getElementById('full-image');

document.querySelectorAll('.menu-item img').forEach(img => {
  img.addEventListener('click', () => {
    if (lb && lbImg) {
      lb.style.display = 'block';
      lbImg.src = img.src;
    }
  });
});

document.querySelector('.close-lightbox')?.addEventListener('click', () => {
  if (lb) lb.style.display = 'none';
});
lb?.addEventListener('click', (e) => { if (e.target === lb) lb.style.display = 'none'; });

renderCart();
renderFavorites();
updateCountDisplay();

