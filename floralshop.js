// 1. SELECTORS
const cartCount = document.getElementById('cart-count');
let count = 0;

// 2. PRODUCT LOGIC (Cart & Heart)
document.querySelectorAll('.product-card').forEach(card => {
    const plus = card.querySelector('.plus');
    const minus = card.querySelector('.minus');
    const qty = card.querySelector('.item-qty');
    const heart = card.querySelector('.like-btn');

    if (plus) {
        plus.onclick = (e) => {
            e.preventDefault(); // Stop link from clicking
            let n = parseInt(qty.innerText);
            qty.innerText = n + 1;
            count++;
            cartCount.innerText = count;
        };
    }

    if (minus) {
        minus.onclick = (e) => {
            e.preventDefault();
            let n = parseInt(qty.innerText);
            if (n > 0) {
                qty.innerText = n - 1;
                count--;
                cartCount.innerText = count;
            }
        };
    }

    if (heart) {
        heart.onclick = (e) => {
            e.preventDefault();
            heart.innerText = heart.innerText === '♡' ? '❤️' : '♡';
        };
    }
});

// 3. SLIDER BUTTONS
const slider = document.getElementById('bouquet-slider');
if (document.getElementById('right')) {
    document.getElementById('right').onclick = () => slider.scrollBy({ left: 400, behavior: 'smooth' });
    document.getElementById('left').onclick = () => slider.scrollBy({ left: -400, behavior: 'smooth' });
}

let favCount = 0;
const favDisplay = document.getElementById('fav-count');

document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (btn.classList.contains('active')) {
            btn.classList.remove('active');
            btn.innerText = '♡';
            favCount--;
        } else {
            btn.classList.add('active');
            btn.innerText = '❤️';
            favCount++;
        }
        favDisplay.innerText = `(${favCount})`;
    });
});

const miniTrigger = document.getElementById('newsletter-trigger');
const closeMini = document.getElementById('close-mini');
const modal = document.getElementById('newsletter-modal');
const closeModal = document.getElementById('close-modal');

// Open modal when clicking the mini bar
miniTrigger.onclick = (e) => {
    if(e.target !== closeMini) {
        modal.style.display = 'flex';
    }
};

// Close the mini bar completely
closeMini.onclick = () => {
    miniTrigger.style.display = 'none';
};

// Close the modal
closeModal.onclick = () => {
    modal.style.display = 'none';
};

// Close modal if clicking outside the box
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
};