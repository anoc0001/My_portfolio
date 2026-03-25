// --- 1. AMOUNT BUTTON LOGIC ---
// This is the $50, $100, $150 buttons
const amountButtons = document.querySelectorAll('.amount-btn');
const cardValueDisplay = document.querySelector('.card-value');
const customTrigger = document.getElementById('customTrigger');
const customWrapper = document.getElementById('customInputWrapper');
const customInput = document.getElementById('customAmountInput');

// for Keeping track of the "Base Price" separately from "Flower Add-ons"
let basePrice = 100.00; 
let flowerPrice = 0.00;

function updateDisplay() {
    const total = basePrice + flowerPrice;
    cardValueDisplay.innerText = "$" + total.toFixed(2);
}

amountButtons.forEach(button => {
    button.addEventListener('click', function() {
        amountButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        if (this.id === "customTrigger") {
            this.style.display = "none";
            customWrapper.style.display = "block";
            customInput.focus();
            basePrice = 0; // this Reset until they type
        } else {
            // this Take the text (like "$100"), remove the "$", and turn into a number
            basePrice = parseFloat(this.innerText.replace('$', ''));
            // If they click a preset, hide the custom input and show the button again
            customWrapper.style.display = "none";
            customTrigger.style.display = "inline-block";
        }
        updateDisplay();
    });
});

// they can Watch the custom input as they type
customInput.addEventListener('input', function() {
    basePrice = parseFloat(this.value) || 0;
    updateDisplay();
});


function toggleFlower(element, price) {
    element.classList.toggle('selected');
    
    if (element.classList.contains('selected')) {
        flowerPrice += price;
    } else {
        flowerPrice -= price;
    }
    updateDisplay();
}

// --- 2. FLOWER ADD-ON LOGIC ---
function toggleFlower(element, price) {
    element.classList.toggle('selected');
    
    //this Gets the current total, and removes the "$" so we can do math
    let currentTotal = parseFloat(cardValueDisplay.innerText.replace('$', ''));

    if (element.classList.contains('selected')) {
        currentTotal += price;
    } else {
        currentTotal -= price;
    }

    cardValueDisplay.innerText = "$" + currentTotal.toFixed(2);
}

// --- 3. LIVE TEXT PREVIEW ---
function updateCard() {
    const name = document.getElementById('nameInput').value;
    const message = document.getElementById('messageInput').value;
    const displayMessage = document.querySelector('.handwriting-font');

    if (name || message) {
        
        displayMessage.innerText = `To ${name}, ${message}`;
    } else {
        displayMessage.innerText = "To someone special...";
    }
}

const purchaseBtn = document.querySelector('.purchase-btn');

purchaseBtn.addEventListener('click', function() {
    // 1. this changes the button look
    this.classList.add('success');
    this.innerText = "GESTURE SENT 🌸";

    // 2. might change later, Optional: Shows a little "Thank You" alert or message on the screen
    setTimeout(() => {
        alert("Your Peony Note has been prepared! Thank you for choosing Peony Studio.");
        
        
        this.classList.remove('success');
        this.innerText = "SEND THE GESTURE";
    }, 500);
});