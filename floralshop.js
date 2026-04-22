// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close menu when a link is clicked
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

// 1. SELECTORS
const cartCount = document.getElementById('cart-count');
let count = 0;

// 2. PRODUCT LOGIC (Cart & Heart)
const cartDrawer = document.getElementById('cart-drawer');
const favDrawer = document.getElementById('fav-drawer');
const cartTrigger = document.getElementById('cart-trigger');
const favTrigger = document.getElementById('fav-trigger');
const cartItemsList = document.getElementById('cart-items-list');
const favItemsList = document.getElementById('fav-items-list');
const cartCountEl = document.getElementById('cart-count');
const favCountEl = document.getElementById('fav-count');

let cart = {};
let favorites = {};

function getProductInfo(card) {
    const nameEl = card.querySelector('.p-info h3');
    const priceEl = card.querySelector('.p-info p');
    const imageEl = card.querySelector('img');
    const name = nameEl ? nameEl.innerText.trim() : 'Product';
    const price = priceEl ? parseInt(priceEl.innerText.replace(/[^0-9]/g, '')) || 0 : 0;
    const imgSrc = imageEl ? imageEl.src : '';
    return { name, price, imgSrc };
}

function updateCounts() {
    const cartQuantity = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.innerText = cartQuantity;
    favCountEl.innerText = `(${Object.keys(favorites).length})`;
}

function renderCart() {
    if (!cartItemsList) return;
    cartItemsList.innerHTML = '';
    const products = Object.values(cart);

    if (!products.length) {
        cartItemsList.innerHTML = '<p class="empty-state">Your cart is empty.</p>';
        return;
    }

    let total = 0;
    products.forEach(item => {
        total += item.price * item.qty;
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <div style="font-size:0.9rem; color:#666;">$${item.price} x ${item.qty}</div>
            </div>
            <div style="text-align:right; display:flex; align-items:center; gap:10px;">
                <strong>$${item.price * item.qty}</strong>
                <button class="remove-item-btn" type="button">✕</button>
            </div>
        `;
        row.querySelector('.remove-item-btn').addEventListener('click', () => removeCartItem(item.name));
        cartItemsList.appendChild(row);
    });

    const totalRow = document.createElement('div');
    totalRow.className = 'cart-item-row';
    totalRow.innerHTML = `<strong>Total</strong><strong>$${total}</strong>`;
    cartItemsList.appendChild(totalRow);
}

function renderFavorites() {
    if (!favItemsList) return;
    favItemsList.innerHTML = '';
    const favoriteValues = Object.values(favorites);

    if (!favoriteValues.length) {
        favItemsList.innerHTML = '<p class="empty-state">You have not liked any items yet.</p>';
        return;
    }

    favoriteValues.forEach(item => {
        const row = document.createElement('div');
        row.className = 'fav-item-row';
        row.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px;">
                <img src="${item.imgSrc}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:12px;" />
                <div>
                    <strong>${item.name}</strong>
                    <div style="font-size:0.9rem;color:#666;">$${item.price}</div>
                </div>
            </div>
            <button class="remove-fav-btn" type="button">Remove</button>
        `;
        row.querySelector('.remove-fav-btn').addEventListener('click', () => removeFavorite(item.name));
        favItemsList.appendChild(row);
    });
}

function setProductHeartState(name, active) {
    document.querySelectorAll('.product-card').forEach(card => {
        const info = getProductInfo(card);
        if (info.name === name) {
            const heart = card.querySelector('.like-btn');
            if (heart) {
                heart.innerText = active ? '❤️' : '♡';
                heart.classList.toggle('active', active);
            }
        }
    });
}

function toggleDrawer(id) {
    const drawer = document.getElementById(id);
    if (!drawer) return;
    if (id === 'cart-drawer') {
        favDrawer?.classList.remove('open');
    }
    if (id === 'fav-drawer') {
        cartDrawer?.classList.remove('open');
    }
    drawer.classList.toggle('open');
}

window.toggleDrawer = toggleDrawer;

if (cartTrigger) {
    cartTrigger.addEventListener('click', () => {
        cartDrawer?.classList.add('open');
        favDrawer?.classList.remove('open');
    });
}

if (favTrigger) {
    favTrigger.addEventListener('click', () => {
        favDrawer?.classList.add('open');
        cartDrawer?.classList.remove('open');
    });
}

function createLikeButton(card) {
    const btn = document.createElement('button');
    btn.className = 'like-btn';
    btn.type = 'button';
    btn.innerText = '♡';
    card.appendChild(btn);
    return btn;
}

function updateCartItem(card, delta) {
    const info = getProductInfo(card);
    if (!cart[info.name]) {
        cart[info.name] = { ...info, qty: 0 };
    }
    cart[info.name].qty = Math.max(0, cart[info.name].qty + delta);

    if (cart[info.name].qty === 0) {
        delete cart[info.name];
    }

    const qtyEl = card.querySelector('.item-qty');
    if (qtyEl) {
        qtyEl.innerText = cart[info.name] ? cart[info.name].qty : '0';
    }

    updateCounts();
    renderCart();
}

function removeCartItem(name) {
    if (!cart[name]) return;
    delete cart[name];
    updateCounts();
    renderCart();

    document.querySelectorAll('.product-card').forEach(card => {
        const info = getProductInfo(card);
        if (info.name === name) {
            const qtyEl = card.querySelector('.item-qty');
            if (qtyEl) qtyEl.innerText = '0';
        }
    });
}

function removeFavorite(name) {
    if (!favorites[name]) return;
    delete favorites[name];
    setProductHeartState(name, false);
    updateCounts();
    renderFavorites();
}

document.querySelectorAll('.product-card').forEach(card => {
    const heart = card.querySelector('.like-btn') || createLikeButton(card);
    const plus = card.querySelector('.plus');
    const minus = card.querySelector('.minus');

    if (heart) {
        heart.addEventListener('click', (e) => {
            e.preventDefault();
            const info = getProductInfo(card);
            const isActive = !favorites[info.name];

            if (isActive) {
                favorites[info.name] = info;
            } else {
                delete favorites[info.name];
            }

            setProductHeartState(info.name, isActive);
            updateCounts();
            renderFavorites();
        });
    }

    if (plus) {
        plus.addEventListener('click', (e) => {
            e.preventDefault();
            updateCartItem(card, 1);
        });
    }

    if (minus) {
        minus.addEventListener('click', (e) => {
            e.preventDefault();
            updateCartItem(card, -1);
        });
    }
});

renderCart();
renderFavorites();
updateCounts();

// 3. SLIDER BUTTONS
const slider = document.getElementById('bouquet-slider');
if (slider && document.getElementById('right')) {
    document.getElementById('right').onclick = () => slider.scrollBy({ left: 400, behavior: 'smooth' });
    document.getElementById('left').onclick = () => slider.scrollBy({ left: -400, behavior: 'smooth' });
}

const miniTrigger = document.getElementById('newsletter-trigger');
const closeMini = document.getElementById('close-mini');
const modal = document.getElementById('newsletter-modal');
const closeModal = document.getElementById('close-modal');

// Open modal when clicking the mini bar
if (miniTrigger) {
    miniTrigger.onclick = (e) => {
        if (e.target !== closeMini) {
            if (modal) modal.style.display = 'flex';
        }
    };
}

if (closeMini) {
    closeMini.onclick = () => {
        if (miniTrigger) miniTrigger.style.display = 'none';
    };
}

if (closeModal) {
    closeModal.onclick = () => {
        if (modal) modal.style.display = 'none';
    };
}

window.onclick = (e) => {
    if (e.target === modal) {
        if (modal) modal.style.display = 'none';
    }
};